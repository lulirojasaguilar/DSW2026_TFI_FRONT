import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import Button from '../../shared/components/atoms/Button';
import { HOME_BY_ROLE } from '../../shared/constants';
import { useAuth } from '../hook/useAuth';

export default function AccessDeniedPage() {
  const { role, isAuthenticated, logout } = useAuth();
  const home = HOME_BY_ROLE[role] ?? '/login';

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 text-center shadow-lg">
        <ShieldAlert className="mx-auto h-10 w-10 text-brand-700" />
        <h1 className="mt-4 text-lg font-extrabold text-brand-900">
          Acceso denegado
        </h1>
        <p className="mt-2 text-sm text-muted">
          Su usuario no tiene permisos para ver esta página.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Link to={home}>
            <Button variant="dark" className="w-full">
              Volver a mi inicio
            </Button>
          </Link>
          {isAuthenticated && (
            <Button variant="ghost" onClick={logout}>
              Cerrar sesión
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
