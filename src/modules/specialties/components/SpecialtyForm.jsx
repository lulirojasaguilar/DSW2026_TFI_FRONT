import { Link } from 'react-router-dom';
import { Save } from 'lucide-react';
import Button from '../../shared/components/atoms/Button';
import Alert from '../../shared/components/molecules/Alert';
import FormField, {
  controlClass,
} from '../../shared/components/molecules/FormField';

export default function SpecialtyForm({
  register,
  errors,
  isSubmitting,
  onSubmit,
  error,
}) {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="max-w-4xl space-y-5 rounded-sm border border-slate-200 bg-white p-6"
    >
      <Alert>{error}</Alert>

      <FormField
        label="Nombre de la Especialidad"
        labelClassName="text-sm font-normal"
        htmlFor="name"
        error={errors.name?.message}
      >
        <input
          id="name"
          className={`${controlClass} ${errors.name ? 'border-red-400' : ''}`}
          placeholder="Ej. Cardiología Intervencionista"
          {...register('name', {
            required: 'El nombre es obligatorio.',
            minLength: { value: 3, message: 'Mínimo 3 caracteres.' },
            maxLength: { value: 100, message: 'Máximo 100 caracteres.' },
          })}
        />
      </FormField>

      <FormField
        label="Descripción"
        labelClassName="text-sm font-normal"
        htmlFor="description"
        error={errors.description?.message}
      >
        <textarea
          id="description"
          rows={6}
          className={`${controlClass} resize-none ${errors.description ? 'border-red-400' : ''}`}
          placeholder="Detalle el alcance de la especialidad, procedimientos principales y requisitos de derivación..."
          {...register('description', {
            required: 'La descripción es obligatoria.',
            minLength: { value: 10, message: 'Mínimo 10 caracteres.' },
            maxLength: { value: 100, message: 'Máximo 100 caracteres.' },
          })}
        />
      </FormField>

      <div className="flex justify-end gap-3 pt-2">
        <Link to="/app/specialties">
          <Button variant="outline">Cancelar</Button>
        </Link>
        <Button type="submit" variant="dark" disabled={isSubmitting}>
          <Save className="h-4 w-4" />{' '}
          {isSubmitting ? 'Guardando...' : 'Guardar Especialidad'}
        </Button>
      </div>
    </form>
  );
}
