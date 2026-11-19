import { ChevronLeft, ChevronRight } from 'lucide-react';

// Pie de tabla: "Mostrando X a Y de Z" + botones de página (pageIndex base 1, igual que la API)
export default function Pagination({
  pageIndex,
  pageSize,
  total,
  onChange,
  noun = 'registros',
  numbered = false,
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (pageIndex - 1) * pageSize + 1;
  const to = Math.min(total, pageIndex * pageSize);
  const arrow =
    'flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40';

  return (
    <div className="flex items-center justify-between gap-3 border-t border-brand-100 bg-table-head px-4 py-3 text-xs text-muted">
      <span>
        Mostrando {from} a {to} de {total} {noun}
      </span>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="Página anterior"
          className={arrow}
          disabled={pageIndex <= 1}
          onClick={() => onChange(pageIndex - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {numbered &&
          Array.from({ length: Math.min(pages, 3) }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => onChange(page)}
                className={`h-7 w-7 rounded text-xs font-semibold ${page === pageIndex ? 'bg-brand-700 text-white' : 'bg-white text-ink border border-slate-200'}`}
              >
                {page}
              </button>
            )
          )}
        <button
          type="button"
          aria-label="Página siguiente"
          className={arrow}
          disabled={pageIndex >= pages}
          onClick={() => onChange(pageIndex + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
