import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/Layout';
import { Button } from '../components/ui';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const TrainingPublishedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Training Program Published!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Your customized training program has been successfully published and teachers will be notified.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Program Summary:</h3>
            <div className="space-y-3 text-gray-700">
              <p><strong>Program:</strong> Mathematics Problem-Solving Strategies</p>
              <p><strong>Target Teachers:</strong> 12 teachers</p>
              <p><strong>Duration:</strong> 6 weeks (6 sessions × 2 hours)</p>
              <p><strong>Status:</strong> <span className="text-green-700 font-semibold">Published & Live</span></p>
              <p><strong>Next Step:</strong> Teachers will receive invitations within 24 hours</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary-600">1.</span>
                <span>Selected teachers receive email invitations with program details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary-600">2.</span>
                <span>Teachers register and confirm their participation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary-600">3.</span>
                <span>Training sessions begin on the scheduled start date</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-primary-600">4.</span>
                <span>You track attendance, collect feedback, and monitor outcomes</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              onClick={() => navigate('/diet-dashboard')}
            >
              Back to Dashboard
            </Button>
            <Button
              variant="primary"
              onClick={() => navigate('/diet/training-insights')}
            >
              View Program Insights
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
