import Switch from '../../../shared/components/atoms/Switch';
import { controlClass } from '../../../shared/components/molecules/FormField';
import { SCHEDULE_DAYS, dayLabel } from '../../hook/useDoctorSchedule';

const TIME_INPUT = `${controlClass} w-32 py-2 disabled:bg-slate-100`;

function ScheduleRow({ day, row, onChange }) {
  return (
    <tr className={row.active ? '' : 'text-slate-400'}>
      <td className="px-4 py-4 font-semibold">{dayLabel(day)}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2 text-[11px] font-bold">
          <Switch
            checked={row.active}
            onChange={(active) => onChange(day, { active })}
            label={`Atiende ${dayLabel(day)}`}
          />
          {row.active ? 'Activo' : 'Inactivo'}
        </div>
      </td>
      <td className="px-4 py-4">
        <input
          type="time"
          aria-label={`Entrada ${dayLabel(day)}`}
          disabled={!row.active}
          value={row.start}
          onChange={(event) => onChange(day, { start: event.target.value })}
          className={TIME_INPUT}
        />
      </td>
      <td className="px-4 py-4">
        <input
          type="time"
          aria-label={`Salida ${dayLabel(day)}`}
          disabled={!row.active}
          value={row.end}
          onChange={(event) => onChange(day, { end: event.target.value })}
          className={TIME_INPUT}
        />
      </td>
    </tr>
  );
}

export default function ScheduleTable({ rows, onDayChange }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead>
          <tr className="bg-brand-100 text-[11px] font-bold uppercase tracking-wide text-muted">
            <th className="px-4 py-3">Día</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Entrada</th>
            <th className="px-4 py-3">Salida</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-100">
          {SCHEDULE_DAYS.map((day) => (
            <ScheduleRow
              key={day}
              day={day}
              row={rows[day]}
              onChange={onDayChange}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
