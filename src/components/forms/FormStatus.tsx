import { AlertTriangle } from 'lucide-react';
import { PHONE } from '../../data/navigation';

/**
 * Shown when a submission fails. Never let a failed send render the confirmation — a
 * family must know the message did not arrive, and be given the phone number instead.
 */
export default function FormStatus({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <div role="alert" className="flex items-start gap-3 rounded-sm border border-danger bg-danger/5 p-4">
      <AlertTriangle size={18} className="mt-0.5 flex-shrink-0 text-danger" aria-hidden="true" />
      <p className="font-body text-sm leading-relaxed text-ink">
        {error}{' '}
        <a href={`tel:${PHONE.replace(/\D/g, '')}`} className="font-bold text-ink underline">
          {PHONE}
        </a>
      </p>
    </div>
  );
}
