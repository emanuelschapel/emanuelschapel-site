import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock } from 'lucide-react';
import { navItems, PHONE, PHONE_HREF, ADDRESS, HOURS_NOTE } from '../../data/navigation';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white pb-24 lg:pb-0">
      {/* Top ornament */}
      <div className="brand-rule opacity-50" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="lg:col-span-1">
          <img
            src="/logo_current_clean_transparent.png"
            alt="Emanuel's Chapel Funeral Home"
            className="h-20 w-auto mb-4 opacity-90"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <p className="font-body text-white/70 text-sm leading-relaxed mb-6">
            Serving Chicago families with dignity, compassion, and professional care. Established 1991.
          </p>
          <div className="brand-rule opacity-30" />
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-display text-pink text-base mb-5 tracking-wide">Navigation</h4>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="font-body text-sm text-white/70 hover:text-pink transition-colors tracking-wide"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display text-pink text-base mb-5 tracking-wide">Services</h4>
          <ul className="space-y-2">
            {['Burial Services', 'Cremation Services', 'Memorial Services', 'Veteran Services', 'Pre-Planning', 'Personalized Tributes'].map((s) => (
              <li key={s}>
                <Link to="/services" className="font-body text-sm text-white/70 hover:text-pink transition-colors tracking-wide">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-pink text-base mb-5 tracking-wide">Contact Us</h4>
          <div className="space-y-4">
            <a href={PHONE_HREF} className="flex items-start gap-3 group">
              <Phone size={16} className="text-pink mt-0.5 flex-shrink-0" />
              <span className="font-body text-sm text-white/80 group-hover:text-pink transition-colors">{PHONE}</span>
            </a>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-pink mt-0.5 flex-shrink-0" />
              <span className="font-body text-sm text-white/80 leading-relaxed">{ADDRESS}</span>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={16} className="text-pink mt-0.5 flex-shrink-0" />
              <span className="font-body text-sm text-white/80 leading-relaxed">{HOURS_NOTE}</span>
            </div>
          </div>
          <Link
            to="/immediate-need"
            className="inline-block mt-6 bg-pink hover:bg-pink-deep text-ink px-6 py-3 font-body text-xs font-bold tracking-widest uppercase rounded-sm transition-all"
          >
            Need Help Now
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="font-body text-xs text-white/60 tracking-wide">
          © {year} Emanuel's Chapel Funeral Home. All rights reserved.
        </p>
        <p className="font-body text-xs text-white/60 tracking-wide">
          Website by <span className="text-pink">KLC Consulting Group LLC</span>
        </p>
      </div>
    </footer>
  );
}
