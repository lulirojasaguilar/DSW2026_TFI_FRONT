import { instance } from '../../shared/api/axiosInstance';

export const loginAdmin = ({ email, password }) =>
  instance
    .post('/auth/admin/login', { email, password })
    .then((res) => res.data);

export const loginPatient = ({ email, dni }) =>
  instance
    .post('/auth/patient/login', { email, dni: Number(dni) })
    .then((res) => res.data);

