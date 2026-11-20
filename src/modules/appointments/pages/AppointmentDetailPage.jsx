import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Spinner from '../../shared/components/atoms/Spinner';
import Alert from '../../shared/components/molecules/Alert';
import Breadcrumb from '../../shared/components/molecules/Breadcrumb';
import PageHeader from '../../shared/components/molecules/PageHeader';
import AppointmentDetail from '../components/organisms/AppointmentDetail';
import { useAppointmentDetail } from '../hook/useAppointmentDetail';

export default function AppointmentDetailPage() {
  const detail = useAppointmentDetail();

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Búsqueda de Pacientes', to: '/app/appointments' },
          { label: 'Detalle de la Cita' },
        ]}
      />
      <PageHeader
        title="Detalle de la Cita"
        subtitle="Información completa del turno seleccionado."
      >
        <Link
          to="/app/appointments"
          className="inline-flex items-center gap-2 rounded-md border border-brand-700 bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a la búsqueda
        </Link>
      </PageHeader>

      <Alert>{detail.error}</Alert>
      {detail.loading && <Spinner />}
      {detail.data && <AppointmentDetail appointment={detail.data} />}
    </>
  );
}
