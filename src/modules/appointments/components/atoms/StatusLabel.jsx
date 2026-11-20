const STATUS = {
  BOOKED: { text: 'Confirmado', cls: 'text-teal-600' },
  ATTENDED: { text: 'Completado', cls: 'text-slate-600' },
  CANCELLED: { text: 'Cancelado', cls: 'text-red-600' },
  NO_SHOW: { text: 'No asistió', cls: 'text-amber-600' },
};

export default function StatusLabel({ status }) {
  const { text, cls } = STATUS[status] ?? {
    text: status,
    cls: 'text-slate-600',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase ${cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {text}
    </span>
  );
}
