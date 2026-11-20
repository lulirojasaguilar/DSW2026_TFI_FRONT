import { Link } from 'react-router-dom';

const BASE =
  'inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white transition disabled:cursor-not-allowed disabled:opacity-50';

// Todas las acciones comparten la forma; solo cambia el color del ícono según el mockup
const TONES = {
  default:
    'text-slate-500 hover:border-brand-700 hover:bg-brand-50 hover:text-brand-700',
  brand: 'text-brand-700 hover:border-brand-700 hover:bg-brand-50',
  danger: 'text-red-600 hover:border-red-500 hover:bg-red-50',
};

// Botón de acción de tabla: TODAS las acciones (horario, editar, eliminar...) usan este mismo estilo.
// Con "to" navega (Link); con "onClick" ejecuta una función.
export default function ActionButton({
  icon: Icon,
  label,
  to,
  onClick,
  disabled,
  tone = 'default',
}) {
  const STYLE = `${BASE} ${TONES[tone]}`;
  const icon = <Icon className="h-4 w-4" />;

  if (to) {
    return (
      <Link to={to} aria-label={label} title={label} className={STYLE}>
        {icon}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={STYLE}
    >
      {icon}
    </button>
  );
}
