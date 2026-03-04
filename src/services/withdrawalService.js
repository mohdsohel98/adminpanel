const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const getToken = () => localStorage.getItem('token');

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

export const withdrawalService = {
  getStats: async () => {
    const res = await fetch(`${BASE_URL}/api/withdrawals/stats`, {
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch withdrawal stats');
    return res.json();
  },

  getAll: async ({ type, status } = {}) => {
    const params = new URLSearchParams();
    if (type) params.set('type', type);
    if (status) params.set('status', status);
    const query = params.toString() ? `?${params}` : '';
    const res = await fetch(`${BASE_URL}/api/withdrawals${query}`, {
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch withdrawals');
    return res.json();
  },

  getById: async (withdrawalId) => {
    const res = await fetch(`${BASE_URL}/api/withdrawals/${withdrawalId}`, {
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch withdrawal');
    return res.json();
  },

  cancel: async (withdrawalId) => {
    const res = await fetch(`${BASE_URL}/api/withdrawals/${withdrawalId}/cancel`, {
      method: 'POST',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to cancel withdrawal');
    return res.json();
  },

  processPrincipal: async () => {
    const res = await fetch(`${BASE_URL}/api/withdrawals/process-principal`, {
      method: 'POST',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to process principal withdrawal');
    return res.json();
  },
};
