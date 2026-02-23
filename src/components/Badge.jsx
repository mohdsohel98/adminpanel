const RANK_STYLES = {
  Bronze:   'bg-amber-100 text-amber-700',
  Silver:   'bg-slate-100 text-slate-500',
  Gold:     'bg-yellow-100 text-yellow-700',
  Platinum: 'bg-cyan-100 text-cyan-600',
};

export default function Badge({ rank }) {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${RANK_STYLES[rank] || 'bg-gray-100'}`}>
      {rank}
    </span>
  );
}