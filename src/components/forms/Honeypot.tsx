import { HONEYPOT_NAME } from '../../lib/formSubmission';

/**
 * Spam trap. Hidden from people and from screen readers; bots fill it in and Formspree
 * discards those submissions. Endpoint ids are public, so something has to filter.
 */
export default function Honeypot() {
  return (
    <input
      type="text"
      name={HONEYPOT_NAME}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute left-[-9999px] h-px w-px opacity-0"
    />
  );
}
