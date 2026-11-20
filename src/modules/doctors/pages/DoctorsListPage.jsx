import { Link } from 'react-router-dom';
import { Clock, UserPlus } from 'lucide-react';
import Button from '../../shared/components/atoms/Button';
import Alert from '../../shared/components/molecules/Alert';
import ConfirmDialog from '../../shared/components/molecules/ConfirmDialog';
import PageHeader from '../../shared/components/molecules/PageHeader';
import SearchInput from '../../shared/components/molecules/SearchInput';
import Table from '../../shared/components/organisms/Table';
import { doctorColumns } from './components/doctorColumns';
import { useDoctorsList } from '../hook/useDoctorsList';

// Página: compone los componentes con lo que expone el hook
export default function DoctorsListPage() {
  const list = useDoctorsList();
  const { doctors, deletion } = list;
  const columns = doctorColumns({ onDelete: deletion.request });

  return (
    <>
      <PageHeader
        title="Directorio de Doctores"
        subtitle="Gestione el personal médico y supervise su disponibilidad actual."
      >
        <SearchInput
          value={list.search}
          onChange={list.onSearch}
          placeholder="Buscar doctor por nombre..."
          className="w-64"
        />
        <Link to="/app/doctors/schedule">
          <Button variant="dark" className="text-xs">
            <Clock className="h-4 w-4" /> Agregar Disponibilidad Horaria
          </Button>
        </Link>
        <Link to="/app/doctors/new">
          <Button variant="dark" className="text-xs">
            <UserPlus className="h-4 w-4" /> Nuevo Doctor
          </Button>
        </Link>
      </PageHeader>

      <div className="mb-4 space-y-3">
        <Alert type={deletion.feedback.type}>{deletion.feedback.text}</Alert>
        <Alert>{doctors.error}</Alert>
      </div>

      <section className="overflow-hidden rounded-lg border border-brand-100 bg-white shadow-sm">
        <h2 className="p-5 text-sm font-bold text-brand-900">
          Registros de Doctores
        </h2>
        <Table
          columns={columns}
          rows={doctors.data?.data ?? []}
          loading={doctors.loading}
          emptyMessage="No se encontraron doctores."
          pagination={{
            pageIndex: list.pageIndex,
            pageSize: list.pageSize,
            total: doctors.data?.total ?? 0,
            onChange: list.onPageChange,
            noun: 'doctores registrados',
            numbered: true,
          }}
        />
      </section>

      <ConfirmDialog
        open={Boolean(deletion.toDelete)}
        title="Eliminar doctor"
        message={`¿Seguro que desea eliminar a ${deletion.toDelete?.name}? Dejará de aparecer en los listados.`}
        busy={deletion.busy}
        onConfirm={deletion.confirm}
        onCancel={deletion.cancel}
      />
    </>
  );
}
