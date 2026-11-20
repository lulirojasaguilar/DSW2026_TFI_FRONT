import { useForm } from 'react-hook-form';
import { Calendar, ListFilter, Search } from 'lucide-react';
import Button from '../../shared/components/atoms/Button';
import { controlClass } from '../../shared/components/molecules/FormField';
import SelectField from '../../shared/components/molecules/SelectField';
import LastUpdate from './LastUpdate';

const toOption = (item) => ({ value: item.id, label: item.name });

// Organismo: formulario de criterios de búsqueda (react-hook-form). Al enviar llama a onApply(values).
export default function AppointmentFilters({
  specialties,
  doctors,
  activeFilters,
  updatedAt,
  onApply,
}) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { patient: '', specialtyId: '', doctorId: '', date: '' },
  });
  const chips = [
    getValues('patient') && `Paciente: ${getValues('patient')}`,
    activeFilters.date && `Fecha: ${activeFilters.date}`,
  ].filter(Boolean);

  return (
    <form
      onSubmit={handleSubmit(onApply)}
      noValidate
      className="mb-6 rounded-lg border border-brand-100 bg-white p-5 shadow-sm"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-sm font-bold text-ink">
          <ListFilter className="h-4 w-4 text-brand-700" /> Criterios de
          Búsqueda
        </h2>
        <LastUpdate updatedAt={updatedAt} />
      </div>

      <div className="grid grid-cols-[2fr_1.2fr_1.2fr_1fr_auto] items-end gap-4">
        <div>
          <label
            htmlFor="patient"
            className="mb-1.5 block text-[11px] font-bold text-muted"
          >
            Nombre o DNI del Paciente
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="patient"
              inputMode="numeric"
              placeholder="DNI del paciente"
              className={`${controlClass} pl-9 ${errors.patient ? 'border-red-400' : ''}`}
              {...register('patient', {
                pattern: {
                  value: /^\d{7,10}$/,
                  message: 'Ingrese un DNI de 7 a 10 dígitos.',
                },
              })}
            />
          </div>
          {errors.patient && (
            <p role="alert" className="mt-1 text-xs font-medium text-red-600">
              {errors.patient.message}
            </p>
          )}
        </div>
        <SelectField
          id="specialtyId"
          label="Especialidad"
          placeholder="Todas las Especialidades"
          options={specialties.map(toOption)}
          {...register('specialtyId')}
        />
        <SelectField
          id="doctorId"
          label="Doctor"
          placeholder="Todos los Doctores"
          options={doctors.map(toOption)}
          {...register('doctorId')}
        />
        <div>
          <label
            htmlFor="date"
            className="mb-1.5 block text-[11px] font-bold text-muted"
          >
            Fecha
          </label>
          <div className="relative">
            <input
              id="date"
              type="date"
              className={controlClass}
              {...register('date')}
            />
            <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
        <Button type="submit" variant="dark" className="h-[42px]">
          <ListFilter className="h-4 w-4" /> Aplicar Filtros
        </Button>
      </div>

      {chips.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((text) => (
            <span
              key={text}
              className="rounded bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-900"
            >
              {text}
            </span>
          ))}
        </div>
      )}
    </form>
  );
}
