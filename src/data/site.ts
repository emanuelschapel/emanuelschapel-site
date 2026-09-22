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
    street: '5112 S. Western Ave.', // corrected 2026-09-16 — was wrongly "Wentworth" from Phase 1
    city: 'Chicago',
    state: 'IL',
    zip: '60609', // TODO (client): confirm — Western at 51st is near the 60609/60632 line
    note: '(Please verify current hours by phone)',
  },
  /**
   * Geocode of the building, matching Google's business listing (verified 2026-09-16).
   * Used by the schema.org markup so search engines can pin the site to the same spot.
   */
  geo: { latitude: 41.8006616, longitude: -87.684455 },
  /**
   * Instagram handle confirmed by the client, Sept 2026. Note the mockup on the Contact
   * page still shows "@emanuelchapel" on the phone screen — that is illustration, not the
   * account; the live handle is only ever read from here.
   */
  social: {
    instagram: { handle: 'emanuelschapel2024', url: 'https://www.instagram.com/emanuelschapel2024' },
    facebook: { url: 'https://m.facebook.com/Emanuels-Chapel-Funeral-Home-2346587382332548/' },
    // Handle is 24 characters because that is TikTok's limit — "…funeralhom" is the real
    // account, not a typo. Link is the bare profile: the is_from_webapp/sender_device
    // parameters the browser appends when you copy the URL are analytics, not addressing.
    tiktok: { handle: 'emanuelschapelfuneralhom', url: 'https://www.tiktok.com/@emanuelschapelfuneralhom' },
  },
} as const;

/** `5112 S. Western Ave., Chicago, IL 60609` */
export const formattedAddress = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;

/** Quick paths for visitors who are not in immediate need. Order = priority. */
export const heroQuickLinks = [
  { label: 'Recent obituaries', to: '/obituaries' },
  { label: 'Send flowers', to: '/obituaries#flowers' }, // FUTURE: florist partner link
  { label: 'Plan ahead', to: '/planning-ahead' },
] as const;
