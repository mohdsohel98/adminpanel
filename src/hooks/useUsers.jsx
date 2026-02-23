import { useState, useMemo } from 'react';
import { seedUsers, seedWithdrawals } from '../data/dummyData'; 

export const useUsers = () => {
  const [users, setUsers] = useState(seedUsers);
  const [withdrawals, setWithdrawals] = useState(seedWithdrawals);
  const [transactions, setTransactions] = useState([]);

  // Memoized Stats for the StatCards
  const stats = useMemo(() => ({
    totalUsers: users.length,
    totalDeposits: users.reduce((acc, u) => acc + u.totalDeposit, 0),
    totalWithdrawn: users.reduce((acc, u) => acc + u.totalWithdrawal, 0),
    platinum: users.filter(u => u.rank === 'Platinum').length,
  }), [users]);

  // User Actions
  const addUser = (newUser) => setUsers(prev => [...prev, { ...newUser, id: `USR-${Date.now()}` }]);
  const deleteUser = (id) => setUsers(prev => prev.filter(u => u.id !== id));

  // Withdrawal Actions
  const handleWithdrawalAction = (withdrawal, status) => {
    // 1. Remove from pending
    setWithdrawals(prev => prev.filter(w => w.id !== withdrawal.id));
    
    // 2. Add to transaction table
    const newTransaction = {
      ...withdrawal,
      status, // 'Approved' or 'Rejected'
      processedAt: new Date().toISOString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);

    // 3. If approved, update user's total withdrawal balance
    if (status === 'Approved') {
      setUsers(prev => prev.map(u => 
        u.name === withdrawal.name 
          ? { ...u, totalWithdrawal: u.totalWithdrawal + withdrawal.amount } 
          : u
      ));
    }
  };

  return {
    users,
    withdrawals,
    transactions,
    stats,
    addUser,
    deleteUser,
    handleWithdrawalAction
  };
};