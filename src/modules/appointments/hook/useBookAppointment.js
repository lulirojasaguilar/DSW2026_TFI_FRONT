import { useMemo, useState } from 'react';
import { useAuth } from '../../auth/hook/useAuth';
import { useSpecialtyOptions } from '../../specialties/hook/useSpecialtyOptions';
import { useDoctorsBySpecialty } from '../../doctors/hook/useDoctorsBySpecialty';
import { useBookingForm } from './useBookingForm';
import { useWeekSlots } from './useWeekSlots';

export function useBookAppointment() {
  const { session } = useAuth();
  const [specialtyId, setSpecialtyId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [message, setMessage] = useState({ type: 'error', text: '' });

  const specialties = useSpecialtyOptions();
  const doctors = useDoctorsBySpecialty(specialtyId);

  const doctorOptions = useMemo(() => doctors.data ?? [], [doctors.data]);
  const doctor = doctorOptions.find((item) => item.id === doctorId);

  const week = useWeekSlots(doctorId, {
    onStart: () => setMessage((current) => ({ ...current, text: '' })),
    onError: (text) => setMessage({ type: 'error', text }),
  });

  const form = useBookingForm({
    doctorId,
    selected: week.selected,
    dni: session.dni,
    onMessage: setMessage,
    onFinished: week.reload,
  });

  const changeSpecialty = (id) => {
    setSpecialtyId(id);
    setDoctorId('');
    week.resetSearch();
  };

  const changeDoctor = (id) => {
    setDoctorId(id);
    week.resetSearch();
  };

  const search = () => {
    if (!doctorId) {
      setMessage({
        type: 'error',
        text: 'Seleccione una especialidad y un doctor.',
      });

      return;
    }

    week.search();
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
      searching: week.loading,
    },
    doctor,
    searched: week.searched,
    weekDays: week.weekDays,
    slotsOf: week.slotsOf,
    loadingSlots: week.loading,
    selected: week.selected,
    onSelectSlot: week.select,
    mobileDay: week.mobileDay,
    onMobileDayChange: week.setMobileDay,
    onWeekChange: week.changeWeek,
    onNextWeek: week.nextWeek,
    summary: { selected: week.selected, ...form },
    message,
    loadError: specialties.error || doctors.error,

    noDoctorsText:
      specialtyId && !doctors.loading && !doctors.error && !doctorOptions.length
        ? 'No hay doctores relacionados con esta especialidad.'
        : '',
  };
}
