const VARIANTS = {
  primary: 'bg-brand-700 text-white hover:bg-brand-800 border border-brand-700',
  dark: 'bg-brand-900 text-white hover:bg-brand-950 border border-brand-900',
  outline: 'bg-white text-brand-700 border border-brand-700 hover:bg-brand-50',
  ghost: 'bg-white text-ink border border-slate-300 hover:bg-slate-50',
};

export default function Button({
  variant = 'primary',
  type = 'button',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
