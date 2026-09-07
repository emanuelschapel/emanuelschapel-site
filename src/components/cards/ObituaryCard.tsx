import { Calendar, MapPin, Clock, Heart } from 'lucide-react';
import type { Obituary } from '../../data/obituaries';

interface ObituaryCardProps {
  obituary: Obituary;
}

export default function ObituaryCard({ obituary }: ObituaryCardProps) {
  return (
    <article className="bg-white border border-gray-100 rounded-sm overflow-hidden card-hover flex flex-col" aria-label={`Obituary for ${obituary.name}`}>
      {/* Photo area */}
      <div className="bg-gradient-to-br from-blush to-ink/10 h-48 flex items-center justify-center relative">
        <div className="w-24 h-24 rounded-full bg-ink/20 flex items-center justify-center">
          <span className="font-display text-3xl text-ink/50">
            {obituary.name.charAt(0)}
          </span>
        </div>
        {obituary.isSampleData && (
          <span className="absolute top-3 right-3 bg-pink-wash text-ink text-xs px-2 py-1 rounded font-body tracking-wide">
            Sample
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl text-ink mb-1 leading-snug">{obituary.name}</h3>
        <p className="font-body text-xs text-muted mb-4 tracking-wide">
          {obituary.dateOfBirth} – {obituary.dateOfPassing}
        </p>

        <p className="font-body text-sm text-ink leading-relaxed mb-5 flex-1">
          {obituary.shortBio}
        </p>

        <div className="space-y-2 mb-5 pb-5 border-b border-gray-100">
          <div className="flex items-start gap-2">
            <Calendar size={13} className="text-ink mt-0.5 flex-shrink-0" />
            <span className="font-body text-xs text-ink">{obituary.serviceDate}</span>
          </div>
          <div className="flex items-start gap-2">
            <Clock size={13} className="text-ink mt-0.5 flex-shrink-0" />
            <span className="font-body text-xs text-ink">{obituary.serviceTime}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin size={13} className="text-ink mt-0.5 flex-shrink-0" />
            <span className="font-body text-xs text-ink">{obituary.serviceLocation}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
            View Tribute
          </button>
          <button className="flex items-center gap-1.5 font-body text-xs text-ink hover:text-ink tracking-wide transition-colors font-bold">
            <Heart size={13} />
            Leave Condolence
          </button>
          {obituary.hasLivestream && (
            <button
              disabled
              className="font-body text-xs text-muted tracking-wide cursor-not-allowed line-through"
              title="Livestream not available for this service"
            >
              Watch Livestream
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
