import { SLOT_MINUTES } from '../../../shared/constants';
import { isSelectedSlot, NO_SLOTS } from '../../utils/weekView';
import SlotButton from '../atoms/SlotButton';
import DayChips from '../molecules/DayChips';

export default function MobileSlotPicker({
  weekDays,
  daySlots,
  selected,
  onSelect,
  mobileDay,
  onMobileDayChange,
  onNextWeek,
}) {
  return (
    <div className="md:hidden">
      <div className="mb-2 flex items-center justify-between text-xs">
        <p className="font-bold text-brand-900">Próximos Turnos</p>
        <button
          type="button"
          onClick={onNextWeek}
          className="font-semibold text-brand-700"
        >
          Ver más ›
        </button>
      </div>
      <DayChips
        weekDays={weekDays}
        selectedDay={mobileDay}
        onChange={onMobileDayChange}
      />
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
              selected={isSelectedSlot(selected, slot)}
              onSelect={() => onSelect(slot)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
