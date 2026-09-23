import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { site } from './src/data/site'

/**
 * The site's public base URL, baked into the bundle for canonical / Open Graph URLs and
 * used here for the sitemap. Netlify sets `URL` on every build to the primary site URL —
 * the netlify.app address today, the custom domain automatically once one is attached.
 * Local builds fall back to the preview address.
 */
const SITE_URL = (process.env.URL ?? 'https://emanuelchapelrebrand.netlify.app').replace(/\/$/, '')

/**
 * True while the site is still served from its netlify.app address rather than the real
 * domain. Search engines are kept out until then — see the robots.txt writer below.
 *
 * Derived rather than configured on purpose: Netlify rewrites `URL` to the custom domain
 * as soon as one is attached, so launch day flips this by itself and nobody has to
 * remember. `ALLOW_INDEXING=true` forces it off if that is ever needed sooner.
 */
const PRELAUNCH =
  process.env.ALLOW_INDEXING !== 'true' && /(^|\.)netlify\.app$/.test(new URL(SITE_URL).hostname)

/** Every static route. Obituary tribute pages are added at build from Sanity. */
const STATIC_ROUTES: Array<{ path: string; priority: number; changefreq: string }> = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/immediate-need', priority: 0.9, changefreq: 'monthly' },
  { path: '/services', priority: 0.9, changefreq: 'monthly' },
  { path: '/obituaries', priority: 0.9, changefreq: 'daily' },
  { path: '/planning-ahead', priority: 0.7, changefreq: 'monthly' },
  { path: '/pricing', priority: 0.7, changefreq: 'monthly' },
  { path: '/about', priority: 0.6, changefreq: 'monthly' },
  { path: '/resources', priority: 0.6, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/privacy', priority: 0.2, changefreq: 'yearly' },
]

/**
 * Writes robots.txt and sitemap.xml into the publish directory after the bundle.
 *
 * Tribute pages are listed from Sanity (published documents only, token-less, same query
 * the site uses) so a new obituary is discoverable within hours of Publish rather than
 * whenever a crawler stumbles on it. If Sanity is unreachable the sitemap still ships with
 * the static routes — a build must never fail because of it.
 */
function sitemapAndRobots(env: Record<string, string>): Plugin {
  let outDir = 'dist'
  return {
    name: 'sitemap-and-robots',
    apply: 'build',
    configResolved(c) { outDir = c.build.outDir },
    async closeBundle() {
      const projectId = env.VITE_SANITY_PROJECT_ID
      const dataset = env.VITE_SANITY_DATASET || 'production'
      let obituaries: Array<{ slug: string; updated: string }> = []
      if (projectId) {
        try {
          const q = encodeURIComponent('*[_type == "obituary" && defined(slug.current)]{ "slug": slug.current, "updated": _updatedAt }')
          const res = await fetch(`https://${projectId}.apicdn.sanity.io/v2025-01-01/data/query/${dataset}?query=${q}&perspective=published`)
          if (res.ok) {
            const body = (await res.json()) as { result?: typeof obituaries }
            obituaries = body.result ?? []
          }
          else console.warn(`[sitemap] Sanity responded ${res.status}; listing static routes only`)
        } catch (err) {
          console.warn('[sitemap] Sanity unreachable; listing static routes only', err)
        }
      } else {
        console.warn('[sitemap] VITE_SANITY_PROJECT_ID not set; listing static routes only')
      }

      const today = new Date().toISOString().slice(0, 10)
      const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      const urls = [
        ...STATIC_ROUTES.map(r => `  <url><loc>${esc(SITE_URL + r.path)}</loc><lastmod>${today}</lastmod><changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`),
        ...obituaries.map(o => `  <url><loc>${esc(`${SITE_URL}/obituaries/${o.slug}`)}</loc><lastmod>${o.updated.slice(0, 10)}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`),
      ]
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`

      const robots = PRELAUNCH
        ? [
            '# Pre-launch. This build is served from a netlify.app address, which is not the',
            '# address this site should be found at. Indexing it now would put the whole site',
            '# in Google on the wrong hostname, competing with the real domain from day one.',
            '#',
            '# Nothing to do at launch: attaching the custom domain changes Netlify\'s URL',
            '# variable, and the next build writes the real robots.txt on its own.',
            'User-agent: *',
            'Disallow: /',
            '',
          ].join('\n')
        : [
            'User-agent: *',
            'Allow: /',
            'Disallow: /__forms.html', // Netlify form declarations, not a page
            '',
            `Sitemap: ${SITE_URL}/sitemap.xml`,
            '',
          ].join('\n')

      mkdirSync(outDir, { recursive: true })
      // The sitemap is written either way — it costs nothing, and it is ready the moment
      // robots.txt starts pointing at it.
      writeFileSync(resolve(outDir, 'sitemap.xml'), sitemap)
      writeFileSync(resolve(outDir, 'robots.txt'), robots)

      if (PRELAUNCH) {
        // Belt and braces. robots.txt stops the crawl; X-Robots-Tag keeps the URL out of
        // the index even if a crawler reaches a page some other way (a shared link, a
        // failed robots.txt fetch). Additive to the headers in netlify.toml.
        writeFileSync(resolve(outDir, '_headers'), '/*\n  X-Robots-Tag: noindex, nofollow\n')
      }

      console.log(
        `[sitemap] ${STATIC_ROUTES.length} routes + ${obituaries.length} obituaries → ${SITE_URL}/sitemap.xml` +
          (PRELAUNCH ? '\n[robots] PRE-LAUNCH: indexing blocked (Disallow: / + X-Robots-Tag)' : '\n[robots] indexing allowed'),
      )
    },
  }
}

/**
 * Injects schema.org FuneralHome markup (JSON-LD) into <head> at build time.
 *
 * Why here and not typed into index.html: the address, phone, and coordinates all come from
 * site.ts, the one place they are allowed to live. The street was wrong for all of Phase 1
 * precisely because a value had been copied somewhere by hand. Why not rendered from React:
 * search engines read static HTML on the first pass and defer JS-rendered content, so the
 * business card is more reliably picked up when it is already in the shipped index.html.
 *
 * url / logo / image derive from SITE_URL, which Netlify swaps to the custom domain on its
 * own once one is attached — nothing to edit here at that point.
 *
 * Deliberately omitted until the inputs exist — add them here when they do:
 *   openingHoursSpecification  office hours are on hold with the client; "24/7" describes
 *                 phone availability, and telling Google the doors are open at 3am is worse
 *                 than saying nothing
 *   sameAs        social profiles, if the client has any
 */
function schemaOrg(): Plugin {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FuneralHome',
    '@id': `${SITE_URL}/#funeralhome`,
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/logo-footer.png`,
    image: `${SITE_URL}/images/brand/hero-reception-wall-1200.jpg`,
    name: site.legalName,
    alternateName: site.name,
    slogan: site.tagline,
    foundingDate: site.established,
    telephone: site.phone.tel,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: {
      '@type': 'City',
      name: 'Chicago',
    },
    // Phone availability, not door hours. This is the ContactPoint vocabulary for exactly that.
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phone.tel,
      contactType: 'customer service',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
  }

  return {
    name: 'schema-org-jsonld',
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: JSON.stringify(data),
            injectTo: 'head',
          },
        ],
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // .env files are not in process.env inside the config; loadEnv reads them the way the app does.
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env } as Record<string, string>
  return {
    plugins: [react(), schemaOrg(), sitemapAndRobots(env)],
    define: {
      __SITE_URL__: JSON.stringify(SITE_URL),
      __PRELAUNCH__: JSON.stringify(PRELAUNCH),
    },
  }
})
