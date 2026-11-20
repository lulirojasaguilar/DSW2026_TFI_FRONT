import { useState } from 'react';
import { getErrorMessage } from '../helpers/getErrorMessage';

// Flujo de borrado lógico con confirmación.
// - remove(item): hace el DELETE
// - successMessage(item): texto cuando se borró bien
// - onRemoved(item): qué hacer al terminar bien (recargar, volver de página...)
// Si el backend rechaza el borrado (ej: 409 por turnos reservados), se muestra su mensaje.
export function useDeleteItem({ remove, successMessage, onRemoved }) {
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState({ type: 'success', text: '' });

  const confirm = async () => {
    setBusy(true);
    setFeedback({ type: 'success', text: '' });
    try {
      await remove(toDelete);
      setFeedback({ type: 'success', text: successMessage(toDelete) });
      onRemoved(toDelete);
    } catch (failure) {
      setFeedback({ type: 'error', text: getErrorMessage(failure) });
    } finally {
      setToDelete(null);
      setBusy(false);
    }
  };

  return {
    toDelete,
    busy,
    feedback,
    request: setToDelete,
    cancel: () => setToDelete(null),
    confirm,
  };
}
