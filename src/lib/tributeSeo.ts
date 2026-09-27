/**
 * The <head> for one tribute page: title, description, Open Graph image, and the JSON-LD
 * describing the person and their service.
 *
 * Called from two places, which is why it lives here rather than inside Tribute.tsx:
 *
 *   - Tribute.tsx, at runtime, passing the fetched document.
 *   - vite.config.ts, at build, to bake the same tags into a static file per obituary so a
 *     scraper that does not run JavaScript sees them. This is the case that matters: a
 *     tribute link shared on Facebook is how most people arrive at one of these pages, and
 *     Facebook's scraper does not execute JS.
 *
 * Deliberately free of any dependency on the Sanity client. The portrait arrives as an
 * already-resolved URL (`portraitUrl`) because the two callers resolve it differently: the
 * app uses the image-url builder, the build reads `portrait.asset->url` straight from GROQ.
 */

import { site } from '../data/site';
import { livestreamHref } from './links';

/**
 * The fields a tribute head needs. A structural subset of `Obituary` (src/lib/sanity.ts)
 * rather than an import of it, so the build can pass a plain GROQ result.
 */
export interface TributeSeoInput {
  name: string;
  slug: string;
  shortBio: string;
  dateOfBirth?: string;
  dateOfPassing?: string;
  serviceDate?: string;
  serviceEnd?: string;
  serviceLocation?: string;
  livestreamEnabled?: boolean;
  livestreamUrl?: string;
  /** Absolute, already-sized portrait URL. Undefined when the family supplied no portrait. */
  portraitUrl?: string;
}

export interface TributeSeo {
  title: string;
  description: string;
  path: string;
  type: 'profile';
  image?: string;
  jsonLd: Record<string, unknown>;
}

/**
 * Structured data for one tribute: the person, and the service as an Event when a date is
 * known. Lets search engines show the page for "[name] obituary" queries with the dates
 * attached, and surface the service in date-aware results. Only published fields are
 * included; nothing here is invented.
 */
function tributeJsonLd(o: TributeSeoInput, siteUrl: string): Record<string, unknown> {
  const url = `${siteUrl}/obituaries/${o.slug}`;
  const person: Record<string, unknown> = {
    '@type': 'Person',
    name: o.name,
    ...(o.dateOfPassing ? { deathDate: o.dateOfPassing } : {}),
    ...(o.dateOfBirth ? { birthDate: o.dateOfBirth } : {}),
    ...(o.portraitUrl ? { image: o.portraitUrl } : {}),
  };
  const organizer = { '@type': 'FuneralHome', '@id': `${siteUrl}/#funeralhome`, name: site.legalName };
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': url,
      url,
      name: `${o.name} Obituary`,
      description: o.shortBio,
      about: person,
      isPartOf: { '@id': `${siteUrl}/#funeralhome` },
    },
  ];
  if (o.serviceDate) {
    graph.push({
      '@type': 'Event',
      name: `Funeral service for ${o.name}`,
      startDate: o.serviceDate,
      ...(o.serviceEnd ? { endDate: o.serviceEnd } : {}),
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode:
        o.livestreamEnabled && livestreamHref(o.livestreamUrl)
          ? 'https://schema.org/MixedEventAttendanceMode'
          : 'https://schema.org/OfflineEventAttendanceMode',
      ...(o.serviceLocation ? { location: { '@type': 'Place', name: o.serviceLocation } } : {}),
      organizer,
      url,
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

/** Everything the <head> of one tribute page needs. */
export function buildTributeSeo(o: TributeSeoInput, siteUrl: string): TributeSeo {
  return {
    title: `${o.name} Obituary — ${site.name}, ${site.address.city}`,
    description: o.shortBio,
    path: `/obituaries/${o.slug}`,
    type: 'profile',
    image: o.portraitUrl,
    jsonLd: tributeJsonLd(o, siteUrl),
  };
}
