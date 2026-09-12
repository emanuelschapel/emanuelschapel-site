/**
 * Netlify Forms submission.
 *
 * Netlify registers each form by parsing plain HTML in the publish directory at build time
 * (see public/__forms.html — the React-rendered forms are invisible to that bot). A
 * submission is then a POST to the site's own origin, URL-encoded, carrying `form-name`
 * so Netlify knows which registered form it belongs to. No endpoint ids, no env vars:
 * recipients and notifications are configured in the Netlify dashboard under
 * Forms → <form> → Notifications, and changing them needs no code change or redeploy.
 *
 * If you add a field to a React form, add it to public/__forms.html as well, or Netlify
 * will silently drop it.
 *
 * LOCAL DEV: the Vite dev server is not Netlify, so a real POST goes nowhere. In dev the
 * submission is logged and treated as sent so the confirmation UI can still be exercised.
 * To test the real pipeline locally, run `npx netlify dev` instead of `npm run dev`.
 *
 * FUTURE (SMS): Netlify Forms can fire a webhook per form (Notifications → Outgoing
 * webhook). Point the immediate-need one at a serverless function that calls Twilio.
 * Keep the deceased's name and location OUT of the SMS body — that text lands
 * unencrypted on a lock screen. The SMS should say who wrote and on what number, and let
 * the email carry the detail.
 */

/** Registered form names. Must match the `name` attributes in public/__forms.html. */
const FORM_NAMES = {
  immediate: 'immediate-need',
  contact: 'contact',
  planning: 'planning',
  pricing: 'pricing',
} as const;

export type FormKey = keyof typeof FORM_NAMES;

/**
 * The honeypot field. Declared on each static form via data-netlify-honeypot; if a
 * submission arrives with it filled in, Netlify discards it as a bot.
 */
export const HONEYPOT_NAME = 'bot-field';

export type SubmitStatus = 'idle' | 'sending' | 'error';

const TIMEOUT_MS = 15000;

export interface SubmitOutcome {
  ok: boolean;
  /** Present when ok is false. Written for a grieving reader, not a developer. */
  error?: string;
}

const GENERIC_FAILURE =
  'We could not send your message just now. Please call us — we are available 24 hours a day.';

function encode(data: Record<string, unknown>): string {
  return Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
}

export async function submitForm(
  key: FormKey,
  payload: Record<string, unknown>,
): Promise<SubmitOutcome> {
  const formName = FORM_NAMES[key];
  const body = encode({ 'form-name': formName, [HONEYPOT_NAME]: '', ...payload });

  if (import.meta.env.DEV) {
    console.warn(
      `[formSubmission] DEV MODE — "${formName}" was NOT sent. Netlify Forms only work on ` +
        `Netlify or under \`npx netlify dev\`. Payload:`,
      Object.fromEntries(new URLSearchParams(body)),
    );
    return { ok: true };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: controller.signal,
    });

    if (res.ok) return { ok: true };

    console.error(`[formSubmission] Netlify rejected "${formName}" (${res.status})`);
    return { ok: false, error: GENERIC_FAILURE };
  } catch (err) {
    console.error(`[formSubmission] Network failure sending "${formName}"`, err);
    return { ok: false, error: GENERIC_FAILURE };
  } finally {
    clearTimeout(timer);
  }
}
