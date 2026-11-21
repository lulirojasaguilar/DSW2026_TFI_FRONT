import { useMemo, useState } from 'react';
import { getErrorMessage } from '../../../core/helpers/getErrorMessage';
import { addDays, mondayOf, toIsoDate } from '../../shared/utils/dates';
import { getDoctorSlots } from '../services/appointmentService';

const DAYS_IN_WEEK = 7;
const initialWeekStart = () => mondayOf(new Date());

export function useWeekSlots(doctorId, { onStart, onError }) {
  const [weekStart, setWeekStart] = useState(initialWeekStart);
  const [searched, setSearched] = useState(false);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mobileDay, setMobileDay] = useState('');

  const weekDays = useMemo(
    () =>
      Array.from({ length: DAYS_IN_WEEK }, (_, index) =>
        addDays(weekStart, index)
      ),
    [weekStart]
  );

  const loadSlots = async (start = weekStart, keepMessage = false) => {
    setLoading(true);

    if (!keepMessage) onStart();

    try {
      const found = await getDoctorSlots(
        doctorId,
        toIsoDate(start),
        toIsoDate(addDays(start, DAYS_IN_WEEK - 1))
      );

      setSlots(found);
      setSelected(null);
      setMobileDay(found[0]?.date ?? toIsoDate(start));
    } catch (error) {
      onError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    setSearched(true);

    return loadSlots();
  };

  const changeWeek = (offsetDays) => {
    const next = addDays(weekStart, offsetDays);

    setWeekStart(next);

    return loadSlots(next);
  };

  return {
    weekDays,
    searched,
    slots,
    loading,
    selected,
    mobileDay,
    select: setSelected,
    setMobileDay,
    search,
    resetSearch: () => setSearched(false),
    changeWeek,
    reload: () => loadSlots(weekStart, true),
  };
}
