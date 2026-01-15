import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/Layout';
import { PageHeader, Button, FormField, Card } from '../components/ui';
import { ArrowLeft, Check } from 'lucide-react';

export const SubmitNeedPage: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    gradeLevel: '',
    studentCount: '',
    challenge: '',
    context: '',
    constraints: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Need Submitted Successfully!</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Your classroom need has been received. DIET officials will review it and design a training program based on
              your requirements.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary-600">1.</span>
                  <span>DIET officials analyze your submission along with other teachers in your district</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary-600">2.</span>
                  <span>AI recommends clustering of similar needs for efficient training design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary-600">3.</span>
                  <span>DIET approves and publishes a customized training program</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-primary-600">4.</span>
                  <span>You receive an invitation to attend the training</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <Button variant="secondary" onClick={() => navigate('/teacher-dashboard')}>
                Go to Dashboard
              </Button>
              <Button variant="primary" onClick={() => navigate('/teacher/submit-need')}>
                Submit Another Need
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary-600 font-medium mb-8 hover:text-primary-700"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <PageHeader
          title="Submit Your Classroom Need"
          subtitle="Help us design training programs that address your real classroom challenges"
        />

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Subject" required>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Other">Other</option>
                </select>
              </FormField>

              <FormField label="Grade Level" required>
                <select
                  name="gradeLevel"
                  value={formData.gradeLevel}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select grade</option>
                  <option value="Primary">Primary (1-5)</option>
                  <option value="Middle">Middle (6-8)</option>
                  <option value="Secondary">Secondary (9-10)</option>
                  <option value="Senior">Senior (11-12)</option>
                </select>
              </FormField>
            </div>

            <FormField label="Title of Your Classroom Challenge" required>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Students struggle with word problems"
                className="input-field"
                required
              />
            </FormField>

            <FormField label="Number of Students" required>
              <input
                type="number"
                name="studentCount"
                value={formData.studentCount}
                onChange={handleChange}
                placeholder="e.g., 35"
                className="input-field"
                required
              />
            </FormField>

            <FormField label="What is the specific challenge?" required>
              <textarea
                name="challenge"
                value={formData.challenge}
                onChange={handleChange}
                placeholder="Describe the exact problem your students face. Be specific about learning outcomes affected..."
                rows={4}
                className="input-field"
                required
              />
            </FormField>

            <FormField label="Classroom Context" required>
              <textarea
                name="context"
                value={formData.context}
                onChange={handleChange}
                placeholder="Describe your classroom environment, student background, and existing teaching methods..."
                rows={4}
                className="input-field"
                required
              />
            </FormField>

            <FormField label="Constraints & Limitations" required>
              <textarea
                name="constraints"
                value={formData.constraints}
                onChange={handleChange}
                placeholder="What are your constraints? (e.g., limited resources, time, technology, curriculum restrictions)"
                rows={3}
                className="input-field"
                required
              />
            </FormField>

            <div className="pt-6 border-t flex gap-4">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" loading={loading}>
                Submit Need
              </Button>
            </div>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
