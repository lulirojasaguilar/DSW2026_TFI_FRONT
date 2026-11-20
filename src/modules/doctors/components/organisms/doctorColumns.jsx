import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import ActionButton from '../../../shared/components/atoms/ActionButton';
import Badge from '../../../shared/components/atoms/Badge';
import Avatar from '../../../shared/components/atoms/Avatar';

export function doctorColumns(actions) {
  const columns = [
    {
      key: 'name',
      header: 'Nombre del Doctor',
      render: (doctor) => (
        <div className="flex items-center gap-3">
          <Avatar name={doctor.name} />
          <div className="leading-tight">
            <p className="font-bold text-ink">{doctor.name}</p>
            <p className="text-xs text-muted">ID: {doctor.licenseNumber}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'specialty',
      header: 'Especialidad',

      render: (doctor) =>
        actions ? (
          <Badge tone="blue">{doctor.specialty?.name}</Badge>
        ) : (
          doctor.specialty?.name
        ),
    },
  ];

  if (!actions) {
    return [
      ...columns,
      {
        key: 'detail',
        header: 'Acciones',
        align: 'right',
        render: () => (
          <Link
            to="/app/doctors"
            className="text-xs font-bold text-brand-700 hover:underline"
          >
            Ver Detalle
          </Link>
        ),
      },
    ];
  }

  const { onDelete } = actions;

  return [
    ...columns,
    {
      key: 'actions',
      header: 'Acciones',
      align: 'right',
      render: (doctor) => (
        <div className="flex items-center justify-end gap-2">
          <ActionButton
            icon={Eye}
            tone="brand"
            label="Ver disponibilidad"
            to={`/app/doctors/${doctor.id}/schedule`}
          />
          <ActionButton
            icon={Pencil}
            tone="brand"
            label="Editar"
            to={`/app/doctors/${doctor.id}/edit`}
          />
          <ActionButton
            icon={Trash2}
            tone="danger"
            label="Eliminar"
            onClick={() => onDelete(doctor)}
          />
        </div>
      ),
    },
  ];
}
