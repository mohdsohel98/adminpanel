import React, { useState } from 'react';
import { useUsers } from './hooks/useUsers';
import { StatCard } from './components/StatCards';
import { ActiveButton } from './components/ActiveButton';
import { UserTableWrapper } from './features/UserTableWrapper';
import { WithdrawTableWrapper } from './features/WithdrawTableWrapper';
import { TransactionTableWrapper } from './features/TransactionTableWrapper';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('User Overview');
  
  // Custom hook containing all the logic you refactored
  const { 
    users, 
    withdrawals, 
    transactions, 
    stats, 
    deleteUser, 
    handleWithdrawalAction 
  } = useUsers();

  const fmt = (n) => new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(n);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Navbar Section */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-sm">A</div>
          <span className="font-black text-lg tracking-tight text-slate-800">AdminPanel</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Super Admin</p>
            <p className="text-xs font-bold text-slate-800">SA</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200" />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-8">
        {/* Title & Date */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-400 text-sm font-medium">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* 1. Stat Cards Feature */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard label="Total Users" value={stats.totalUsers} icon="👤" />
          <StatCard label="Total Deposits" value={fmt(stats.totalDeposits)} icon="💰" colorClass="bg-emerald-50 text-emerald-600" />
          <StatCard label="Total Withdrawn" value={fmt(stats.totalWithdrawn)} icon="📤" colorClass="bg-rose-50 text-rose-600" />
          <StatCard label="Platinum Members" value={stats.platinum} icon="💎" colorClass="bg-cyan-50 text-cyan-600" />
        </div>

        {/* 2. Tab Navigation using ActiveButton component */}
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 w-fit mb-8">
          <ActiveButton 
            label="User Overview" 
            isActive={activeTab === 'User Overview'} 
            onClick={() => setActiveTab('User Overview')} 
          />
          <ActiveButton 
            label="Pending Withdrawals" 
            isActive={activeTab === 'Pending Withdrawals'} 
            onClick={() => setActiveTab('Pending Withdrawals')} 
            count={withdrawals.length}
          />
          <ActiveButton 
            label="Transactions" 
            isActive={activeTab === 'Transactions'} 
            onClick={() => setActiveTab('Transactions')} 
          />
        </div>

        {/* 3. Conditional Feature Rendering */}
        <div className="transition-all duration-300">
          {activeTab === 'User Overview' && (
            <UserTableWrapper users={users} onDelete={deleteUser} />
          )}
          
          {activeTab === 'Pending Withdrawals' && (
            <WithdrawTableWrapper 
              withdrawals={withdrawals} 
              onAction={handleWithdrawalAction} 
            />
          )}

          {activeTab === 'Transactions' && (
            <TransactionTableWrapper transactions={transactions} />
          )}
        </div>
      </main>
    </div>
  );
}