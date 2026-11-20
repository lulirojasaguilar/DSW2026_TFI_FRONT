import { instance } from '../../../core/api/axiosInstance';

export const getSpecialties = ({ pageSize = 10, pageIndex = 1, name } = {}) =>
  instance
    .get('/specialties', {
      params: { pageSize, pageIndex, name: name || undefined },
    })
    .then((res) => res.data);

export const createSpecialty = (body) =>
  instance.post('/specialties', body).then((res) => res.data);

export const updateSpecialty = (id, body) =>
  instance.put(`/specialties/${id}`, body).then((res) => res.data);

export const deleteSpecialty = (id) =>
  instance.delete(`/specialties/${id}`).then((res) => res.data);
