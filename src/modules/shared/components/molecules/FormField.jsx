// Label + control + mensaje de error. El control se pasa como children (input, select, textarea)
export default function FormField({
  label,
  error,
  htmlFor,
  className = '',
  labelClassName = 'text-xs font-bold',
  children,
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className={`mb-1.5 block text-ink ${labelClassName}`}
      >
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

// Clases comunes para los controles de formulario
export const controlClass =
  'w-full rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-brand-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200';

// Control con un icono a la izquierda
export function IconInput({
  icon: Icon,
  right,
  className = '',
  invalid,
  ...props
}) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        className={`${controlClass} pl-9 ${right ? 'pr-10' : ''} ${invalid ? 'border-red-400' : ''} ${className}`}
        {...props}
      />
      {right}
    </div>
  );
}
