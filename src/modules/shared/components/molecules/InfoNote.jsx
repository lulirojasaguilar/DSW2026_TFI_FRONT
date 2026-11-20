import { Info } from 'lucide-react';

// Nota informativa con icono (el texto llega como children)
export default function InfoNote({ children }) {
  return (
    <section className="flex gap-3 rounded-lg border border-brand-100 bg-white p-4 text-xs text-muted shadow-sm">
      <Info className="h-4 w-4 shrink-0 text-brand-700" />
      <p>{children}</p>
    </section>
  );
}
