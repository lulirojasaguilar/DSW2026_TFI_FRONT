import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Bell, BriefcaseMedical, Menu } from 'lucide-react';
import { useAuth } from '../../../auth/hook/useAuth';
import { userNameFromEmail } from '../../utils/user';

const LINKS = [
  { to: '/patient/book', label: 'Reservar Turno' },
  { to: '/patient', label: 'Mis Turnos', end: true },
];

const navClass = ({ isActive }) =>
  `rounded-lg px-4 py-2 text-sm font-semibold ${
    isActive ? 'bg-brand-900 text-white' : 'text-muted hover:text-brand-900'
  }`;

// Iniciales para el avatar: "maria.gomez" -> "MG"
const initialsOf = (name = '') =>
  name
    .split(/[.\s_-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

// Template del paciente: encabezado superior + contenido. Su home es "Mis turnos".
export default function PatientLayout() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const name = userNameFromEmail(session.email);

  const handleLogout = () => {
    logout();
    navigate('/patient/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-brand-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:gap-6">
          <Link
            to="/patient"
            className="flex items-center gap-3 font-extrabold text-brand-900"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-900 text-white">
              <BriefcaseMedical className="h-5 w-5" />
            </span>
            <span className="text-lg">Portal Salud</span>
          </Link>
          <nav className="hidden gap-2 md:flex">
            {LINKS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={navClass}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <Bell className="hidden h-5 w-5 text-muted md:block" />
            <span className="hidden h-8 w-px bg-brand-100 md:block" />
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
              {initialsOf(name)}
            </span>
            <span className="hidden text-sm font-bold text-ink md:inline">
              {name}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="hidden rounded-lg border border-brand-100 px-3 py-1.5 text-sm font-semibold text-muted hover:text-brand-700 md:block"
            >
              Salir
            </button>
            <button
              type="button"
              aria-label="Menú"
              onClick={() => setMenuOpen((open) => !open)}
              className="rounded-lg border border-brand-100 p-2 text-muted md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="flex flex-col gap-1 border-t border-brand-100 px-4 py-3 md:hidden">
            {LINKS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMenuOpen(false)}
                className={navClass}
              >
                {label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg px-4 py-2 text-left text-sm font-semibold text-muted"
            >
              Salir
            </button>
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-6xl p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}
