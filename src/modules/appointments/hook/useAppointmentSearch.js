import { useCallback, useEffect, useState } from 'react';
import { getDoctors } from '../../doctors/services/doctorService';
import { getErrorMessage } from '../../../core/helpers/getErrorMessage';
import { useApi } from '../../../core/hook/useApi';
import { getSpecialties } from '../../specialties/services/specialtyService';
import { searchAppointments } from '../services/appointmentService';

const PAGE_SIZE = 3;

export function useAppointmentSearch() {
  const [filters, setFilters] = useState({});
  const [pageIndex, setPageIndex] = useState(1);
  const [result, setResult] = useState({ data: [], total: 0 });
  const [updatedAt, setUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const specialties = useApi(
    () => getSpecialties({ pageSize: 1000 }).then((page) => page.data),
    []
  );
  const doctors = useApi(
    () => getDoctors({ pageSize: 1000 }).then((page) => page.data),
    []
  );

  const run = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setResult(
        await searchAppointments({ pageSize: PAGE_SIZE, pageIndex, ...filters })
      );
      setUpdatedAt(new Date());
    } catch (failure) {
      setError(getErrorMessage(failure));
    } finally {
      setLoading(false);
    }
  }, [filters, pageIndex]);

  useEffect(() => {
    run();
  }, [run]);

  const applyFilters = (values) => {
    setPageIndex(1);
    setFilters({
      dni: values.patient.trim(),
      specialtyId: values.specialtyId,
      doctorId: values.doctorId,
      date: values.date,
    });
  };

  return {
    filters,
    onApplyFilters: applyFilters,
    specialties: specialties.data ?? [],
    doctors: doctors.data ?? [],
    result,
    updatedAt,
    loading,
    error: error || specialties.error || doctors.error,
    pageIndex,
    pageSize: PAGE_SIZE,
    onPageChange: setPageIndex,
  };
}
