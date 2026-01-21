import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/api';
import { LoadingSpinner } from '../components/ui';

export const AuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from the URL hash (OAuth callback)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Session error:', sessionError);
          setError('Failed to complete sign in');
          setTimeout(() => navigate('/login', { replace: true }), 2000);
          return;
        }

        if (session) {
          // Session exists, redirect to dashboard
          navigate('/teacher-dashboard', { replace: true });
        } else {
          // No session, redirect to login
          setTimeout(() => navigate('/login', { replace: true }), 1000);
        }
      } catch (err) {
        console.error('Callback error:', err);
        setError('An error occurred during sign in');
        setTimeout(() => navigate('/login', { replace: true }), 2000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">
          {error || 'Completing sign in...'}
        </p>
      </div>
    </div>
  );
};
