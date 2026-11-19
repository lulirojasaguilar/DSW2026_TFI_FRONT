import { useCallback, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  clearSession,
  getSession,
  saveSession,
} from '../../shared/session/session';

export function AuthProvider({ children }) {
  const [session, setSession] = useState(getSession);

  const login = useCallback((data) => {
    saveSession(data);
    setSession(data);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ session, isAuthenticated: Boolean(session), login, logout }),
    [session, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
