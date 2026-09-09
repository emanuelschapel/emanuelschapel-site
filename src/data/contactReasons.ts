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
 *   services    → ServiceCard and Services, "Request Assistance"
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
