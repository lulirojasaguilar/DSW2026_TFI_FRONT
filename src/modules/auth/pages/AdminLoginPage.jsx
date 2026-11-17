import { Navigate } from 'react-router-dom';
import { ShieldPlus } from 'lucide-react';
import { ROLES } from '../../shared/constants';
import AdminLoginForm from '../components/AdminLoginForm';
import { useAuth } from '../hook/useAuth';

// Página: fondo y marca del mockup + el formulario de login
export default function AdminLoginPage() {
  const { session } = useAuth();

  if (session?.role === ROLES.ADMIN) return <Navigate to="/app" replace />;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,#0a4479_0%,#06325e_42%,#011f3c_100%)] px-4 py-10">
      {/* Anillos concéntricos y cuadrícula tenue del fondo del mockup */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-radial-gradient(circle_at_center,transparent_0,transparent_90px,rgba(255,255,255,0.035)_91px,transparent_93px)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:130px_130px] [mask-image:radial-gradient(circle_at_top_left,black,transparent_45%)]"
      />
      <div className="relative mb-8 flex flex-col items-center gap-3 text-white">
        <span className="flex h-14 w-12 items-center justify-center rounded-md bg-white text-[#00355f]">
          <ShieldPlus className="h-7 w-7" />
        </span>
        <span className="text-3xl font-medium">MedPortal</span>
      </div>

      <AdminLoginForm />
    </div>
  );
}
