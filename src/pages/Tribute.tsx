import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Video, Clock } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import CTASection from '../components/sections/CTASection';
import { PHONE, PHONE_HREF } from '../data/navigation';
import { fetchObituary, imageUrl, lifespan, longDate, serviceWhen, sanityConfigured, MEMORIAL_IMAGE, type Obituary } from '../lib/sanity';
import { useRemote } from '../lib/useSanity';
import { useSeo, SITE_URL } from '../lib/seo';
import { site } from '../data/site';

/**
 * Structured data for one tribute: the person, and the service as an Event when a date
 * is known. Lets search engines show the page for "[name] obituary" queries with the
 * dates attached, and surface the service in date-aware results. Only published fields
 * are included; nothing here is invented.
 */
function tributeJsonLd(o: Obituary): Record<string, unknown> {
  const url = `${SITE_URL}/obituaries/${o.slug}`;
  const person: Record<string, unknown> = {
    '@type': 'Person',
    name: o.name,
    deathDate: o.dateOfPassing,
    ...(o.dateOfBirth ? { birthDate: o.dateOfBirth } : {}),
    ...(o.portrait ? { image: imageUrl(o.portrait.asset, 800) } : {}),
  };
  const organizer = { '@type': 'FuneralHome', '@id': `${SITE_URL}/#funeralhome`, name: site.legalName };
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': url,
      url,
      name: `${o.name} Obituary`,
      description: o.shortBio,
      about: person,
      isPartOf: { '@id': `${SITE_URL}/#funeralhome` },
    },
  ];
  if (o.serviceDate) {
    graph.push({
      '@type': 'Event',
      name: `Funeral service for ${o.name}`,
      startDate: o.serviceDate,
      ...(o.serviceEnd ? { endDate: o.serviceEnd } : {}),
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: o.livestreamEnabled && o.livestreamUrl
        ? 'https://schema.org/MixedEventAttendanceMode'
        : 'https://schema.org/OfflineEventAttendanceMode',
      ...(o.serviceLocation ? { location: { '@type': 'Place', name: o.serviceLocation } } : {}),
      organizer,
      url,
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

/**
 * /obituaries/:slug — one person's tribute page.
 *
 * Deliberately quiet: portrait, name, dates, the family's words, and the service details a
 * visitor came for. No condolences form in this pass (that is public user-generated content
 * on a grief page and needs moderation before it exists). Livestream shows only when the
 * editor has switched it on for this service.
 */
export default function Tribute() {
  const { slug = '' } = useParams();
  const remote = useRemote(() => fetchObituary(slug), [slug]);

  // Hooks run every render, so the <head> is derived from whatever state we are in.
  // A missing or failed tribute is marked noindex so a dead link never gets indexed;
  // while loading we say nothing about robots so a crawler's snapshot is not poisoned.
  const found = remote.status === 'ready' ? remote.data : null;
  useSeo(
    found
      ? {
          title: `${found.name} Obituary — Emanuel's Chapel, Chicago`,
          description: found.shortBio,
          path: `/obituaries/${found.slug}`,
          type: 'profile',
          image: found.portrait ? imageUrl(found.portrait.asset, 1200, 630) : undefined,
          jsonLd: tributeJsonLd(found),
        }
      : {
          title: "Obituary | Emanuel's Chapel, Chicago",
          description: "Obituaries and service details from Emanuel's Chapel Funeral Home, Chicago.",
          path: `/obituaries/${slug}`,
          noindex: remote.status !== 'loading',
        },
  );

  if (remote.status === 'loading') {
    return (
      <main className="bg-ivory min-h-[60vh]" aria-busy="true">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <div className="h-8 w-1/2 bg-blush rounded animate-pulse mb-4" />
          <div className="h-4 w-1/4 bg-blush rounded animate-pulse mb-12" />
          <div className="h-72 w-full bg-blush rounded-sm animate-pulse" />
        </div>
      </main>
    );
  }

  if (remote.status === 'error' || !remote.data || !sanityConfigured) {
    return (
      <main className="bg-ivory min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-6 py-24 text-center">
          <h1 className="font-display text-3xl text-ink mb-4">We couldn't find that tribute</h1>
          <p className="font-body text-muted leading-relaxed mb-8">
            The page may have moved, or the notice may not be published yet. For details on a service, please call{' '}
            <a href={PHONE_HREF} className="font-bold text-ink underline">{PHONE}</a>.
          </p>
          <Link to="/obituaries" className="btn-outline">All obituaries</Link>
        </div>
      </main>
    );
  }

  const o = remote.data;
  const portrait = o.portrait ? imageUrl(o.portrait.asset, 800, 1000) : undefined;
  const when = serviceWhen(o);
  const hasService = when || o.serviceLocation || o.visitation;

  return (
    <main className="bg-ivory">
      {/* Header band */}
      <section className="bg-ink text-white">
        <div className="max-w-5xl mx-auto px-6 pt-10 pb-14">
          <Link to="/obituaries" className="inline-flex items-center gap-2 font-body text-xs tracking-[0.3em] uppercase text-white/70 hover:text-pink mb-10">
            <ArrowLeft size={14} aria-hidden="true" /> All obituaries
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,18rem)_1fr] gap-10 items-end">
            <div className="relative w-56 md:w-full max-w-[18rem]">
              <div className="absolute -inset-3 border border-pink/45 rounded-sm" aria-hidden="true" />
              <img
                src={portrait ?? MEMORIAL_IMAGE}
                alt={portrait ? (o.portrait?.alt ?? `Portrait of ${o.name}`) : ''}
                className="relative w-full aspect-[4/5] object-cover rounded-sm shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
                decoding="async"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-pink" />
                <span className="text-pink text-xs tracking-[0.4em] font-body uppercase">In Loving Memory</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl leading-[1.1] mb-3">{o.name}</h1>
              <p className="font-heading text-pink text-xl italic mb-6">{lifespan(o)}</p>
              <p className="font-body text-white/80 text-[17px] leading-relaxed max-w-[52ch]">{o.shortBio}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,20rem)] gap-14">
          {/* The family's words */}
          <article>
            {o.body && o.body.length > 0 ? (
              <div className="prose-obituary font-body text-ink text-[16.5px] leading-[1.8] space-y-5">
                <PortableText value={o.body as never} />
              </div>
            ) : (
              <p className="font-body text-muted italic">The family has not yet shared a full obituary.</p>
            )}
          </article>

          {/* Service details */}
          <aside className="lg:sticky lg:top-32 self-start">
            <div className="bg-white border border-rule rounded-sm p-7 shadow-sm">
              <h2 className="font-display text-xl text-ink mb-5">Service Details</h2>
              {hasService ? (
                <dl className="space-y-4">
                  {when && (
                    <div className="flex items-start gap-3">
                      <Calendar size={16} className="text-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <div><dt className="sr-only">When</dt><dd className="font-body text-sm text-ink">{when}</dd></div>
                    </div>
                  )}
                  {o.serviceLocation && (
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <div><dt className="sr-only">Where</dt><dd className="font-body text-sm text-ink">{o.serviceLocation}</dd></div>
                    </div>
                  )}
                  {o.visitation && (
                    <div className="flex items-start gap-3">
                      <Clock size={16} className="text-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <div><dt className="sr-only">Visitation</dt><dd className="font-body text-sm text-ink">{o.visitation}</dd></div>
                    </div>
                  )}
                </dl>
              ) : (
                <p className="font-body text-sm text-muted">Service details will be posted here. Please call <a href={PHONE_HREF} className="font-bold text-ink underline">{PHONE}</a> for information.</p>
              )}

              {o.livestreamEnabled && o.livestreamUrl && (
                <a
                  href={o.livestreamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary mt-6 w-full text-center flex items-center justify-center gap-2"
                >
                  <Video size={16} aria-hidden="true" />
                  Watch the Livestream
                </a>
              )}

              <p className="font-body text-xs text-muted mt-6 leading-relaxed">
                Passed {longDate(o.dateOfPassing)}. Questions about the service? Call <a href={PHONE_HREF} className="font-bold text-ink">{PHONE}</a>.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <CTASection
        headline="We would be honored to help your family."
        subtext="If you need to make arrangements, or have questions about an upcoming service, we are here around the clock."
        secondaryLabel="All Obituaries"
        secondaryHref="/obituaries"
      />
    </main>
  );
}
