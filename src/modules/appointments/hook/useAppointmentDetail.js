import { useParams, useSearchParams } from 'react-router-dom';
import { useApi } from '../../shared/hook/useApi';
import { getAppointmentById } from '../services/appointmentService';

// Lógica de "Ver Detalle": el id va en la ruta y la fecha del turno en la query (?date=)
export function useAppointmentDetail() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const date = params.get('date');

  return useApi(() => getAppointmentById({ id, date }), [id, date]);
}
