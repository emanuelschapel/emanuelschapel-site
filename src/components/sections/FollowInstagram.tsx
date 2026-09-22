/** Instagram glyph — lucide 1.x ships no brand icons. Used only to link to the profile. */
function Instagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
import { site } from '../../data/site';

const IG = site.social.instagram;
const PHONE_IMG = '/images/social/instagram-phone.webp';

/**
 * "Follow us on Instagram" band for the Contact page. Sits between the contact form and
 * the footer; the phone's lower third is clipped by the section edge so it reads as rising
 * into the page rather than pasted on it.
 *
 * The phone is DECORATION (alt=""), never the link itself: the handle and follower counts
 * rendered on its screen are an illustration — and the screen currently shows a handle
 * that is NOT the live account (see site.ts). The real handle lives in `site.social` and
 * is printed as live text in the button. TODO (client): replace the screen with a
 * screenshot of the real profile once Lakedia supplies one.
 */
export default function FollowInstagram() {
  return (
    <section aria-labelledby="follow-heading" className="relative overflow-hidden bg-blush border-t border-rule">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,22rem)] gap-x-12 items-end">
        <div className="pt-16 pb-6 lg:pb-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-pink" />
            <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">Follow along</span>
          </div>
          <h2 id="follow-heading" className="section-title mb-5 max-w-xl">
            Moments of remembrance, shared with our community.
          </h2>
          <p className="font-body text-muted leading-relaxed max-w-lg mb-8">
            Service announcements, community events, and the families we have the privilege to serve —
            follow Emanuel's Chapel on Instagram.
          </p>
          <a
            href={IG.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ink inline-flex items-center gap-3 normal-case tracking-wide text-sm"
          >
            <Instagram size={18} />
            @{IG.handle}
          </a>
        </div>

        {/* The phone. Its lower third is clipped by the section so it reads as rising into
            the page rather than pasted on it. */}
        <div className="relative h-[240px] lg:h-[360px]" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3 h-[420px] w-[420px] rounded-full bg-pink/35 blur-3xl" />
          <img
            src={PHONE_IMG}
            alt=""
            className="absolute left-1/2 -translate-x-1/2 top-0 lg:top-8 w-[240px] lg:w-[290px] drop-shadow-[0_30px_40px_rgba(20,20,20,0.35)]"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
