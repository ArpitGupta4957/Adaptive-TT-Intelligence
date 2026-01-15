import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/Layout';
import { PageHeader, Button, Card, Badge } from '../components/ui';
import { ArrowLeft, Clock, Users, BookOpen, CheckCircle } from 'lucide-react';

export const TrainingContentPage: React.FC = () => {
  const navigate = useNavigate();

  const sessions = [
    {
      id: 1,
      title: 'Introduction to Problem-Solving Strategies',
      date: 'Jan 20, 2024',
      time: '2:00 PM - 4:00 PM',
      status: 'completed',
      materials: ['Session Guide', 'Slides (PDF)', 'Example Problems'],
    },
    {
      id: 2,
      title: 'Classroom Implementation & Student Engagement',
      date: 'Jan 27, 2024',
      time: '2:00 PM - 4:00 PM',
      status: 'upcoming',
      materials: ['Session Guide', 'Activity Templates', 'Discussion Notes'],
    },
    {
      id: 3,
      title: 'Assessment & Feedback Mechanisms',
      date: 'Feb 3, 2024',
      time: '2:00 PM - 4:00 PM',
      status: 'upcoming',
      materials: ['Rubrics', 'Sample Assessments', 'Marking Guide'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/teacher-dashboard')}
          className="flex items-center gap-2 text-primary-600 font-medium mb-8 hover:text-primary-700"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="mb-8">
          <PageHeader
            title="Mathematics Problem-Solving Strategies"
            subtitle="A 6-week targeted training program designed for you"
          />

          <Card className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-gray-600 text-sm mb-1">Start Date</p>
                <p className="font-semibold text-gray-900">Jan 20, 2024</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Duration</p>
                <p className="font-semibold text-gray-900">6 Weeks</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Format</p>
                <p className="font-semibold text-gray-900">In-person Weekly</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Facilitator</p>
                <p className="font-semibold text-gray-900">Dr. Sharma</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Overview</h2>
          <Card>
            <p className="text-gray-700 mb-4">
              This program addresses the specific challenges you shared in your needs assessment. It focuses on practical,
              classroom-tested strategies for improving student problem-solving skills.
            </p>
            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-3">
                <BookOpen size={20} className="text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Experiential Learning</h4>
                  <p className="text-gray-600 text-sm">Hands-on activities and real classroom scenarios</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users size={20} className="text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Peer Learning</h4>
                  <p className="text-gray-600 text-sm">Learn from other teachers in the same cohort</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-primary-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Implementation Support</h4>
                  <p className="text-gray-600 text-sm">Guidance and resources for classroom application</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sessions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Training Sessions</h2>
          <div className="space-y-4">
            {sessions.map((session) => (
              <Card key={session.id}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
                      <Badge type={session.status === 'completed' ? 'success' : 'info'}>
                        {session.status === 'completed' ? 'Completed' : 'Upcoming'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        {session.date} at {session.time}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-gray-700 mb-2">Training Materials:</p>
                  <div className="flex flex-wrap gap-2">
                    {session.materials.map((material, idx) => (
                      <Button key={idx} variant="secondary" size="sm">
                        📄 {material}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Next Step */}
        <Card className="bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-3">Next Steps</h3>
          <p className="text-gray-700 mb-4">
            Mark your calendar for the first session on January 20. Please come prepared with examples from your classroom
            where you'd like to improve student problem-solving.
          </p>
          <Button variant="primary" onClick={() => navigate('/teacher-dashboard')}>
            ✓ Got It - Back to Dashboard
          </Button>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
