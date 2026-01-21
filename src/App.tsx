import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { LoginPage } from './pages/LoginPage';
import { AuthCallbackPage } from './pages/AuthCallbackPage';
import { DashboardRedirect } from './pages/DashboardRedirect';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { SubmitNeedPage } from './pages/SubmitNeedPage';
import { TrainingContentPage } from './pages/TrainingContentPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { DIETDashboard } from './pages/DIETDashboard';
import { CohortDetailPage } from './pages/CohortDetailPage';
import { AIRecommendationsPage } from './pages/AIRecommendationsPage';
import { DesignTrainingPage } from './pages/DesignTrainingPage';
import { TrainingPublishedPage } from './pages/TrainingPublishedPage';
import { FeedbackInsightsPage } from './pages/FeedbackInsightsPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />

          {/* Teacher Routes */}
          <Route
            path="/teacher-dashboard"
            element={
              <ProtectedRoute>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/submit-need"
            element={
              <ProtectedRoute>
                <SubmitNeedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/training/:id"
            element={
              <ProtectedRoute>
                <TrainingContentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/feedback"
            element={
              <ProtectedRoute>
                <FeedbackPage />
              </ProtectedRoute>
            }
          />

          {/* DIET Routes */}
          <Route
            path="/diet-dashboard"
            element={
              <ProtectedRoute>
                <DIETDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diet/cohort/:cohortId"
            element={
              <ProtectedRoute>
                <CohortDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diet/recommendations/:cohortId"
            element={
              <ProtectedRoute>
                <AIRecommendationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diet/design-training/:cohortId"
            element={
              <ProtectedRoute>
                <DesignTrainingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diet/training-published"
            element={
              <ProtectedRoute>
                <TrainingPublishedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diet/training-insights"
            element={
              <ProtectedRoute>
                <FeedbackInsightsPage />
              </ProtectedRoute>
            }
          />

          {/* Root Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/dashboard" element={<DashboardRedirect />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
