import { Link } from 'react-router-dom';
import ObituaryCard from './ObituaryCard';
import { PHONE, PHONE_HREF } from '../../data/navigation';
import { sanityConfigured, type ObituarySummary } from '../../lib/sanity';
import type { Remote } from '../../lib/useSanity';

/**
 * Renders whatever state the obituaries fetch is in. Every branch is calm: a family
 * looking for a service time should never meet a spinner with no words, an error stack,
 * or an empty white box.
 */
export default function ObituaryGrid({ remote, compact = false }: { remote: Remote<ObituarySummary[]>; compact?: boolean }) {
  if (!sanityConfigured) {
    return (
      <Notice title="Obituaries are not connected yet">
        The site is not linked to its content system. Set <code className="font-mono text-xs">VITE_SANITY_PROJECT_ID</code> — see <code className="font-mono text-xs">.env.example</code>.
      </Notice>
    );
  }

  if (remote.status === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" aria-busy="true" aria-label="Loading obituaries">
        {Array.from({ length: compact ? 3 : 6 }).map((_, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-sm overflow-hidden">
            <div className="h-48 bg-blush animate-pulse" />
            <div className="p-6 space-y-3">
              <div className="h-5 w-2/3 bg-blush rounded animate-pulse" />
              <div className="h-3 w-1/3 bg-blush rounded animate-pulse" />
              <div className="h-3 w-full bg-blush rounded animate-pulse" />
              <div className="h-3 w-5/6 bg-blush rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (remote.status === 'error') {
    return (
      <Notice title="We could not load the obituaries just now">
        Please try again in a moment, or call us at <a href={PHONE_HREF} className="font-bold text-ink underline">{PHONE}</a> for service details.
      </Notice>
    );
  }

  if (remote.data.length === 0) {
    return (
      <Notice title="No services are currently listed">
        When a family shares an obituary with us, it will appear here. For details on an upcoming service, please call <a href={PHONE_HREF} className="font-bold text-ink underline">{PHONE}</a> or{' '}
        <Link to="/contact?reason=obituary" className="font-bold text-ink underline">contact our team</Link>.
      </Notice>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {remote.data.map(o => <ObituaryCard key={o._id} obituary={o} />)}
    </div>
  );
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div role="status" className="bg-blush rounded-sm p-10 text-center max-w-2xl mx-auto">
      <h3 className="font-display text-xl text-ink mb-3">{title}</h3>
      <p className="font-body text-sm text-muted leading-relaxed">{children}</p>
    </div>
  );
}
