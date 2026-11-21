import Spinner from '../../shared/components/atoms/Spinner';
import Alert from '../../shared/components/molecules/Alert';
import BookingFilters from '../components/organisms/BookingFilters';
import DoctorSummaryCard from '../components/molecules/DoctorSummaryCard';
import MobileSlotPicker from '../components/organisms/MobileSlotPicker';
import SelectionSummary from '../components/organisms/SelectionSummary';
import WeekColumns from '../components/organisms/WeekColumns';
import WeekHeader from '../components/molecules/WeekHeader';
import { useBookAppointment } from '../hook/useBookAppointment';

export default function BookAppointmentPage() {
  const booking = useBookAppointment();
  const { doctor } = booking;

  return (
    <>
      <BookingFilters {...booking.filters} />

      <div className="mt-4 space-y-3">
        <Alert type={booking.message.type}>
          {booking.message.text || booking.loadError || booking.noDoctorsText}
        </Alert>
      </div>

      {booking.searched && doctor && (
        <>
          <DoctorSummaryCard
            name={doctor.name}
            specialty={doctor.specialty?.name}
            licenseNumber={doctor.licenseNumber}
          />
          <section className="mt-4 rounded-xl border border-brand-100 bg-white p-4 shadow-sm">
            <WeekHeader
              weekDays={booking.weekDays}
              onWeekChange={booking.onWeekChange}
            />
            {booking.loadingSlots ? (
              <Spinner label="Buscando disponibilidad..." />
            ) : (
              <>
                <WeekColumns
                  weekDays={booking.weekDays}
                  slotsOf={booking.slotsOf}
                  selected={booking.selected}
                  onSelect={booking.onSelectSlot}
                />
                <MobileSlotPicker
                  weekDays={booking.weekDays}
                  daySlots={booking.slotsOf(booking.mobileDay)}
                  selected={booking.selected}
                  onSelect={booking.onSelectSlot}
                  mobileDay={booking.mobileDay}
                  onMobileDayChange={booking.onMobileDayChange}
                  onNextWeek={booking.onNextWeek}
                />
              </>
            )}
          </section>
          {booking.selected && <SelectionSummary {...booking.summary} />}
        </>
      )}
    </>
  );
}
