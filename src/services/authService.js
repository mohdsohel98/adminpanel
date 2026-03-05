const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// token helpers
export const getToken = () => localStorage.getItem('token');

// role support removed temporarily until backend returns it
export const getRole = () => null;

export const authService = {
  login: async (email, password) => {
    // backend routes are namespaced under /api
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // the server expects email/password rather than username
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Login failed');
    }
    const data = await res.json();
    // expected to return { token: '...' }
    localStorage.setItem('token', data.token);
    // role handling disabled for now
    // if (data.role) localStorage.setItem('role', data.role);
    return data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  },
  isAuthenticated: () => !!getToken(),
};
