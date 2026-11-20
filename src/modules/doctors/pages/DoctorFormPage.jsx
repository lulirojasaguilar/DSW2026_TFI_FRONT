import Breadcrumb from '../../shared/components/molecules/Breadcrumb';
import DoctorForm from './components/DoctorForm';
import { useDoctorForm } from '../hook/useDoctorForm';

// Página: migas de pan + el formulario con lo que expone el hook
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
