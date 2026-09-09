/**
 * Formspree submission.
 *
 * One endpoint per form, so Immediate Need can carry its own recipients and alerting
 * without dragging a pricing enquiry along with it. Ids live in VITE_ env vars and are
 * swappable without a code change; they are public by design (they sit in the client
 * bundle exactly as they would in a plain HTML form action), which is why the honeypot
 * below matters.
 *
 * FUTURE (SMS): the Immediate Need endpoint is the one to hang a webhook off — Formspree
 * webhook -> serverless function -> Twilio. Nothing here needs to change for that; the
 * alerting is configured on the Formspree side. Keep the deceased's name and location OUT
 * of any SMS body — that text lands unencrypted on a lock screen. The SMS should say who
 * called and on what number, and let the email carry the detail.
 */
const ENDPOINTS = {
  immediate: import.meta.env.VITE_FORMSPREE_IMMEDIATE,
  contact: import.meta.env.VITE_FORMSPREE_CONTACT,
  planning: import.meta.env.VITE_FORMSPREE_PLANNING,
  pricing: import.meta.env.VITE_FORMSPREE_PRICING,
} as const;

export type FormKey = keyof typeof ENDPOINTS;

/** The field name Formspree treats as a honeypot: if it arrives filled, the bot is dropped. */
export const HONEYPOT_NAME = '_gotcha';

export type SubmitStatus = 'idle' | 'sending' | 'error';

const TIMEOUT_MS = 15000;

export interface SubmitOutcome {
  ok: boolean;
  /** Present when ok is false. Written for a grieving reader, not a developer. */
  error?: string;
}

const GENERIC_FAILURE =
  'We could not send your message just now. Please call us — we are available 24 hours a day.';

export async function submitForm(
  key: FormKey,
  payload: Record<string, unknown>,
): Promise<SubmitOutcome> {
  const id = ENDPOINTS[key];

  // No endpoint configured. Fail loudly rather than showing a confirmation for a message
  // that went nowhere — a silently dropped death call is the worst outcome this code has.
  if (!id) {
    console.error(
      `[formSubmission] No Formspree id for "${key}". Set VITE_FORMSPREE_${key.toUpperCase()} ` +
        `in .env — see .env.example. Submission was NOT sent.`,
    );
    return { ok: false, error: GENERIC_FAILURE };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(`https://formspree.io/f/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (res.ok) return { ok: true };

    const body = await res.json().catch(() => null);
    const detail = body?.errors?.[0]?.message;
    console.error(`[formSubmission] Formspree rejected "${key}" (${res.status})`, body);
    return { ok: false, error: detail ? `${detail} ${GENERIC_FAILURE}` : GENERIC_FAILURE };
  } catch (err) {
    console.error(`[formSubmission] Network failure sending "${key}"`, err);
    return { ok: false, error: GENERIC_FAILURE };
  } finally {
    clearTimeout(timer);
  }
}
