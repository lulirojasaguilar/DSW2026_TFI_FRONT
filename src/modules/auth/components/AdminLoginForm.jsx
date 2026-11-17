import { useState } from 'react';
import {
  CircleUser,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  ShieldCheck,
} from 'lucide-react';
import Button from '../../shared/components/atoms/Button';
import Alert from '../../shared/components/molecules/Alert';
import FormField, {
  IconInput,
} from '../../shared/components/molecules/FormField';
import { useAdminLogin } from '../hook/useAdminLogin';

// Organismo: tarjeta blanca del login de administrador (formulario + aviso de seguridad)
export default function AdminLoginForm() {
  const { register, errors, isSubmitting, apiError, onSubmit } =
    useAdminLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full max-w-[420px] overflow-hidden rounded-sm bg-white shadow-2xl">
      <form
        onSubmit={onSubmit}
        noValidate
        className="space-y-4 px-5 py-6 sm:px-8 sm:pb-6 sm:pt-8"
      >
        <div>
          <h1 className="text-sm font-medium text-[#00355f]">
            Bienvenido de nuevo
          </h1>
          <p className="mt-2 text-[15px] leading-6 text-[#1d2630]">
            Por favor, autentíquese para acceder al portal de proveedores.
          </p>
        </div>

        <Alert>{apiError}</Alert>

        <FormField
          label="Nombre de usuario"
          htmlFor="email"
          error={errors.email?.message}
        >
          <IconInput
            id="email"
            icon={CircleUser}
            type="email"
            autoComplete="username"
            placeholder="Ingrese ID de admin"
            invalid={errors.email}
            {...register('email', {
              required: 'El usuario es obligatorio.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Ingrese un email válido.',
              },
            })}
          />
        </FormField>

        <FormField
          label="Contraseña"
          htmlFor="password"
          error={errors.password?.message}
        >
          <IconInput
            id="password"
            icon={Lock}
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            invalid={errors.password}
            right={
              <button
                type="button"
                aria-label={
                  showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                }
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
            {...register('password', {
              required: 'La contraseña es obligatoria.',
              minLength: { value: 8, message: 'Mínimo 8 caracteres.' },
            })}
          />
        </FormField>

        <Button
          type="submit"
          variant="dark"
          className="h-[52px] w-full rounded-[3px] bg-[#00355f] shadow-md hover:bg-[#002a4c] active:scale-[0.97]"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Ingresando...' : 'Iniciar Sesión'}
          <LogIn className="h-4 w-4" />
        </Button>
      </form>

      <div className="flex gap-3 border-t border-[#c9dcea] bg-[#e6f6ff] px-5 py-5 text-sm leading-relaxed text-[#1d2630] sm:px-8">
        <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[#0b6ba0]" />
        <p>
          <strong className="text-black">Solo Acceso Seguro:</strong> Este
          sistema es para personal médico autorizado. Los intentos de acceso no
          autorizados son registrados y monitoreados para su cumplimiento.
        </p>
      </div>
    </div>
  );
}
