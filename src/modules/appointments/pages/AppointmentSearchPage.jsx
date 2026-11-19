import Alert from '../../shared/components/molecules/Alert';
import PageHeader from '../../shared/components/molecules/PageHeader';
import Table from '../../shared/components/organisms/Table';
import AppointmentFilters from '../components/AppointmentFilters';
import { searchColumns } from '../components/appointmentColumns';
import { useAppointmentSearch } from '../hook/useAppointmentSearch';

// Página: compone los componentes con lo que expone el hook
export default function AppointmentSearchPage() {
  const search = useAppointmentSearch();

  return (
    <>
      <PageHeader
        title="Búsqueda y Filtrado de Citas"
        subtitle="Gestione y supervise el flujo de pacientes del departamento."
      />

      <AppointmentFilters
        specialties={search.specialties}
        doctors={search.doctors}
        activeFilters={search.filters}
        updatedAt={search.updatedAt}
        onApply={search.onApplyFilters}
      />

      <Alert>{search.error}</Alert>

      <section className="mt-4 overflow-hidden rounded-lg border border-brand-100 bg-white shadow-sm">
        <h2 className="p-5 text-sm font-bold text-ink">Registros de Citas</h2>
        <Table
          columns={searchColumns}
          rows={search.result.data}
          loading={search.loading}
          emptyMessage="No se encontraron citas con esos criterios."
          pagination={{
            pageIndex: search.pageIndex,
            pageSize: search.pageSize,
            total: search.result.total ?? 0,
            onChange: search.onPageChange,
            noun: 'registros',
          }}
        />
      </section>
    </>
  );
}
