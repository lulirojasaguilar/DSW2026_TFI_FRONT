import { getAppointmentsByDate } from '../../appointments/services/appointmentService';
import { getDoctors } from '../../doctors/services/doctorService';
import { useApi } from '../../../core/hook/useApi';
import { toIsoDate } from '../../../core/utils/dates';
import { getSpecialties } from '../../specialties/services/specialtyService';

const loadTotals = async () => {
  const [allDoctors, allSpecialties, today] = await Promise.all([
    getDoctors({ pageSize: 1000 }),
    getSpecialties({ pageSize: 1000 }),
    getAppointmentsByDate({ date: toIsoDate(new Date()), pageSize: 100 }),
  ]);

  return {
    doctors: allDoctors.total,
    specialties: allSpecialties.total,
    confirmedToday: today.data.filter((item) => item.status === 'BOOKED')
      .length,
  };
};

export function useDashboardTotals() {
  return useApi(loadTotals, []);
}
