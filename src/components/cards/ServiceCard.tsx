import { Link } from 'react-router-dom';
import type { Service } from '../../data/services';

interface ServiceCardProps {
  service: Service;
  variant?: 'full' | 'compact';
}

export default function ServiceCard({ service, variant = 'compact' }: ServiceCardProps) {
  return (
    <article className="bg-white border border-gray-100 p-8 rounded-sm card-hover group flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-ink text-xl" aria-hidden="true">✦</span>
        <div className="h-px flex-1 bg-gradient-to-r from-pink to-transparent" />
      </div>
      <h3 className="font-display text-xl text-ink mb-3 group-hover:text-ink transition-colors leading-snug">
        {service.title}
      </h3>
      <p className="font-body text-muted text-sm leading-relaxed mb-5 flex-1">
        {service.shortDescription}
      </p>
      {variant === 'full' && (
        <ul className="space-y-1.5 mb-6">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 font-body text-sm text-ink">
              <span className="text-ink text-xs mt-1 flex-shrink-0">◆</span>
              {f}
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center gap-4 mt-auto">
        <Link
          to={`/services#${service.id}`}
          className="font-body text-xs text-ink hover:text-ink tracking-widest uppercase font-bold transition-colors border-b border-rule hover:border-pink pb-0.5"
        >
          Learn More
        </Link>
        <Link
          to="/contact"
          className="font-body text-xs text-muted hover:text-ink tracking-widest uppercase transition-colors"
        >
          Request Assistance →
        </Link>
      </div>
    </article>
  );
}
