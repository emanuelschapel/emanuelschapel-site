import { Link, useLocation } from 'react-router-dom';
import { PHONE, PHONE_HREF } from '../data/navigation';
import { useSeo } from '../lib/seo';

/**
 * Catch-all route. Without one, an unknown URL rendered the header and footer around an
 * empty page — no heading, no way forward.
 *
 * This matters more here than on most sites: obituary links get forwarded by text message
 * and read days later, often by someone checking a service time. A dead end at that moment
 * is the worst possible experience, so the page leads with the phone number.
 *
 * `noindex` is doing real work. The Netlify rewrite serves every path as the SPA shell with
 * HTTP 200, so a bad URL is a "soft 404" that Google would otherwise be free to index —
 * there is no way to return a true 404 status from a client-rendered route.
 */
export default function NotFound() {
  const { pathname } = useLocation();

  useSeo({
    title: "Page Not Found | Emanuel's Chapel Funeral Home",
    description: 'The page you are looking for is not available. Call us any hour, or browse obituaries and services.',
    path: pathname,
    noindex: true,
  });

  return (
    <main className="bg-white">
      <section className="px-6 py-24 lg:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10 bg-pink" />
            <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">Page not found</span>
            <div className="h-px w-10 bg-pink" />
          </div>

          <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-5">
            We couldn't find that page.
          </h1>

          <p className="font-body text-muted text-lg leading-relaxed mb-4">
            The link may have changed, or the page may have been moved. Nothing is wrong on your end.
          </p>
          <p className="font-body text-muted leading-relaxed mb-10">
            If you are looking for a service time or an obituary, our team can find it for you right
            away — any hour, any day.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a href={PHONE_HREF} className="btn-primary w-full sm:w-auto text-center">
              Call {PHONE}
            </a>
            <Link to="/obituaries" className="btn-outline w-full sm:w-auto text-center">
              Browse obituaries
            </Link>
          </div>

          <div className="border-t border-rule pt-10">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted mb-5">
              Or go to
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/immediate-need', label: 'Immediate Need' },
                { to: '/services', label: 'Services' },
                { to: '/pricing', label: 'Pricing' },
                { to: '/contact', label: 'Contact' },
              ].map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="font-body text-sm text-ink underline underline-offset-4 hover:text-pink-deep transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
