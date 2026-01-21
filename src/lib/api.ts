import { createClient } from '@supabase/supabase-js';
import type { User } from '../types';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// AUTHENTICATION APIs
// ============================================

export const authApi = {
  // Sign up with email and password
  signUp: async (email: string, password: string, fullName: string, role: string) => {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
          },
        },
      });

      if (authError) throw authError;

      // Create user profile in users table
      if (authData.user) {
        const { error: profileError } = await supabase.from('users').insert([
          {
            user_id: authData.user.id,
            full_name: fullName,
            email,
            password_hash: password, // In production, never store plain passwords
            role,
            state: 'TBD',
            district: 'TBD',
          },
        ]);

        if (profileError) throw profileError;
      }

      return { data: authData, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Fetch user profile
      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .single();

        if (userError) throw userError;

        return { data: { ...data, user: userData }, error: null };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    try {
      // Ensure we have the required environment variables
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase configuration missing. Please check your environment variables.');
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('Google OAuth error:', error);
        throw error;
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('Google sign in failed:', error.message);
      
      // Provide helpful error message
      if (error.message?.includes('Unsupported provider')) {
        throw new Error(
          'Google OAuth is not enabled in your Supabase project. ' +
          'Please enable it in your Supabase dashboard under Authentication → Providers → Google. ' +
          'See GOOGLE_OAUTH_SETUP.md for detailed instructions.'
        );
      }
      
      throw error;
    }
  },

  // Sign out
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;

      if (user) {
        // Fetch user profile from users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (userError) throw userError;

        return { data: userData, error: null };
      }

      return { data: null, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};

// ============================================
// USERS APIs
// ============================================

export const usersApi = {
  // Get user by ID
  getUserById: async (userId: number) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get user with school details
  getUserWithSchool: async (userId: number) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*, schools(*)')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update user profile
  updateUser: async (userId: number, updates: Partial<User>) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('user_id', userId)
        .select();

      if (error) throw error;
      return { data: data?.[0], error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};

// ============================================
// SCHOOLS APIs
// ============================================

export const schoolsApi = {
  // Get school by ID
  getSchoolById: async (schoolId: number) => {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('school_id', schoolId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get schools by district
  getSchoolsByDistrict: async (district: string) => {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('district', district);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get schools by state
  getSchoolsByState: async (state: string) => {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('state', state);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};

// ============================================
// TEACHER RESPONSES / CLASSROOM NEEDS APIs
// ============================================

export const teacherResponsesApi = {
  // Create teacher response (submit classroom need)
  createResponse: async (teacherId: number, responses: any) => {
    try {
      const { data, error } = await supabase
        .from('teacher_responses')
        .insert([
          {
            teacher_id: teacherId,
            responses,
            submitted_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;
      return { data: data?.[0], error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get teacher responses
  getTeacherResponses: async (teacherId: number) => {
    try {
      const { data, error } = await supabase
        .from('teacher_responses')
        .select('*')
        .eq('teacher_id', teacherId)
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get all responses by district
  getResponsesByDistrict: async (district: string) => {
    try {
      const { data, error } = await supabase
        .from('teacher_responses')
        .select('*, users(district)')
        .eq('users.district', district);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};

// ============================================
// PROBLEM CLUSTERS APIs
// ============================================

export const problemClustersApi = {
  // Get clusters by district
  getClustersByDistrict: async (district: string) => {
    try {
      const { data, error } = await supabase
        .from('problem_clusters')
        .select('*')
        .eq('district', district)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get cluster by ID
  getClusterById: async (clusterId: number) => {
    try {
      const { data, error } = await supabase
        .from('problem_clusters')
        .select('*')
        .eq('cluster_id', clusterId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Create problem cluster
  createCluster: async (clusterData: any) => {
    try {
      const { data, error } = await supabase
        .from('problem_clusters')
        .insert([clusterData])
        .select();

      if (error) throw error;
      return { data: data?.[0], error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update cluster
  updateCluster: async (clusterId: number, updates: any) => {
    try {
      const { data, error } = await supabase
        .from('problem_clusters')
        .update(updates)
        .eq('cluster_id', clusterId)
        .select();

      if (error) throw error;
      return { data: data?.[0], error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};

// ============================================
// QUESTIONS APIs
// ============================================

export const questionsApi = {
  // Get all questions
  getAllQuestions: async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .order('question_id');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get questions by category
  getQuestionsByCategory: async (category: string) => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('category', category);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get feedback questions
  getFeedbackQuestions: async () => {
    try {
      const { data, error } = await supabase
        .from('feedback_questions')
        .select('*')
        .order('question_id');

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};

// ============================================
// TRAINING MATERIALS APIs
// ============================================

export const trainingMaterialsApi = {
  // Get materials by user
  getMaterialsByUser: async (userId: number) => {
    try {
      const { data, error } = await supabase
        .from('training_materials')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Create training material
  createMaterial: async (materialData: any) => {
    try {
      const { data, error } = await supabase
        .from('training_materials')
        .insert([materialData])
        .select();

      if (error) throw error;
      return { data: data?.[0], error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get generic materials
  getGenericMaterials: async () => {
    try {
      const { data, error } = await supabase
        .from('generic_material_chunks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const apiHelpers = {
  // Get user dashboard data (Teacher)
  getTeacherDashboard: async (userId: number) => {
    try {
      // Get user info
      const userRes = await usersApi.getUserWithSchool(userId);
      if (userRes.error) throw userRes.error;

      const user = userRes.data;

      // Get teacher responses
      const responsesRes = await teacherResponsesApi.getTeacherResponses(userId);
      const responses = responsesRes.data || [];

      return {
        data: {
          user,
          submissions: responses,
          submissionCount: responses.length,
        },
        error: null,
      };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get DIET dashboard data
  getDIETDashboard: async (district: string, _state: string) => {
    try {
      // Get clusters
      const clustersRes = await problemClustersApi.getClustersByDistrict(district);
      const clusters = clustersRes.data || [];

      // Get teacher count
      const { data: teachers, error: teachersError } = await supabase
        .from('users')
        .select('user_id')
        .eq('district', district)
        .eq('role', 'teacher');

      if (teachersError) throw teachersError;

      return {
        data: {
          clusters,
          teacherCount: teachers?.length || 0,
          clusterCount: clusters.length,
        },
        error: null,
      };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Fetch data with error handling
  handleApiError: (error: any) => {
    console.error('API Error:', error);
    return {
      message: error?.message || 'An error occurred',
      code: error?.code || 'UNKNOWN_ERROR',
    };
  },
};

export default {
  authApi,
  usersApi,
  schoolsApi,
  teacherResponsesApi,
  problemClustersApi,
  questionsApi,
  trainingMaterialsApi,
  apiHelpers,
  supabase,
};
