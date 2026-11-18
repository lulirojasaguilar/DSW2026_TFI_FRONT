import { CalendarCheck, CalendarDays, CircleCheck } from 'lucide-react';
import Button from '../../shared/components/atoms/Button';
import { controlClass } from '../../shared/components/molecules/FormField';
import { SLOT_MINUTES } from '../../shared/constants';
import {
  dayName,
  formatFullDate,
  formatLongDate,
  fromIsoDate,
} from '../../shared/utils/dates';

// Organismo: resumen del turno elegido + motivo de la consulta + botón de confirmar
export default function SelectionSummary({
  selected,
  reason,
  reasonError,
  booking,
  onReasonChange,
  onConfirm,
}) {
  return (
    <section className="mt-4 rounded-xl border-l-4 border-brand-900 bg-brand-50 p-4 md:border-l-0">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wide text-muted">
            <span className="md:hidden">Resumen de selección</span>
            <span className="hidden md:inline">Turno seleccionado</span>
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm font-extrabold text-brand-900">
            <CalendarDays className="hidden h-4 w-4 md:block" />
            <CalendarCheck className="h-4 w-4 md:hidden" />
            <span className="md:hidden">
              {formatFullDate(selected.date)}, {selected.startTime} HS
            </span>
            <span className="hidden md:inline">
              {formatLongDate(selected.date)}, {selected.startTime} HS
            </span>
          </p>
          <p className="mt-0.5 text-xs text-muted md:hidden">
            Duración: {SLOT_MINUTES} min
          </p>
          <p className="mt-1 hidden text-xs text-muted md:block">
            {dayName(fromIsoDate(selected.date))}
          </p>
        </div>
        <div className="md:w-64">
          <input
            aria-label="Motivo de la consulta"
            value={reason}
            onChange={(event) => onReasonChange(event.target.value)}
            placeholder="Motivo de la consulta"
            className={`${controlClass} bg-white ${reasonError ? 'border-red-400' : ''}`}
          />
          {reasonError && (
            <p role="alert" className="mt-1 text-xs font-medium text-red-600">
              {reasonError}
            </p>
          )}
        </div>
        <Button
          variant="dark"
          className="w-full md:w-auto md:px-8"
          onClick={onConfirm}
          disabled={booking}
        >
          {booking ? 'Confirmando...' : 'Confirmar Turno'}{' '}
          <CircleCheck className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
