// Tarjeta de indicador. "accent" agrega la barra lateral de color (vista de especialidades)
export default function StatCard({
  label,
  value,
  icon: Icon,
  tag,
  tagTone = 'green',
  note,
  tone = 'blue',
  accent,
  valueClass = '',
}) {
  const tagTones = {
    green: 'bg-emerald-100 text-emerald-700',
    gray: 'bg-slate-100 text-slate-600',
    blue: 'bg-sky-100 text-sky-700',
  };
  const accents = {
    blue: 'border-l-4 border-l-brand-700',
    teal: 'border-l-4 border-l-teal-400',
    red: '',
  };

  return (
    <div
      className={`rounded-lg border border-brand-100 bg-white p-5 shadow-sm ${accent ? accents[accent] : ''}`}
    >
      <div className="flex items-start justify-between">
        {Icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-50 text-brand-700">
            <Icon className="h-4 w-4" />
          </span>
        )}
        {tag && (
          <span
            className={`rounded px-2 py-0.5 text-[10px] font-bold ${tagTones[tagTone]}`}
          >
            {tag}
          </span>
        )}
      </div>
      <p className="mt-4 text-[11px] font-bold uppercase tracking-wide text-muted">
        {label}
      </p>
      <p
        className={`mt-1 text-3xl font-extrabold ${tone === 'red' ? 'text-red-600' : 'text-brand-900'} ${valueClass}`}
      >
        {value}
      </p>
      {note && <p className="mt-1 text-xs text-muted">{note}</p>}
    </div>
  );
}
