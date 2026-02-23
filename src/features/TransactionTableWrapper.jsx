import React from 'react';
import { TableWrapper, Th, Td } from '../components/TableWrapper';

export const TransactionTableWrapper = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-16 text-center border-2 border-dashed border-slate-100">
        <div className="text-4xl mb-4">📜</div>
        <p className="text-slate-400 font-medium">No transaction history available yet.</p>
      </div>
    );
  }

  return (
    <TableWrapper title="Transaction History" badge={transactions.length}>
      <thead>
        <tr>
          <Th>Date & Time</Th>
          <Th>User</Th>
          <Th>Type</Th>
          <Th>Amount</Th>
          <Th>Status</Th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {transactions.map((tx, idx) => (
          <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4">
              <div className="text-slate-700 font-medium">
                {new Date(tx.processedAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
              </div>
              <div className="text-[10px] text-slate-400 uppercase">
                {new Date(tx.processedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </td>
            <td className="px-6 py-4 font-semibold text-slate-800">{tx.name}</td>
            <td className="px-6 py-4">
              <span className={`px-2 py-1 rounded text-[10px] font-black tracking-widest uppercase ${
                tx.type === 'Profit' 
                  ? 'bg-purple-50 text-purple-600' 
                  : 'bg-blue-50 text-blue-600'
              }`}>
                {tx.type || 'Principal'}
              </span>
            </td>
            <td className="px-6 py-4">
              <span className="font-bold text-slate-900">${tx.amount.toLocaleString()}</span>
            </td>
            <td className="px-6 py-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                tx.status === 'Approved' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-rose-100 text-rose-700'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Approved' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                {tx.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </TableWrapper>
  );
};