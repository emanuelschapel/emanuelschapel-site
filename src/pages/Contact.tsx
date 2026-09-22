import { Phone, MapPin, Clock, AlertCircle } from 'lucide-react';
import PageHero from '../components/sections/PageHero';
import ContactForm from '../components/forms/ContactForm';
import { Link, useLocation } from 'react-router-dom';
import { PHONE, PHONE_HREF, ADDRESS, HOURS_NOTE, ADDRESS_NOTE } from '../data/navigation';
import { site } from '../data/site';
import { useSeo } from '../lib/seo';
import FollowSocial from '../components/sections/FollowSocial';

/**
 * Business name + address, so Google shows the listing card rather than a bare pin.
 * Verified 2026-09-16: the name, the address, and Google's own listing all geocode to
 * 41.8007,-87.6845 (5112 S. Western). If these ever disagree again, the address in
 * site.ts is the thing to suspect first — it was wrong ("Wentworth") for all of Phase 1.
 */
const MAP_QUERY = encodeURIComponent(`${site.legalName}, ${ADDRESS}`);

export default function Contact() {
  useSeo({
    title: "Contact Emanuel's Chapel | 5112 S. Western Ave, Chicago",
    description: "Reach Emanuel's Chapel Funeral Home by phone at (773) 912-6745, by message, or in person at 5112 S. Western Ave., Chicago. Available 24/7.",
    path: '/contact',
  });
  // React Router reuses this element when only the query string changes, so without a key
  // a visitor who submits and then follows another "Request Assistance" link would land on
  // the previous confirmation instead of a fresh form pre-filled for the new service.
  const { search } = useLocation();
  return (
    <main>
      {/* Illustrated front entrance (client-supplied, Sept 2026). Pale, blossom-lit artwork,
          so it takes the light treatment: the standard ink overlay turned it to dusk. */}
      <PageHero
        title="Contact Emanuel's Chapel"
        subtitle="We are here for you. Reach out by phone, form, or visit — we will respond with care."
        imageSrc="/images/heroes/contact-front-entrance.jpg"
        focal="center 42%"
        tone="light"
      />

      {/* Immediate CTA */}
      <section className="bg-ink py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertCircle size={18} className="text-pink" />
            <span className="font-body text-white/80 text-sm tracking-widest uppercase">Immediate Need?</span>
          </div>
          <p className="font-body text-white/70 mb-6 text-base">
            If you need immediate assistance, please call us directly. Our team answers around the clock.
          </p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 bg-pink hover:bg-pink-deep text-ink text-xl font-bold px-10 py-5 rounded-sm transition-all font-body tracking-wide"
          >
            <Phone size={22} />
            {PHONE}
          </a>
          <p className="font-body text-white/50 text-xs mt-4">Available 24 hours a day, 7 days a week</p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Info */}
          <div>
            <h2 className="section-title text-2xl mb-8">Get in Touch</h2>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Phone size={18} className="text-ink" />
                  <h3 className="font-heading text-ink font-semibold text-base">Phone</h3>
                </div>
                <a href={PHONE_HREF} className="font-body text-ink font-bold text-lg hover:text-ink transition-colors">
                  {PHONE}
                </a>
                <p className="font-body text-sm text-muted mt-1">Available 24/7 for immediate assistance</p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={18} className="text-ink" />
                  <h3 className="font-heading text-ink font-semibold text-base">Location</h3>
                </div>
                <p className="font-body text-ink text-sm leading-relaxed">{ADDRESS}</p>
                <p className="font-body text-xs text-muted mt-1">{ADDRESS_NOTE}</p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={18} className="text-ink" />
                  <h3 className="font-heading text-ink font-semibold text-base">Hours</h3>
                </div>
                <p className="font-body text-sm text-ink leading-relaxed">{HOURS_NOTE}</p>
                <p className="font-body text-xs text-muted mt-1">(Please call to confirm office appointment hours.)</p>
              </div>
            </div>

            {/* Map — keyless Google embed, address from site.ts. Lazy so it does not compete
                with the form for first paint; a "Get directions" link below for phones, where
                the native Maps app is what a visitor actually wants. */}
            <div className="mt-10">
              <div className="overflow-hidden rounded-sm border border-rule shadow-sm">
                <iframe
                  title={`Map showing ${site.legalName} at ${ADDRESS}`}
                  src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                  className="block h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 font-body text-sm font-bold text-ink underline underline-offset-4 hover:text-muted"
              >
                <MapPin size={15} aria-hidden="true" />
                Get directions
              </a>
            </div>

            <div className="mt-8 bg-blush border-l-4 border-pink p-5 rounded-sm">
              <p className="font-body text-sm text-ink leading-relaxed">
                <strong>Immediate Need?</strong> Don't wait. Call us now or visit our{' '}
                <Link to="/immediate-need" className="text-ink underline">Immediate Need page</Link> for step-by-step guidance.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="section-title text-2xl mb-8">Send Us a Message</h2>
            <ContactForm key={search} />
          </div>
        </div>
      </section>

      <FollowSocial />
    </main>
  );
}
