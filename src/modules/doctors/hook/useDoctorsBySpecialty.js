import { useApi } from '../../../core/hook/useApi';
import { getDoctorsBySpecialty } from '../services/doctorService';

export function useDoctorsBySpecialty(specialtyId) {
  return useApi(() => getDoctorsBySpecialty(specialtyId), [specialtyId]);
}
