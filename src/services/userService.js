const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const getToken = () => localStorage.getItem('token');

export const userService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/api/users`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  getById: async (userId) => {
    const res = await fetch(`${BASE_URL}/api/users/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  },

  update: async (userId, data) => {
    const res = await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  },
};
