import { Link } from 'react-router-dom';
import { RECOMMENDED, UPGRADES, formatPrice } from '../../data/packages';

/**
 * The three service packages, with the recommended one presented in full and the others
 * as what they add on top of it.
 *
 * Why this shape and not three equal cards: the three lists are ~80% identical, so equal
 * cards make the eye hunt for the differences. Showing Gold and Platinum as "everything in
 * Silver, plus…" makes Silver the default structurally rather than by badge, and shows a
 * family exactly what the extra money buys.
 *
 * Each button goes to the pricing form on this page with the package pre-selected
 * (?package=<id>#pricing-form), so the enquiry arrives already saying which one.
 */
export default function PackageTiers() {
  const formHref = (id: string) => `/pricing?package=${id}#pricing-form`;

  return (
    <section className="bg-blush py-20 px-6" aria-labelledby="packages-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-12 bg-pink" />
            <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">Service Packages</span>
            <div className="h-px w-12 bg-pink" />
          </div>
          <h2 id="packages-heading" className="section-title mb-4">Start with Silver</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Our recommended package covers everything a dignified service needs. Two upgrades add flowers, more programs, and a heavier casket.
          </p>
        </div>

        {/* Recommended — in full */}
        <article
          className="bg-white border-2 border-pink rounded-sm shadow-[0_18px_50px_rgba(0,0,0,0.12)] p-8 md:p-11 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center max-w-5xl mx-auto"
          aria-labelledby="pkg-silver"
        >
          <div>
            <span className="inline-block bg-pink text-ink font-body text-[11px] font-bold tracking-[0.25em] uppercase px-3.5 py-2 rounded-sm">
              Recommended
            </span>
            <h3 id="pkg-silver" className="font-display text-3xl md:text-4xl text-ink mt-5 mb-1">
              {RECOMMENDED.name} Package
            </h3>
            <p className="font-heading italic text-muted text-lg mb-6">{RECOMMENDED.tagline}</p>
            <p className="font-display text-4xl md:text-5xl text-ink leading-none">
              {formatPrice(RECOMMENDED.price)}
              <span className="block font-body text-xs tracking-[0.2em] uppercase text-muted mt-3">complete package</span>
            </p>
            <Link to={formHref(RECOMMENDED.id)} className="btn-primary inline-block mt-8">
              Choose {RECOMMENDED.name}
            </Link>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-7">
            {RECOMMENDED.includes?.map(item => (
              <li key={item} className="flex items-start gap-2.5 font-body text-[14.5px] leading-snug text-ink py-2.5 border-b border-rule">
                <span className="text-pink text-[9px] mt-1.5 flex-shrink-0" aria-hidden="true">◆</span>
                {item}
              </li>
            ))}
          </ul>
        </article>

        {/* Upgrades — what each adds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-6">
          {UPGRADES.map(p => (
            <article key={p.id} className="bg-white border border-rule rounded-sm p-7 md:p-8 flex flex-col" aria-labelledby={`pkg-${p.id}`}>
              <h3 id={`pkg-${p.id}`} className="font-display text-2xl text-ink">{p.name}</h3>
              <p className="font-heading italic text-muted mb-4">{p.tagline}</p>
              <p className="font-display text-3xl text-ink leading-none">
                {formatPrice(p.price)}
                <span className="block font-body text-xs tracking-[0.2em] uppercase text-muted mt-2">complete package</span>
              </p>
              <p className="font-body text-xs tracking-[0.25em] uppercase text-muted mt-6 mb-1">
                Everything in {RECOMMENDED.name}, plus
              </p>
              <ul className="flex-1">
                {p.adds?.map(item => (
                  <li key={item} className="flex items-start gap-2.5 font-body text-[14.5px] leading-snug text-ink py-2.5 border-b border-rule">
                    <span className="text-pink text-[9px] mt-1.5 flex-shrink-0" aria-hidden="true">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to={formHref(p.id)} className="btn-outline inline-block mt-7 self-start">
                Ask about {p.name}
              </Link>
            </article>
          ))}
        </div>

        {/* FTC Funeral Rule — kept directly under the prices, where it applies */}
        <div className="max-w-5xl mx-auto mt-10 bg-white border-l-4 border-pink p-6 rounded-sm">
          <p className="font-body text-sm text-ink leading-relaxed">
            <strong>Prices shown are for the packages as listed</strong> and may change. Cemetery, crematory, and third-party fees are separate.
            As required by the FTC Funeral Rule, our itemized General Price List is available at any time — in person, by phone, or through the{' '}
            <a href="#pricing-form" className="underline underline-offset-4 font-bold">request form below</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
