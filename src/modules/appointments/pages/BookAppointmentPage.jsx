import Alert from '../../shared/components/molecules/Alert';
import BookingFilters from '../components/organisms/BookingFilters';
import DoctorSummaryCard from '../components/molecules/DoctorSummaryCard';
import SelectionSummary from '../components/organisms/SelectionSummary';
import WeekSlotPicker from '../components/organisms/WeekSlotPicker';
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
