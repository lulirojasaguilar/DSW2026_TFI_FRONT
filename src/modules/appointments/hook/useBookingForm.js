import { useState } from 'react';
import { getErrorMessage } from '../../../core/helpers/getErrorMessage';
import { formatLongDate } from '../../shared/utils/dates';
import { bookAppointment } from '../services/appointmentService';

const MIN_REASON_LENGTH = 5;

export function useBookingForm({
  doctorId,
  selected,
  dni,
  onMessage,
  onFinished,
}) {
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState('');
  const [booking, setBooking] = useState(false);

  const changeReason = (value) => {
    setReason(value);
    setReasonError('');
  };

  const confirm = async () => {
    if (reason.trim().length < MIN_REASON_LENGTH) {
      setReasonError(
        `Indique el motivo de la consulta (mínimo ${MIN_REASON_LENGTH} caracteres).`
      );

      return;
    }

    if (!selected.id) {
      onMessage({
        type: 'error',
        text: 'No se pudo reservar este turno. Actualice la búsqueda e intente nuevamente.',
      });

      return;
    }

    setReasonError('');
    setBooking(true);
    try {
      await bookAppointment({
        doctorId,
        availabilitySlotId: selected.id,
        dni,
        reason: reason.trim(),
      });
      onMessage({
        type: 'success',
        text: `Turno confirmado para el ${formatLongDate(selected.date)}, ${selected.startTime} hs.`,
      });
      setReason('');
    } catch (error) {
      onMessage({ type: 'error', text: getErrorMessage(error) });
    } finally {
      setBooking(false);
    }

    await onFinished();
  };

  return {
    reason,
    reasonError,
    booking,
    onReasonChange: changeReason,
    onConfirm: confirm,
  };
}
