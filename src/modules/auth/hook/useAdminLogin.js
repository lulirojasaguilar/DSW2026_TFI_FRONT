import { getErrorMessage } from '../../shared/helpers/getErrorMessage';
import { loginAdmin } from '../services/authService';
import { useLoginForm } from './useLoginForm';

const WRONG_CREDENTIALS = [400, 401];

export function useAdminLogin() {
  return useLoginForm({
    authenticate: loginAdmin,
    toSession: (values, data) => ({ ...data, email: values.email }),
    redirectTo: '/app',
    mapError: (error) =>
      WRONG_CREDENTIALS.includes(error.response?.status)
        ? 'Credenciales incorrectas. Verifique su usuario y contraseña.'
        : getErrorMessage(error),
  });
}
