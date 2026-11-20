import { useApi } from '../../shared/hook/useApi';
import { getSpecialties } from '../services/specialtyService';

export function useSpecialtyOptions() {
  return useApi(
    () => getSpecialties({ pageSize: 1000 }).then((page) => page.data),
    []
  );
}
