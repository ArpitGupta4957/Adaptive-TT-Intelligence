import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/Layout';
import { PageHeader, Button, Card, Badge, EmptyState } from '../components/ui';
import { Plus, BarChart3, Users, Brain, CheckCircle } from 'lucide-react';

interface Cohort {
  id: string;
  name: string;
  teacherCount: number;
  commonNeeds: string[];
  status: 'analysis' | 'recommendations' | 'approved' | 'published';
  createdAt: string;
}

export const DIETDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [cohorts] = useState<Cohort[]>([
    {
      id: '1',
      name: 'Mathematics Problem-Solving Group',
      teacherCount: 12,
      commonNeeds: ['Problem-solving', 'Student engagement', 'Assessment strategies'],
      status: 'approved',
      createdAt: '2024-01-08',
    },
    {
      id: '2',
      name: 'English Language Development',
      teacherCount: 8,
      commonNeeds: ['Writing skills', 'Comprehension', 'Vocabulary'],
      status: 'recommendations',
      createdAt: '2024-01-10',
    },
    {
      id: '3',
      name: 'Science Practical Implementation',
      teacherCount: 15,
      commonNeeds: ['Lab management', 'Practical skills', 'Safety'],
      status: 'analysis',
      createdAt: '2024-01-12',
    },
  ]);

  const getStatusBadgeType = (status: string): 'success' | 'warning' | 'info' | 'default' => {
    switch (status) {
      case 'published':
        return 'success';
      case 'approved':
        return 'info';
      case 'recommendations':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="DIET Dashboard"
          subtitle="Design and manage need-based training programs with AI insights"
          action={
            <Button variant="primary" onClick={() => navigate('/diet/analyze')}>
              <Plus size={20} />
              New Analysis
            </Button>
          }
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <div className="text-center">
              <BarChart3 size={32} className="text-primary-600 mx-auto mb-3" />
              <p className="text-gray-600 text-sm mb-2">Active Cohorts</p>
              <p className="text-4xl font-bold text-primary-600">{cohorts.length}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <Users size={32} className="text-blue-600 mx-auto mb-3" />
              <p className="text-gray-600 text-sm mb-2">Total Teachers</p>
              <p className="text-4xl font-bold text-blue-600">
                {cohorts.reduce((sum, c) => sum + c.teacherCount, 0)}
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <Brain size={32} className="text-orange-600 mx-auto mb-3" />
              <p className="text-gray-600 text-sm mb-2">Awaiting Review</p>
              <p className="text-4xl font-bold text-orange-600">
                {cohorts.filter((c) => c.status === 'recommendations').length}
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <CheckCircle size={32} className="text-green-600 mx-auto mb-3" />
              <p className="text-gray-600 text-sm mb-2">Published Programs</p>
              <p className="text-4xl font-bold text-green-600">
                {cohorts.filter((c) => c.status === 'published').length}
              </p>
            </div>
          </Card>
        </div>

        {/* Cohorts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Teacher Cohorts & Training Programs</h2>

          {cohorts.length === 0 ? (
            <EmptyState
              title="No cohorts yet"
              description="Start by analyzing teacher needs to create cohorts and design training programs."
              action={
                <Button variant="primary" onClick={() => navigate('/diet/analyze')}>
                  <Plus size={20} />
                  Create First Cohort
                </Button>
              }
            />
          ) : (
            <div className="grid gap-4">
              {cohorts.map((cohort) => (
                <Card key={cohort.id} className="cursor-pointer hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">{cohort.name}</h3>
                        <Badge type={getStatusBadgeType(cohort.status)}>
                          {cohort.status.charAt(0).toUpperCase() + cohort.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>{cohort.teacherCount}</strong> teachers with similar needs
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/diet/cohort/${cohort.id}`)}
                    >
                      View Details
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium text-gray-700 mb-2">Common Needs:</p>
                    <div className="flex flex-wrap gap-2">
                      {cohort.commonNeeds.map((need, idx) => (
                        <Badge key={idx} type="info">
                          {need}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
