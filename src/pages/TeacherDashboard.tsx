import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/Layout';
import { PageHeader, Button, Badge, EmptyState } from '../components/ui';
import { Plus, Pencil, TrendingUp, BookOpen, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { teacherResponsesApi } from '../lib/api';

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
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Fetch submissions and training programs
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      try {
        // Fetch teacher responses (submissions)
        const responsesRes = await teacherResponsesApi.getTeacherResponses(parseInt(user.id));
        if (responsesRes.data) {
          const formattedSubmissions = responsesRes.data.map((response: any) => ({
            id: response.response_id?.toString() || '',
            title: response.responses?.title || 'Untitled',
            subject: response.responses?.subject || 'General',
            status: response.responses?.status || 'submitted',
            submittedAt: response.submitted_at,
            lastModified: response.submitted_at,
          }));
          setSubmissions(formattedSubmissions);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, [user]);

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

  const getSubjectColor = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'mathematics':
        return 'bg-blue-50 border-l-4 border-blue-500';
      case 'english':
        return 'bg-purple-50 border-l-4 border-purple-500';
      case 'science':
        return 'bg-green-50 border-l-4 border-green-500';
      default:
        return 'bg-gray-50 border-l-4 border-gray-400';
    }
  };

  const getSubjectIconColor = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'mathematics':
        return 'text-blue-600';
      case 'english':
        return 'text-purple-600';
      case 'science':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="w-full px-6 lg:px-12 py-8">
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
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full px-6 lg:px-12 py-12">
          {/* Stats Section - Premium Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {/* Total Submissions Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-2">Total Submissions</p>
                  <p className="text-5xl font-bold text-blue-600">{submissions.length}</p>
                  <p className="text-xs text-gray-500 mt-2">All time</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <BookOpen size={32} className="text-blue-600" />
                </div>
              </div>
            </div>

            {/* Under Review Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-2">Under Review</p>
                  <p className="text-5xl font-bold text-amber-600">
                    {submissions.filter((s) => s.status === 'submitted').length}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Pending feedback</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <TrendingUp size={32} className="text-amber-600" />
                </div>
              </div>
            </div>

            {/* Training Assigned Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-2">Training Assigned</p>
                  <p className="text-5xl font-bold text-emerald-600">1</p>
                  <p className="text-xs text-gray-500 mt-2">Active programs</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <Award size={32} className="text-emerald-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Your Submissions Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Your Submissions</h2>
                <p className="text-gray-600 text-sm mt-1">Manage your classroom challenges</p>
              </div>
            </div>

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
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className={`${getSubjectColor(submission.subject)} rounded-xl p-6 cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-bold text-gray-900">{submission.title}</h3>
                          <Badge type={getStatusBadgeType(submission.status)}>
                            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                          </Badge>
                        </div>
                        <p className={`text-sm font-semibold ${getSubjectIconColor(submission.subject)} mb-4`}>
                          {submission.subject}
                        </p>
                        <div className="flex items-center gap-6 text-xs text-gray-600">
                          {submission.submittedAt && (
                            <div>
                              <span className="font-medium text-gray-700">Submitted:</span>
                              <span className="ml-2">{new Date(submission.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                          )}
                          <div>
                            <span className="font-medium text-gray-700">Last Modified:</span>
                            <span className="ml-2">{new Date(submission.lastModified).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/teacher/submission/${submission.id}`)}
                        className="ml-6 p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-sm hover:shadow-md"
                      >
                        <Pencil size={20} className="text-gray-700" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Training Programs Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Assigned Training Programs</h2>
                <p className="text-gray-600 text-sm mt-1">Curated programs for your development</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <BookOpen className="text-blue-600" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Mathematics Problem-Solving Strategies</h3>
                  </div>
                  <p className="text-gray-600 mt-4 leading-relaxed">
                    A targeted 6-week program designed for teachers struggling with student engagement in problem-solving.
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-600 mt-6 pt-6 border-t border-gray-200">
                    <div>
                      <span className="font-semibold text-gray-900">Start Date:</span>
                      <span className="ml-2">Jan 20, 2024</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">•</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Duration:</span>
                      <span className="ml-2">6 weeks</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="primary" 
                  onClick={() => navigate('/teacher/training/1')}
                  className="whitespace-nowrap mt-4"
                >
                  View Program
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-900">Program Progress</span>
                  <span className="text-sm font-bold text-blue-600">42%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-[42%] bg-blue-600 rounded-full transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
