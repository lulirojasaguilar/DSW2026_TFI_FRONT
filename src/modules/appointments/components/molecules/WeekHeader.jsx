import { ChevronLeft, ChevronRight } from 'lucide-react';
import { monthName } from '../../../../core/utils/dates';

export default function WeekHeader({ weekDays, onWeekChange }) {
  const last = weekDays[weekDays.length - 1];
  const month = monthName(last).replace(/^./, (char) => char.toUpperCase());

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-brand-100 pb-4">
      <div className="flex items-center gap-3 text-sm font-bold text-ink">
        <button
          type="button"
          aria-label="Semana anterior"
          onClick={() => onWeekChange(-7)}
          className="text-muted hover:text-brand-700"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span>
          Lunes {weekDays[0].getDate()} - Domingo {last.getDate()}, {month}
        </span>
        <button
          type="button"
          aria-label="Semana siguiente"
          onClick={() => onWeekChange(7)}
          className="text-muted hover:text-brand-700"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center gap-4 text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <i className="h-2 w-2 rounded-full bg-brand-800" /> Disponible
        </span>
        <span className="flex items-center gap-1.5">
          <i className="h-2 w-2 rounded-full bg-teal-300" /> Seleccionado
        </span>
      </div>
    </div>
  );
}
