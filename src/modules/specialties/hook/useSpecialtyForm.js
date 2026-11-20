import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getErrorMessage } from '../../../core/helpers/getErrorMessage';
import {
  createSpecialty,
  getSpecialties,
  updateSpecialty,
} from '../services/specialtyService';

export function useSpecialtyForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: '', description: '' } });

  useEffect(() => {
    if (!isEdit) return;

    const fill = (item) =>
      item &&
      reset({
        name: item.name,
        description: item.description,
      });

    if (state?.specialty) {
      fill(state.specialty);

      return;
    }

    getSpecialties({ pageSize: 1000 })
      .then((page) => fill(page.data.find((item) => item.id === id)))
      .catch((error) => setApiError(getErrorMessage(error)));
  }, [id, isEdit, state, reset]);

  const onSubmit = async (values) => {
    setApiError('');
    try {
      const body = {
        name: values.name.trim(),
        description: values.description.trim(),
      };

      if (isEdit) {
        await updateSpecialty(id, body);
      } else {
        await createSpecialty(body);
      }

      navigate('/app/specialties');
    } catch (error) {
      setApiError(getErrorMessage(error));
    }
  };

  return {
    isEdit,
    register,
    errors,
    isSubmitting,
    error: apiError,
    onSubmit: handleSubmit(onSubmit),
  };
}
