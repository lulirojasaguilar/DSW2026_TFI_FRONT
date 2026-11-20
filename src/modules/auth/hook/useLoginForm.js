import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../shared/helpers/getErrorMessage';
import { useAuth } from './useAuth';

export function useLoginForm({
  authenticate,
  toSession,
  redirectTo,
  mapError = getErrorMessage,
}) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    setApiError('');
    try {
      const data = await authenticate(values);

      login(toSession(values, data));
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setApiError(mapError(error));
    }
  };

  return {
    register,
    errors,
    isSubmitting,
    apiError,
    onSubmit: handleSubmit(onSubmit),
  };
}
