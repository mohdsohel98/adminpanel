import { useState, useEffect } from 'react';

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const seedUsers = [
  { id: 'USR-001', name: 'Alice Mercer',    totalDeposit: 12400.00, totalWithdrawal: 3200.00, rank: 'Gold'     },
  { id: 'USR-002', name: 'Bob Tanaka',      totalDeposit: 8750.50,  totalWithdrawal: 1500.00, rank: 'Silver'   },
  { id: 'USR-003', name: 'Clara Osei',      totalDeposit: 31000.00, totalWithdrawal: 9800.00, rank: 'Platinum' },
  { id: 'USR-004', name: 'David Ruiz',      totalDeposit: 4200.00,  totalWithdrawal: 900.00,  rank: 'Bronze'   },
  { id: 'USR-005', name: 'Eva Lindqvist',   totalDeposit: 17600.00, totalWithdrawal: 5200.00, rank: 'Gold'     },
  { id: 'USR-006', name: 'Frank Mensah',    totalDeposit: 9900.00,  totalWithdrawal: 2100.00, rank: 'Silver'   },
  { id: 'USR-007', name: 'Grace Kim',       totalDeposit: 54000.00, totalWithdrawal: 18000.00,rank: 'Platinum' },
  { id: 'USR-008', name: 'Hiro Nakamura',   totalDeposit: 6300.00,  totalWithdrawal: 700.00,  rank: 'Bronze'   },
  { id: 'USR-009', name: 'Isla Ferreira',   totalDeposit: 22100.00, totalWithdrawal: 8400.00, rank: 'Gold'     },
  { id: 'USR-010', name: 'James Okonkwo',   totalDeposit: 3800.00,  totalWithdrawal: 400.00,  rank: 'Bronze'   },
  { id: 'USR-011', name: 'Karen Sousa',     totalDeposit: 14500.00, totalWithdrawal: 6000.00, rank: 'Silver'   },
  { id: 'USR-012', name: 'Liam Dupont',     totalDeposit: 29800.00, totalWithdrawal: 11200.00,rank: 'Platinum' },
  { id: 'USR-013', name: 'Mia Johansson',   totalDeposit: 7100.00,  totalWithdrawal: 1800.00, rank: 'Silver'   },
  { id: 'USR-014', name: 'Noah Petrov',     totalDeposit: 40200.00, totalWithdrawal: 15600.00,rank: 'Platinum' },
  { id: 'USR-015', name: 'Olivia Tremblay', totalDeposit: 5600.00,  totalWithdrawal: 1100.00, rank: 'Bronze'   },
];

const seedWithdrawals = [
  { id: 'WD-1001', name: 'Alice Mercer',    address: '0xA1b2C3d4E5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0', amount: 1500.00, createdAt: '2026-02-18T09:15:00Z' },
  { id: 'WD-1002', name: 'Frank Mensah',    address: '0xB2c3D4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1', amount: 750.50,  createdAt: '2026-02-18T11:42:00Z' },
  { id: 'WD-1003', name: 'Grace Kim',       address: '0xC3d4E5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0C1d2', amount: 4200.00, createdAt: '2026-02-19T08:05:00Z' },
  { id: 'WD-1004', name: 'James Okonkwo',   address: '0xD4e5F6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3', amount: 300.00,  createdAt: '2026-02-19T13:30:00Z' },
  { id: 'WD-1005', name: 'Liam Dupont',     address: '0xE5f6A7b8C9d0E1f2A3b4C5d6E7f8A9b0C1d2E3f4', amount: 6800.00, createdAt: '2026-02-19T15:55:00Z' },
  { id: 'WD-1006', name: 'Mia Johansson',   address: '0xF6a7B8c9D0e1F2a3B4c5D6e7F8a9B0c1D2e3F4a5', amount: 920.00,  createdAt: '2026-02-20T07:20:00Z' },
  { id: 'WD-1007', name: 'Noah Petrov',     address: '0xA7b8C9d0E1f2A3b4C5d6E7f8A9b0C1d2E3f4A5b6', amount: 3100.00, createdAt: '2026-02-20T10:10:00Z' },
];

// ─── Helper Utilities ─────────────────────────────────────────────────────────

const fmt = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

const fmtDate = (iso) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(iso));

const RANK_STYLES = {
  Bronze:   'bg-amber-100  text-amber-700',
  Silver:   'bg-slate-100  text-slate-600',
  Gold:     'bg-yellow-100 text-yellow-700',
  Platinum: 'bg-cyan-100   text-cyan-700',
};

const PAGE_SIZE = 10;

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4">
      <div className="shrink-0 w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 text-xl">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-wide font-semibold">{label}</p>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function TableWrapper({ children }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-slate-100">
      <table className="min-w-full bg-white text-sm">{children}</table>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="px-5 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-100 whitespace-nowrap">
      {children}
    </th>
  );
}

function Td({ children, mono }) {
  return (
    <td className={`px-5 py-4 text-slate-700 wh..itespace-nowrap ${mono ? 'font-mono text-xs' : ''}`}>
      {children}
    </td>
  );
}

// ─── Tab 1: User Overview ─────────────────────────────────────────────────────

function UserOverviewTab({ users }) {
  const [showAll, setShowAll] = useState(false);

  // ── Placeholder: replace body with real fetch logic ──────────────────────
  const fetchUsers = async () => {
    // TODO: const res  = await fetch('/api/admin/users');
    // TODO: const data = await res.json();
    // TODO: setUsers(data);
    console.log('[fetchUsers] placeholder — swap in real API call here');
  };
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    fetchUsers();
  }, []);

  const displayed = showAll ? users : users.slice(0, PAGE_SIZE);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total Users"      value={users.length}                        icon="👤" />
        <StatCard label="Total Deposits"   value={fmt(users.reduce((s, u) => s + u.totalDeposit, 0))}     icon="💰" />
        <StatCard label="Total Withdrawn"  value={fmt(users.reduce((s, u) => s + u.totalWithdrawal, 0))}  icon="📤" />
        <StatCard label="Platinum Members" value={users.filter(u => u.rank === 'Platinum').length}         icon="💎" />
      </div>

      <TableWrapper>
        <thead>
          <tr>
            <Th>#</Th>
            <Th>User Name</Th>
            <Th>User ID</Th>
            <Th>Total Deposit</Th>
            <Th>Total Withdrawal</Th>
            <Th>Rank</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {displayed.map((user, idx) => (
            <tr key={user.id} className="hover:bg-indigo-50/40 transition-colors duration-150">
              <Td><span className="text-slate-400">{idx + 1}</span></Td>
              <Td>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <span className="font-medium text-slate-800">{user.name}</span>
                </div>
              </Td>
              <Td mono>{user.id}</Td>
              <Td><span className="text-emerald-600 font-semibold">{fmt(user.totalDeposit)}</span></Td>
              <Td><span className="text-rose-500 font-semibold">{fmt(user.totalWithdrawal)}</span></Td>
              <Td>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${RANK_STYLES[user.rank]}`}>
                  {user.rank}
                </span>
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>

      {!showAll && users.length > PAGE_SIZE && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-semibold shadow-md transition-all duration-150"
          >
            View All {users.length} Users
          </button>
        </div>
      )}

      {showAll && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(false)}
            className="px-6 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 active:scale-95 text-slate-600 text-sm font-semibold transition-all duration-150"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Tab 2: Pending Withdrawals ───────────────────────────────────────────────

function PendingWithdrawalsTab({ withdrawals, setWithdrawals }) {
  // ── Placeholder: replace body with real fetch logic ──────────────────────
  const fetchWithdrawals = async () => {
    // TODO: const res  = await fetch('/api/admin/withdrawals/pending');
    // TODO: const data = await res.json();
    // TODO: setWithdrawals(data);
    console.log('[fetchWithdrawals] placeholder — swap in real API call here');
  };

  const approveWithdrawal = async (id) => {
    // TODO: await fetch(`/api/admin/withdrawals/${id}/approve`, { method: 'POST' });
    // TODO: refresh list or update local state after success
    console.log('[approveWithdrawal] placeholder — id:', id);
    setWithdrawals((prev) => prev.filter((w) => w.id !== id));
  };

  const rejectWithdrawal = async (id) => {
    // TODO: await fetch(`/api/admin/withdrawals/${id}/reject`, { method: 'POST' });
    // TODO: refresh list or update local state after success
    console.log('[rejectWithdrawal] placeholder — id:', id);
    setWithdrawals((prev) => prev.filter((w) => w.id !== id));
  };
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse inline-block" />
          {withdrawals.length} Pending
        </span>
        <p className="text-slate-400 text-sm">Review and action each withdrawal request below.</p>
      </div>

      {withdrawals.length === 0 ? (
        <div className="rounded-xl shadow-md bg-white p-16 flex flex-col items-center gap-3 text-slate-400">
          <span className="text-5xl">✅</span>
          <p className="text-lg font-semibold">All caught up!</p>
          <p className="text-sm">No pending withdrawal requests.</p>
        </div>
      ) : (
        <TableWrapper>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Withdrawal Address</Th>
              <Th>Amount</Th>
              <Th>Created At</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {withdrawals.map((wd) => (
              <tr key={wd.id} className="hover:bg-amber-50/40 transition-colors duration-150">
                <Td>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {wd.name.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-800">{wd.name}</span>
                  </div>
                </Td>
                <Td>
                  <span className="font-mono text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    {wd.address.slice(0, 10)}…{wd.address.slice(-6)}
                  </span>
                </Td>
                <Td>
                  <span className="text-rose-500 font-bold">{fmt(wd.amount)}</span>
                </Td>
                <Td>
                  <span className="text-slate-500">{fmtDate(wd.createdAt)}</span>
                </Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => approveWithdrawal(wd.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs font-semibold shadow-sm transition-all duration-150"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectWithdrawal(wd.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-semibold shadow-sm transition-all duration-150"
                    >
                      Reject
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}
    </div>
  );
}

// ─── Root Dashboard Component ─────────────────────────────────────────────────

const TABS = ['User Overview', 'Pending Withdrawals'];

export default function Dashboard() {
  const [activeTab, setActiveTab]       = useState('User Overview');
  const [users, setUsers]               = useState(seedUsers);
  const [withdrawals, setWithdrawals]   = useState(seedWithdrawals);

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* ── Topbar ── */}
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
            <span className="text-slate-800 font-bold text-lg tracking-tight">AdminPanel</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold text-sm">
              SA
            </div>
            <span className="text-slate-600 text-sm font-medium hidden sm:block">Super Admin</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* ── Page heading ── */}
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            {new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date())}
          </p>
        </div>

        {/* ── Tab navigation ── */}
        <div className="flex gap-1 bg-white rounded-xl p-1.5 shadow-md w-fit">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                {tab}
                {tab === 'Pending Withdrawals' && withdrawals.length > 0 && (
                  <span className={`ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                    isActive ? 'bg-white text-indigo-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    {withdrawals.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Tab content ── */}
        {activeTab === 'User Overview' && (
          <UserOverviewTab users={users} setUsers={setUsers} />
        )}
        {activeTab === 'Pending Withdrawals' && (
          <PendingWithdrawalsTab
            withdrawals={withdrawals}
            setWithdrawals={setWithdrawals}
          />
        )}
      </main>
    </div>
  );
}
