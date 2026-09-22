import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Resource } from '../../data/resources';

interface ResourceCardProps {
  resource: Resource;
  variant?: 'card' | 'inline';
}

export default function ResourceCard({ resource, variant = 'card' }: ResourceCardProps) {
  const [expanded, setExpanded] = useState(false);

  if (variant === 'card') {
    return (
      // id + scroll-mt so deep links like /resources#veterans-benefits land with the card's
      // title visible below the sticky header (same device as the Services cards).
      <article id={resource.id} className="scroll-mt-32 bg-white border border-gray-100 rounded-sm p-8 card-hover">
        <div className="flex items-start gap-4 mb-4">
          <span className="text-2xl text-ink" aria-hidden="true">{resource.icon}</span>
          <h3 className="font-display text-lg text-ink leading-snug">{resource.title}</h3>
        </div>
        <p className="font-body text-sm text-muted mb-4 leading-relaxed">{resource.description}</p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="font-body text-xs text-ink tracking-widest uppercase font-bold hover:text-ink transition-colors flex items-center gap-2"
          aria-expanded={expanded}
        >
          {expanded ? 'Read Less' : 'Read More'}
          <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
        {expanded && (
          <ul className="mt-4 space-y-2 border-t border-gray-100 pt-4">
            {resource.content.map((item, i) => (
              <li key={i} className="flex items-start gap-2 font-body text-sm text-ink">
                <span className="text-ink text-xs mt-1 flex-shrink-0">◆</span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </article>
    );
  }

  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start justify-between gap-4 text-left"
        aria-expanded={expanded}
      >
        <div className="flex items-start gap-3">
          <span className="text-ink text-lg mt-0.5" aria-hidden="true">{resource.icon}</span>
          <span className="font-heading text-lg text-ink font-medium">{resource.title}</span>
        </div>
        <ChevronDown size={18} className={`text-ink flex-shrink-0 mt-1 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && (
        <div className="pl-8 mt-3">
          <p className="font-body text-sm text-muted mb-3">{resource.description}</p>
          <ul className="space-y-2">
            {resource.content.map((item, i) => (
              <li key={i} className="flex items-start gap-2 font-body text-sm text-ink">
                <span className="text-ink text-xs mt-1 flex-shrink-0">◆</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
