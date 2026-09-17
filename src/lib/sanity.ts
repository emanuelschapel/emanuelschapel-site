import { createClient } from '@sanity/client';
import imageUrlBuilder, { type SanityImageSource } from '@sanity/image-url';

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

const builder = sanity ? imageUrlBuilder(sanity) : null;

/**
 * Shown wherever a portrait would go when the family has not supplied one: a single lit
 * candle in the brand palette. A vector, so it is crisp at any size and never reads as
 * stock. Decorative — the name always sits beside it, so it carries alt="".
 */
export const MEMORIAL_IMAGE = '/images/brand/memorial-candle.svg';

/** A sized, auto-format URL for a Sanity image, honouring the editor's hotspot. */
export function imageUrl(source: SanityImageSource, width: number, height?: number): string | undefined {
  if (!builder) return undefined;
  let b = builder.image(source).width(width).auto('format').fit('crop');
  if (height) b = b.height(height);
  return b.url();
}

// ----------------------------------------------------------------------------------------

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

const DATE = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const YEAR = new Intl.DateTimeFormat('en-US', { year: 'numeric' });
const DATETIME = new Intl.DateTimeFormat('en-US', {
  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit',
});
const TIME = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' });

/** "1948 – 2026" for the card; falls back gracefully when birth is unknown. */
export function lifespan(o: Pick<ObituarySummary, 'dateOfBirth' | 'dateOfPassing'>): string {
  const passing = YEAR.format(new Date(o.dateOfPassing));
  return o.dateOfBirth ? `${YEAR.format(new Date(o.dateOfBirth))} – ${passing}` : passing;
}

export function longDate(iso: string): string {
  return DATE.format(new Date(iso));
}

/** "Friday, May 29, 2026, 11:00 AM – 12:00 PM" */
export function serviceWhen(o: Pick<ObituarySummary, 'serviceDate' | 'serviceEnd'>): string | undefined {
  if (!o.serviceDate) return undefined;
  const start = DATETIME.format(new Date(o.serviceDate));
  return o.serviceEnd ? `${start} – ${TIME.format(new Date(o.serviceEnd))}` : start;
}
