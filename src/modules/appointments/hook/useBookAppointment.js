import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../auth/hook/useAuth';
import { useSpecialtyOptions } from '../../specialties/hook/useSpecialtyOptions';
import { useDoctorsBySpecialty } from '../../doctors/hook/useDoctorsBySpecialty';
import { getErrorMessage } from '../../shared/helpers/getErrorMessage';
import {
  addDays,
  formatLongDate,
  mondayOf,
  toIsoDate,
} from '../../shared/utils/dates';
import {
  bookAppointment,
  getDoctorSlots,
} from '../services/appointmentService';

const MIN_REASON_LENGTH = 5;

// Sábado y domingo ya no hay turnos de esta semana: se muestra la siguiente
const initialWeekStart = () => {
  const today = new Date();
  const monday = mondayOf(today);

  return [0, 6].includes(today.getDay()) ? addDays(monday, 7) : monday;
};

// Toda la lógica de la pantalla "Reservar turno": filtros, turnos libres, selección y confirmación.
// La página solo dibuja; este hook es la abstracción de la que depende (DIP).
export function useBookAppointment() {
  const { session } = useAuth();
  const [specialtyId, setSpecialtyId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [weekStart, setWeekStart] = useState(initialWeekStart);
  const [searched, setSearched] = useState(false);
  const [slots, setSlots] = useState([]);
  const [derived, setDerived] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mobileDay, setMobileDay] = useState('');
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState('');
  const [booking, setBooking] = useState(false);
  const [message, setMessage] = useState({ type: 'error', text: '' });

  const specialties = useSpecialtyOptions();
  const doctors = useDoctorsBySpecialty(specialtyId);

  const doctorOptions = useMemo(() => doctors.data ?? [], [doctors.data]);
  const doctor = doctorOptions.find((item) => item.id === doctorId);
  const weekDays = useMemo(
    () => Array.from({ length: 5 }, (_, index) => addDays(weekStart, index)),
    [weekStart]
  );

  // keepMessage: después de reservar se recargan los turnos sin borrar el mensaje de éxito o de error
  const loadSlots = async (start = weekStart, keepMessage = false) => {
    setLoadingSlots(true);

    if (!keepMessage) {
      setMessage((current) => ({ ...current, text: '' }));
    }

    try {
      const { slots: found, derived: wasDerived } = await getDoctorSlots(
        doctorId,
        toIsoDate(start),
        toIsoDate(addDays(start, 4))
      );

      setSlots(found);
      setDerived(wasDerived);
      setSelected(null);
      setMobileDay(found[0]?.date ?? toIsoDate(start));
    } catch (error) {
      setMessage({ type: 'error', text: getErrorMessage(error) });
    } finally {
      setLoadingSlots(false);
    }
  };

  // Al cambiar de semana se vuelven a pedir los turnos del médico elegido
  useEffect(() => {
    if (searched && doctorId) loadSlots(weekStart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekStart]);

  const changeSpecialty = (id) => {
    setSpecialtyId(id);
    setDoctorId('');
    setSearched(false);
  };

  const changeDoctor = (id) => {
    setDoctorId(id);
    setSearched(false);
  };

  const search = () => {
    if (!doctorId) {
      setMessage({
        type: 'error',
        text: 'Seleccione una especialidad y un doctor.',
      });

      return;
    }

    setSearched(true);
    loadSlots();
  };

  const confirm = async () => {
    if (reason.trim().length < MIN_REASON_LENGTH) {
      setReasonError(
        `Indique el motivo de la consulta (mínimo ${MIN_REASON_LENGTH} caracteres).`
      );

      return;
    }

    if (!selected.id) {
      setMessage({
        type: 'error',
        text: 'Este turno no se puede reservar: el backend debe exponer GET /api/doctors/{id}/slots con el id de cada turno.',
      });

      return;
    }

    setReasonError('');
    setBooking(true);
    try {
      await bookAppointment({
        doctorId,
        availabilitySlotId: selected.id,
        dni: session.dni,
        reason: reason.trim(),
      });
      setMessage({
        type: 'success',
        text: `Turno confirmado para el ${formatLongDate(selected.date)}, ${selected.startTime} hs.`,
      });
      setReason('');
    } catch (error) {
      setMessage({ type: 'error', text: getErrorMessage(error) });
    } finally {
      setBooking(false);
    }

    await loadSlots(weekStart, true);
  };

  const changeReason = (value) => {
    setReason(value);
    setReasonError('');
  };

  return {
    filters: {
      specialties: specialties.data ?? [],
      doctors: doctorOptions,
      specialtyId,
      doctorId,
      onSpecialtyChange: changeSpecialty,
      onDoctorChange: changeDoctor,
      onSearch: search,
      searching: loadingSlots,
    },
    doctor,
    searched,
    weekDays,
    slots,
    derived,
    loadingSlots,
    selected,
    onSelectSlot: setSelected,
    mobileDay,
    onMobileDayChange: setMobileDay,
    onWeekChange: (offsetDays) => setWeekStart(addDays(weekStart, offsetDays)),
    summary: {
      selected,
      reason,
      reasonError,
      booking,
      onReasonChange: changeReason,
      onConfirm: confirm,
    },
    message,
    loadError: specialties.error || doctors.error,
    // Especialidad elegida sin doctores: el backend responde DOCTORS_NOT_FOUND
    noDoctorsText:
      specialtyId && !doctors.loading && !doctors.error && !doctorOptions.length
        ? 'No hay doctores relacionados con esta especialidad.'
        : '',
  };
}
