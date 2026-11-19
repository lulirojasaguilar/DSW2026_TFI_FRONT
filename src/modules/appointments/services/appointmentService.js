import { instance } from '../../shared/api/axiosInstance';
import {
  WEEK_DAYS_API,
  fromIsoDate,
  toIsoDate,
  addDays,
  pad,
} from '../../shared/utils/dates';
import { getDoctorAvailabilities } from '../../doctors/services/doctorService';

// La API puede responder con las claves del enunciado (appointmentsId) o con las del backend (id)
export const normalizeAppointment = (item) => ({
  id: item.id ?? item.appointmentsId,
  status: item.status ?? item.appointmentsStatus,
  reason: item.reason,
  date: item.date,
  startTime: item.startTime,
  endTime: item.endTime,
  patient: item.patient,
  doctor: {
    id: item.doctor?.id ?? item.doctor?.doctorId,
    name: item.doctor?.name,
    specialty: {
      id: item.doctor?.specialty?.id ?? item.doctor?.specialty?.specialtyId,
      name: item.doctor?.specialty?.name,
    },
  },
});

const normalizePage = (page) => ({
  ...page,
  data: (page.data ?? []).map(normalizeAppointment),
});

export const getAppointmentsByDate = ({
  date,
  pageSize = 100,
  pageIndex = 1,
}) =>
  instance
    .get('/appointments', { params: { date, pageSize, pageIndex } })
    .then((res) => normalizePage(res.data));

export const searchAppointments = ({
  pageSize = 5,
  pageIndex = 1,
  specialtyId,
  doctorId,
  dni,
  date,
}) =>
  instance
    .get('/appointments/search', {
      params: {
        pageSize,
        pageIndex,
        specialtyId: specialtyId || undefined,
        doctorId: doctorId || undefined,
        dni: dni || undefined,
        date: date || undefined,
      },
    })
    .then((res) => normalizePage(res.data));

export const getPatientAppointments = (dni) =>
  instance
    .get('/appointments/patient', { params: { dni } })
    .then((res) => (res.data.data ?? res.data).map(normalizeAppointment));

export const bookAppointment = ({
  doctorId,
  availabilitySlotId,
  dni,
  reason,
}) =>
  instance
    .post('/appointments', {
      doctorId,
      availabilitySlotId,
      patient: { dni },
      reason,
    })
    .then((res) => res.data);

export const cancelAppointment = (id) =>
  instance.delete(`/appointments/${id}`).then((res) => res.data);

// Turnos libres de un médico entre dos fechas ({ id, date, startTime }).
// Se espera GET /doctors/{id}/slots?from=&to= (adaptación de backend permitida por el TPI).
// Si el endpoint todavía no existe, se arman los bloques de 30 min desde la disponibilidad semanal
// (sin id de turno: se pueden ver pero no reservar hasta que el backend lo exponga).
export async function getDoctorSlots(doctorId, from, to) {
  try {
    const { data } = await instance.get(`/doctors/${doctorId}/slots`, {
      params: { from, to },
    });

    return {
      slots: data.map((slot) => ({
        id: slot.id,
        date: slot.date,
        startTime: slot.startTime.slice(0, 5),
      })),
      derived: false,
    };
  } catch (error) {
    if (error.response?.status !== 404 && error.response?.status !== 405)
      throw error;
  }
  const rules = await getDoctorAvailabilities(doctorId);
  const slots = [];
  const now = new Date();

  for (
    let day = fromIsoDate(from);
    toIsoDate(day) <= to;
    day = addDays(day, 1)
  ) {
    const name = WEEK_DAYS_API[day.getDay()];

    rules
      .filter((rule) => rule.day.toUpperCase() === name)
      .forEach((rule) => {
        let [h, m] = rule.startTime.split(':').map(Number);
        const [eh, em] = rule.endTime.split(':').map(Number);

        while (h * 60 + m < eh * 60 + em) {
          const at = new Date(
            day.getFullYear(),
            day.getMonth(),
            day.getDate(),
            h,
            m
          );

          if (at > now)
            slots.push({
              id: null,
              date: toIsoDate(day),
              startTime: `${pad(h)}:${pad(m)}`,
            });

          m += 30;

          if (m >= 60) {
            h += 1;
            m -= 60;
          }
        }
      });
  }

  return { slots, derived: true };
}

// No hay GET por id en la API: se trae el día del turno y se busca ahí
export async function getAppointmentById({ id, date }) {
  const page = await getAppointmentsByDate({ date, pageSize: 1000 });
  const found = page.data.find((item) => item.id === id);

  if (!found) throw new Error('El turno indicado no existe.');

  return found;
}
