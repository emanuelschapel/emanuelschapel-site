import { Phone } from 'lucide-react';
import { PHONE, PHONE_HREF } from '../../data/navigation';

/**
 * A labelled <section> rather than a <div>: this renders after <footer> in App.tsx, so as a
 * plain div the one control a grieving visitor most needs on a phone sat outside every
 * landmark and was unreachable by region navigation.
 */
export default function MobileCallBar() {
  return (
    <section aria-label="Call Emanuel's Chapel" className="mobile-call-bar lg:hidden">
      <a
        href={PHONE_HREF}
        className="flex items-center justify-center gap-3 bg-pink hover:bg-pink-deep text-ink py-4 font-body font-bold tracking-widest text-sm uppercase transition-all"
        aria-label={`Call Emanuel's Chapel at ${PHONE}`}
      >
        <Phone size={18} className="animate-pulse" />
        <span>Call Now — {PHONE}</span>
      </a>
    </section>
  );
}
