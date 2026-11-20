import { Link } from 'react-router-dom';
import { Clock, Save } from 'lucide-react';
import Button from '../../shared/components/atoms/Button';
import Spinner from '../../shared/components/atoms/Spinner';
import Alert from '../../shared/components/molecules/Alert';
import Breadcrumb from '../../shared/components/molecules/Breadcrumb';
import InfoNote from '../../shared/components/molecules/InfoNote';
import { SLOT_MINUTES } from '../../shared/constants';
import DoctorPicker from './components/DoctorPicker';
import ScheduleTable from './components/ScheduleTable';
import { useDoctorSchedule } from '../hook/useDoctorSchedule';

// Página: compone los componentes con lo que expone el hook
export default function DoctorSchedulePage() {
  const schedule = useDoctorSchedule();

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Doctores', to: '/app/doctors' },
          { label: 'Disponibilidad Horaria' },
        ]}
      />
      <h1 className="text-sm font-bold text-ink">
        Gestionar Disponibilidad Horaria
      </h1>
      <p className="mb-5 mt-1 text-sm text-muted">
        Defina los días y rangos horarios de atención para el profesional
        seleccionado.
      </p>

      <div className="grid grid-cols-[17rem_minmax(0,1fr)] gap-5">
        <div className="space-y-4">
          <DoctorPicker
            doctors={schedule.doctors}
            doctorId={schedule.doctorId}
            doctor={schedule.doctor}
            onChange={schedule.onDoctorChange}
          />
          <InfoNote>
            Los cambios realizados se aplicarán a partir de la próxima semana
            calendario. Las citas ya programadas no se verán afectadas
            automáticamente.
          </InfoNote>
        </div>

        <section className="min-w-0 rounded-lg border border-brand-100 bg-white shadow-sm">
          <div className="flex flex-wrap items-center gap-3 border-b border-brand-100 p-4">
            <h2 className="text-sm font-bold text-ink">
              Configuración de Horarios
            </h2>
            <span className="flex items-center gap-1 rounded-full bg-brand-100 px-2.5 py-0.5 text-[10px] font-semibold text-muted">
              <Clock className="h-3 w-3" /> Intervalos automáticos de{' '}
              {SLOT_MINUTES} minutos
            </span>
          </div>

          {schedule.loading ? (
            <Spinner />
          ) : (
            <ScheduleTable
              rows={schedule.rows}
              onDayChange={schedule.onDayChange}
            />
          )}

          <div className="space-y-3 p-4">
            <Alert>{schedule.error}</Alert>
            <Alert type="success">{schedule.saved}</Alert>
            <div className="flex justify-end gap-3">
              <Link to="/app/doctors">
                <Button variant="outline">Cancelar</Button>
              </Link>
              <Button
                variant="dark"
                onClick={schedule.onSave}
                disabled={
                  schedule.saving || schedule.loading || !schedule.doctorId
                }
              >
                <Save className="h-4 w-4" />{' '}
                {schedule.saving ? 'Guardando...' : 'Guardar Disponibilidad'}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
