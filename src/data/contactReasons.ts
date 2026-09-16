import { services } from './services';

/**
 * The single source of truth for the contact form's "Reason for Contacting" select.
 *
 * Link to `/contact?reason=<value>` from any themed CTA and the select arrives pre-chosen —
 * e.g. `/contact?reason=preplanning` from "Schedule a Consultation". Unknown values fall
 * back to "Please select", so a stale or hand-edited link can never put the form into a
 * state the visitor did not choose.
 *
 * Currently linked from:
 *   preplanning → Home, "Schedule a Consultation"
 *   obituary    → Obituaries, "contact our team" and "Contact Us"
 *   services    → ServiceCard and Services, "Request Assistance" — see SERVICE_OPTIONS
 *   general     → Resources CTA, About owner strip
 */
export const CONTACT_REASONS = [
  { value: 'immediate', label: 'Immediate Need' },
  { value: 'services', label: 'Service Information' },
  { value: 'pricing', label: 'Pricing Information' },
  { value: 'preplanning', label: 'Pre-Planning' },
  { value: 'obituary', label: 'Obituary Submission' },
  { value: 'general', label: 'General Question' },
] as const;

/** Narrows an arbitrary query value to a known reason, or '' for "Please select". */
export function toContactReason(value: string | null): string {
  return CONTACT_REASONS.some(r => r.value === value) ? (value as string) : '';
}

/**
 * Sub-category shown when the reason is "Service Information". Derived from services.ts
 * so the list can never drift from the Services page. Each "Request Assistance" button
 * links to `/contact?reason=services&service=<id>` using the id of the section it sits in,
 * so the form arrives knowing WHICH service — "Burial Services", not just "services".
 *
 * The submission carries the human-readable title, so the notification email reads
 * "Service: Burial Services" rather than "Service: burial".
 */
export const SERVICE_OPTIONS = services.map(s => ({ value: s.id, label: s.title }));

/** Narrows an arbitrary query value to a known service id, or '' for "Please select". */
export function toServiceId(value: string | null): string {
  return SERVICE_OPTIONS.some(s => s.value === value) ? (value as string) : '';
}

/** The title for a service id, for the submission payload. '' if unknown. */
export function serviceLabel(id: string): string {
  return SERVICE_OPTIONS.find(s => s.value === id)?.label ?? '';
}
