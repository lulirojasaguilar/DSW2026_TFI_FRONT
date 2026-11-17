import { ArrowRight, IdCard, Mail } from 'lucide-react';
import Button from '../../shared/components/atoms/Button';
import Alert from '../../shared/components/molecules/Alert';
import FormField, {
  IconInput,
} from '../../shared/components/molecules/FormField';
import { usePatientLogin } from '../hook/usePatientLogin';

// Organismo: formulario de login del paciente (correo + DNI)
export default function PatientLoginForm() {
  const { register, errors, isSubmitting, apiError, onSubmit } =
    usePatientLogin();

  return (
    <form onSubmit={onSubmit} noValidate className="mt-5 space-y-4 text-left">
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
          placeholder="ejemplo@correo.com"
          invalid={errors.email}
          {...register('email', {
            required: 'El correo es obligatorio.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Ingrese un correo válido.',
            },
          })}
        />
      </FormField>

      <FormField
        label="DNI / Número de Identificación"
        htmlFor="dni"
        error={errors.dni?.message}
      >
        <IconInput
          id="dni"
          icon={IdCard}
          inputMode="numeric"
          placeholder="Número de documento"
          invalid={errors.dni}
          {...register('dni', {
            required: 'El DNI es obligatorio.',
            pattern: {
              value: /^\d{7,8}$/,
              message: 'El DNI debe tener 7 u 8 dígitos.',
            },
          })}
        />
      </FormField>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Ingresando...' : 'Ingresar al Portal Médico'}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}
