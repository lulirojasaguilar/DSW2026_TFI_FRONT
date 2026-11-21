const MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];
const DAYS = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

export const pad = (n) => String(n).padStart(2, '0');

export const toIsoDate = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const fromIsoDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);

  return new Date(y, m - 1, d);
};

export const addDays = (date, days) => {
  const copy = new Date(date);

  copy.setDate(copy.getDate() + days);

  return copy;
};

export const mondayOf = (date) => {
  const day = date.getDay() === 0 ? 7 : date.getDay();

  return addDays(date, 1 - day);
};

export const monthName = (date) => MONTHS[date.getMonth()];
export const dayName = (date) => DAYS[date.getDay()];

export const formatLongDate = (iso) => {
  const d = fromIsoDate(iso);

  return `${dayName(d)} ${d.getDate()} de ${MONTHS[d.getMonth()]}`;
};

export const formatShortDate = (iso) => {
  const d = fromIsoDate(iso);

  return `${pad(d.getDate())} ${MONTHS[d.getMonth()].slice(0, 3)}, ${d.getFullYear()}`;
};

export const shortTime = (time) => (time ? time.slice(0, 5) : '');

export const formatTime12 = (time) => {
  const [hours, minutes] = shortTime(time).split(':').map(Number);
  const suffix = hours >= 12 ? 'PM' : 'AM';

  return `${pad(hours % 12 || 12)}:${pad(minutes)} ${suffix}`;
};

export const formatFullDate = (iso) => {
  const d = fromIsoDate(iso);
  const month = MONTHS[d.getMonth()].replace(/^./, (c) => c.toUpperCase());

  return `${dayName(d)}, ${d.getDate()} de ${month} de ${d.getFullYear()}`;
};
