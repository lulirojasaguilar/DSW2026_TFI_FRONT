import Alert from '../../shared/components/molecules/Alert';
import BookingFilters from '../components/BookingFilters';
import DoctorSummaryCard from '../components/DoctorSummaryCard';
import SelectionSummary from '../components/SelectionSummary';
import WeekSlotPicker from '../components/WeekSlotPicker';
import { useBookAppointment } from '../hook/useBookAppointment';

// Página: solo compone los organismos con lo que expone el hook
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
          <WeekSlotPicker
            weekDays={booking.weekDays}
            slots={booking.slots}
            loading={booking.loadingSlots}
            derived={booking.derived}
            selected={booking.selected}
            onSelect={booking.onSelectSlot}
            mobileDay={booking.mobileDay}
            onMobileDayChange={booking.onMobileDayChange}
            onWeekChange={booking.onWeekChange}
          />
          {booking.selected && <SelectionSummary {...booking.summary} />}
        </>
      )}
    </>
  );
}
