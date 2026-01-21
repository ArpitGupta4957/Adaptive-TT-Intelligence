import React, { createContext, useState, useContext, useEffect } from 'react';
import type { User, AuthContextType } from '../types';
import { authApi } from '../lib/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const result = await authApi.getCurrentUser();
        if (result.data) {
          setUser({
            id: result.data.user_id?.toString() || '',
            email: result.data.email || '',
            name: result.data.full_name || '',
            role: (result.data.role as 'teacher' | 'diet') || 'teacher',
            districtId: result.data.district || '',
            schoolName: result.data.school_name || '',
            schoolCode: result.data.school_id?.toString() || '',
            createdAt: result.data.created_at || '',
          });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const result = await authApi.signIn(email, password);
      if (result.error) throw result.error;

      if (result.data && result.data.user) {
        const userData = result.data.user;
        const user: User = {
          id: userData.user_id?.toString() || '',
          email: userData.email,
          name: userData.full_name,
          role: userData.role as 'teacher' | 'diet',
          districtId: userData.district,
          schoolName: userData.school_name,
          schoolCode: userData.school_id?.toString(),
          createdAt: userData.created_at,
        };
        setUser(user);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await authApi.signInWithGoogle();
      if (result.error) throw result.error;
      // Note: Google sign-in will redirect, so additional logic may be needed
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const result = await authApi.signOut();
      if (result.error) throw result.error;
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signInWithGoogle,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
