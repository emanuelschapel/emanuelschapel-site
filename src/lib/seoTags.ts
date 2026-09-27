/**
 * The <head> tags for a route, as data.
 *
 * One definition, two consumers:
 *
 *   - `useSeo` (src/lib/seo.ts) walks this list and upserts each tag into the live document
 *     on navigation.
 *   - vite.config.ts walks the same list and serialises it into a static HTML file per
 *     route, so scrapers that do not run JavaScript still get real tags.
 *
 * They must agree exactly. If the build emitted `<meta name="og:title">` while the hook
 * looked for `meta[property="og:title"]`, the hook would not find the baked tag, would
 * append a second one, and every page would ship duplicate Open Graph tags — valid HTML
 * that scrapers resolve inconsistently. Keeping the attribute choice in one place is the
 * point of this module.
 *
 * Pure: no React, no `import.meta.env`, and no build-time `__SITE_URL__` / `__PRELAUNCH__`
 * defines, because vite.config.ts runs where those do not exist. Both are parameters.
 */

export interface SeoProps {
  title: string;
  description: string;
  /** Route path beginning with "/" — becomes the canonical and og:url. */
  path: string;
  /** Absolute URL. Defaults to the reception-wall hero. */
  image?: string;
  type?: 'website' | 'article' | 'profile';
  /** Keep a page out of search results (used while a tribute is missing). */
  noindex?: boolean;
  /** Route-specific structured data; replaces the previous route's block. */
  jsonLd?: Record<string, unknown>;
}

export type SeoTag =
  | { el: 'title'; text: string }
  | { el: 'meta'; attr: 'name' | 'property'; key: string; content: string }
  | { el: 'link'; rel: string; href: string }
  | { el: 'script'; id: string; json: string };

/** The id the route-specific JSON-LD block is written under, so it can be replaced. */
export const ROUTE_JSONLD_ID = 'route-jsonld';

/** 1200×600. Used whenever a route does not supply its own image. */
export const defaultImage = (siteUrl: string) => `${siteUrl}/images/brand/hero-reception-wall-1200.jpg`;

export interface SeoContext {
  siteUrl: string;
  /** While true every page is marked noindex — see PRELAUNCH in vite.config.ts. */
  prelaunch: boolean;
  /** `site.legalName`, passed in to keep this module free of data imports. */
  siteName: string;
}

export function seoTags(
  { title, description, path, image, type = 'website', noindex = false, jsonLd }: SeoProps,
  { siteUrl, prelaunch, siteName }: SeoContext,
): SeoTag[] {
  const url = `${siteUrl}${path}`;
  const img = image ?? defaultImage(siteUrl);

  const tags: SeoTag[] = [
    { el: 'title', text: title },
    { el: 'meta', attr: 'name', key: 'description', content: description },
    { el: 'link', rel: 'canonical', href: url },
    {
      el: 'meta',
      attr: 'name',
      key: 'robots',
      content: noindex || prelaunch ? 'noindex, nofollow' : 'index, follow',
    },

    { el: 'meta', attr: 'property', key: 'og:type', content: type },
    { el: 'meta', attr: 'property', key: 'og:site_name', content: siteName },
    { el: 'meta', attr: 'property', key: 'og:locale', content: 'en_US' },
    { el: 'meta', attr: 'property', key: 'og:title', content: title },
    { el: 'meta', attr: 'property', key: 'og:description', content: description },
    { el: 'meta', attr: 'property', key: 'og:url', content: url },
    { el: 'meta', attr: 'property', key: 'og:image', content: img },

    { el: 'meta', attr: 'name', key: 'twitter:card', content: 'summary_large_image' },
    { el: 'meta', attr: 'name', key: 'twitter:title', content: title },
    { el: 'meta', attr: 'name', key: 'twitter:description', content: description },
    { el: 'meta', attr: 'name', key: 'twitter:image', content: img },
  ];

  if (jsonLd) tags.push({ el: 'script', id: ROUTE_JSONLD_ID, json: JSON.stringify(jsonLd) });

  return tags;
}

const ESCAPE: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const escapeAttr = (s: string) => s.replace(/[&<>"]/g, (c) => ESCAPE[c]);
const escapeText = (s: string) => s.replace(/[&<>]/g, (c) => ESCAPE[c]);

/**
 * Serialise tags to HTML for the build.
 *
 * JSON-LD is escaped only for `</script`, which is the sequence that would end the block
 * early; escaping its quotes and ampersands would corrupt the JSON, since the contents of a
 * script element are not parsed as HTML.
 */
export function renderSeoTags(tags: SeoTag[]): string {
  return tags
    .map((t) => {
      switch (t.el) {
        case 'title':
          return `<title>${escapeText(t.text)}</title>`;
        case 'meta':
          return `<meta ${t.attr}="${t.key}" content="${escapeAttr(t.content)}" />`;
        case 'link':
          return `<link rel="${t.rel}" href="${escapeAttr(t.href)}" />`;
        case 'script':
          return `<script id="${t.id}" type="application/ld+json">${t.json.replace(/<\/script/gi, '<\\/script')}</script>`;
      }
    })
    .join('\n    ');
}
