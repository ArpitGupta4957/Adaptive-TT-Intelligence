import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header, Footer } from '../components/Layout';
import { PageHeader, Button, Card } from '../components/ui';
import { ArrowLeft, Users, TrendingUp, Brain } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  school: string;
  subject: string;
  grade: string;
  need: string;
}

export const CohortDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { cohortId } = useParams();

  const [teachers] = useState<Teacher[]>([
    {
      id: '1',
      name: 'Priya Singh',
      school: 'Government High School, Delhi',
      subject: 'Mathematics',
      grade: '9-10',
      need: 'Student engagement in problem-solving',
    },
    {
      id: '2',
      name: 'Raj Kumar',
      school: 'Central Public School, Delhi',
      subject: 'Mathematics',
      grade: '8-9',
      need: 'Conceptual understanding vs rote learning',
    },
    {
      id: '3',
      name: 'Meera Patel',
      school: 'State School, Delhi',
      subject: 'Mathematics',
      grade: '9-10',
      need: 'Assessment strategies for problem-solving',
    },
  ]);

  const commonThemes = [
    { theme: 'Student Engagement', frequency: 12, percentage: 100 },
    { theme: 'Practical Application', frequency: 10, percentage: 83 },
    { theme: 'Assessment Methods', frequency: 8, percentage: 67 },
    { theme: 'Collaborative Learning', frequency: 7, percentage: 58 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/diet-dashboard')}
          className="flex items-center gap-2 text-primary-600 font-medium mb-8 hover:text-primary-700"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <PageHeader
          title="Mathematics Problem-Solving Group"
          subtitle="Analysis of 12 teachers with similar classroom challenges"
        />

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <Users size={32} className="text-primary-600 mx-auto mb-3" />
              <p className="text-gray-600 text-sm mb-2">Total Teachers</p>
              <p className="text-4xl font-bold text-primary-600">12</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <TrendingUp size={32} className="text-orange-600 mx-auto mb-3" />
              <p className="text-gray-600 text-sm mb-2">Common Themes</p>
              <p className="text-4xl font-bold text-orange-600">4</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <Brain size={32} className="text-blue-600 mx-auto mb-3" />
              <p className="text-gray-600 text-sm mb-2">AI Confidence</p>
              <p className="text-4xl font-bold text-blue-600">92%</p>
            </div>
          </Card>
        </div>

        {/* Common Themes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Identified Common Themes</h2>
          <Card>
            <div className="space-y-4">
              {commonThemes.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{item.theme}</span>
                    <span className="text-sm text-gray-600">{item.frequency} teachers</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{item.percentage}% of cohort</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Teachers in Cohort */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Teachers in This Cohort</h2>
          <div className="space-y-4">
            {teachers.map((teacher) => (
              <Card key={teacher.id}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{teacher.name}</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <span>📍 {teacher.school}</span>
                      <span>📚 {teacher.subject}</span>
                      <span>📊 Grade {teacher.grade}</span>
                      <span></span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <p className="text-sm text-blue-900">
                        <strong>Shared Need:</strong> {teacher.need}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Actions */}
        <Card className="bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-4">Ready to Design Training?</h3>
          <p className="text-gray-700 mb-6">
            This cohort is well-defined with clear common themes. Review AI recommendations to design a targeted training
            program.
          </p>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => navigate('/diet-dashboard')}>
              Back
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate(`/diet/recommendations/${cohortId}`)}
            >
              View AI Recommendations
            </Button>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
