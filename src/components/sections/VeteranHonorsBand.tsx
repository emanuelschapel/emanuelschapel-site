import { Link } from 'react-router-dom';
import { Flag } from 'lucide-react';

const HONORS = [
  'Military honors and honor guard coordination',
  'Flag presentation ceremony',
  'VA burial benefits and Presidential Memorial Certificate assistance',
];

/**
 * A feature section for veteran services — sits between the services grid and the
 * closing CTA. The flag-folding image gets a full frame of its own rather than a
 * card-sized crop, and the copy speaks to the family of a veteran directly.
 */
export default function VeteranHonorsBand() {
  return (
    <section id="veteran" aria-labelledby="veteran-heading" className="bg-white py-20 px-6 scroll-mt-32">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
        <div className="relative">
          {/* Offset pink hairline — the same device the tribute page uses for the portrait. */}
          <div className="absolute -inset-3 border border-pink/60 rounded-sm translate-x-3 translate-y-3" aria-hidden="true" />
          <img
            src="/images/heroes/veteran-honors.jpg"
            alt="An honor guard presents a folded flag to a family member beside a flag-draped casket"
            className="relative w-full aspect-[4/3] object-cover rounded-sm shadow-[0_24px_50px_rgba(20,20,20,0.18)]"
            style={{ objectPosition: 'center 55%' }}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-pink" />
            <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">Veteran Funeral Services</span>
          </div>
          <h2 id="veteran-heading" className="section-title mb-5">
            Honoring those who served.
          </h2>
          <p className="font-body text-muted leading-relaxed mb-7">
            Emanuel's Chapel is proud to serve the men and women who served our country. We coordinate every
            element of a military farewell — from honor guard and flag presentation to the benefits your family
            is entitled to — so the service reflects a life of duty.
          </p>
          <ul className="space-y-3 mb-9">
            {HONORS.map(item => (
              <li key={item} className="flex items-start gap-3 font-body text-sm text-ink">
                <Flag size={16} className="text-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link to="/contact?reason=services&service=veteran" className="btn-ink">
              Request Assistance
            </Link>
            <Link
              to="/resources#veterans-benefits"
              className="font-body text-sm font-bold text-ink underline underline-offset-4 hover:text-muted"
            >
              About veterans benefits
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
