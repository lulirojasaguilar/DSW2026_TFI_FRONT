import { Search } from 'lucide-react';
import Button from '../../../shared/components/atoms/Button';
import SelectField from '../../../shared/components/molecules/SelectField';

const toOption = (item) => ({ value: item.id, label: item.name });

export default function BookingFilters({
  specialties,
  doctors,
  specialtyId,
  doctorId,
  onSpecialtyChange,
  onDoctorChange,
  onSearch,
  searching,
}) {
  return (
    <section className="rounded-xl border border-brand-100 bg-white p-5 shadow-sm">
      <h1 className="text-2xl font-extrabold text-brand-900">
        Reservar Turno Médico
      </h1>
      <p className="mt-1 text-sm text-muted">
        Seleccione la especialidad y el profesional para continuar.
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <SelectField
          id="specialty"
          label="Seleccionar Especialidad"
          placeholder="Todas las especialidades"
          options={specialties.map(toOption)}
          value={specialtyId}
          onValueChange={onSpecialtyChange}
        />
        <SelectField
          id="doctor"
          label="Seleccionar Doctor"
          placeholder="Seleccione un doctor"
          options={doctors.map(toOption)}
          value={doctorId}
          onValueChange={onDoctorChange}
        />
        <div>
          <Button
            variant="dark"
            className="h-[42px] w-full md:w-auto md:px-8"
            onClick={onSearch}
            disabled={searching}
          >
            <Search className="h-4 w-4" /> Buscar Disponibilidad
          </Button>
        </div>
      </div>
    </section>
  );
}
