import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  return (
    <nav
      aria-label="Ruta"
      className="mb-4 flex items-center gap-2 text-xs text-muted"
    >
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-2">
          {index > 0 && <span>›</span>}
          {item.to ? (
            <Link to={item.to} className="hover:text-brand-700">
              {item.label}
            </Link>
          ) : (
            <span
              className={
                item.muted ? 'text-slate-400' : 'font-bold text-brand-700'
              }
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
