import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header, Footer } from '../components/Layout';
import { PageHeader, Button, Card, Badge, Alert } from '../components/ui';
import { ArrowLeft, Brain, Check } from 'lucide-react';

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  approach: string;
  outcomes: string[];
  confidence: number;
  approved?: boolean;
}

export const AIRecommendationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { cohortId } = useParams();
  const [recommendations] = useState<AIRecommendation[]>([
    {
      id: '1',
      title: 'Problem-Solving Through Case Studies',
      description: 'Interactive case-based learning approach to improve student problem-solving skills',
      approach: 'Small group discussions, real-world problem scenarios, peer learning',
      outcomes: ['Improved student engagement', 'Better problem-solving skills', 'Increased confidence in complex problems'],
      confidence: 94,
    },
    {
      id: '2',
      title: 'Formative Assessment Strategies',
      description: 'Regular feedback mechanisms to monitor and improve student learning',
      approach: 'Daily quizzes, classroom discussions, exit tickets, peer assessment',
      outcomes: ['Timely feedback for students', 'Early identification of learning gaps', 'Improved learning outcomes'],
      confidence: 87,
    },
    {
      id: '3',
      title: 'Collaborative Learning Frameworks',
      description: 'Structured group work to enhance peer learning and social skills',
      approach: 'Jigsaw groups, think-pair-share, cooperative learning structures',
      outcomes: ['Enhanced collaboration skills', 'Better retention through peer teaching', 'Inclusive classroom'],
      confidence: 91,
    },
  ]);

  const [approved, setApproved] = useState<{ [key: string]: boolean }>({});

  const handleApprove = (id: string) => {
    setApproved((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const approvedCount = Object.values(approved).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary-600 font-medium mb-8 hover:text-primary-700"
        >
          <ArrowLeft size={20} />
          Back to Cohort
        </button>

        <PageHeader
          title="AI-Generated Recommendations"
          subtitle="Review and approve training recommendations based on teacher needs analysis"
        />

        <Alert
          type="info"
          message="EduWeave uses AI to cluster similar needs and recommend targeted training approaches. Human review and approval is required for all recommendations."
        />

        <div className="mt-8 space-y-6">
          {recommendations.map((rec) => (
            <Card key={rec.id}>
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Brain size={24} className="text-orange-600" />
                      <h3 className="text-xl font-bold text-gray-900">{rec.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{rec.description}</p>
                  </div>
                  <Badge type={rec.confidence > 90 ? 'success' : rec.confidence > 85 ? 'info' : 'warning'}>
                    {rec.confidence}% Confidence
                  </Badge>
                </div>

                {/* Approach */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Recommended Approach:</h4>
                  <p className="text-gray-700">{rec.approach}</p>
                </div>

                {/* Expected Outcomes */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Expected Outcomes:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {rec.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={18} className="text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action */}
                <div className="pt-4 border-t flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    {approved[rec.id] ? (
                      <span className="flex items-center gap-2 text-green-700">
                        <Check size={16} />
                        Approved for Training Design
                      </span>
                    ) : (
                      <span>Review this recommendation</span>
                    )}
                  </p>
                  <button
                    onClick={() => handleApprove(rec.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      approved[rec.id]
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {approved[rec.id] ? (
                      <>
                        <Check size={16} className="inline mr-2" />
                        Approved
                      </>
                    ) : (
                      'Approve'
                    )}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-gray-700 mb-4">
            <strong>{approvedCount} of {recommendations.length}</strong> recommendations approved
          </p>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              disabled={approvedCount === 0}
              onClick={() => navigate(`/diet/design-training/${cohortId}`)}
            >
              Proceed to Training Design
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
