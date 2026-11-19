import { ShieldCheck } from 'lucide-react';

export default function AuthShell({ children, footer }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#072746] px-4 py-10">
      <div className="mb-8 flex flex-col items-center gap-4 text-white">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-900">
          <ShieldCheck className="h-8 w-8" />
        </span>
        <span className="text-4xl font-bold tracking-tight">MedPortal</span>
      </div>

      {children}

      {footer}
    </div>
  );
}
