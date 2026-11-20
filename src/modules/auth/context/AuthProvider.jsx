import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  clearSession,
  getSession,
  getTokenExpiry,
  saveSession,
  SESSION_EXPIRED_EVENT,
} from '../../../core/session/session';

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

  useEffect(() => {
    window.addEventListener(SESSION_EXPIRED_EVENT, logout);

    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, logout);
  }, [logout]);

  useEffect(() => {
    const expiry = session ? getTokenExpiry(session.token) : null;

    if (expiry === null) return undefined;

    const timer = setTimeout(logout, Math.max(expiry - Date.now(), 0));

    return () => clearTimeout(timer);
  }, [session, logout]);

  const hasRole = useCallback(
    (...roles) => roles.includes(session?.role),
    [session]
  );

  const value = useMemo(
    () => ({
      session,
      role: session?.role ?? null,
      isAuthenticated: Boolean(session),
      hasRole,
      login,
      logout,
    }),
    [session, hasRole, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
