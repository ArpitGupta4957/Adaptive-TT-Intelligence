// Supabase Configuration for Vite
// These values come from your Supabase project settings

export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key',
};

// Note: Supabase client is now initialized in src/lib/api.ts
// All API calls should use functions from src/lib/api.ts
