// Mock Supabase configuration
// In production, replace with real Supabase credentials

export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

// Mock JWT token storage
export const tokenStorage = {
  getToken: () => localStorage.getItem('jwt_token'),
  setToken: (token: string) => localStorage.setItem('jwt_token', token),
  clearToken: () => localStorage.removeItem('jwt_token'),
};

// Mock user session storage
export const sessionStorage = {
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  setUser: (user: any) => localStorage.setItem('user', JSON.stringify(user)),
  clearUser: () => localStorage.removeItem('user'),
};

// Helper to simulate API calls with auth headers
export const createAuthHeaders = () => {
  const token = tokenStorage.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};
