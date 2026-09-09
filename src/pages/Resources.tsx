import PageHero from '../components/sections/PageHero';
import ResourceCard from '../components/cards/ResourceCard';
import FAQAccordion from '../components/ui/FAQAccordion';
import CTASection from '../components/sections/CTASection';
import { resources } from '../data/resources';
import { faqs } from '../data/faqs';

export default function Resources() {
  return (
    <main>
      <PageHero
        title="Family Resources & FAQ"
        subtitle="Helpful guidance before, during, and after funeral planning — because knowledge brings comfort."
        imageSrc="/supportive_hands_family_care.jpg"
      />

      {/* Resource Cards */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-12 bg-pink" />
              <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">Family Resources</span>
              <div className="h-px w-12 bg-pink" />
            </div>
            <h2 className="section-title mb-4">Guidance for Every Step</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Practical, compassionate information to help families navigate loss with clarity and support.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-blush py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-12 bg-pink" />
              <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">FAQ</span>
              <div className="h-px w-12 bg-pink" />
            </div>
            <h2 className="section-title mb-4">Frequently Asked Questions</h2>
            <p className="section-subtitle max-w-lg mx-auto">
              Answers to questions families ask most often. We're always here if you need more.
            </p>
          </div>
          <div className="bg-white rounded-sm shadow-sm p-6 md:p-10">
            <FAQAccordion faqs={faqs} />
          </div>
        </div>
      </section>

      <CTASection
        headline="Still have questions?"
        subtext="Our team is available 24 hours a day. There is no question too small — we are here to help."
        secondaryLabel="Contact Us"
        secondaryHref="/contact?reason=general"
      />
    </main>
  );
}
