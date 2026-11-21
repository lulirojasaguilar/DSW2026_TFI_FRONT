import { toIsoDate } from '../../../../core/utils/dates';
import { isSelectedSlot, NO_SLOTS, SHORT_DAYS } from '../../utils/weekView';
import SlotButton from '../atoms/SlotButton';

export default function WeekColumns({ weekDays, slotsOf, selected, onSelect }) {
  return (
    <div className="hidden grid-cols-7 divide-x divide-brand-100 md:grid">
      {weekDays.map((day) => {
        const list = slotsOf(toIsoDate(day));

        return (
          <div key={day.toISOString()} className="px-2 pb-4 text-center">
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
                    selected={isSelectedSlot(selected, slot)}
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
