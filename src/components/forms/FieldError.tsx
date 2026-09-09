import { AlertCircle } from 'lucide-react';
import { errorId } from '../../lib/formValidation';

/**
 * Inline field error. role="alert" so screen readers announce it on submit, and the
 * message is carried by text + icon, never colour alone.
 */
export default function FieldError({ fieldId, message }: { fieldId: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={errorId(fieldId)} role="alert" className="mt-1.5 flex items-start gap-1.5 font-body text-xs text-danger">
      <AlertCircle size={13} className="mt-px flex-shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
}
