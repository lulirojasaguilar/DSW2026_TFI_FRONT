import { useDeleteItem } from '../../shared/hook/useDeleteItem';
import { deleteDoctor } from '../services/doctorService';
import { useDoctorsPage } from './useDoctorsPage';

const PAGE_SIZE = 4;

// Lógica del listado de doctores: página y borrado lógico
export function useDoctorsList() {
  const page = useDoctorsPage(PAGE_SIZE);

  const reloadAll = () => {
    page.doctors.reload();
  };
  const deletion = useDeleteItem({
    remove: (item) => deleteDoctor(item.id),
    successMessage: (item) => `${item.name} fue eliminado.`,
    onRemoved: () => {
      if (page.doctors.data?.data.length === 1 && page.pageIndex > 1) {
        page.onPageChange(page.pageIndex - 1);
      } else {
        reloadAll();
      }
    },
  });

  return { ...page, deletion };
}
