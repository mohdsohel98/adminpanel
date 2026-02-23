export const StatCard = ({ label, value, icon, colorClass = "bg-indigo-50 text-indigo-600" }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${colorClass}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">{label}</p>
      <p className="text-2xl font-black text-slate-800">{value}</p>
    </div>
  </div>
);