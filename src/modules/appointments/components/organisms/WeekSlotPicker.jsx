import Spinner from '../../../shared/components/atoms/Spinner';
import WeekHeader from '../molecules/WeekHeader';
import MobileSlotPicker from './MobileSlotPicker';
import WeekColumns from './WeekColumns';

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
          <MobileSlotPicker
            weekDays={weekDays}
            daySlots={slotsOf(mobileDay)}
            selected={selected}
            onSelect={onSelect}
            mobileDay={mobileDay}
            onMobileDayChange={onMobileDayChange}
            onNextWeek={() => onWeekChange(7)}
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
