import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock } from 'lucide-react';
import { navItems, PHONE, PHONE_HREF, ADDRESS, HOURS_NOTE } from '../../data/navigation';
import { site } from '../../data/site';

/**
 * Blush footer.
 *
 * The brand lockup is 79% transparent artwork of which ~37% is near-black (the wreath and
 * part of the script), so on the previous ink footer a third of the mark vanished. Until a
 * reverse (white/pink) logo exists — see INTEGRATION.md go-live checklist — the footer sits
 * on a light ground so the real mark reads. Every page ends on an ink CTASection, so the
 * dark anchor is still there; this reads as the quiet base beneath it.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-blush text-ink border-t border-rule pb-24 lg:pb-0">
      {/* Top ornament */}
      <div className="brand-rule" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="lg:col-span-1">
          {/* 320px wide for a 145×96 slot — double, for retina, and no more. The original
              was a 1199×792 PNG at 627 KB, on every page. */}
          <picture>
            <source type="image/webp" srcSet="/images/brand/logo-footer.webp" />
            <img
              src="/images/brand/logo-footer.png"
              alt={site.legalName}
              width={320}
              height={211}
              className="h-24 w-auto mb-5"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <p className="font-body text-muted text-sm leading-relaxed mb-6">
            Serving Chicago families with dignity, compassion, and professional care. Established {site.established}.
          </p>
          <div className="brand-rule" />
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-display text-ink text-base mb-5 tracking-wide">Navigation</h4>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="font-body text-sm text-muted hover:text-ink transition-colors tracking-wide"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display text-ink text-base mb-5 tracking-wide">Services</h4>
          <ul className="space-y-2">
            {['Burial Services', 'Cremation Services', 'Memorial Services', 'Veteran Services', 'Pre-Planning', 'Personalized Tributes'].map((s) => (
              <li key={s}>
                <Link to="/services" className="font-body text-sm text-muted hover:text-ink transition-colors tracking-wide">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-ink text-base mb-5 tracking-wide">Contact Us</h4>
          <div className="space-y-4">
            <a href={PHONE_HREF} className="flex items-start gap-3 group">
              <Phone size={16} className="text-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span className="font-body text-sm text-ink font-bold group-hover:underline">{PHONE}</span>
            </a>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span className="font-body text-sm text-muted leading-relaxed">{ADDRESS}</span>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={16} className="text-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
              <span className="font-body text-sm text-muted leading-relaxed">{HOURS_NOTE}</span>
            </div>
          </div>
          <Link
            to="/immediate-need"
            className="inline-block mt-6 bg-ink hover:bg-ink-soft text-white px-6 py-3 font-body text-xs font-bold tracking-widest uppercase rounded-sm transition-colors"
          >
            Need Help Now
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-rule max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="font-body text-xs text-muted tracking-wide">
          © {year} {site.legalName}. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <Link to="/privacy" className="font-body text-xs text-muted tracking-wide hover:text-ink transition-colors">
            Privacy Policy
          </Link>
          <p className="font-body text-xs text-muted tracking-wide">
            Website by <span className="text-ink font-semibold">KLC Consulting Group LLC</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
