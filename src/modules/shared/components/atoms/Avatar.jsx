const COLORS = [
  'bg-sky-200 text-sky-900',
  'bg-teal-200 text-teal-900',
  'bg-indigo-200 text-indigo-900',
  'bg-slate-300 text-slate-800',
];

// Foto si existe; si no, iniciales sobre un color estable según el nombre
export default function Avatar({
  name = '',
  src,
  size = 'h-10 w-10',
  className = '',
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${size} rounded-md object-cover ${className}`}
      />
    );
  }

  const initials = name
    .replace(/^(Dr\.|Dra\.)\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
  const color = COLORS[name.length % COLORS.length];

  return (
    <span
      className={`${size} ${color} flex shrink-0 items-center justify-center rounded-md text-sm font-bold ${className}`}
    >
      {initials}
    </span>
  );
}
