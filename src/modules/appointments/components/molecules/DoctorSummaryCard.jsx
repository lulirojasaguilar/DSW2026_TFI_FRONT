import Avatar from '../../../shared/components/atoms/Avatar';

export default function DoctorSummaryCard({ name, specialty, licenseNumber }) {
  return (
    <section className="mt-4 flex items-center gap-4 rounded-xl border border-brand-100 bg-white p-4 shadow-sm">
      <Avatar name={name} size="h-14 w-14" />
      <div className="leading-snug">
        <p className="font-extrabold text-ink">{name}</p>
        <p className="text-xs uppercase text-brand-700 md:normal-case md:text-muted">
          {specialty}
        </p>
        <p className="text-xs text-muted">Matrícula: {licenseNumber}</p>
      </div>
    </section>
  );
}
