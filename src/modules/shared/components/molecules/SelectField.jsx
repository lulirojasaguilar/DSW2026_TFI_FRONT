import { controlClass } from './FormField';

// Label + select. Las opciones llegan como [{ value, label }] y "placeholder" es la opción vacía.
// Sirve controlado (value + onValueChange) o con react-hook-form ({...register('campo')}).
export default function SelectField({
  id,
  label,
  options,
  placeholder,
  onValueChange,
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-bold text-muted"
      >
        {label}
      </label>
      <select
        id={id}
        className={controlClass}
        onChange={
          onValueChange
            ? (event) => onValueChange(event.target.value)
            : undefined
        }
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
