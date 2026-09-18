import { CheckCircle } from 'lucide-react';
import PageHero from '../components/sections/PageHero';
import PlanningForm from '../components/forms/PlanningForm';
import CTASection from '../components/sections/CTASection';
import { useSeo } from '../lib/seo';

const benefits = [
  { title: 'Reduces Emotional Burden', desc: 'Your family will not need to make difficult decisions under the pressure of grief. Your wishes are already documented.' },
  { title: 'Documents Your Wishes Clearly', desc: 'From the type of service to music selections and personal tributes — everything is recorded and respected.' },
  { title: 'Allows Thoughtful Decision-Making', desc: 'When there is no urgency, you can take the time to explore options and make choices that truly reflect who you are.' },
  { title: 'Helps Families Understand Their Options', desc: 'Pre-planning includes a full review of available services, so families are not learning everything for the first time in grief.' },
  { title: 'May Help with Financial Planning', desc: 'Understanding costs in advance allows for better financial preparation and peace of mind for your loved ones.' },
];

const checklist = [
  'Consider burial vs. cremation preferences',
  'Choose a meaningful service style',
  'Select music, readings, or religious elements',
  'Identify who should be notified',
  'Document preferences for personal tributes',
  'Review relevant insurance or financial plans',
  'Discuss your wishes with family members',
  'Schedule a confidential consultation with Emanuel\'s Chapel',
];

export default function PlanningAhead() {
  useSeo({
    title: "Pre-Planning a Funeral | Emanuel's Chapel, Chicago",
    description: "Plan ahead with a confidential consultation. Document your wishes and relieve your family of difficult decisions. Emanuel's Chapel, Chicago.",
    path: '/planning-ahead',
  });
  return (
    <main>
      <PageHero
        title="Plan Ahead with Confidence"
        subtitle="Give your family peace of mind by making your wishes known today — thoughtfully, privately, and without pressure."
        imageSrc="/supportive_hands_family_care.jpg"
      />

      {/* Why Plan Ahead */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-pink" />
                <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">Why Plan Ahead?</span>
              </div>
              <h2 className="section-title mb-6">A Gift to the People You Love Most</h2>
              <p className="font-body text-muted leading-relaxed mb-6">
                Pre-planning a funeral is not about focusing on death — it's about giving your family clarity and comfort during one of life's most difficult moments. When your wishes are clearly documented, the people who love you can focus on honoring you rather than making difficult decisions in grief.
              </p>
              <p className="font-body text-muted leading-relaxed">
                Our funeral directors will guide you through the process privately, at your own pace, with no pressure and no obligation.
              </p>
            </div>
            <div className="space-y-5">
              {benefits.map(b => (
                <div key={b.title} className="flex items-start gap-4 bg-blush p-5 rounded-sm">
                  <CheckCircle size={20} className="text-ink mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-heading text-ink font-semibold mb-1">{b.title}</h4>
                    <p className="font-body text-sm text-muted leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="bg-blush py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Pre-Planning Checklist</h2>
            <p className="section-subtitle">Topics to consider as you document your wishes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {checklist.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-sm shadow-sm">
                <CheckCircle size={16} className="text-ink mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-ink">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Request a Private Consultation</h2>
            <p className="font-body text-muted">A brief, confidential conversation. No pressure, no obligation — just caring, professional guidance.</p>
          </div>
          <div className="bg-blush p-8 md:p-12 rounded-sm">
            <PlanningForm />
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to take the first step?"
        subtext="Our team makes pre-planning simple, comfortable, and completely confidential."
        variant="blush"
      />
    </main>
  );
}
