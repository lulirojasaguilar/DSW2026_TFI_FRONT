import { loginPatient } from '../services/authService';
import { useLoginForm } from './useLoginForm';

export function usePatientLogin() {
  return useLoginForm({
    authenticate: loginPatient,
    toSession: (values, data) => ({
      ...data,
      email: values.email,
      dni: Number(values.dni),
    }),
    redirectTo: '/patient',
  });
}
