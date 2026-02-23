import React from 'react';

export const WithdrawTableWrapper = ({ withdrawals, onAction }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500 font-bold border-b">
          <tr>
            <th className="px-6 py-4">NAME</th>
            <th className="px-6 py-4">TYPE</th>
            <th className="px-6 py-4">ADDRESS</th>
            <th className="px-6 py-4">AMOUNT</th>
            <th className="px-6 py-4">ACTIONS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {withdrawals.map((wd) => (
            <tr key={wd.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-semibold text-slate-700">{wd.name}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  wd.type === 'Profit' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {wd.type || 'Principal'}
                </span>
              </td>
              <td className="px-6 py-4 font-mono text-xs text-slate-400">{wd.address.slice(0,10)}...</td>
              <td className="px-6 py-4 text-rose-500 font-bold">${wd.amount.toLocaleString()}</td>
              <td className="px-6 py-4 flex gap-2">
                <button 
                  onClick={() => onAction(wd, 'Approved')}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95"
                >
                  Approve
                </button>
                <button 
                  onClick={() => onAction(wd, 'Rejected')}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};