const SESSION_KEY = 'medportal_session';

export function getSession() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));

    return session?.token && session?.role ? session : null;
  } catch {
    return null;
  }
}

export function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
