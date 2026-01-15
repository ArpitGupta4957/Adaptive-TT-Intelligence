import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/Layout';
import { PageHeader, Button, FormField, Card, Alert } from '../components/ui';
import { ArrowLeft, Check } from 'lucide-react';

export const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    overallRating: '',
    contentQuality: '',
    facilitatorEffectiveness: '',
    practicalApplicability: '',
    feedback: '',
    evidence: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You for Your Feedback!</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Your feedback helps us continuously improve training programs for all teachers in the district.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">Your Impact:</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✓ Feedback recorded in your training record</li>
                <li>✓ DIET will review to identify common challenges</li>
                <li>✓ Input shapes future training program design</li>
                <li>✓ Evidence of professional development documented</li>
              </ul>
            </div>

            <Button variant="primary" onClick={() => navigate('/teacher-dashboard')}>
              Back to Dashboard
            </Button>
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
          title="Training Feedback & Evidence"
          subtitle="Share your experience and the impact on your classroom practice"
        />

        <Alert
          type="info"
          message="Your honest feedback helps improve training programs. Please share both what worked well and areas for improvement."
        />

        <Card className="mt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Overall Program Rating" required>
                <select
                  name="overallRating"
                  value={formData.overallRating}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select rating</option>
                  <option value="5">Excellent (5/5)</option>
                  <option value="4">Good (4/5)</option>
                  <option value="3">Average (3/5)</option>
                  <option value="2">Below Average (2/5)</option>
                  <option value="1">Poor (1/5)</option>
                </select>
              </FormField>

              <FormField label="Content Quality" required>
                <select
                  name="contentQuality"
                  value={formData.contentQuality}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select rating</option>
                  <option value="5">Very Relevant</option>
                  <option value="4">Relevant</option>
                  <option value="3">Somewhat Relevant</option>
                  <option value="2">Not Very Relevant</option>
                  <option value="1">Not Relevant</option>
                </select>
              </FormField>

              <FormField label="Facilitator Effectiveness" required>
                <select
                  name="facilitatorEffectiveness"
                  value={formData.facilitatorEffectiveness}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select rating</option>
                  <option value="5">Excellent</option>
                  <option value="4">Good</option>
                  <option value="3">Average</option>
                  <option value="2">Below Average</option>
                  <option value="1">Poor</option>
                </select>
              </FormField>

              <FormField label="Practical Applicability" required>
                <select
                  name="practicalApplicability"
                  value={formData.practicalApplicability}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select rating</option>
                  <option value="5">Highly Applicable</option>
                  <option value="4">Applicable</option>
                  <option value="3">Somewhat Applicable</option>
                  <option value="2">Rarely Applicable</option>
                  <option value="1">Not Applicable</option>
                </select>
              </FormField>
            </div>

            <FormField label="Detailed Feedback" required>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="What did you learn? What will you apply in your classroom? What could be improved?"
                rows={5}
                className="input-field"
                required
              />
            </FormField>

            <FormField label="Evidence of Implementation">
              <textarea
                name="evidence"
                value={formData.evidence}
                onChange={handleChange}
                placeholder="Describe how you've already started implementing what you learned. Include specific examples from your classroom."
                rows={4}
                className="input-field"
              />
            </FormField>

            <div className="pt-6 border-t flex gap-4">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" loading={loading}>
                Submit Feedback
              </Button>
            </div>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
