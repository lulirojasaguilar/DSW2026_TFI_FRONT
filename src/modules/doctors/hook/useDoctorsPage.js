import { useState } from 'react';
import { useApi } from '../../shared/hook/useApi';
import { useDebounce } from '../../shared/hook/useDebounce';
import { getDoctors } from '../services/doctorService';

const MIN_SEARCH_LENGTH = 3;

// Una página de doctores con búsqueda por nombre y paginación (base 1).
// La usan el panel y el listado de doctores, cada uno con su tamaño de página.
export function useDoctorsPage(pageSize) {
  const [search, setSearch] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const name = useDebounce(search.trim());

  const doctors = useApi(
    () =>
      getDoctors({
        pageSize,
        pageIndex,
        name: name.length >= MIN_SEARCH_LENGTH ? name : undefined,
      }),
    [pageIndex, name]
  );

  return {
    doctors,
    search,
    onSearch: (value) => {
      setSearch(value);
      setPageIndex(1);
    },
    pageIndex,
    onPageChange: setPageIndex,
    pageSize,
  };
}
