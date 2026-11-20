// "admin@dsw2026.com" -> "admin" (el nombre visible sale de la sesión, no está escrito en el código)
export const userNameFromEmail = (email = '') => email.split('@')[0];
