import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { site } from './src/data/site'

/**
 * Injects schema.org FuneralHome markup (JSON-LD) into <head> at build time.
 *
 * Why here and not typed into index.html: the address, phone, and coordinates all come from
 * site.ts, the one place they are allowed to live. The street was wrong for all of Phase 1
 * precisely because a value had been copied somewhere by hand. Why not rendered from React:
 * search engines read static HTML on the first pass and defer JS-rendered content, so the
 * business card is more reliably picked up when it is already in the shipped index.html.
 *
 * Deliberately omitted until the inputs exist — add them here when they do:
 *   url / @id     production domain (the netlify.app preview URL must NOT go here)
 *   logo / image  absolute URLs, which need the domain
 *   openingHoursSpecification  office hours are on hold with the client; "24/7" describes
 *                 phone availability, and telling Google the doors are open at 3am is worse
 *                 than saying nothing
 *   sameAs        social profiles, if the client has any
 */
function schemaOrg(): Plugin {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FuneralHome',
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
export default defineConfig({
  plugins: [react(), schemaOrg()],
})
