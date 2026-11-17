import { Navigate } from 'react-router-dom';
import { ROLES } from '../../shared/constants';
import PatientLoginForm from '../components/PatientLoginForm';
import { useAuth } from '../hook/useAuth';

// Página: encabezado y tarjeta del mockup + el formulario de login del paciente
export default function PatientLoginPage() {
  const { session } = useAuth();

  if (session?.role === ROLES.PATIENT) {
    return <Navigate to="/patient" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="flex items-center border-b border-brand-100 bg-white px-6 py-3 text-xs font-semibold text-muted">
        <span className="text-sm font-extrabold text-brand-900">MedPortal</span>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 pt-16 sm:pt-20">
        <div className="w-full max-w-xs rounded-md bg-white p-6 text-center shadow-lg">
          <p className="text-lg font-extrabold text-brand-900">MedPortal</p>
          <h1 className="mt-4 text-base font-bold text-ink">
            Acceso al Paciente
          </h1>
          <p className="mt-1 text-xs text-muted">
            Ingrese sus credenciales de identificación para continuar.
          </p>

          <PatientLoginForm />
        </div>
      </main>
    </div>
  );
}
