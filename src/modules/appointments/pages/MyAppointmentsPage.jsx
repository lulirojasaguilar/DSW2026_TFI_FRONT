import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Alert from '../../shared/components/molecules/Alert';
import ConfirmDialog from '../../shared/components/molecules/ConfirmDialog';
import Spinner from '../../shared/components/atoms/Spinner';
import AppointmentCard from '../components/AppointmentCard';
import { useMyAppointments } from '../hook/useMyAppointments';

// Home del paciente ("Mis Turnos Médicos"): una tarjeta por turno activo
export default function MyAppointmentsPage() {
  const mine = useMyAppointments();
  const { appointments } = mine;
  const rows = appointments.data ?? [];

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-brand-900">
            Mis Turnos Médicos
          </h1>
          <p className="mt-1 text-muted">
            Consulta y gestiona las citas médicas programadas.
          </p>
        </div>
        <Link
          to="/patient/book"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-brand-900 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800"
        >
          <Plus className="h-4 w-4" /> Solicitar Nuevo Turno
        </Link>
      </div>

      <div className="mb-4 space-y-3">
        <Alert type={mine.message.type}>{mine.message.text}</Alert>
        <Alert>{appointments.error}</Alert>
      </div>

      {appointments.loading && <Spinner />}
      {!appointments.loading && rows.length === 0 && !appointments.error && (
        <p className="rounded-xl border border-brand-100 bg-white p-6 text-muted">
          No tiene turnos activos.
        </p>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {rows.map((item) => (
          <AppointmentCard
            key={item.id}
            item={item}
            onCancel={mine.onRequestCancel}
          />
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(mine.toCancel)}
        title="Cancelar turno"
        message="¿Seguro que desea cancelar este turno?"
        confirmLabel="Sí, cancelar"
        busy={mine.busy}
        onConfirm={mine.onConfirmCancel}
        onCancel={mine.onDismissCancel}
      />
    </>
  );
}
