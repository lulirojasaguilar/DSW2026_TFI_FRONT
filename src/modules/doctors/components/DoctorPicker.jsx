import Avatar from '../../shared/components/atoms/Avatar';
import { controlClass } from '../../shared/components/molecules/FormField';

// Organismo: selector de profesional + tarjeta con sus datos
export default function DoctorPicker({ doctors, doctorId, doctor, onChange }) {
  return (
    <section className="rounded-lg border border-brand-100 bg-white p-4 shadow-sm">
      <p className="mb-2 text-xs font-bold text-ink">Seleccionar Profesional</p>
      <select
        aria-label="Seleccionar profesional"
        className={controlClass}
        value={doctorId}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="" disabled>
          Seleccione un doctor
        </option>
        {doctors.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} - {item.specialty?.name}
          </option>
        ))}
      </select>
      {doctor && (
        <div className="mt-3 flex items-center gap-3 rounded-md bg-brand-100 p-3">
          <Avatar name={doctor.name} size="h-12 w-12" />
          <div className="text-xs leading-snug">
            <p className="font-bold text-ink">{doctor.name}</p>
            <p className="text-muted">ID: {doctor.licenseNumber}</p>
            <p className="font-semibold text-brand-700">
              {doctor.specialty?.name}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
