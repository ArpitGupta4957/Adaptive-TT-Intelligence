import logging
import os
import json
import re
import time
from collections import defaultdict
from io import BytesIO

import numpy as np
import psycopg2
from psycopg2.extras import execute_values, Json
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer, util
from sklearn.cluster import KMeans
from groq import Groq
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
import supabase
import torch
from supabase import create_client, Client


load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


# -----------------------------
# FastAPI app
# -----------------------------
app = FastAPI(title="Teacher Feedback API")
BUCKET_NAME = "training_materials"

# -----------------------------
# DB config
# -----------------------------
DB_CONFIG = {
    "host": os.getenv("SUPABASE_DB_HOST"),
    "database": os.getenv("SUPABASE_DB_NAME"),
    "user": os.getenv("SUPABASE_DB_USER"),
    "password": os.getenv("SUPABASE_DB_PASSWORD"),
    "port": os.getenv("SUPABASE_DB_PORT", 5432),
    "sslmode": "require"
}

# -----------------------------
# Clients
# -----------------------------
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))
embedding_model = SentenceTransformer("all-mpnet-base-v2")  # Load embeddings on startup

# -----------------------------
# Category rules
# -----------------------------
SKIP_CATEGORIES = {"Class Metadata"}

# -----------------------------
# Helper functions
# -----------------------------
def get_db_connection():
    conn = psycopg2.connect(**DB_CONFIG)
    return conn, conn.cursor()


def generate_proposed_plan(cluster_name, cluster_summary, cluster_vector, corpus_embeddings, texts):
    # Convert to tensor
    if isinstance(cluster_vector, str):
        cluster_vector = json.loads(cluster_vector)
    cluster_tensor = torch.tensor(cluster_vector)

    # Top 10% relevant chunks
    total_chunks = len(corpus_embeddings)
    # top_k = max(1, total_chunks // 2)
    top_k = 10
    hits = util.semantic_search(cluster_tensor, corpus_embeddings, top_k=top_k)[0]
    top_chunks_text = "\n\n".join([texts[hit["corpus_id"]] for hit in hits])

    prompt = f"""
You are an expert teacher-training AI.

Cluster Name: {cluster_name}
Cluster Summary:
{cluster_summary}

Relevant Materials (Top 10% Chunks):
{top_chunks_text}

Task:
1. Design a full training curriculum for the teachers in this cluster.
2. Include at least 5 modules.
3. Each module must have:
   - Title
   - Objective
   - Duration
   - Activities
   - Required resources
   - References to the material chunks
4. Then, produce a step-by-step training plan aligned to the curriculum.
5. Keep it practical, actionable, and grounded in the provided material.
6. Do NOT include anything outside the given context.
7. Write detailed content, minimum 100 words per module.
"""
    try:
        resp = groq_client.chat.completions.create(
            # model="openai/gpt-oss-20b",
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You summarize and design teacher training curriculums."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=3000,
            temperature=0.3
        )
        return resp.choices[0].message.content.strip()
    except Exception as e:
        print(f"⚠️ Failed generating proposed plan for {cluster_name}: {e}")
        return None

# -----------------------------
# Run clustering
# -----------------------------
# Configure logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)

def run_clustering():
    conn, cursor = get_db_connection()

    # -----------------------------
    # Clear old clusters
    # -----------------------------
    cursor.execute("TRUNCATE TABLE public.problem_clusters RESTART IDENTITY CASCADE;")
    conn.commit()
    logger.info("Cleared old clusters")

    # -----------------------------
    # Fetch question → category map
    # -----------------------------
    cursor.execute("SELECT question_id, category FROM public.questions;")
    question_rows = cursor.fetchall()
    question_to_category = {str(qid): cat for qid, cat in question_rows}

    # -----------------------------
    # Fetch teacher embeddings
    # -----------------------------
    cursor.execute("""
        SELECT response_id, category_embeddings
        FROM public.teacher_responses
        WHERE category_embeddings IS NOT NULL;
    """)
    rows = cursor.fetchall()

    category_to_teachers = defaultdict(list)
    for response_id, cat_emb in rows:
        if not isinstance(cat_emb, dict):
            continue
        for cat, emb in cat_emb.items():
            if cat in SKIP_CATEGORIES:
                continue
            category_to_teachers[cat].append({
                "response_id": int(response_id),
                "embedding": np.array(emb, dtype=np.float32)
            })

    # -----------------------------
    # Fetch material chunks
    # -----------------------------
    cursor.execute("SELECT chunk_id, chunk_text, embedding_vector FROM public.generic_material_chunks;")
    material_rows = cursor.fetchall()
    texts = []
    corpus_embeddings = []
    for chunk_id, chunk_text, emb in material_rows:
        texts.append(chunk_text)
        if isinstance(emb, str):
            emb = json.loads(emb)
        corpus_embeddings.append(emb)
    corpus_embeddings = torch.tensor(corpus_embeddings)

    # -----------------------------
    # Summary-only categories
    # -----------------------------
    SUMMARY_ONLY_CATEGORIES = {"Engagement", "Assessment", "Resources"}

    batch_insert = []

    for cat, teachers in category_to_teachers.items():
        if len(teachers) < 3:
            continue

        # -----------------------------
        # SUMMARY-ONLY: no clustering
        # -----------------------------
        if cat in SUMMARY_ONLY_CATEGORIES:
            teacher_ids = [t["response_id"] for t in teachers]

            # Combine responses
            cursor.execute("""
                SELECT responses FROM public.teacher_responses
                WHERE response_id = ANY(%s);
            """, (teacher_ids,))
            responses = [r[0] if isinstance(r[0], dict) else {} for r in cursor.fetchall()]

            combined = []
            for r in responses:
                for qid, ans in r.items():
                    if question_to_category.get(str(qid)) == cat:
                        combined.append(str(ans))
            if not combined:
                continue

            # Generate cluster summary
            prompt_summary = f"""
Summarize teacher feedback for category "{cat}".
STRICT JSON ONLY:
{{
  "cluster_name": "{cat} – Common Issues",
  "cluster_summary": "5–6 factual sentences"
}}
Responses:
{chr(10).join(combined)}
"""
            try:
                resp = groq_client.chat.completions.create(
                    model="llama-3.1-8b-instant",
                    messages=[{"role": "user", "content": prompt_summary}],
                    temperature=0.2,
                    max_tokens=250
                )
                text = resp.choices[0].message.content.strip()
                match = re.search(r"\{.*\}", text, re.DOTALL)
                if not match:
                    continue
                result = json.loads(match.group(0))
            except Exception as e:
                logger.warning(f"Failed summary for category {cat}: {e}")
                continue

            # Generate proposed plan
            proposed_plan = generate_proposed_plan(
                cluster_name=result.get("cluster_name"),
                cluster_summary=result.get("cluster_summary"),
                cluster_vector=None,  # No cluster vector for summary-only
                corpus_embeddings=corpus_embeddings,
                texts=texts
            )

            logger.info(f"Proposed plan for '{result.get('cluster_name')}' in '{cat}':\n{proposed_plan}")

            batch_insert.append((
                result.get("cluster_name"),
                result.get("cluster_summary"),
                teacher_ids,
                cat,
                None,  # cluster_vector
                proposed_plan
            ))

            continue  # Skip KMeans for summary-only

        # -----------------------------
        # OTHER CATEGORIES: perform KMeans
        # -----------------------------
        X = np.stack([t["embedding"] for t in teachers])
        X = np.nan_to_num(X)
        norms = np.linalg.norm(X, axis=1, keepdims=True)
        X = X / np.maximum(norms, 1e-8)

        k = min(6, max(2, int(np.sqrt(len(teachers)))))
        kmeans = KMeans(n_clusters=k, random_state=42, n_init=15)
        labels = kmeans.fit_predict(X)

        clusters = defaultdict(list)
        for t, label in zip(teachers, labels):
            clusters[label].append(t)

        for cluster_teachers in clusters.values():
            teacher_ids = [t["response_id"] for t in cluster_teachers]

            cluster_vectors = np.stack([t["embedding"] for t in cluster_teachers])
            cluster_vectors = np.nan_to_num(cluster_vectors)
            cluster_vector = cluster_vectors.mean(axis=0).tolist()

            # Combine responses
            cursor.execute("""
                SELECT responses FROM public.teacher_responses
                WHERE response_id = ANY(%s);
            """, (teacher_ids,))
            responses = [r[0] if isinstance(r[0], dict) else {} for r in cursor.fetchall()]

            combined = []
            for r in responses:
                for qid, ans in r.items():
                    if question_to_category.get(str(qid)) == cat:
                        combined.append(str(ans))
            if not combined:
                continue

            # Generate cluster summary
            prompt_summary = f"""
Summarize teacher feedback for category "{cat}".
STRICT JSON ONLY:
{{
  "cluster_name": "short descriptive title",
  "cluster_summary": "5–6 factual sentences"
}}
Responses:
{chr(10).join(combined)}
"""
            try:
                resp = groq_client.chat.completions.create(
                    model="llama-3.1-8b-instant",
                    messages=[{"role": "user", "content": prompt_summary}],
                    temperature=0.2,
                    max_tokens=250
                )
                text = resp.choices[0].message.content.strip()
                match = re.search(r"\{.*\}", text, re.DOTALL)
                if not match:
                    continue
                result = json.loads(match.group(0))
            except Exception as e:
                logger.warning(f"Failed summary for category {cat}: {e}")
                continue

            # Generate proposed plan
            proposed_plan = generate_proposed_plan(
                cluster_name=result.get("cluster_name"),
                cluster_summary=result.get("cluster_summary"),
                cluster_vector=cluster_vector,
                corpus_embeddings=corpus_embeddings,
                texts=texts
            )

            logger.info(f"Proposed plan for '{result.get('cluster_name')}' in '{cat}':\n{proposed_plan}")

            batch_insert.append((
                result.get("cluster_name"),
                result.get("cluster_summary"),
                teacher_ids,
                cat,
                cluster_vector,
                proposed_plan
            ))

            time.sleep(0.15)

    # -----------------------------
    # Insert clusters into DB
    # -----------------------------
    if batch_insert:
        insert_query = """
            INSERT INTO public.problem_clusters
            (cluster_name, cluster_summary, teacher_ids, category, cluster_vector, proposed_plan)
            VALUES %s
        """
        db_values = [
            (
                c[0],
                c[1],
                Json(c[2]),
                c[3],
                Json(c[4]) if c[4] else None,
                c[5]
            ) for c in batch_insert
        ]
        execute_values(cursor, insert_query, db_values)
        conn.commit()
        logger.info(f"Inserted {len(batch_insert)} clusters")

    cursor.close()
    conn.close()

    # -----------------------------
    # Return clean JSON
    # -----------------------------
    return {
        "status": "success",
        "clusters": [
            {
                "cluster_name": c[0],
                "cluster_summary": c[1],
                "teacher_ids": c[2],
                "category": c[3],
                "proposed_plan": c[5]
            } for c in batch_insert
        ]
    }

# -----------------------------
# Clusters endpoint
# -----------------------------
@app.get("/clusters")
def get_clusters():
    return run_clustering()

# -----------------------------
# PDF chunking helper
# -----------------------------
def chunk_text(text: str):
    text = text.replace("\x00", "")
    text = re.sub(r"\s+", " ", text)

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1200,
        chunk_overlap=150,
        separators=["\n\n", "\n", ".", "?", "!", ";", ":", " "]
    )

    chunks = splitter.split_text(text)
    clean_chunks = [c.strip() for c in chunks if len(c.strip()) > 80 and c.count(" ") > 25]
    return clean_chunks

def insert_pdf_chunks(file_name: str, chunks: list):
    conn, cursor = get_db_connection()
    batch_data = []

    for chunk in chunks:
        embedding = embedding_model.encode(chunk, convert_to_numpy=True).tolist()
        batch_data.append((file_name, chunk, json.dumps(embedding)))

    if batch_data:
        insert_query = """
            INSERT INTO public.generic_material_chunks
            (source_file, chunk_text, embedding_vector)
            VALUES %s
        """
        execute_values(cursor, insert_query, batch_data)
        conn.commit()

    cursor.close()
    conn.close()
    return len(batch_data)


# -----------------------------
# POST endpoint to upload PDF
# -----------------------------
@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        return {"status": "error", "message": "Only PDF files are allowed."}

    file_bytes = await file.read()
    file_name = file.filename

    # Upload to Supabase bucket
    try:
        supabase.storage.from_("training_materials").upload(
    path=file_name,
    file=file_bytes,
    file_options={"upsert": "true"}
)
    except Exception as e:
        return {"status": "error", "message": str(e)}

    pdf_reader = PdfReader(BytesIO(file_bytes))
    full_text = "".join((page.extract_text() or "") + "\n" for page in pdf_reader.pages)

    chunks = chunk_text(full_text)
    inserted_count = insert_pdf_chunks(file.filename, chunks)

    return {
        "status": "success",
        "file_name": file.filename,
        "num_chunks": len(chunks),
        "inserted_chunks": inserted_count
    }


# -----------------------------
# Pydantic model for teacher response
# -----------------------------
class TeacherResponse(BaseModel):
    teacher_id: int
    responses: dict  # {question_id: answer}
    category_embeddings: dict = None  # optional precomputed embeddings


# -----------------------------
# POST endpoint for teacher responses
# -----------------------------
@app.post("/submit_response")
def submit_response(payload: TeacherResponse):
    conn, cursor = get_db_connection()
    try:
        # Insert or update the teacher response
        insert_query = """
            INSERT INTO public.teacher_responses
            (teacher_id, responses, category_embeddings)
            VALUES (%s, %s, %s)
        """
        cursor.execute(
            insert_query,
            (payload.teacher_id, Json(payload.responses), Json(payload.category_embeddings) if payload.category_embeddings else None)
        )
        conn.commit()
    except Exception as e:
        conn.rollback()
        return {"status": "error", "message": str(e)}
    finally:
        cursor.close()
        conn.close()

    return {"status": "success", "teacher_id": payload.teacher_id, "message": "Response saved successfully."}