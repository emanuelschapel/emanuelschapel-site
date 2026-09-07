import { site, formattedAddress } from './site';

export interface NavItem {
  label: string;
  path: string;
  isHighlighted?: boolean;
}

export const navItems: NavItem[] = [
  { label: 'Immediate Need', path: '/immediate-need', isHighlighted: true },
  { label: 'Services', path: '/services' },
  { label: 'Obituaries', path: '/obituaries' },
  { label: 'Planning Ahead', path: '/planning-ahead' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About Us', path: '/about' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact', path: '/contact' },
];

// Re-exported from site.ts so there is a single source of truth for site facts.
export const PHONE = site.phone.display;
export const PHONE_HREF = `tel:${site.phone.tel}`;
export const ADDRESS = formattedAddress;
export const ADDRESS_NOTE = site.address.note;
export const HOURS_NOTE = site.hoursNote;
export const EST_YEAR = site.established;
