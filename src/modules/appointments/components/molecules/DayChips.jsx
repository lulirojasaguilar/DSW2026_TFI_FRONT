import { monthName, toIsoDate } from '../../../../core/utils/dates';
import { SHORT_DAYS } from '../../utils/weekView';

export default function DayChips({ weekDays, selectedDay, onChange }) {
  return (
    <div className="mb-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {weekDays.map((day) => {
        const iso = toIsoDate(day);
        const on = selectedDay === iso;

        return (
          <button
            key={iso}
            type="button"
            onClick={() => onChange(iso)}
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
  );
}
