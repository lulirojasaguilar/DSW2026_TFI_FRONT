import { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck } from 'lucide-react';
import Button from '../../../shared/components/atoms/Button';
import Alert from '../../../shared/components/molecules/Alert';
import FormField, {
  IconInput,
} from '../../../shared/components/molecules/FormField';
import { useAdminLogin } from '../../hook/useAdminLogin';

export default function AdminLoginForm() {
  const { register, errors, isSubmitting, apiError, onSubmit } =
    useAdminLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[460px] overflow-hidden rounded-2xl bg-white shadow-2xl">
      <form
        onSubmit={onSubmit}
        noValidate
        className="space-y-5 px-6 py-8 sm:px-8"
      >
        <div>
          <h1 className="text-2xl font-bold text-brand-900">
            Bienvenido de nuevo
          </h1>
          <p className="mt-2 text-sm text-muted">
            Por favor, autentíquese para acceder al portal de proveedores.
          </p>
        </div>

        <Alert>{apiError}</Alert>

        <FormField
          label="Correo Electrónico"
          htmlFor="email"
          error={errors.email?.message}
        >
          <IconInput
            id="email"
            icon={Mail}
            type="email"
            autoComplete="username"
            placeholder="admin@medportal.com"
            invalid={errors.email}
            {...register('email', {
              required: 'El correo es obligatorio.',
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
          className="h-12 w-full rounded-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Ingresando...' : 'Iniciar Sesión'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <div className="flex gap-3 border-t border-brand-100 bg-brand-50 px-6 py-5 text-sm leading-relaxed text-muted sm:px-8">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" />
        <p>
          <strong className="text-ink">Solo Acceso Seguro:</strong> Este sistema
          es para personal médico autorizado. Los intentos de acceso no
          autorizados son registrados y monitoreados para su cumplimiento.
        </p>
      </div>
    </div>
  );
}
