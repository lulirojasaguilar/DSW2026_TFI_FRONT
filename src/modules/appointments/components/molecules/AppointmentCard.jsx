import Badge from '../../../shared/components/atoms/Badge';
import { shortTime } from '../../../../core/utils/dates';

const STATUS = {
  BOOKED: { text: 'Confirmado', tone: 'green' },
  ATTENDED: { text: 'Completado', tone: 'gray' },
  CANCELLED: { text: 'Cancelado', tone: 'red' },
  NO_SHOW: { text: 'No asistió', tone: 'amber' },
};

export default function AppointmentCard({ item, onCancel }) {
  const status = STATUS[item.status] ?? { text: item.status, tone: 'gray' };

  return (
    <article className="rounded-xl border border-brand-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <Badge tone="blue">{item.doctor.specialty.name}</Badge>
        <Badge tone={status.tone} dot>
          {status.text}
        </Badge>
      </div>
      <h2 className="mt-4 text-xl font-extrabold text-brand-900">
        {item.doctor.name}
      </h2>
      <p className="mt-3 text-sm text-muted">
        Fecha: <strong className="text-ink">{item.date}</strong> a las{' '}
        <strong className="text-ink">{shortTime(item.startTime)} hs</strong>
      </p>
      {item.status === 'BOOKED' && (
        <button
          type="button"
          onClick={() => onCancel(item)}
          className="mt-5 w-full rounded-lg border border-brand-100 px-4 py-2.5 text-sm font-semibold text-ink hover:bg-brand-50"
        >
          Cancelar Turno
        </button>
      )}
    </article>
  );
}
