import { NavLink } from 'react-router-dom';
import {
  BriefcaseMedical,
  LayoutGrid,
  LogOut,
  SquarePlus,
  User,
} from 'lucide-react';
import adminPhoto from '../../../../assets/admin-user.jpg';

const LINKS = [
  { to: '/app', label: 'Tablero', icon: LayoutGrid, end: true },
  { to: '/app/doctors', label: 'Doctores', icon: BriefcaseMedical },
  { to: '/app/specialties', label: 'Especialidades', icon: SquarePlus },
  { to: '/app/appointments', label: 'Búsqueda de Pacientes', icon: User },
];

export default function Sidebar({ onLogout, userName, roleLabel }) {
  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-brand-100 bg-white">
      <div className="px-6 py-6">
        <p className="text-lg font-extrabold text-brand-900">Admin Portal</p>
        <p className="text-xs text-muted">Healthcare Management</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 border-l-4 px-3 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? 'border-brand-700 bg-brand-50 text-brand-700'
                  : 'border-transparent text-muted hover:bg-brand-50'
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1 border-t border-brand-100 px-3 py-4 text-sm font-semibold text-muted">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 px-3 py-2 hover:text-brand-700"
        >
          <LogOut className="h-4 w-4" /> Cerrar Sesión
        </button>
        <div className="mt-2 flex items-center gap-3 px-3 pt-3">
          <img
            src={adminPhoto}
            alt="Administrador"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="leading-tight">
            <p className="text-xs font-bold text-ink">{userName}</p>
            <p className="text-[10px] font-normal text-muted">{roleLabel}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
