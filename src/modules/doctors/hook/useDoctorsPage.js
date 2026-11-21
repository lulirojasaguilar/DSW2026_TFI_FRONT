import { useState } from 'react';
import { useApi } from '../../../core/hook/useApi';
import { useDebounce } from '../../../core/hook/useDebounce';
import { getDoctors } from '../services/doctorService';

const MIN_SEARCH_LENGTH = 3;

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
