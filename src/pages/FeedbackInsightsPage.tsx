import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/Layout';
import { PageHeader, Card, Badge } from '../components/ui';
import { TrendingUp, Users, Award, MessageSquare } from 'lucide-react';

export const FeedbackInsightsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="Training Feedback & Insights"
          subtitle="Analytics from completed training programs"
        />

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="text-center">
              <Users size={32} className="text-primary-600 mx-auto mb-3" />
              <p className="text-gray-600 text-sm mb-2">Teachers Trained</p>
              <p className="text-4xl font-bold text-primary-600">47</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <Award size={32} className="text-green-600 mx-auto mb-3" />
              <p className="text-gray-600 text-sm mb-2">Avg. Satisfaction</p>
              <p className="text-4xl font-bold text-green-600">4.3/5</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <TrendingUp size={32} className="text-orange-600 mx-auto mb-3" />
              <p className="text-gray-600 text-sm mb-2">Classroom Impact</p>
              <p className="text-4xl font-bold text-orange-600">73%</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <MessageSquare size={32} className="text-blue-600 mx-auto mb-3" />
              <p className="text-gray-600 text-sm mb-2">Feedback Submitted</p>
              <p className="text-4xl font-bold text-blue-600">38</p>
            </div>
          </Card>
        </div>

        {/* Program Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Overall Ratings</h3>
            <div className="space-y-4">
              {[
                { label: 'Excellent (5)', count: 18, percentage: 47 },
                { label: 'Good (4)', count: 14, percentage: 37 },
                { label: 'Average (3)', count: 5, percentage: 13 },
                { label: 'Below Average', count: 1, percentage: 3 },
              ].map((rating, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">{rating.label}</span>
                    <span className="font-semibold text-gray-900">{rating.count} teachers</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${rating.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-6">Classroom Application</h3>
            <div className="space-y-4">
              {[
                { practice: 'Using new problem-solving approach', adoption: 89 },
                { practice: 'Implementing peer learning', adoption: 76 },
                { practice: 'Modified assessment methods', adoption: 68 },
                { practice: 'Sharing with colleagues', adoption: 55 },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700">{item.practice}</span>
                    <span className="font-semibold text-green-600">{item.adoption}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${item.adoption}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Key Themes */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Key Themes from Feedback</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Practical Activities', feedback: '✓ Teachers appreciated hands-on exercises', count: 34 },
              {
                title: 'Peer Collaboration',
                feedback: '✓ Learning from colleagues in same cohort was valuable',
                count: 29,
              },
              { title: 'Time Constraints', feedback: '⚠ Some felt sessions were too compressed', count: 12 },
              { title: 'Resource Materials', feedback: '✓ Templates and guides are reusable', count: 31 },
              { title: 'Facilitator Support', feedback: '✓ Good balance of guidance and independence', count: 27 },
              { title: 'Follow-up Support', feedback: '⚠ Some want continued mentoring after program', count: 15 },
            ].map((theme, idx) => (
              <Card key={idx}>
                <h4 className="font-semibold text-gray-900 mb-2">{theme.title}</h4>
                <p className="text-sm text-gray-700 mb-3">{theme.feedback}</p>
                <Badge type="info">{theme.count} mentioned this</Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Evidence & Impact */}
        <Card className="bg-green-50 border-green-200 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Documented Impact</h3>
          <div className="space-y-3 text-gray-700">
            <p className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-lg">✓</span>
              <span>
                <strong>38 teachers</strong> submitted specific evidence of classroom implementation (lesson plans,
                assessments, student work samples)
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-lg">✓</span>
              <span>
                <strong>Average student engagement increase: 34%</strong> as reported by teachers in their feedback
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-lg">✓</span>
              <span>
                <strong>17 teachers</strong> reported improved student performance in problem-solving assessments
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-green-600 font-bold text-lg">✓</span>
              <span>
                <strong>School leaders</strong> noted positive feedback from colleagues about teaching improvements
              </span>
            </p>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="bg-blue-50 border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recommendations for Next Programs</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>1. Extended Timeline:</strong> Consider 8-week programs to reduce pacing concerns noted by some
              teachers
            </li>
            <li>
              <strong>2. Ongoing Mentoring:</strong> Establish 3-month post-training support group for application
              troubleshooting
            </li>
            <li>
              <strong>3. Peer Learning Network:</strong> Create online community for teachers across cohorts to share
              practices
            </li>
            <li>
              <strong>4. Differentiated Content:</strong> Offer advanced track for experienced teachers to deepen expertise
            </li>
            <li>
              <strong>5. School Leader Involvement:</strong> Include principals in program to enhance institutional support
            </li>
          </ul>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
