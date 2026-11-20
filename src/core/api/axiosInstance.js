import axios from 'axios';
import {
  clearSession,
  getSession,
  SESSION_EXPIRED_EVENT,
} from '../session/session';

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

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginCall = error.config?.url?.includes('/auth/');

    if (error.response?.status === 401 && !isLoginCall) {
      clearSession();
      window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
    }

    return Promise.reject(error);
  }
);

export { instance };
