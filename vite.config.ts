import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { site } from './src/data/site'
import { SEO_ROUTES } from './src/data/seo-routes'
import { seoTags, renderSeoTags } from './src/lib/seoTags'
import { buildTributeSeo, type TributeSeoInput } from './src/lib/tributeSeo'

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

/**
 * Every static route, with the same title and description the running app uses.
 *
 * Single source of truth: this list used to be duplicated here with only paths and sitemap
 * weights, while the copy lived as literals inside each page component. The build therefore
 * had no way to see the copy, which is why every shared link rendered the generic homepage
 * card. Tribute pages are added at build from Sanity.
 */
const STATIC_ROUTES = SEO_ROUTES

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
      // `updated` drives the sitemap; everything else is the tribute's baked <head>.
      // `portrait.asset->url` is dereferenced here rather than built with the image-url
      // builder, which would pull @sanity/client into the config. The query params below
      // match `imageUrl(source, 1200, 630)`; the editor's hotspot is not applied, so a
      // shared card may crop slightly differently from the portrait on the page itself.
      type BuildObituary = TributeSeoInput & { updated: string }
      let obituaries: BuildObituary[] = []
      if (projectId) {
        try {
          const q = encodeURIComponent(
            `*[_type == "obituary" && defined(slug.current)]{
              "slug": slug.current,
              "updated": _updatedAt,
              name,
              shortBio,
              dateOfBirth,
              dateOfPassing,
              serviceDate,
              serviceEnd,
              serviceLocation,
              "livestreamEnabled": coalesce(livestreamEnabled, false),
              livestreamUrl,
              "portraitUrl": portrait.asset->url
            }`,
          )
          const res = await fetch(`https://${projectId}.apicdn.sanity.io/v2025-01-01/data/query/${dataset}?query=${q}&perspective=published`)
          if (res.ok) {
            const body = (await res.json()) as { result?: BuildObituary[] }
            obituaries = (body.result ?? []).map(o => ({
              ...o,
              portraitUrl: o.portraitUrl ? `${o.portraitUrl}?w=1200&h=630&fit=crop&auto=format` : undefined,
            }))
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

      // ----------------------------------------------------------------------------------
      // Static <head> per route.
      //
      // The app sets its head in a useEffect, so a client that does not run JavaScript sees
      // only index.html's defaults. Facebook, iMessage, WhatsApp, LinkedIn and Slack all
      // work that way, which meant every shared link — including every obituary — rendered
      // the site's generic homepage card. Baking a file per route fixes that, and puts real
      // per-route titles into the HTML Google indexes on its first pass.
      //
      // Emitted as `<route>.html`, NOT `<route>/index.html`: Netlify's pretty_urls 301s a
      // directory to a trailing slash, and every canonical and sitemap URL here is
      // slash-less, so each tribute would take an extra hop and disagree with its own
      // og:url. Measured — see handoff.md §9.
      const shell = readFileSync(resolve(outDir, 'index.html'), 'utf8')
      const ctx = { siteUrl: SITE_URL, prelaunch: PRELAUNCH, siteName: site.legalName }

      /** index.html's own <title> and description, replaced by each route's own. */
      const stripDefaults = (html: string) =>
        html.replace(/\s*<title>[\s\S]*?<\/title>/, '').replace(/\s*<meta\s+name="description"[^>]*>/, '')

      const emit = (routePath: string, tags: ReturnType<typeof seoTags>) => {
        const html = stripDefaults(shell).replace('</head>', `  ${renderSeoTags(tags)}\n  </head>`)
        // "/" is index.html itself, which doubles as the SPA fallback for unmatched paths.
        const file = routePath === '/' ? 'index.html' : `${routePath.replace(/^\//, '')}.html`
        const out = resolve(outDir, file)
        mkdirSync(dirname(out), { recursive: true })
        writeFileSync(out, html)
      }

      for (const route of STATIC_ROUTES) {
        emit(route.path, seoTags({ title: route.title, description: route.description, path: route.path }, ctx))
      }
      for (const o of obituaries) {
        emit(`/obituaries/${o.slug}`, seoTags(buildTributeSeo(o, SITE_URL), ctx))
      }

      console.log(
        `[prerender] ${STATIC_ROUTES.length + obituaries.length} route heads baked ` +
          `(${STATIC_ROUTES.length} static + ${obituaries.length} tributes)`,
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
