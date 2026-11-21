import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ROLES } from '../../../core/constants';
import AdminLoginForm from '../components/organisms/AdminLoginForm';
import AuthShell from '../components/templates/AuthShell';
import { useAuth } from '../hook/useAuth';

export default function AdminLoginPage() {
  const { hasRole } = useAuth();

  if (hasRole(ROLES.ADMIN)) return <Navigate to="/app" replace />;

  return (
    <AuthShell
      footer={
        <Link
          to="/patient/login"
          className="mt-8 flex items-center gap-2 text-sm text-slate-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al Portal de Pacientes
        </Link>
      }
    >
      <AdminLoginForm />
    </AuthShell>
  );
}
