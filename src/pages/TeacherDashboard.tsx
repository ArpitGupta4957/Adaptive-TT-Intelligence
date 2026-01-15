import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/Layout';
import { PageHeader, Button, Card, Badge, EmptyState } from '../components/ui';
import { Plus, Pencil, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface Submission {
  id: string;
  title: string;
  subject: string;
  status: 'draft' | 'submitted' | 'reviewed';
  submittedAt?: string;
  lastModified: string;
}

export const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: '1',
      title: 'Difficulty with Mathematics Problem-Solving Approach',
      subject: 'Mathematics',
      status: 'submitted',
      submittedAt: '2024-01-10',
      lastModified: '2024-01-10',
    },
    {
      id: '2',
      title: 'English Language Composition Skills',
      subject: 'English',
      status: 'draft',
      lastModified: '2024-01-12',
    },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Send size={16} />;
      case 'reviewed':
        return <CheckCircle size={16} />;
      default:
        return <AlertCircle size={16} />;
    }
  };

  const getStatusBadgeType = (status: string): 'success' | 'warning' | 'info' | 'default' => {
    switch (status) {
      case 'submitted':
        return 'info';
      case 'reviewed':
        return 'success';
      default:
        return 'warning';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="My Classroom Needs"
          subtitle="Submit and track your classroom challenges for training recommendations"
          action={
            <Button variant="primary" onClick={() => navigate('/teacher/submit-need')}>
              <Plus size={20} />
              Submit New Need
            </Button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Stats */}
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Total Submissions</p>
              <p className="text-4xl font-bold text-primary-600">{submissions.length}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Under Review</p>
              <p className="text-4xl font-bold text-orange-600">
                {submissions.filter((s) => s.status === 'submitted').length}
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">Training Assigned</p>
              <p className="text-4xl font-bold text-green-600">1</p>
            </div>
          </Card>
        </div>

        {/* Recent Submissions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Submissions</h2>

          {submissions.length === 0 ? (
            <EmptyState
              title="No submissions yet"
              description="Start by submitting your first classroom need to get personalized training recommendations."
              action={
                <Button variant="primary" onClick={() => navigate('/teacher/submit-need')}>
                  <Plus size={20} />
                  Submit Your First Need
                </Button>
              }
            />
          ) : (
            <div className="grid gap-4">
              {submissions.map((submission) => (
                <Card key={submission.id} className="cursor-pointer hover:shadow-md transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{submission.title}</h3>
                        <Badge type={getStatusBadgeType(submission.status)}>
                          {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{submission.subject}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {submission.submittedAt && (
                          <span>Submitted: {new Date(submission.submittedAt).toLocaleDateString()}</span>
                        )}
                        <span>Modified: {new Date(submission.lastModified).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/teacher/submission/${submission.id}`)}
                      className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition"
                    >
                      <Pencil size={20} className="text-gray-600" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Training Programs Assigned */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Assigned Training Programs</h2>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Mathematics Problem-Solving Strategies</h3>
                <p className="text-gray-600 text-sm mb-4">
                  A targeted 6-week program designed for teachers struggling with student engagement in problem-solving.
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Start Date: Jan 20, 2024</span>
                  <span>•</span>
                  <span>Duration: 6 weeks</span>
                </div>
              </div>
              <Button variant="primary" onClick={() => navigate('/teacher/training/1')}>
                View Program
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};
