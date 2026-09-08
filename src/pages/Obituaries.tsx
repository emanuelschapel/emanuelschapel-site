import PageHero from '../components/sections/PageHero';
import ObituaryCard from '../components/cards/ObituaryCard';
import CTASection from '../components/sections/CTASection';
import { obituaries } from '../data/obituaries';
import { Link } from 'react-router-dom';

export default function Obituaries() {
  return (
    <main>
      <PageHero
        title="Obituaries & Tribute Notices"
        subtitle="Honoring the lives and legacies of those we have had the privilege to serve."
        imageSrc="/fleet_black_hearse_side_street.jpg"
      />

      {/* Phase 2 note banner */}
      <div className="bg-blush border-b border-rule py-4 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-body text-sm text-muted">
            <span className="font-bold text-ink">Families:</span> To submit an obituary or tribute notice, please{' '}
            <Link to="/contact" className="text-ink underline">contact our team</Link>.{' '}
            <span className="text-xs text-muted">Sample entries shown for demonstration. Online tribute management coming in a future update.</span>
          </p>
        </div>
      </div>

      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {obituaries.map(obit => (
              <ObituaryCard key={obit.id} obituary={obit} />
            ))}
          </div>
          {/* FUTURE PHASE 2: Replace static grid with paginated API-driven list from CMS or obituary backend */}
          <div className="mt-16 text-center bg-blush rounded-sm p-10">
            <h3 className="font-display text-xl text-ink mb-3">Don't See a Service Listed?</h3>
            <p className="font-body text-muted text-sm mb-6 max-w-md mx-auto">
              Contact our office directly. A staff member can assist you with finding service details or submitting a tribute notice.
            </p>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>

      <CTASection
        headline="We are here for your family."
        subtext="Whether you need immediate assistance, have questions about an upcoming service, or wish to submit a tribute — our team is ready to help."
        secondaryLabel="Request Assistance"
        secondaryHref="/immediate-need"
      />
    </main>
  );
}
