import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/Layout';
import { PageHeader, Button, FormField, Card, Alert } from '../components/ui';
import { ArrowLeft } from 'lucide-react';

export const DesignTrainingPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    programName: 'Mathematics Problem-Solving Strategies',
    description: '',
    duration: '6',
    frequency: 'weekly',
    sessionCount: '6',
    sessionDuration: '2',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/diet/training-published');
    }, 1500);
  };

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
          title="Design Training Program"
          subtitle="Create a customized training program based on approved AI recommendations and teacher needs"
        />

        <Alert
          type="info"
          message="Design a practical, implementable training program that addresses the approved recommendations. Teachers will be notified once the program is published."
        />

        <Card className="mt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField label="Program Name" required>
              <input
                type="text"
                name="programName"
                value={formData.programName}
                onChange={handleChange}
                placeholder="e.g., Mathematics Problem-Solving Strategies"
                className="input-field"
                required
              />
            </FormField>

            <FormField label="Program Description" required>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed description of the training program, its objectives, and expected outcomes..."
                rows={5}
                className="input-field"
                required
              />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Program Duration (Weeks)" required>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </FormField>

              <FormField label="Frequency" required>
                <select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Number of Sessions" required>
                <input
                  type="number"
                  name="sessionCount"
                  value={formData.sessionCount}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </FormField>

              <FormField label="Session Duration (Hours)" required>
                <input
                  type="number"
                  name="sessionDuration"
                  value={formData.sessionDuration}
                  onChange={handleChange}
                  step="0.5"
                  className="input-field"
                  required
                />
              </FormField>
            </div>

            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3">Program Specifications:</h4>
              <ul className="space-y-2 text-green-800 text-sm">
                <li>• <strong>Total Training Hours:</strong> {parseInt(formData.sessionCount) * parseFloat(formData.sessionDuration)} hours</li>
                <li>• <strong>Target Teachers:</strong> 12 teachers from Mathematics cohort</li>
                <li>• <strong>Facilitator:</strong> To be assigned by DIET</li>
                <li>• <strong>Start Date:</strong> To be confirmed (typically 2-3 weeks from approval)</li>
              </ul>
            </div>

            <div className="pt-6 border-t flex gap-4">
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" loading={loading}>
                Create & Publish Program
              </Button>
            </div>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
