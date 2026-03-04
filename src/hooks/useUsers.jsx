import { useState, useMemo, useEffect, useCallback } from 'react';
import { userService } from '../services/userService';
import { withdrawalService } from '../services/withdrawalService';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Fetch all users on mount
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWithdrawals = useCallback(async () => {
    try {
      const data = await withdrawalService.getAll({ status: 'PENDING' });
      setWithdrawals(data);
    } catch (err) {
      console.error('Failed to fetch withdrawals:', err.message);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchWithdrawals();
  }, [fetchUsers, fetchWithdrawals]);

  // Memoized Stats for the StatCards
  const stats = useMemo(() => ({
    totalUsers: users.length,
    totalDeposits: users.reduce((acc, u) => acc + (u.totalDeposit || 0), 0),
    totalWithdrawn: users.reduce((acc, u) => acc + (u.totalWithdrawal || 0), 0),
    platinum: users.filter(u => u.rank === 'Platinum').length,
  }), [users]);

  // Update user via API (name + phone)
  const updateUser = async (userId, data) => {
    const updated = await userService.update(userId, data);
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updated } : u));
    return updated;
  };

  // Delete user locally (no delete endpoint provided)
  const deleteUser = (id) => setUsers(prev => prev.filter(u => u.id !== id));

  // Withdrawal Actions
  const handleWithdrawalAction = async (withdrawal, status) => {
    try {
      if (status === 'Cancelled') {
        await withdrawalService.cancel(withdrawal.id);
      }
      setWithdrawals(prev => prev.filter(w => w.id !== withdrawal.id));
      const newTransaction = {
        ...withdrawal,
        status,
        processedAt: new Date().toISOString(),
      };
      setTransactions(prev => [newTransaction, ...prev]);
    } catch (err) {
      console.error('Withdrawal action failed:', err.message);
    }
  };

  return {
    users,
    loading,
    error,
    withdrawals,
    transactions,
    stats,
    updateUser,
    deleteUser,
    handleWithdrawalAction,
    refetchUsers: fetchUsers,
  };
};
