import { useApi } from '../../shared/hook/useApi';
import { getDoctorsBySpecialty } from '../services/doctorService';

// Doctores de una especialidad (sin paginar). Sin especialidad trae todos.
export function useDoctorsBySpecialty(specialtyId) {
  return useApi(() => getDoctorsBySpecialty(specialtyId), [specialtyId]);
}
