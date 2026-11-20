import { Pencil, Trash2 } from 'lucide-react';
import ActionButton from '../../../shared/components/atoms/ActionButton';
import { specialtyIcon } from '../../utils/specialtyIcon';

export function specialtyColumns({ onDelete }) {
  return [
    {
      key: 'name',
      header: 'Nombre de la Especialidad',
      render: (item) => {
        const Icon = specialtyIcon(item.name);

        return (
          <div className="flex items-center gap-3 font-bold text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-100 text-brand-700">
              <Icon className="h-4 w-4" />
            </span>
            {item.name}
          </div>
        );
      },
    },
    {
      key: 'description',
      header: 'Descripción',
      className: 'max-w-xs text-muted',
    },
    {
      key: 'actions',
      header: 'Acciones',
      align: 'right',
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          <ActionButton
            icon={Pencil}
            label="Editar"
            to={`/app/specialties/${item.id}/edit`}
          />
          <ActionButton
            icon={Trash2}
            tone="danger"
            label="Eliminar"
            onClick={() => onDelete(item)}
          />
        </div>
      ),
    },
  ];
}
