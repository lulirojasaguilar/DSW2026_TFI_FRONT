import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Button from '../../shared/components/atoms/Button';
import Alert from '../../shared/components/molecules/Alert';
import ConfirmDialog from '../../shared/components/molecules/ConfirmDialog';
import PageHeader from '../../shared/components/molecules/PageHeader';
import SearchInput from '../../shared/components/molecules/SearchInput';
import Table from '../../shared/components/organisms/Table';
import { specialtyColumns } from '../components/specialtyColumns';
import { useSpecialtiesList } from '../hook/useSpecialtiesList';

export default function SpecialtiesListPage() {
  const list = useSpecialtiesList();
  const { specialties, deletion } = list;
  const columns = specialtyColumns({ onDelete: deletion.request });

  return (
    <>
      <PageHeader
        title="Directorio de Especialidades"
        subtitle="Administre las categorías médicas, servicios y disponibilidad del personal especializado."
      >
        <SearchInput
          value={list.search}
          onChange={list.onSearch}
          placeholder="Buscar especialidad..."
          className="w-60"
        />
        <Link to="/app/specialties/new">
          <Button variant="dark">
            <Plus className="h-4 w-4" /> Nueva Especialidad
          </Button>
        </Link>
      </PageHeader>

      <div className="mb-4 space-y-3">
        <Alert type={deletion.feedback.type}>{deletion.feedback.text}</Alert>
        <Alert>{specialties.error}</Alert>
      </div>

      <section className="overflow-hidden rounded-lg border border-brand-100 bg-white shadow-sm">
        <h2 className="p-5 text-sm font-bold text-brand-900">
          Registros de Especialidades
        </h2>
        <Table
          columns={columns}
          rows={specialties.data?.data ?? []}
          loading={specialties.loading}
          emptyMessage="No se encontraron especialidades."
          pagination={{
            pageIndex: list.pageIndex,
            pageSize: list.pageSize,
            total: specialties.data?.total ?? 0,
            onChange: list.onPageChange,
            noun: 'especialidades',
          }}
        />
      </section>

      <ConfirmDialog
        open={Boolean(deletion.toDelete)}
        title="Eliminar especialidad"
        message={`¿Seguro que desea eliminar la especialidad ${deletion.toDelete?.name}?`}
        busy={deletion.busy}
        onConfirm={deletion.confirm}
        onCancel={deletion.cancel}
      />
    </>
  );
}
