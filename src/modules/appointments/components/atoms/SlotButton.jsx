import { formatTime12 } from '../../../../core/utils/dates';

const STYLES = {
  desktop: {
    idle: 'border-brand-200 bg-white text-brand-900 hover:bg-brand-50',
    selected: 'border-teal-300 bg-teal-300 text-brand-900',
  },
  mobile: {
    idle: 'border-slate-200 bg-white text-brand-900',
    selected: 'border-2 border-brand-900 bg-white text-brand-900',
  },
};

export default function SlotButton({
  time,
  selected,
  onSelect,
  variant = 'desktop',
}) {
  const style = STYLES[variant][selected ? 'selected' : 'idle'];
  const padding = variant === 'mobile' ? 'py-2.5' : 'py-1.5';

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-lg border px-2 text-xs font-bold transition ${padding} ${style}`}
    >
      {variant === 'mobile' ? formatTime12(time) : time}
    </button>
  );
}
