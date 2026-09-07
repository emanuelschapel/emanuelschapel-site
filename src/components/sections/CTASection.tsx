import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { PHONE, PHONE_HREF } from '../../data/navigation';

interface CTASectionProps {
  headline?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: 'ink' | 'blush' | 'white';
}

export default function CTASection({
  headline = 'Speak with a funeral director today.',
  subtext = "We are available 24 hours a day, 7 days a week. You don't have to navigate this alone.",
  primaryLabel = 'Call Now',
  primaryHref = PHONE_HREF,
  secondaryLabel = 'Plan a Service',
  secondaryHref = '/planning-ahead',
  variant = 'ink',
}: CTASectionProps) {
  const bgClass = {
    ink: 'bg-ink',
    blush: 'bg-blush',
    white: 'bg-white',
  }[variant];

  const onInk = variant === 'ink';
  const headlineColor = onInk ? 'text-white' : 'text-ink';
  const subtextColor = onInk ? 'text-white/75' : 'text-muted';
  // Pink reads at ~11:1 on ink but ~1.4:1 on blush/white, so the eyebrow flips to ink there.
  const eyebrowColor = onInk ? 'text-pink' : 'text-ink';

  return (
    <section className={`${bgClass} py-20 px-6`}>
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-12 bg-pink" />
          <span className={`${eyebrowColor} text-xs tracking-[0.4em] font-body uppercase`}>We're Here For You</span>
          <div className="h-px w-12 bg-pink" />
        </div>
        <h2 className={`font-display text-3xl md:text-4xl ${headlineColor} mb-5 leading-tight`}>
          {headline}
        </h2>
        <p className={`font-body ${subtextColor} text-lg mb-10 max-w-xl mx-auto`}>
          {subtext}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={primaryHref}
            className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Phone size={16} />
            {primaryLabel} — {PHONE}
          </a>
          <Link
            to={secondaryHref}
            className={`${onInk ? 'btn-secondary' : 'btn-outline'} w-full sm:w-auto justify-center text-center`}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
