import { Link } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { formatShortDate, shortTime } from '../../shared/utils/dates';
import StatusLabel from './StatusLabel';

// Columnas de "Registros de Citas" (búsqueda del administrador)
export const searchColumns = [
  {
    key: 'date',
    header: 'Fecha',
    render: (item) => (
      <div className="leading-tight">
        <p className="font-bold text-ink">
          {item.date ? formatShortDate(item.date) : '—'}
        </p>
        <p className="text-xs text-muted">{shortTime(item.startTime)}</p>
      </div>
    ),
  },
  {
    key: 'department',
    header: 'Departamento',
    render: (item) => (
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-100 text-brand-700">
          <Stethoscope className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <p className="font-bold text-ink">{item.doctor.specialty.name}</p>
          <p className="text-xs text-muted">{item.doctor.name}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'patient',
    header: 'Paciente',
    render: (item) => (
      <div className="leading-tight">
        <p className="font-bold text-ink">
          {item.patient?.fullName || 'Sin nombre'}
        </p>
        <p className="text-xs text-muted">DNI: {item.patient?.dni}</p>
      </div>
    ),
  },
  {
    key: 'status',
    header: 'Estado',
    render: (item) => <StatusLabel status={item.status} />,
  },
  {
    key: 'detail',
    header: 'Acciones',
    align: 'right',
    render: (item) => (
      <Link
        to={`/app/appointments/${item.id}?date=${item.date}`}
        className="text-xs font-bold text-brand-700 hover:underline"
      >
        Ver Detalle
      </Link>
    ),
  },
];
