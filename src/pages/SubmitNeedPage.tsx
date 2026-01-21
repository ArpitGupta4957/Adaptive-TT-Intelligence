import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '../components/Layout';
import { Button } from '../components/ui';
import { ArrowLeft, Check, Lightbulb, Users, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { teacherResponsesApi } from '../lib/api';

export const SubmitNeedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    gradeLevel: '',
    studentCount: '',
    challenge: '',
    context: '',
    constraints: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      // Save to database
      const response = await teacherResponsesApi.createResponse(parseInt(user.id), {
        title: formData.title,
        subject: formData.subject,
        gradeLevel: formData.gradeLevel,
        studentCount: parseInt(formData.studentCount),
        challenge: formData.challenge,
        context: formData.context,
        constraints: formData.constraints,
        status: 'submitted',
      });

      if (response.error) {
        throw response.error;
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit need. Please try again.');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />

        <main className="flex-1 w-full">
          <div className="w-full px-6 lg:px-12 py-16 flex items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-3xl text-center">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check size={56} className="text-emerald-600" strokeWidth={1.5} />
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Need Submitted Successfully! 🎉</h2>
              <p className="text-gray-600 mb-12 text-lg leading-relaxed">
                Your classroom need has been received and is now in the queue for review. DIET officials will carefully analyze 
                your submission and design a customized training program based on your specific requirements.
              </p>

              {/* What happens next */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8 mb-12 text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Lightbulb className="text-blue-600" size={28} />
                  What Happens Next?
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">DIET officials review your submission</p>
                      <p className="text-gray-600 text-sm">Your submission will be analyzed along with other teachers in your district</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">AI clustering & analysis</p>
                      <p className="text-gray-600 text-sm">AI recommends clustering of similar needs for efficient training design</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Training program designed</p>
                      <p className="text-gray-600 text-sm">DIET approves and publishes a customized training program</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Training invitation sent</p>
                      <p className="text-gray-600 text-sm">You receive an invitation to attend the training program</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" onClick={() => navigate('/teacher-dashboard')}>
                  Go to Dashboard
                </Button>
                <Button variant="primary" onClick={() => navigate('/teacher/submit-need')}>
                  Submit Another Need
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 w-full">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="w-full px-6 lg:px-12 py-8">
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-blue-600 font-medium mb-6 hover:text-blue-700 transition"
              >
                <ArrowLeft size={20} />
                Back
              </button>

              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Submit Your Classroom Need</h1>
                <p className="text-lg text-gray-600">Help us design training programs that address your real classroom challenges</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full px-6 lg:px-12 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Lightbulb className="text-blue-600" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900">Be Specific</h3>
                </div>
                <p className="text-gray-700 text-sm">The more details you provide, the better we can design your training program</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Users className="text-purple-600" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900">Your Context Matters</h3>
                </div>
                <p className="text-gray-700 text-sm">Understanding your classroom environment helps tailor the solution</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <AlertCircle className="text-emerald-600" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900">Tell Us Constraints</h3>
                </div>
                <p className="text-gray-700 text-sm">We account for your resource limitations in training design</p>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Subject & Grade Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Subject <span className="text-red-500">*</span></label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-medium"
                      required
                    >
                      <option value="">Select subject</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="English">English</option>
                      <option value="Science">Science</option>
                      <option value="Social Studies">Social Studies</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">Grade Level <span className="text-red-500">*</span></label>
                    <select
                      name="gradeLevel"
                      value={formData.gradeLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 font-medium"
                      required
                    >
                      <option value="">Select grade</option>
                      <option value="Primary">Primary (1-5)</option>
                      <option value="Middle">Middle (6-8)</option>
                      <option value="Secondary">Secondary (9-10)</option>
                      <option value="Senior">Senior (11-12)</option>
                    </select>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Title of Your Classroom Challenge <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Students struggle with word problems"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                {/* Student Count */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Number of Students <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    name="studentCount"
                    value={formData.studentCount}
                    onChange={handleChange}
                    placeholder="e.g., 35"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>

                {/* Challenge Description */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">What is the specific challenge? <span className="text-red-500">*</span></label>
                  <p className="text-xs text-gray-600 mb-3">Describe the exact problem your students face. Be specific about learning outcomes affected.</p>
                  <textarea
                    name="challenge"
                    value={formData.challenge}
                    onChange={handleChange}
                    placeholder="Be detailed and specific about the challenge..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 resize-none"
                    required
                  />
                </div>

                {/* Classroom Context */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Classroom Context <span className="text-red-500">*</span></label>
                  <p className="text-xs text-gray-600 mb-3">Describe your classroom environment, student background, and existing teaching methods.</p>
                  <textarea
                    name="context"
                    value={formData.context}
                    onChange={handleChange}
                    placeholder="Tell us about your classroom, students, and current approach..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 resize-none"
                    required
                  />
                </div>

                {/* Constraints */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">Constraints & Limitations <span className="text-red-500">*</span></label>
                  <p className="text-xs text-gray-600 mb-3">What are your constraints? (e.g., limited resources, time, technology, curriculum restrictions)</p>
                  <textarea
                    name="constraints"
                    value={formData.constraints}
                    onChange={handleChange}
                    placeholder="List any constraints or limitations..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 resize-none"
                    required
                  />
                </div>

                {/* Form Actions */}
                <div className="pt-8 border-t border-gray-200 flex gap-4">
                  <Button variant="secondary" onClick={() => navigate(-1)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" loading={loading}>
                    {loading ? 'Submitting...' : 'Submit Need'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
