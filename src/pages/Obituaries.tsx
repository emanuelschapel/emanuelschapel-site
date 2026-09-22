import { Link } from 'react-router-dom';
import PageHero from '../components/sections/PageHero';
import ObituaryGrid from '../components/cards/ObituaryGrid';
import CTASection from '../components/sections/CTASection';
import { fetchObituaries } from '../lib/sanity';
import { useRemote } from '../lib/useSanity';
import { useSeo } from '../lib/seo';

export default function Obituaries() {
  useSeo({
    title: "Obituaries & Tribute Notices | Emanuel's Chapel, Chicago",
    description: "Current obituaries and service details for families served by Emanuel's Chapel Funeral Home on Chicago's South Side.",
    path: '/obituaries',
  });
  const obituaries = useRemote(() => fetchObituaries(), []);

  return (
    <main>
      {/* Client-supplied artwork with its baked-in headline and button lifted out, so the
          words are real text: editable, readable by assistive tech, crisp at any size.
          The h1 is the artwork's own line; the eyebrow keeps the page's name visible. */}
      <PageHero
        eyebrow="Obituaries & Tribute Notices"
        title="Remembering With Love"
        subtitle="Honoring the lives and legacies of those we have had the privilege to serve."
        imageSrc="/images/heroes/obituaries-backdrop.jpg"
        focal="center 40%"
        tone="light"
        align="center"
      />

      <div className="bg-blush border-b border-rule py-4 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-body text-sm text-muted">
            <span className="font-bold text-ink">Families:</span> To submit an obituary or tribute notice, please{' '}
            <Link to="/contact?reason=obituary" className="text-ink underline">contact our team</Link>.
          </p>
        </div>
      </div>

      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <ObituaryGrid remote={obituaries} />

          <div className="mt-16 text-center bg-blush rounded-sm p-10">
            <h3 className="font-display text-xl text-ink mb-3">Don't See a Service Listed?</h3>
            <p className="font-body text-muted text-sm mb-6 max-w-md mx-auto">
              Contact our office directly. A staff member can assist you with finding service details or submitting a tribute notice.
            </p>
            <Link to="/contact?reason=obituary" className="btn-outline">Contact Us</Link>
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
