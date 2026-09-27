import { useEffect } from 'react';
import { site } from '../data/site';
import { ROUTE_JSONLD_ID, seoTags, type SeoProps, type SeoTag } from './seoTags';

/**
 * Per-route <head>: title, description, canonical, Open Graph, Twitter card, and an
 * optional JSON-LD block.
 *
 * Why a hook that edits the DOM rather than React 19's hoisted <title>/<meta>: index.html
 * ships static defaults so a crawler that does not run JS still gets a title and
 * description, and React's hoisting would ADD a second <title> next to that one rather
 * than replace it. Upserting by selector keeps exactly one of each.
 *
 * The tags themselves come from `seoTags`, which vite.config.ts also uses to bake a static
 * <head> into one HTML file per route at build time. That is what social scrapers read —
 * they do not run this hook, or any other JavaScript. Because both sides walk the same
 * list, the upserts below find the baked tags and update them in place instead of
 * appending duplicates.
 *
 * SITE_URL is baked at build from Netlify's `URL` (the primary site URL, which becomes the
 * custom domain the moment one is attached) — see vite.config.ts.
 */
export const SITE_URL: string = __SITE_URL__;

export type { SeoProps } from './seoTags';

function applyTag(tag: SeoTag) {
  switch (tag.el) {
    case 'title':
      document.title = tag.text;
      return;
    case 'meta': {
      const sel = `meta[${tag.attr}="${tag.key}"]`;
      let el = document.head.querySelector<HTMLMetaElement>(sel);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(tag.attr, tag.key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', tag.content);
      return;
    }
    case 'link': {
      let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${tag.rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', tag.rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', tag.href);
      return;
    }
    case 'script': {
      let el = document.getElementById(tag.id) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement('script');
        el.id = tag.id;
        el.type = 'application/ld+json';
        document.head.appendChild(el);
      }
      el.textContent = tag.json;
      return;
    }
  }
}

export function useSeo(props: SeoProps) {
  // Serialised so the effect's dependency is a value, not a fresh object every render.
  const tags = seoTags(props, {
    siteUrl: SITE_URL,
    prelaunch: __PRELAUNCH__,
    siteName: site.legalName,
  });
  const key = JSON.stringify(tags);

  useEffect(() => {
    const parsed = JSON.parse(key) as SeoTag[];
    parsed.forEach(applyTag);

    // A route without its own JSON-LD must not inherit the previous route's block.
    if (!parsed.some((t) => t.el === 'script')) {
      document.getElementById(ROUTE_JSONLD_ID)?.remove();
    }
  }, [key]);
}
