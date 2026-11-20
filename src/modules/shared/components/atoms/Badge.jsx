const TONES = {
  green: 'bg-emerald-100 text-emerald-700',
  teal: 'bg-teal-200 text-teal-900',
  blue: 'bg-sky-200 text-sky-900',
  amber: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-600',
  gray: 'bg-slate-200 text-slate-600',
};

export default function Badge({ tone = 'gray', dot = false, children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${TONES[tone]}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
