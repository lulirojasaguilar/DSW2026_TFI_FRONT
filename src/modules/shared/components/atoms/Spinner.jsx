export default function Spinner({ label = 'Cargando...' }) {
  return (
    <div
      className="flex items-center justify-center gap-3 p-8 text-sm text-muted"
      role="status"
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-200 border-t-brand-700" />
      {label}
    </div>
  );
}
