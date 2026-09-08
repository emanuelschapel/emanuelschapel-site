import { Link } from 'react-router-dom';
import PageHero from '../components/sections/PageHero';
import CTASection from '../components/sections/CTASection';
import { services } from '../data/services';

export default function Services() {
  return (
    <main>
      <PageHero
        title="Our Funeral Services"
        subtitle="Complete, compassionate funeral services for every family, every tradition, and every need."
        imageSrc="/chapel_casket_display_gold_drapes.jpg"
      />

      {/* Intro */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-pink" />
            <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">What We Offer</span>
            <div className="h-px w-12 bg-pink" />
          </div>
          <p className="font-body text-muted text-lg leading-relaxed">
            Emanuel's Chapel provides a full range of funeral and memorial services to meet the diverse needs of Chicago families. Every service is guided by our core values of dignity, compassion, and professional care.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-blush py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(service => (
              <article
                key={service.id}
                id={service.id}
                className="bg-white p-8 rounded-sm shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-ink text-xl" aria-hidden="true">✦</span>
                  <h2 className="font-display text-2xl text-ink">{service.title}</h2>
                </div>
                <p className="font-body text-muted leading-relaxed mb-6">{service.fullDescription}</p>
                <ul className="space-y-2 mb-8">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 font-body text-sm text-ink">
                      <span className="text-ink text-xs mt-1 flex-shrink-0">◆</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn-outline text-sm py-2">Request Assistance</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Questions about our services?"
        subtext="Our funeral directors are available 24 hours a day to answer your questions and guide your family with care."
        secondaryLabel="View Resources"
        secondaryHref="/resources"
      />
    </main>
  );
}
