import { Link, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROLES } from '../../shared/constants';
import AuthShell from '../components/templates/AuthShell';
import PatientLoginForm from '../components/organisms/PatientLoginForm';
import { useAuth } from '../hook/useAuth';

export default function PatientLoginPage() {
  const { hasRole } = useAuth();

  if (hasRole(ROLES.PATIENT)) {
    return <Navigate to="/patient" replace />;
  }

  return (
    <AuthShell
      footer={
        <Link
          to="/login"
          className="mt-8 flex items-center gap-2 text-sm text-slate-300 hover:text-white"
        >
          ¿Es personal administrativo o médico? Ingrese aquí{' '}
          <ArrowRight className="h-4 w-4" />
        </Link>
      }
    >
      <div className="w-full max-w-[460px] rounded-2xl bg-white px-6 py-8 shadow-2xl sm:px-8">
        <h1 className="text-2xl font-bold text-brand-900">
          Portal del Paciente
        </h1>
        <p className="mt-2 text-sm text-muted">
          Inicia sesión para reservar y consultar tus turnos médicos
        </p>

        <PatientLoginForm />
      </div>
    </AuthShell>
  );
}
