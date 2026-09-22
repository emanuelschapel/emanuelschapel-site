import { Info } from 'lucide-react';
import PageHero from '../components/sections/PageHero';
import PricingRequestForm from '../components/forms/PricingRequestForm';
import PackageTiers from '../components/sections/PackageTiers';
import CTASection from '../components/sections/CTASection';
import { PHONE, PHONE_HREF } from '../data/navigation';
import { useSeo } from '../lib/seo';

const pricingCategories = [
  {
    title: 'Burial Services',
    desc: 'Traditional burial services range in cost based on the casket, cemetery, and selected services. We offer full coordination and personalized support from preparation through graveside committal.',
    items: ['Preparation and embalming', 'Funeral home visitation', 'Funeral service', 'Transportation to cemetery', 'Coordination with cemetery of choice', 'Casket selection (variety of options available)'],
  },
  {
    title: 'Cremation Services',
    desc: 'Cremation provides families with flexible, meaningful options. Costs vary based on whether a memorial service is held and which urn or keepsake is selected.',
    items: ['Direct cremation options', 'Cremation with memorial service', 'Urn selection', 'Return of cremated remains', 'Certificate of cremation', 'Memorial service coordination'],
  },
  {
    title: 'Memorial Services',
    desc: 'A memorial or celebration of life can be a beautiful, personalized tribute. Costs depend on service length, location, décor, and personalization elements.',
    items: ['Custom program design', 'Venue coordination', 'Floral arrangements', 'Photo and video tributes', 'Reception coordination', 'Memorial keepsakes'],
  },
];

const factors = [
  'Type of service selected (burial, cremation, or memorial)',
  'Casket or urn selection',
  'Cemetery or crematory fees',
  'Transportation requirements',
  'Personalization and tribute elements',
  'Additional services such as flowers, programs, or obituary publication',
];

export default function PricingPackages() {
  useSeo({
    title: "Funeral Pricing & Packages | Emanuel's Chapel, Chicago",
    description: "Honest guidance on funeral costs and service packages, and our General Price List on request. Emanuel's Chapel Funeral Home, Chicago.",
    path: '/pricing',
  });
  return (
    <main>
      <PageHero
        title="Pricing & Service Packages"
        subtitle="Transparent guidance on service options and costs — because every family deserves clear, honest information."
        imageSrc="/chapel_interior_main_seating_gray_chairs.jpg"
      />

      {/* Transparency note */}
      <section className="bg-blush py-8 px-6 border-b border-rule">
        <div className="max-w-4xl mx-auto flex items-start gap-4">
          <Info size={20} className="text-ink flex-shrink-0 mt-0.5" />
          <p className="font-body text-sm text-ink leading-relaxed">
            <strong>Our commitment to transparency:</strong> Emanuel's Chapel believes every family deserves honest pricing information. We are happy to provide our General Price List at any time, and our directors will walk you through every option without pressure or obligation. Call us at{' '}
            <a href={PHONE_HREF} className="text-ink font-bold">{PHONE}</a> or complete the form below.
          </p>
        </div>
      </section>

      <PackageTiers />

      {/* Service overviews */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title mb-4">Service Options Overview</h2>
            <p className="section-subtitle max-w-xl mx-auto">Beyond the packages above, every service can be shaped to a family's wishes. The overview below explains what each type of service involves.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingCategories.map(cat => (
              <div key={cat.title} className="bg-blush border border-rule p-8 rounded-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-ink text-lg" aria-hidden="true">✦</span>
                  <h3 className="font-display text-xl text-ink">{cat.title}</h3>
                </div>
                <p className="font-body text-sm text-muted leading-relaxed mb-5">{cat.desc}</p>
                <ul className="space-y-2">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 font-body text-sm text-ink">
                      <span className="text-ink text-xs mt-1 flex-shrink-0">◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factors affecting cost */}
      <section className="bg-blush py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center mb-10">What Affects the Cost of a Funeral?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {factors.map((f, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-sm shadow-sm">
                <span className="text-ink text-xs mt-1 flex-shrink-0">◆</span>
                <span className="font-body text-sm text-ink">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="pricing-form" className="bg-white py-20 px-6 scroll-mt-32">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Request Pricing Information</h2>
            <p className="font-body text-muted">Complete the form below and a team member will be in touch with pricing information tailored to your family's needs.</p>
          </div>
          <div className="bg-blush p-8 md:p-12 rounded-sm">
            <PricingRequestForm />
          </div>
        </div>
      </section>

      <CTASection
        headline="Speak with a director about pricing."
        subtext="Our team will answer your questions honestly and without pressure. Every family's situation is unique."
      />
    </main>
  );
}
