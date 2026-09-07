/**
 * Site-wide facts. Every component reads from here; nothing hardcodes a phone number.
 * FUTURE (Phase 1 Sanity): move to a `siteSettings` singleton document so Lakedia can edit
 * hours and phone without a deploy.
 */
export const site = {
  name: "Emanuel's Chapel",
  legalName: "Emanuel's Chapel Funeral Home",
  tagline: 'A prepared service to prepare people',
  established: '1991',
  phone: {
    display: '(773) 912-6745',
    tel: '+17739126745',
  },
  availability: 'Available 24 hours a day, every day',
  hoursNote: 'Available 24 hours a day, 7 days a week for immediate needs.',
  address: {
    street: '5112 S. Wentworth Ave.',
    city: 'Chicago',
    state: 'IL',
    zip: '60609',
    note: '(Please verify current hours by phone)',
  },
} as const;

/** `5112 S. Wentworth Ave., Chicago, IL 60609` */
export const formattedAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;

/** Quick paths for visitors who are not in immediate need. Order = priority. */
export const heroQuickLinks = [
  { label: 'Recent obituaries', to: '/obituaries' },
  { label: 'Send flowers', to: '/obituaries#flowers' }, // FUTURE: florist partner link
  { label: 'Plan ahead', to: '/planning-ahead' },
] as const;
