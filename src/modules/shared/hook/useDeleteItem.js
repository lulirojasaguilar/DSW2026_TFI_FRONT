import { useState } from 'react';
import { getErrorMessage } from '../../../core/helpers/getErrorMessage';

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
