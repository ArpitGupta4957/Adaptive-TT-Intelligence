import React, { createContext, useState, useContext, useEffect } from 'react';
import type { User, AuthContextType } from '../types';
import { tokenStorage, sessionStorage } from '../lib/supabase';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = sessionStorage.getUser();
    const token = tokenStorage.getToken();
    
    if (storedUser && token) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      // Mock Google OAuth login
      // In production, integrate with Supabase Auth
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: 'teacher@example.com',
        name: 'Sample Teacher',
        role: 'teacher',
        districtId: 'DT001',
        schoolName: 'Government High School',
        schoolCode: 'GHS001',
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMzQ1IiwiZW1haWwiOiJ0ZWFjaGVyQGV4YW1wbGUuY29tIiwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE2MzI5NDUwMDB9.signature';

      tokenStorage.setToken(mockToken);
      sessionStorage.setUser(mockUser);
      setUser(mockUser);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, _password: string) => {
    try {
      setLoading(true);
      // Mock email/password login
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        role: email.includes('diet') ? 'diet' : 'teacher',
        districtId: 'DT001',
        createdAt: new Date().toISOString(),
      };

      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.token';
      tokenStorage.setToken(mockToken);
      sessionStorage.setUser(mockUser);
      setUser(mockUser);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      tokenStorage.clearToken();
      sessionStorage.clearUser();
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
