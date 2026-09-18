import { Phone } from 'lucide-react';
import PageHero from '../components/sections/PageHero';
import ImmediateNeedForm from '../components/forms/ImmediateNeedForm';
import { PHONE, PHONE_HREF } from '../data/navigation';
import { useSeo } from '../lib/seo';

const steps = [
  { num: 1, title: 'Call Emanuel\'s Chapel', desc: 'Our team is available 24 hours a day, 7 days a week. We will answer your call with care and without pressure.' },
  { num: 2, title: 'Share the Location of Your Loved One', desc: 'Let us know where your loved one currently is — at home, a hospital, nursing facility, or another location. We will coordinate transport with care.' },
  { num: 3, title: 'Meet with a Funeral Director', desc: 'We will schedule a time to meet, either in person or by phone, to discuss your family\'s needs and review your options.' },
  { num: 4, title: 'Review Your Service Options', desc: 'Your director will walk you through burial, cremation, memorial, and personalized tribute options clearly and without pressure.' },
  { num: 5, title: 'Begin Arrangements with Full Support', desc: 'When you are ready, we handle every detail — so your family can focus on being together and honoring your loved one.' },
];

export default function ImmediateNeed() {
  useSeo({
    title: "Immediate Need — 24/7 Help | Emanuel's Chapel, Chicago",
    description: "If a death has just occurred, call Emanuel's Chapel now at (773) 912-6745. We answer around the clock and guide Chicago families through every next step.",
    path: '/immediate-need',
  });
  return (
    <main>
      <PageHero
        title="We Are Here for You Right Now"
        subtitle="You don't have to face this moment alone. Our team is available around the clock to guide you with compassion and clarity."
        imageSrc="/supportive_hands_family_care.jpg"
        isUrgent
      />

      {/* Urgent Phone CTA */}
      <section className="bg-blush py-10 px-6 border-b border-rule">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-body text-ink text-base mb-4">If you need immediate assistance, please call us now:</p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 bg-pink hover:bg-pink-deep text-ink text-xl font-bold px-10 py-5 rounded-sm transition-all tracking-wider font-body"
          >
            <Phone size={24} className="animate-pulse" />
            {PHONE}
          </a>
          <p className="font-body text-muted text-sm mt-4">Available 24 hours a day · 7 days a week</p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title mb-4">What Happens Next</h2>
            <p className="section-subtitle max-w-lg mx-auto">A simple, clear guide to help you navigate the next steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map(step => (
              <div key={step.num} className="bg-blush border border-rule p-7 rounded-sm">
                <div className="w-10 h-10 rounded-full bg-pink flex items-center justify-center text-ink font-bold font-body mb-5">
                  {step.num}
                </div>
                <h3 className="font-display text-lg text-ink mb-3">{step.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-blush py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Submit an Immediate Need Request</h2>
            <p className="font-body text-muted text-base">
              Fill out this form and a member of our team will contact you as soon as possible. For urgent situations, please call us directly.
            </p>
          </div>
          <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm">
            <ImmediateNeedForm />
          </div>
        </div>
      </section>
    </main>
  );
}
