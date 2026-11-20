import { Link } from 'react-router-dom';
import { IdCard, Save, Tag, User, UserRoundPlus } from 'lucide-react';
import Button from '../../../shared/components/atoms/Button';
import Alert from '../../../shared/components/molecules/Alert';
import FormField, {
  IconInput,
  controlClass,
} from '../../../shared/components/molecules/FormField';

export default function DoctorForm({
  isEdit,
  register,
  errors,
  isSubmitting,
  onSubmit,
  specialties,
  error,
  notFound,
}) {
  return (
    <section className="max-w-3xl rounded-lg border border-brand-100 bg-white shadow-sm">
      <div className="border-b border-brand-100 p-6">
        <h1 className="flex items-center gap-2 text-lg font-extrabold text-brand-900">
          <UserRoundPlus className="h-5 w-5" />{' '}
          {isEdit ? 'Editar Doctor' : 'Registrar Nuevo Doctor'}
        </h1>
        <p className="mt-1 text-xs text-muted">
          Complete todos los campos obligatorios para integrar al nuevo
          facultativo al sistema del centro médico.
        </p>
      </div>

      <form onSubmit={onSubmit} noValidate className="space-y-5 p-6">
        <Alert>{error}</Alert>
        {notFound && <Alert>No se encontró el doctor solicitado.</Alert>}

        <FormField
          label="Nombre Completo del Doctor"
          htmlFor="name"
          error={errors.name?.message}
        >
          <IconInput
            id="name"
            icon={User}
            placeholder="Ej: Dr. Alejandro Martínez"
            invalid={errors.name}
            {...register('name', {
              required: 'El nombre es obligatorio.',
              minLength: { value: 3, message: 'Mínimo 3 caracteres.' },
              maxLength: { value: 100, message: 'Máximo 100 caracteres.' },
            })}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-5">
          <FormField
            label="Especialidad"
            htmlFor="specialtyId"
            error={errors.specialtyId?.message}
          >
            <div className="relative">
              <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <select
                id="specialtyId"
                className={`${controlClass} pl-9 ${errors.specialtyId ? 'border-red-400' : ''}`}
                {...register('specialtyId', {
                  required: 'Seleccione una especialidad.',
                })}
              >
                <option value="">Seleccione especialidad</option>
                {specialties.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </FormField>

          <FormField
            label="Número de Licencia Médica"
            htmlFor="licenseNumber"
            error={errors.licenseNumber?.message}
          >
            <IconInput
              id="licenseNumber"
              icon={IdCard}
              placeholder="ID-45920-X"
              invalid={errors.licenseNumber}
              {...register('licenseNumber', {
                required: 'El número de licencia es obligatorio.',
              })}
            />
          </FormField>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link to="/app/doctors">
            <Button variant="ghost">Cancelar</Button>
          </Link>
          <Button type="submit" variant="dark" disabled={isSubmitting}>
            <Save className="h-4 w-4" />{' '}
            {isSubmitting ? 'Guardando...' : 'Guardar Doctor'}
          </Button>
        </div>
      </form>
    </section>
  );
}
