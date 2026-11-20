import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getErrorMessage } from '../../shared/helpers/getErrorMessage';
import { useApi } from '../../shared/hook/useApi';
import { getSpecialties } from '../../specialties/services/specialtyService';
import {
  createDoctor,
  getDoctors,
  updateDoctor,
} from '../services/doctorService';

// Lógica del alta / edición de doctor: carga del doctor (si se edita), especialidades y guardado
export function useDoctorForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', specialtyId: '', licenseNumber: '' },
  });

  const specialties = useApi(() => getSpecialties({ pageSize: 1000 }), []);
  const doctor = useApi(async () => {
    if (!isEdit) return null;

    const { data } = await getDoctors({ pageSize: 1000 });

    return data.find((item) => item.id === id) ?? null;
  }, [id]);

  // Al llegar el doctor a editar (y las especialidades) se cargan los valores en el form
  useEffect(() => {
    if (doctor.data && specialties.data) {
      reset({
        name: doctor.data.name,
        specialtyId: doctor.data.specialty?.id ?? '',
        licenseNumber: doctor.data.licenseNumber,
      });
    }
  }, [doctor.data, specialties.data, reset]);

  const onSubmit = async (values) => {
    setApiError('');
    try {
      const body = {
        name: values.name.trim(),
        licenseNumber: values.licenseNumber.trim(),
        specialtyId: values.specialtyId,
      };

      if (isEdit) {
        await updateDoctor(id, body);
      } else {
        await createDoctor(body);
      }

      navigate('/app/doctors');
    } catch (error) {
      setApiError(getErrorMessage(error));
    }
  };

  return {
    isEdit,
    register,
    errors,
    isSubmitting,
    onSubmit: handleSubmit(onSubmit),
    specialties: specialties.data?.data ?? [],
    error: apiError || specialties.error || doctor.error,
    notFound: isEdit && !doctor.loading && !doctor.data,
  };
}
