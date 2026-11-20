import { useState } from 'react';
import { useApi } from '../../shared/hook/useApi';
import { useDebounce } from '../../shared/hook/useDebounce';
import { useDeleteItem } from '../../shared/hook/useDeleteItem';
import { deleteSpecialty, getSpecialties } from '../services/specialtyService';

const PAGE_SIZE = 4;
const MIN_SEARCH_LENGTH = 3;

export function useSpecialtiesList() {
  const [search, setSearch] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const name = useDebounce(search.trim());

  const specialties = useApi(
    () =>
      getSpecialties({
        pageSize: PAGE_SIZE,
        pageIndex,
        name: name.length >= MIN_SEARCH_LENGTH ? name : undefined,
      }),
    [pageIndex, name]
  );

  const reloadAll = () => {
    specialties.reload();
  };
  const deletion = useDeleteItem({
    remove: (item) => deleteSpecialty(item.id),
    successMessage: (item) => `La especialidad ${item.name} fue eliminada.`,
    onRemoved: () => {
      if (specialties.data?.data.length === 1 && pageIndex > 1) {
        setPageIndex(pageIndex - 1);
      } else {
        reloadAll();
      }
    },
  });

  return {
    search,
    onSearch: (value) => {
      setSearch(value);
      setPageIndex(1);
    },
    pageIndex,
    onPageChange: setPageIndex,
    pageSize: PAGE_SIZE,
    specialties,
    deletion,
  };
}
