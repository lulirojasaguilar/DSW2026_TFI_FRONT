import { useState } from 'react';
import { useAuth } from '../../auth/hook/useAuth';
import { getErrorMessage } from '../../../core/helpers/getErrorMessage';
import { useApi } from '../../shared/hook/useApi';
import {
  cancelAppointment,
  getPatientAppointments,
} from '../services/appointmentService';

export function useMyAppointments() {
  const { session } = useAuth();
  const [toCancel, setToCancel] = useState(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState({ type: 'success', text: '' });
  const appointments = useApi(
    () => getPatientAppointments(session.dni),
    [session.dni]
  );

  const confirmCancel = async () => {
    setBusy(true);
    try {
      await cancelAppointment(toCancel.id);
      setMessage({
        type: 'success',
        text: 'El turno fue cancelado y el horario quedó disponible nuevamente.',
      });
      appointments.reload();
    } catch (error) {
      setMessage({ type: 'error', text: getErrorMessage(error) });
    } finally {
      setToCancel(null);
      setBusy(false);
    }
  };

  return {
    appointments,
    message,
    toCancel,
    busy,
    onRequestCancel: setToCancel,
    onDismissCancel: () => setToCancel(null),
    onConfirmCancel: confirmCancel,
  };
}
