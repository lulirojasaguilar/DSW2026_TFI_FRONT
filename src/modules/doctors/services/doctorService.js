import { instance } from '../../shared/api/axiosInstance';
import { ERROR_CODES } from '../../shared/constants';

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

// Borrado lógico (deleted = true)
export const deleteDoctor = (id) =>
  instance.delete(`/doctors/${id}`).then((res) => res.data);

// Doctores de una especialidad, sin paginar (GET /specialties/{id}/doctors).
// Si la especialidad no tiene doctores el backend responde 404 DOCTORS_NOT_FOUND:
// se devuelve una lista vacía y la pantalla muestra "no hay doctores relacionados".
// Sin especialidad se traen todos los doctores.
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

// POST crea las disponibilidades; PUT sobreescribe las futuras no reservadas
export const saveAvailabilities = (body, exists) =>
  (exists
    ? instance.put('/availabilities', body)
    : instance.post('/availabilities', body)
  ).then((res) => res.data);
