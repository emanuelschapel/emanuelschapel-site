import { useEffect } from 'react';
import { site } from '../data/site';

/**
 * Per-route <head>: title, description, canonical, Open Graph, Twitter card, and an
 * optional JSON-LD block.
 *
 * Why a hook that edits the DOM rather than React 19's hoisted <title>/<meta>: index.html
 * ships static defaults so a crawler that does not run JS still gets a title and
 * description, and React's hoisting would ADD a second <title> next to that one rather
 * than replace it. Upserting by selector keeps exactly one of each.
 *
 * SITE_URL is baked at build from Netlify's `URL` (the primary site URL, which becomes the
 * custom domain the moment one is attached) — see vite.config.ts. Nothing here changes
 * when the domain arrives.
 */
export const SITE_URL: string = __SITE_URL__;

const DEFAULT_IMAGE = `${SITE_URL}/images/brand/hero-reception-wall-1200.jpg`; // 1200×600

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

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

const ROUTE_JSONLD_ID = 'route-jsonld';

export function useSeo({ title, description, path, image, type = 'website', noindex = false, jsonLd }: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const img = image ?? DEFAULT_IMAGE;
  const ld = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', url);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', site.legalName);
    upsertMeta('property', 'og:locale', 'en_US');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', img);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', img);

    let script = document.getElementById(ROUTE_JSONLD_ID) as HTMLScriptElement | null;
    if (ld) {
      if (!script) {
        script = document.createElement('script');
        script.id = ROUTE_JSONLD_ID;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = ld;
    } else if (script) {
      script.remove();
    }
  }, [title, description, url, img, type, noindex, ld]);
}
