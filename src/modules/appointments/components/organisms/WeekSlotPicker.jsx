import { ChevronLeft, ChevronRight } from 'lucide-react';
import Spinner from '../../../shared/components/atoms/Spinner';
import { SLOT_MINUTES } from '../../../shared/constants';
import { monthName, toIsoDate } from '../../../shared/utils/dates';
import SlotButton from '../atoms/SlotButton';

const SHORT_DAYS = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
const NO_SLOTS = 'No hay turnos disponibles para este día.';

const isSelected = (selected, slot) =>
  selected?.date === slot.date && selected.startTime === slot.startTime;

function WeekHeader({ weekDays, onWeekChange }) {
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
          Lunes {weekDays[0].getDate()} - Viernes {last.getDate()}, {month}
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

function WeekColumns({ weekDays, slotsOf, selected, onSelect }) {
  return (
    <div className="hidden grid-cols-5 divide-x divide-brand-100 md:grid">
      {weekDays.map((day) => {
        const list = slotsOf(toIsoDate(day));

        return (
          <div key={day.toISOString()} className="px-3 pb-4 text-center">
            <p className="text-[10px] font-bold text-muted">
              {SHORT_DAYS[day.getDay()]}
            </p>
            <p className="mb-3 text-lg font-extrabold text-brand-900">
              {day.getDate()}
            </p>
            {list.length === 0 ? (
              <p className="px-2 pt-6 text-xs text-muted">{NO_SLOTS}</p>
            ) : (
              <div className="flex flex-col gap-2">
                {list.map((slot) => (
                  <SlotButton
                    key={slot.date + slot.startTime}
                    time={slot.startTime}
                    selected={isSelected(selected, slot)}
                    onSelect={() => onSelect(slot)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function DayChips({
  weekDays,
  slotsOf,
  selected,
  onSelect,
  mobileDay,
  onMobileDayChange,
  onWeekChange,
}) {
  const daySlots = slotsOf(mobileDay);

  return (
    <div className="md:hidden">
      <div className="mb-2 flex items-center justify-between text-xs">
        <p className="font-bold text-brand-900">Próximos Turnos</p>
        <button
          type="button"
          onClick={() => onWeekChange(7)}
          className="font-semibold text-brand-700"
        >
          Ver más ›
        </button>
      </div>
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {weekDays.map((day) => {
          const iso = toIsoDate(day);
          const on = mobileDay === iso;

          return (
            <button
              key={iso}
              type="button"
              onClick={() => onMobileDayChange(iso)}
              className={`w-[4.25rem] shrink-0 rounded-xl border py-2 text-center text-[10px] font-bold ${
                on
                  ? 'border-brand-900 bg-brand-900 text-white'
                  : 'border-brand-200 bg-white text-muted'
              }`}
            >
              {SHORT_DAYS[day.getDay()]}
              <br />
              <span className="text-sm">{day.getDate()}</span>
              <br />
              {monthName(day).slice(0, 3).toUpperCase()}
            </button>
          );
        })}
      </div>
      <p className="mb-2 text-xs font-bold text-brand-900">
        Horarios disponibles (Bloques de {SLOT_MINUTES} min)
      </p>
      {daySlots.length === 0 ? (
        <p className="text-xs text-muted">{NO_SLOTS}</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {daySlots.map((slot) => (
            <SlotButton
              key={slot.date + slot.startTime}
              variant="mobile"
              time={slot.startTime}
              selected={isSelected(selected, slot)}
              onSelect={() => onSelect(slot)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function WeekSlotPicker({
  weekDays,
  slots,
  loading,
  derived,
  selected,
  onSelect,
  mobileDay,
  onMobileDayChange,
  onWeekChange,
}) {
  const slotsOf = (iso) => slots.filter((slot) => slot.date === iso);

  return (
    <section className="mt-4 rounded-xl border border-brand-100 bg-white p-4 shadow-sm">
      <WeekHeader weekDays={weekDays} onWeekChange={onWeekChange} />
      {loading ? (
        <Spinner label="Buscando disponibilidad..." />
      ) : (
        <>
          <WeekColumns
            weekDays={weekDays}
            slotsOf={slotsOf}
            selected={selected}
            onSelect={onSelect}
          />
          <DayChips
            weekDays={weekDays}
            slotsOf={slotsOf}
            selected={selected}
            onSelect={onSelect}
            mobileDay={mobileDay}
            onMobileDayChange={onMobileDayChange}
            onWeekChange={onWeekChange}
          />
        </>
      )}
      {derived && !loading && (
        <p className="mt-3 text-[11px] text-amber-700">
          Horarios calculados desde la disponibilidad semanal del doctor (el
          backend aún no expone los turnos individuales).
        </p>
      )}
    </section>
  );
}
