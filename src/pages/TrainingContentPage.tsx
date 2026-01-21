import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/Layout';
import { Button, Badge } from '../components/ui';
import { ArrowLeft, Clock, Users, BookOpen, CheckCircle, Award, CalendarDays, User, Video, Download } from 'lucide-react';

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
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 w-full">
        {/* Back Button & Hero */}
        <div className="bg-white border-b border-gray-200">
          <div className="w-full px-6 lg:px-12 py-6">
            <button
              onClick={() => navigate('/teacher-dashboard')}
              className="flex items-center gap-2 text-blue-600 font-medium mb-6 hover:text-blue-700 transition"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>

            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Mathematics Problem-Solving Strategies</h1>
              <p className="text-lg text-gray-600">A 6-week targeted training program designed for you</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full px-6 lg:px-12 py-12">
          {/* Program Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <CalendarDays className="text-blue-600" size={24} />
                </div>
                <span className="text-gray-600 text-sm font-medium">Start Date</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">Jan 20, 2024</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <Clock className="text-purple-600" size={24} />
                </div>
                <span className="text-gray-600 text-sm font-medium">Duration</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">6 Weeks</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <Video className="text-green-600" size={24} />
                </div>
                <span className="text-gray-600 text-sm font-medium">Format</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">In-person Weekly</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-orange-50 p-3 rounded-lg">
                  <User className="text-orange-600" size={24} />
                </div>
                <span className="text-gray-600 text-sm font-medium">Facilitator</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">Dr. Sharma</p>
            </div>
          </div>

          {/* Program Overview */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Program Overview</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                This program addresses the specific challenges you shared in your needs assessment. It focuses on practical,
                classroom-tested strategies for improving student problem-solving skills.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-lg flex-shrink-0">
                      <BookOpen className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Experiential Learning</h4>
                      <p className="text-gray-700 text-sm">Hands-on activities and real classroom scenarios</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-lg flex-shrink-0">
                      <Users className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Peer Learning</h4>
                      <p className="text-gray-700 text-sm">Learn from other teachers in the same cohort</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-lg flex-shrink-0">
                      <CheckCircle className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Implementation Support</h4>
                      <p className="text-gray-700 text-sm">Guidance and resources for classroom application</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Training Sessions */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Training Sessions</h2>
            <div className="space-y-6">
              {sessions.map((session, idx) => (
                <div key={session.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Status Bar */}
                  <div className={`h-1 w-full ${session.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-block w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-900">
                            {idx + 1}
                          </span>
                          <h3 className="text-2xl font-bold text-gray-900">{session.title}</h3>
                          <Badge type={session.status === 'completed' ? 'success' : 'info'}>
                            {session.status === 'completed' ? '✓ Completed' : 'Upcoming'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={18} className="text-blue-600" />
                        <span className="font-medium">{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-purple-600" />
                        <span className="font-medium">{session.time}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Training Materials</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {session.materials.map((material, matIdx) => (
                          <button
                            key={matIdx}
                            className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
                          >
                            <Download size={18} className="text-gray-600 flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-900">{material}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                <Award className="text-blue-600" size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Next Steps</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Mark your calendar for the first session on January 20. Please come prepared with examples from your classroom
                  where you'd like to improve student problem-solving.
                </p>
                <div className="flex gap-4">
                  <Button variant="primary" onClick={() => navigate('/teacher-dashboard')}>
                    ✓ Back to Dashboard
                  </Button>
                  <Button variant="secondary">
                    Add to Calendar
                  </Button>
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
