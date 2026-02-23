import React from 'react';
import { TableWrapper, Th, Td } from '../components/TableWrapper';
import Badge from '../components/Badge';

export const UserTableWrapper = ({ users, onDelete, onAdd }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h2 className="text-xl font-black text-slate-800">System Users</h2>
        <button 
          onClick={onAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-indigo-100 transition-all active:scale-95 flex items-center gap-2"
        >
          <span>+</span> Add New User
        </button>
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
              <Td className="text-emerald-600 font-bold">${user.totalDeposit.toLocaleString()}</Td>
              <Td className="text-rose-500 font-bold">${user.totalWithdrawal.toLocaleString()}</Td>
              <Td><Badge rank={user.rank} /></Td>
              <Td className="text-center">
                <button 
                  onClick={() => window.confirm(`Delete ${user.name}?`) && onDelete(user.id)}
                  className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  🗑️
                </button>
              </Td>
            </tr>
          ))}
        </tbody>
      </TableWrapper>
    </div>
  );
};