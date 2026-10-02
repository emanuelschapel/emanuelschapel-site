import { createClient } from '@sanity/client';
// Named export, not the default: the default is deprecated and logs a warning in the
// browser console on every page that builds an image URL.
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

/**
 * Read-only access to the obituaries in Sanity.
 *
 * The site is a static SPA with no server, so this runs in the visitor's browser against
 * Sanity's CDN. That is safe because the dataset is public and we never send a token:
 * only PUBLISHED documents are readable this way. Drafts stay inside the Studio.
 *
 * The project id is public by design (it is in the API URL of every request). What
 * protects the data is the absence of a token, not secrecy of the id. Configure it in
 * .env — see .env.example — and in Netlify's environment for production builds.
 *
 * CORS: Sanity only answers browsers from origins on the project's allowlist
 * (Manage → API → CORS origins). Add http://localhost:5173, the netlify.app preview,
 * and the production domain when it exists. "Allow credentials" stays OFF.
 */
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET ?? 'production';

export const sanityConfigured = Boolean(projectId);

export const sanity = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2025-01-01',
      useCdn: true,
      perspective: 'published',
    })
  : null;

const builder = sanity ? createImageUrlBuilder(sanity) : null;

/**
 * Shown wherever a portrait would go when the family has not supplied one: a lit candle
 * among pink calla lilies (client-supplied artwork, Sept 2026). One square file; each
 * placement crops it with `object-fit: cover` and its own focal point — the card frame is
 * ~2:1, so it favours the top of the picture (`MEMORIAL_IMAGE_FOCAL`) to keep the flame.
 * Decorative — the name always sits beside it, so it carries alt="".
 */
export const MEMORIAL_IMAGE = '/images/brand/memorial-candle.jpg';
export const MEMORIAL_IMAGE_FOCAL = 'center 24%';

/** A sized, auto-format URL for a Sanity image, honouring the editor's hotspot. */
export function imageUrl(source: SanityImageSource, width: number, height?: number): string | undefined {
  if (!builder) return undefined;
  let b = builder.image(source).width(width).auto('format').fit('crop');
  if (height) b = b.height(height);
  return b.url();
}

// ----------------------------------------------------------------------------------------

/**
 * Moved to ./links so the build can use it without pulling in `@sanity/client`.
 * Re-exported here because every existing caller imports it from this module.
 */
export { livestreamHref } from './links';

/** Portable Text block — kept loose; rendered by PortableText, not read by hand. */
export type PortableTextBlock = Record<string, unknown>;

export interface ObituarySummary {
  _id: string;
  name: string;
  slug: string;
  portrait?: { asset: SanityImageSource; alt?: string };
  dateOfBirth?: string;
  dateOfPassing: string;
  shortBio: string;
  serviceDate?: string;
  serviceEnd?: string;
  serviceLocation?: string;
  livestreamEnabled: boolean;
  livestreamUrl?: string;
}

export interface Obituary extends ObituarySummary {
  body?: PortableTextBlock[];
  visitation?: string;
}

const SUMMARY_FIELDS = `
  _id,
  name,
  "slug": slug.current,
  portrait{ asset, alt },
  dateOfBirth,
  dateOfPassing,
  shortBio,
  serviceDate,
  serviceEnd,
  serviceLocation,
  "livestreamEnabled": coalesce(livestreamEnabled, false),
  livestreamUrl
`;

/** Most recent passing first. `limit` for the home page preview. */
export async function fetchObituaries(limit?: number): Promise<ObituarySummary[]> {
  if (!sanity) return [];
  const slice = limit ? `[0...${limit}]` : '';
  return sanity.fetch<ObituarySummary[]>(
    `*[_type == "obituary" && defined(slug.current)] | order(dateOfPassing desc, _createdAt desc) ${slice} { ${SUMMARY_FIELDS} }`,
  );
}

export async function fetchObituary(slug: string): Promise<Obituary | null> {
  if (!sanity) return null;
  return sanity.fetch<Obituary | null>(
    `*[_type == "obituary" && slug.current == $slug][0] { ${SUMMARY_FIELDS}, body, visitation }`,
    { slug },
  );
}

// ----------------------------------------------------------------------------------------

// Birth and passing are Sanity `date` fields: a bare "2026-09-23" with no time. `new Date()`
// reads that as midnight UTC, which in Chicago is still the evening of the 22nd — so every
// date printed a day early. Formatting those in UTC keeps the calendar day as entered.
const DATE = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
const YEAR = new Intl.DateTimeFormat('en-US', { year: 'numeric', timeZone: 'UTC' });
// Service times are real instants, entered in the Studio in Chicago time. Pinning the zone
// shows a family out of state the chapel's clock, not their own.
const DATETIME = new Intl.DateTimeFormat('en-US', {
  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
  timeZone: 'America/Chicago',
});
const TIME = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Chicago' });

/** "1948 – 2026" for the card; falls back gracefully when birth is unknown. */
export function lifespan(o: Pick<ObituarySummary, 'dateOfBirth' | 'dateOfPassing'>): string {
  const passing = YEAR.format(new Date(o.dateOfPassing));
  return o.dateOfBirth ? `${YEAR.format(new Date(o.dateOfBirth))} – ${passing}` : passing;
}

/** "September 3, 1964 – September 23, 2026" for the tribute page header. */
export function lifeDates(o: Pick<ObituarySummary, 'dateOfBirth' | 'dateOfPassing'>): string {
  const passing = longDate(o.dateOfPassing);
  return o.dateOfBirth ? `${longDate(o.dateOfBirth)} – ${passing}` : `Passed ${passing}`;
}

/** For Sanity `date` fields only (birth, passing) — see the note on DATE above. */
export function longDate(iso: string): string {
  return DATE.format(new Date(iso));
}

/** "Friday, May 29, 2026, 11:00 AM – 12:00 PM" */
export function serviceWhen(o: Pick<ObituarySummary, 'serviceDate' | 'serviceEnd'>): string | undefined {
  if (!o.serviceDate) return undefined;
  const start = DATETIME.format(new Date(o.serviceDate));
  return o.serviceEnd ? `${start} – ${TIME.format(new Date(o.serviceEnd))}` : start;
}
