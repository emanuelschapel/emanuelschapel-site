import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { navItems } from '../../data/navigation';
import { site } from '../../data/site';

/**
 * Solid ivory bar, always in normal flow — it never overlaps the hero photograph (the old
 * translucent plum header collided with the wreath). App.tsx sticks it to the viewport
 * together with <AvailabilityBar />, which is why there is no phone CTA here: the bar
 * directly above carries the number and stays on screen.
 * Height is ~4.5rem; with the availability bar that is the 7rem the hero subtracts from the
 * viewport. If either height changes, update the calc in components/home/Hero.tsx.
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`bg-ivory border-b border-rule transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]' : ''
      }`}
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
        {/* Logo — the nav lockup already carries the name, so no repeated wordmark beside it.
            FUTURE: swap for a wreath-only monogram once the designer supplies one. */}
        <Link to="/" className="flex-shrink-0" aria-label={`${site.legalName} — home`}>
          <img
            src="/images/brand/logo-emanuels-chapel-nav.png"
            alt={site.legalName}
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `font-body text-xs tracking-wider uppercase whitespace-nowrap px-2.5 py-2 rounded-sm transition-colors duration-200 ${
                  item.isHighlighted
                    ? isActive
                      ? 'bg-pink-deep text-ink font-bold'
                      : 'bg-pink text-ink font-bold hover:bg-pink-deep'
                    : isActive
                    ? 'text-ink font-bold border-b-2 border-pink'
                    : 'text-muted hover:text-ink hover:bg-blush'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-ink p-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-ivory border-t border-rule">
          <nav className="max-w-site mx-auto px-4 py-4 space-y-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block font-body text-sm tracking-widest uppercase px-4 py-3 rounded-sm transition-colors ${
                    item.isHighlighted
                      ? 'bg-pink text-ink font-bold'
                      : isActive
                      ? 'bg-blush text-ink font-bold'
                      : 'text-ink hover:bg-blush'
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href={`tel:${site.phone.tel}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 justify-center bg-ink text-white px-4 py-3 rounded-sm font-body font-bold tracking-wider mt-2"
            >
              <Phone size={16} aria-hidden="true" />
              <span>Call {site.phone.display}</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
