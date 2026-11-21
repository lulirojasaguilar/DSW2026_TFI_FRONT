const SESSION_KEY = 'medportal_session';

export const SESSION_EXPIRED_EVENT = 'medportal:session-expired';

const ROLE_CLAIMS = [
  'role',
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
];

function readPayload(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');

    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function getTokenExpiry(token) {
  const exp = readPayload(token)?.exp;

  return typeof exp === 'number' ? exp * 1000 : null;
}

export function getTokenRole(token) {
  const payload = readPayload(token);
  const claim = ROLE_CLAIMS.map((name) => payload?.[name]).find(Boolean);
  const role = Array.isArray(claim) ? claim[0] : claim;

  return role ? String(role).toUpperCase() : null;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));

    if (!session?.token || !session?.role) return null;

    const expiry = getTokenExpiry(session.token);
    const tokenRole = getTokenRole(session.token);

    if (
      (expiry !== null && expiry <= Date.now()) ||
      (tokenRole !== null && tokenRole !== String(session.role).toUpperCase())
    ) {
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
