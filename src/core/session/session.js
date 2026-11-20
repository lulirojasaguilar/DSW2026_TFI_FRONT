const SESSION_KEY = 'medportal_session';

export const SESSION_EXPIRED_EVENT = 'medportal:session-expired';

export function getTokenExpiry(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const { exp } = JSON.parse(atob(payload));

    return typeof exp === 'number' ? exp * 1000 : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));

    if (!session?.token || !session?.role) return null;

    const expiry = getTokenExpiry(session.token);

    if (expiry !== null && expiry <= Date.now()) {
      clearSession();

      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}
