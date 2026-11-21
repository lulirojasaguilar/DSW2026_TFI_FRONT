import { instance } from '../../../core/api/axiosInstance';
import { ERROR_CODES } from '../../../core/constants';

export const getDoctors = ({ pageSize = 10, pageIndex = 1, name } = {}) =>
  instance
    .get('/doctors', {
      params: { pageSize, pageIndex, name: name || undefined },
    })
    .then((res) => res.data);

export const createDoctor = (body) =>
  instance.post('/doctors', body).then((res) => res.data);

export const updateDoctor = (id, body) =>
  instance.put(`/doctors/${id}`, body).then((res) => res.data);

export const deleteDoctor = (id) =>
  instance.delete(`/doctors/${id}`).then((res) => res.data);

export async function getDoctorsBySpecialty(specialtyId) {
  if (!specialtyId) {
    const { data } = await getDoctors({ pageSize: 1000 });

    return data;
  }

  try {
    const { data } = await instance.get(`/specialties/${specialtyId}/doctors`);

    return data;
  } catch (error) {
    if (error.response?.data?.errorCode === ERROR_CODES.DOCTORS_NOT_FOUND) {
      return [];
    }

    throw error;
  }
}

export const getDoctorAvailabilities = (id) =>
  instance.get(`/doctors/${id}/availabilities`).then((res) => res.data);

export const saveAvailabilities = (body, exists) =>
  (exists
    ? instance.put('/availabilities', body)
    : instance.post('/availabilities', body)
  ).then((res) => res.data);
