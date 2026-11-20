export const SHORT_DAYS = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];

export const NO_SLOTS = 'No hay turnos disponibles para este día.';

export const isSelectedSlot = (selected, slot) =>
  selected?.date === slot.date && selected.startTime === slot.startTime;
