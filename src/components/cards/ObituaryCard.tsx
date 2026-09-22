import { Calendar, MapPin, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { imageUrl, lifespan, serviceWhen, livestreamHref, MEMORIAL_IMAGE, MEMORIAL_IMAGE_FOCAL, type ObituarySummary } from '../../lib/sanity';

interface ObituaryCardProps {
  obituary: ObituarySummary;
}

export default function ObituaryCard({ obituary }: ObituaryCardProps) {
  const tribute = `/obituaries/${obituary.slug}`;
  const portrait = obituary.portrait ? imageUrl(obituary.portrait.asset, 640, 480) : undefined;
  const when = serviceWhen(obituary);
  const stream = obituary.livestreamEnabled ? livestreamHref(obituary.livestreamUrl) : undefined;

  return (
    <article className="bg-white border border-gray-100 rounded-sm overflow-hidden card-hover flex flex-col" aria-label={`Obituary for ${obituary.name}`}>
      {/* Portrait, or the memorial candle when the family has not supplied one */}
      <Link to={tribute} className="block h-48 relative bg-ink" tabIndex={-1} aria-hidden="true">
        <img
          src={portrait ?? MEMORIAL_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={portrait ? undefined : { objectPosition: MEMORIAL_IMAGE_FOCAL }}
          loading="lazy"
          decoding="async"
        />
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl text-ink mb-1 leading-snug">
          <Link to={tribute} className="hover:underline underline-offset-4">{obituary.name}</Link>
        </h3>
        <p className="font-body text-xs text-muted mb-4 tracking-wide">{lifespan(obituary)}</p>

        <p className="font-body text-sm text-ink leading-relaxed mb-5 flex-1">{obituary.shortBio}</p>

        {(when || obituary.serviceLocation) && (
          <div className="space-y-2 mb-5 pb-5 border-b border-gray-100">
            {when && (
              <div className="flex items-start gap-2">
                <Calendar size={13} className="text-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="font-body text-xs text-ink">{when}</span>
              </div>
            )}
            {obituary.serviceLocation && (
              <div className="flex items-start gap-2">
                <MapPin size={13} className="text-ink mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="font-body text-xs text-ink">{obituary.serviceLocation}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4 flex-wrap">
          <Link to={tribute} className="btn-primary text-xs py-2 px-4">View Tribute</Link>
          {stream && (
            <a
              href={stream}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-body text-xs text-ink hover:text-muted tracking-wide font-bold"
            >
              <Video size={13} aria-hidden="true" />
              Watch Livestream
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
