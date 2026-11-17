import axios from 'axios';
import { clearSession, getSession } from '../session/session';
import { LOGIN_BY_ROLE } from '../constants';


const instance = axios.create({ baseURL: '/api' });

instance.interceptors.request.use(
  (config) => {
    const session = getSession();

    if (session) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Token vencido o inválido: se limpia la sesión y se vuelve al login que corresponda
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginCall = error.config?.url?.includes('/auth/');

    if (error.response?.status === 401 && !isLoginCall) {
      const session = getSession();

      clearSession();
      window.location.href = LOGIN_BY_ROLE[session?.role] ?? '/login';
    }

    return Promise.reject(error);
  }
);

export { instance };
