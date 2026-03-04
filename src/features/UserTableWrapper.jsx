import React, { useState } from 'react';
import { TableWrapper, Th, Td } from '../components/TableWrapper';
import Badge from '../components/Badge';

const EditModal = ({ user, onSave, onClose }) => {
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErr(null);
    try {
      await onSave(user.id, { name, phone });
      onClose();
    } catch (error) {
      setErr(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-black text-slate-800">Edit User</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 text-xl font-bold leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+1234567890"
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {err && <p className="text-xs text-rose-500 font-medium">{err}</p>}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-indigo-100 transition-all active:scale-95"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const UserTableWrapper = ({ users, onDelete, onUpdate, loading, error }) => {
  const [editingUser, setEditingUser] = useState(null);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xl font-black text-slate-800">System Users</h2>
      </div>

      {loading && (
        <div className="text-center py-16 text-slate-400 font-medium">Loading users…</div>
      )}

      {error && (
        <div className="text-center py-16 text-rose-500 font-medium">Error: {error}</div>
      )}

      {!loading && !error && (
        <TableWrapper>
          <thead>
            <tr>
              <Th>#</Th>
              <Th>User Name</Th>
              <Th>User ID</Th>
              <Th>Phone</Th>
              <Th>Total Deposit</Th>
              <Th>Total Withdrawal</Th>
              <Th>Rank</Th>
              <Th className="text-center">Actions</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user, idx) => (
              <tr key={user.id} className="group hover:bg-indigo-50/30 transition-colors">
                <Td className="text-slate-400">{idx + 1}</Td>
                <Td>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-bold text-slate-800">{user.name}</span>
                  </div>
                </Td>
                <Td className="font-mono text-[11px] text-slate-500 bg-slate-50/50 rounded-md px-2 py-1 mx-6 inline-block mt-3">
                  {user.id}
                </Td>
                <Td className="text-slate-500 text-sm">{user.phone || <span className="text-slate-300">—</span>}</Td>
                <Td className="text-emerald-600 font-bold">${(user.totalDeposit || 0).toLocaleString()}</Td>
                <Td className="text-rose-500 font-bold">${(user.totalWithdrawal || 0).toLocaleString()}</Td>
                <Td><Badge rank={user.rank} /></Td>
                <Td className="text-center">
                  <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => setEditingUser(user)}
                      className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => window.confirm(`Delete ${user.name}?`) && onDelete(user.id)}
                      className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableWrapper>
      )}

      {editingUser && (
        <EditModal
          user={editingUser}
          onSave={onUpdate}
          onClose={() => setEditingUser(null)}
        />
      )}
    </div>
  );
};
