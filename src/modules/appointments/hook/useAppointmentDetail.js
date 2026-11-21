import { useParams, useSearchParams } from 'react-router-dom';
import { useApi } from '../../../core/hook/useApi';
import { getAppointmentById } from '../services/appointmentService';

export function useAppointmentDetail() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const date = params.get('date');

  return useApi(() => getAppointmentById({ id, date }), [id, date]);
}
