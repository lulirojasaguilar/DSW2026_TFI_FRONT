import Breadcrumb from '../../shared/components/molecules/Breadcrumb';
import DoctorForm from '../components/organisms/DoctorForm';
import { useDoctorForm } from '../hook/useDoctorForm';

export default function DoctorFormPage() {
  const form = useDoctorForm();

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Doctores', to: '/app/doctors' },
          { label: form.isEdit ? 'Editar Doctor' : 'Agregar Nuevo Doctor' },
        ]}
      />
      <DoctorForm {...form} />
    </>
  );
}
