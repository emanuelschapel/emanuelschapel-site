/**
 * Per-route <head> copy, in one place.
 *
 * Read from two directions, which is the whole point:
 *
 *   - At runtime, each page passes its entry to `useSeo` (src/lib/seo.ts), which sets the
 *     document title, description, canonical and Open Graph tags on navigation.
 *   - At build, vite.config.ts bakes the same values into a static HTML file per route, so
 *     a crawler that does not execute JavaScript still gets them. Facebook, iMessage,
 *     WhatsApp, LinkedIn and Slack all read only the static HTML.
 *
 * Before this module existed the copy lived as literals inside each page component, which
 * meant the build had no way to see it and every shared link — including every obituary —
 * rendered the site's generic homepage card.
 *
 * `priority` and `changefreq` are sitemap hints and are only read by the build.
 *
 * Not listed here: `/obituaries/:slug`, whose head comes from the Sanity document (see
 * `tributeSeo` in src/lib/tributeSeo.ts), and the 404, which is `noindex` and takes whatever
 * path the visitor mistyped.
 */

export interface RouteSeo {
  /** Route path beginning with "/". Also the canonical and og:url, joined to SITE_URL. */
  path: string;
  title: string;
  description: string;
  /** Sitemap hint, build-only. */
  priority: number;
  /** Sitemap hint, build-only. */
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export const SEO_ROUTES = [
  {
    path: '/',
    title: "Emanuel's Chapel Funeral Home | Chicago, IL",
    description:
      "Family-owned funeral home on Chicago's South Side, available 24 hours a day. Burial, cremation, memorial, and veteran services. Call (773) 912-6745.",
    priority: 1.0,
    changefreq: 'weekly',
  },
  {
    path: '/immediate-need',
    title: "Immediate Need — 24/7 Help | Emanuel's Chapel, Chicago",
    description:
      "If a death has just occurred, call Emanuel's Chapel now at (773) 912-6745. We answer around the clock and guide Chicago families through every next step.",
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/services',
    title: "Funeral Services — Burial, Cremation, Memorial | Emanuel's Chapel",
    description:
      'Burial, cremation, memorial and celebration-of-life services, veteran honors, transportation, and personalized tributes for Chicago families.',
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/obituaries',
    title: "Obituaries & Tribute Notices | Emanuel's Chapel, Chicago",
    description:
      "Current obituaries and service details for families served by Emanuel's Chapel Funeral Home on Chicago's South Side.",
    priority: 0.9,
    changefreq: 'daily',
  },
  {
    path: '/planning-ahead',
    title: "Pre-Planning a Funeral | Emanuel's Chapel, Chicago",
    description:
      "Plan ahead with a confidential consultation. Document your wishes and relieve your family of difficult decisions. Emanuel's Chapel, Chicago.",
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/pricing',
    title: "Funeral Pricing & Packages | Emanuel's Chapel, Chicago",
    description:
      "Honest guidance on funeral costs and service packages, and our General Price List on request. Emanuel's Chapel Funeral Home, Chicago.",
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/about',
    title: "About Emanuel's Chapel — Family-Owned Since 1991 | South Side Chicago",
    description:
      "Meet Emanuel Jones and the chapel that has served Chicago's South Side since 1991: our story, our values, and our facility on S. Western Ave.",
    priority: 0.6,
    changefreq: 'monthly',
  },
  {
    path: '/resources',
    title: "Family Resources & FAQ | Emanuel's Chapel, Chicago",
    description:
      "What to do when a loved one passes, planning checklists, burial vs. cremation, and answers to common questions from Emanuel's Chapel.",
    priority: 0.6,
    changefreq: 'monthly',
  },
  {
    path: '/contact',
    title: "Contact Emanuel's Chapel | 5112 S. Western Ave, Chicago",
    description:
      "Reach Emanuel's Chapel Funeral Home by phone at (773) 912-6745, by message, or in person at 5112 S. Western Ave., Chicago. Available 24/7.",
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/privacy',
    title: "Privacy Policy | Emanuel's Chapel Funeral Home",
    description:
      "How Emanuel's Chapel Funeral Home collects, uses, and protects the information you share through this website.",
    priority: 0.2,
    changefreq: 'yearly',
  },
] as const satisfies readonly RouteSeo[];

/** Lookup by path, for a page component passing its own entry to `useSeo`. */
export type RoutePath = (typeof SEO_ROUTES)[number]['path'];

const BY_PATH = new Map(SEO_ROUTES.map((r) => [r.path, r]));

/**
 * The entry for one route. Throws on an unknown path rather than returning undefined: a
 * typo here would otherwise ship a page with no title, and silently, because the build
 * would simply skip it.
 */
export function routeSeo(path: RoutePath): RouteSeo {
  const found = BY_PATH.get(path);
  if (!found) throw new Error(`[seo-routes] no entry for "${path}"`);
  return found;
}
