import { formatLongDate, shortTime } from '../../../../core/utils/dates';
import StatusLabel from '../atoms/StatusLabel';

function Field({ label, children }) {
  return (
    <div>
      <dt className="text-[11px] font-bold uppercase tracking-wide text-muted">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-ink">{children}</dd>
    </div>
  );
}

export default function AppointmentDetail({ appointment }) {
  const { date, startTime, endTime, patient, doctor } = appointment;

  return (
    <dl className="grid grid-cols-2 gap-6 rounded-lg border border-brand-100 bg-white p-6 shadow-sm">
      <Field label="Estado">
        <StatusLabel status={appointment.status} />
      </Field>
      <Field label="Fecha">
        {formatLongDate(date)} de {date.slice(0, 4)}
      </Field>
      <Field label="Horario">
        {shortTime(startTime)} – {shortTime(endTime)} hs
      </Field>
      <Field label="Especialidad">{doctor.specialty.name}</Field>
      <Field label="Doctor">{doctor.name}</Field>
      {patient?.fullName && <Field label="Paciente">{patient.fullName}</Field>}
      <Field label="DNI del paciente">{patient?.dni}</Field>
      <Field label="Identificador del turno">
        <span className="break-all text-xs font-normal text-muted">
          {appointment.id}
        </span>
      </Field>
    </dl>
  );
}
