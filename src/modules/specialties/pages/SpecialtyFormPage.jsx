import Breadcrumb from '../../shared/components/molecules/Breadcrumb';
import SpecialtyForm from '../components/SpecialtyForm';
import { useSpecialtyForm } from '../hook/useSpecialtyForm';

export default function SpecialtyFormPage() {
  const form = useSpecialtyForm();
  const { isEdit } = form;

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Especialidades', to: '/app/specialties' },
          {
            label: isEdit
              ? 'Editar Especialidad'
              : 'Agregar Nueva Especialidad',
            muted: true,
          },
        ]}
      />
      <h1 className="text-sm font-normal text-brand-900">
        {isEdit ? 'Editar Especialidad' : 'Registrar Nueva Especialidad'}
      </h1>
      <p className="mb-5 mt-1 text-sm text-ink">
        Complete la información técnica y administrativa para dar de alta una
        especialidad médica en el sistema hospitalario.
      </p>

      <SpecialtyForm {...form} />
    </>
  );
}
