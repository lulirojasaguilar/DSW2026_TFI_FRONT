import { Link } from 'react-router-dom';
import { CalendarCheck, LayoutGrid, Plus, Stethoscope } from 'lucide-react';
import Button from '../../shared/components/atoms/Button';
import Alert from '../../shared/components/molecules/Alert';
import PageHeader from '../../shared/components/molecules/PageHeader';
import SearchInput from '../../shared/components/molecules/SearchInput';
import StatCard from '../../shared/components/molecules/StatCard';
import Table from '../../shared/components/organisms/Table';
import { doctorColumns } from '../../doctors/components/doctorColumns';
import { useDoctorsPage } from '../../doctors/hook/useDoctorsPage';
import { useDashboardTotals } from '../hook/useDashboardTotals';

const PAGE_SIZE = 3;
const EMPTY = '–';

// Página: compone los componentes con lo que exponen los hooks
export default function DashboardPage() {
  const page = useDoctorsPage(PAGE_SIZE);
  const totals = useDashboardTotals();
  const { doctors } = page;

  return (
    <>
      <PageHeader
        title="Vista General de Gestión"
        subtitle="Configure el personal médico y las especialidades del departamento."
      >
        <Link to="/app/doctors/new">
          <Button variant="dark">
            <Plus className="h-4 w-4" /> Agregar Nuevo Doctor
          </Button>
        </Link>
        <Link to="/app/specialties/new">
          <Button variant="outline">
            <Plus className="h-4 w-4" /> Agregar Nueva Especialidad
          </Button>
        </Link>
      </PageHeader>

      <div className="mb-6 grid grid-cols-3 gap-4">
        <StatCard
          icon={Stethoscope}
          label="Total de doctores"
          value={totals.data?.doctors ?? EMPTY}
        />
        <StatCard
          icon={LayoutGrid}
          label="Total de especialidades"
          value={totals.data?.specialties ?? EMPTY}
        />
        <StatCard
          icon={CalendarCheck}
          label="Turnos confirmados para hoy"
          tag="Hoy"
          tagTone="blue"
          value={totals.data?.confirmedToday ?? EMPTY}
        />
      </div>

      <section className="overflow-hidden rounded-lg border border-brand-100 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 p-5">
          <h2 className="font-bold text-ink">
            Directorio de Profesionales Médicos
          </h2>
          <SearchInput
            value={page.search}
            onChange={page.onSearch}
            placeholder="Buscar por nombre..."
            className="w-56"
            soft
          />
        </div>
        {doctors.error && (
          <div className="px-5 pb-4">
            <Alert>{doctors.error}</Alert>
          </div>
        )}
        <Table
          columns={doctorColumns()}
          rows={doctors.data?.data ?? []}
          loading={doctors.loading}
          emptyMessage="No se encontraron doctores."
          pagination={{
            pageIndex: page.pageIndex,
            pageSize: page.pageSize,
            total: doctors.data?.total ?? 0,
            onChange: page.onPageChange,
            noun: 'resultados',
          }}
        />
      </section>
    </>
  );
}
