import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getErrorMessage } from '../../shared/helpers/getErrorMessage';
import { useApi } from '../../shared/hook/useApi';
import {
  getDoctorAvailabilities,
  getDoctors,
  saveAvailabilities,
} from '../services/doctorService';

export const SCHEDULE_DAYS = [
  'LUNES',
  'MARTES',
  'MIÉRCOLES',
  'JUEVES',
  'VIERNES',
  'SÁBADO',
  'DOMINGO',
];

export const dayLabel = (day) => day.charAt(0) + day.slice(1).toLowerCase();

const emptyRows = () =>
  Object.fromEntries(
    SCHEDULE_DAYS.map((day) => [day, { active: false, start: '', end: '' }])
  );

// Convierte las reglas que devuelve la API en las filas del formulario
const rowsFromRules = (rules) => {
  const next = emptyRows();

  rules.forEach((rule) => {
    const day = rule.day.toUpperCase();

    if (next[day]) {
      next[day] = {
        active: true,
        start: rule.startTime.slice(0, 5),
        end: rule.endTime.slice(0, 5),
      };
    }
  });

  return next;
};

// Lógica de "Disponibilidad horaria": doctor elegido (por URL), filas editables y guardado
export function useDoctorSchedule() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rows, setRows] = useState(emptyRows);
  const [hasRules, setHasRules] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');
  const [saving, setSaving] = useState(false);

  const doctors = useApi(
    () => getDoctors({ pageSize: 1000 }).then((page) => page.data),
    []
  );
  const rules = useApi(
    () => (id ? getDoctorAvailabilities(id) : Promise.resolve([])),
    [id]
  );

  useEffect(() => {
    if (!rules.data) return;

    setRows(rowsFromRules(rules.data));
    setHasRules(rules.data.length > 0);
  }, [rules.data]);

  const updateDay = (day, patch) =>
    setRows((current) => ({
      ...current,
      [day]: { ...current[day], ...patch },
    }));

  const save = async () => {
    setError('');
    setSaved('');

    if (!id) {
      setError('Seleccione un doctor.');

      return;
    }

    const days = SCHEDULE_DAYS.filter((day) => rows[day].active).map((day) => ({
      day,
      startTime: rows[day].start,
      endTime: rows[day].end,
    }));

    if (days.length === 0) {
      setError('Active al menos un día de atención.');

      return;
    }

    const invalid = days.find(
      (item) =>
        !item.startTime || !item.endTime || item.startTime >= item.endTime
    );

    if (invalid) {
      setError(
        `${dayLabel(invalid.day)}: la hora de salida debe ser posterior a la de entrada.`
      );

      return;
    }

    setSaving(true);
    try {
      await saveAvailabilities({ doctorId: id, days }, hasRules);
      setSaved(
        'Disponibilidad guardada. Los turnos fueron generados para el resto del mes.'
      );
      setHasRules(true);
    } catch (failure) {
      setError(getErrorMessage(failure));
    } finally {
      setSaving(false);
    }
  };

  return {
    doctorId: id ?? '',
    doctors: doctors.data ?? [],
    doctor: doctors.data?.find((item) => item.id === id),
    onDoctorChange: (value) => navigate(`/app/doctors/${value}/schedule`),
    rows,
    onDayChange: updateDay,
    loading: rules.loading,
    error: error || rules.error,
    saved,
    saving,
    onSave: save,
  };
}
