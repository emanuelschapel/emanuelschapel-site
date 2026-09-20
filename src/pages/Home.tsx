import { Link } from 'react-router-dom';
import { Phone, Shield, Heart, Users, Star, ChevronRight } from 'lucide-react';
import { Hero } from '../components/home/Hero';
import CTASection from '../components/sections/CTASection';
import ServiceCard from '../components/cards/ServiceCard';
import ObituaryGrid from '../components/cards/ObituaryGrid';
import ResourceCard from '../components/cards/ResourceCard';
import { services } from '../data/services';
import { fetchObituaries } from '../lib/sanity';
import { useRemote } from '../lib/useSanity';
import { resources } from '../data/resources';
import { PHONE, PHONE_HREF } from '../data/navigation';
import { useSeo } from '../lib/seo';

const trustPoints = [
  { icon: Heart, label: 'Compassionate Guidance', desc: 'Our directors are with you through every step, with care and patience.' },
  { icon: Shield, label: 'Dignified Services', desc: 'Your loved one is treated with the highest level of professional respect.' },
  { icon: ChevronRight, label: 'Clear Next Steps', desc: 'We simplify a complex process so families can focus on what matters most.' },
  { icon: Users, label: 'Community-Centered Care', desc: 'Proudly serving Chicago families for generations with dedication and trust.' },
  { icon: Star, label: 'Professional Support', desc: 'Experienced, licensed funeral directors available around the clock.' },
];

/**
 * The three services a family is actually choosing between in the first hour. The rest are
 * one click away behind "View All Services" — which only has a job if this list is short.
 * Picked by id rather than slice() so reordering services.ts cannot silently change what is
 * featured here.
 */
const FEATURED_SERVICE_IDS = ['burial', 'cremation', 'memorial'] as const;
const featuredServices = FEATURED_SERVICE_IDS.map(id => services.find(s => s.id === id)).filter(
  (s): s is NonNullable<typeof s> => s !== undefined,
);

export default function Home() {
  useSeo({
    title: "Emanuel's Chapel Funeral Home | Chicago, IL",
    description: "Family-owned funeral home on Chicago's South Side, available 24 hours a day. Burial, cremation, memorial, and veteran services. Call (773) 912-6745.",
    path: '/',
  });
  // Three most recent; the full list lives on /obituaries.
  const recentObituaries = useRemote(() => fetchObituaries(3), []);
  return (
    <main>
      {/* Ship "band" until the 2:1 (2400x1200) recomposition lands — the plinth would
          cover the tagline on the current 4:3 source. Then switch to the default overlay. */}
      <Hero desktopLayout="band" />

      {/* Immediate Need Section */}
      <section className="bg-ink py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-pink" />
              <span className="text-pink text-xs tracking-[0.4em] font-body uppercase">Immediate Need</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4 leading-tight">
              When a loved one passes, you do not have to navigate the next steps alone.
            </h2>
            <p className="font-body text-white/75 text-base leading-relaxed mb-8">
              Emanuel's Chapel is available 24 hours a day, 7 days a week. Our compassionate team will guide you through every step of the process with clarity, care, and dignity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={PHONE_HREF}
                className="btn-primary flex items-center gap-2 justify-center"
                aria-label={`Call Emanuel's Chapel at ${PHONE}`}
              >
                <Phone size={16} />
                Call Now — {PHONE}
              </a>
              <Link to="/immediate-need" className="btn-secondary text-center justify-center">
                Get Immediate Help
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0 w-full md:w-80">
            <div className="bg-white/5 border border-white/10 rounded-sm p-7 space-y-4">
              {['Call Emanuel\'s Chapel', 'Share your loved one\'s location', 'Meet with a funeral director', 'Review your service options', 'Begin arrangements with support'].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-pink flex items-center justify-center flex-shrink-0 text-ink font-body text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="font-body text-white/85 text-sm pt-1 leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-12 bg-pink" />
              <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">Our Services</span>
              <div className="h-px w-12 bg-pink" />
            </div>
            <h2 className="section-title mb-4">Compassionate Care at Every Step</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              From immediate need to thoughtful pre-planning, we offer complete funeral services for Chicago families.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="btn-outline">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-blush py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-pink" />
                <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">Why Families Choose Us</span>
              </div>
              <h2 className="section-title mb-6">
                Dignity, Care, and Trusted Guidance for Chicago Families
              </h2>
              <p className="font-body text-muted text-base leading-relaxed mb-10">
                Since 1991, Emanuel's Chapel has served the Chicago community with unwavering commitment to compassionate, professional funeral care. When families need us most, we are there.
              </p>
              <Link to="/about" className="btn-ink">Learn Our Story</Link>
            </div>
            <div className="grid grid-cols-1 gap-5">
              {trustPoints.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-start gap-5 bg-white p-5 rounded-sm shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-pink-wash flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-ink" />
                  </div>
                  <div>
                    <h4 className="font-heading text-ink font-semibold text-base mb-1">{label}</h4>
                    <p className="font-body text-sm text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Obituaries Preview */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-12 bg-pink" />
              <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">Recent Services</span>
              <div className="h-px w-12 bg-pink" />
            </div>
            <h2 className="section-title mb-4">Remembering Those We've Served</h2>
          </div>
          <ObituaryGrid remote={recentObituaries} compact />
          <div className="text-center mt-10">
            <Link to="/obituaries" className="btn-outline">View All Obituaries</Link>
          </div>
        </div>
      </section>

      {/* Planning Ahead */}
      <section className="bg-ink py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 60% 50%, #FF96C5 0%, transparent 70%)' }} />
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-pink" />
            <span className="text-pink text-xs tracking-[0.4em] font-body uppercase">Planning Ahead</span>
            <div className="h-px w-12 bg-pink" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-6 leading-tight">
            Give Your Family the Gift of Peace of Mind
          </h2>
          <p className="font-body text-white/75 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Planning ahead is one of the most meaningful things you can do for the people you love. By documenting your wishes today, you relieve your family of difficult decisions during an already emotional time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/planning-ahead" className="btn-primary text-center justify-center">
              Start Planning Today
            </Link>
            <Link to="/contact?reason=preplanning" className="btn-secondary text-center justify-center">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Resource Preview */}
      <section className="bg-blush py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-12 bg-pink" />
              <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">Family Resources</span>
              <div className="h-px w-12 bg-pink" />
            </div>
            <h2 className="section-title mb-4">Guidance for Every Step</h2>
            <p className="section-subtitle max-w-xl mx-auto">Resources to help families navigate loss with clarity and support.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.slice(0, 3).map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/resources" className="btn-outline">View All Resources</Link>
          </div>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
