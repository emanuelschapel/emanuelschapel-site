# Emanuel's Chapel Funeral Home — Phase 1 MVP
**Client:** Emanuel's Chapel Funeral Home  
**Prepared by:** KLC Consulting Group LLC  
**Phase:** 1 — Front-End MVP  

---

## Tech Stack
- React 18 + TypeScript
- Vite
- Tailwind CSS v3
- React Router DOM
- Lucide React (icons)
- Google Fonts: Playfair Display, Cormorant Garamond, Lato

## Brand Palette
Production tokens (Sept 2026). The prototype's fuchsia/plum palette is retired — see
`tailwind.config.ts`. Rule that must survive every edit: **pink never carries white text**
(`#FF96C5` on white is 2.0:1; on `#141414` it is ~9:1).

| Role | Token | Hex |
|------|-------|-----|
| Primary text, CTA fill, dark surfaces | `ink` | `#141414` |
| Ink hover | `ink-soft` | `#2A2628` |
| Brand accent (always with ink text) | `pink` | `#FF96C5` |
| Accent hover | `pink-deep` | `#FF7AB6` |
| Light accent tint | `pink-wash` | `#FFE0EE` |
| Section background | `blush` | `#FBEEF1` |
| Page background | `ivory` | `#FCFAF9` |
| Secondary text | `muted` | `#5C5559` |
| Borders and dividers | `rule` | `#EBD8DE` |
| Form errors | `danger` | `#B3261E` |

## Hosting — Netlify
Deployed from the `main` branch of `github.com/emanuelschapel/emanuelschapel-site` to
https://emanuelschapelrebrand.netlify.app. `netlify.toml` holds the build command, publish
directory, Node version, and the `/* → /index.html` rewrite that `BrowserRouter` needs —
without it a refresh on any page but `/` is a hard 404.

The git remote stays GitHub. Netlify pulls from it; pushing to `main` deploys.

## Obituaries — Sanity
Obituaries are content, edited by the client in a Sanity Studio and read by the site from
Sanity's CDN in the visitor's browser. Static sample data is gone; the page shows exactly
what is published.

```
studio/                     the Studio: schema + config. Its own package.json.
src/lib/sanity.ts           client, GROQ queries, date/image helpers
src/lib/useSanity.ts        fetch lifecycle → loading / ready / error
src/components/cards/ObituaryGrid.tsx   renders every state calmly
src/pages/Tribute.tsx       /obituaries/:slug
```

**One-time setup (client's Sanity account — these documents hold the deceased's names and
family details, so the client is the data controller):**

1. `cd studio && npx sanity login` as the client, then `npx sanity init` → create a new
   project named "Emanuel's Chapel", dataset `production`, **public** visibility.
2. Copy the project id into `studio/.env` (from `studio/.env.example`) and into the site's
   `.env` as `VITE_SANITY_PROJECT_ID`. Set the same variable in Netlify → Environment
   variables and redeploy — it is baked in at build time.
3. Manage → API → **CORS origins**: add `http://localhost:5173`,
   `https://emanuelchapelrebrand.netlify.app`, and later the production domain.
   Leave "Allow credentials" **off**.
4. `cd studio && npm run deploy` publishes the Studio to
   `https://emanuels-chapel.sanity.studio` (name in `studio/sanity.cli.ts`). Invite Lakedia
   there as an Editor.

**Why it is safe to read from the browser:** the site never sends a token, so it can only
read published documents. Drafts are invisible outside the Studio. The project id is
public by design — it is in every API URL.

**Livestream** is per obituary: a toggle plus a link, in the Studio. Off hides the button
and keeps the link. **Condolences** are deliberately not built — public comments on a
grief page need moderation before they exist.

**Until the project id is configured**, the obituaries sections show a plain "not
connected yet" notice rather than a blank grid.

## Form Submissions — Netlify Forms
All four forms submit to [Netlify Forms](https://docs.netlify.com/forms/setup/). No
endpoint ids, no env vars, no third-party account.

**How it works.** Netlify registers forms by parsing plain HTML in the publish directory at
build time. The React-rendered forms are invisible to that bot, so each one is declared in
`public/__forms.html` with the same `name` and field names the component POSTs. Vite
copies that file into `dist/`, Netlify finds it, and the four forms appear under
**Forms** in the Netlify dashboard after the first deploy.

**If you add a field to a React form, add it to `public/__forms.html` too** — Netlify
silently drops fields it has not seen declared.

**Notifications** (who gets the email) are set in the dashboard: Forms → *form* →
Notifications. Moving from the yahoo address to a business address later is a dashboard
change — no code, no redeploy. Notify the client's inbox for all four; the Immediate Need
form is the one that warrants a second recipient.

**Spam.** Each form declares a `bot-field` honeypot. Netlify also runs Akismet on every
submission; flagged entries land under the form's *Spam* tab rather than being lost.

**Free tier** is capped per month — check current limits. Past the cap, submissions are
rejected and the visitor sees the failure notice with the phone number, never a false
confirmation.

**Local dev.** The Vite dev server is not Netlify, so in `npm run dev` a submission is
logged to the console and treated as sent so the confirmation UI can be exercised. To test
the real pipeline locally, run `npx netlify dev`.

Validation lives in `src/lib/formValidation.ts`; every form runs `noValidate` and validates
there, because native `required` treats a single space as a filled field.

**FUTURE (SMS):** Forms → immediate-need → Notifications → *Outgoing webhook*, pointed at
a serverless function that calls Twilio. No frontend change needed. Keep the deceased's
name and location out of the SMS body — that lands unencrypted on a lock screen.

## Getting Started
```bash
npm install
npm run dev
```

## Pages Built (Phase 1)
- `/` — Home
- `/immediate-need` — Immediate Need
- `/services` — Services
- `/obituaries` — Obituaries (Sanity)
- `/obituaries/:slug` — Tribute page (Sanity)
- `/planning-ahead` — Planning Ahead
- `/pricing` — Pricing & Packages
- `/about` — About Us
- `/resources` — Resources & FAQ
- `/contact` — Contact

## File Structure
```
src/
  components/
    layout/      — Header, Footer, MobileCallBar
    sections/    — Hero, PageHero, CTASection
    cards/       — ServiceCard, ObituaryCard, ResourceCard
    forms/       — ImmediateNeedForm, PlanningForm, PricingRequestForm, ContactForm
    ui/          — FAQAccordion
  data/          — site.ts, services.ts, faqs.ts, resources.ts, navigation.ts, contactReasons.ts, futurePhases.ts
  lib/           — sanity.ts, useSanity.ts, formSubmission.ts, formValidation.ts
  pages/         — All 9 pages
  index.css      — Global styles + Tailwind layers
  App.tsx        — Router + layout shell
  main.tsx       — Entry point
public/          — All client images + logo
```

## What's Ready for Future Phases
See `src/data/futurePhases.ts` for a complete integration map.

- **Phase 2:** Obituary management, tribute pages, condolences, livestream, flowers/donations
- **Phase 3:** Online arrangement portal, document upload, secure family comms
- **Phase 4:** Payments, CRM, admin dashboard, analytics, local SEO landing pages

## Notes for Production
1. ~~Replace form handlers with real API endpoints~~ — done, Netlify Forms (see above).
   Still to do: set notification recipients in the Netlify dashboard and send a test.
2. ~~Verify all staff names/titles~~ — Our Team grid hidden (`SHOW_TEAM` in About.tsx) until
   the client confirms names. Owner bio is still placeholder copy.
3. ~~Confirm exact address~~ — street corrected 2026-09-16: **5112 S. Western Ave.** (Phase 1
   shipped "Wentworth", which was wrong; Google's listing had it right all along). ZIP 60609
   not yet independently confirmed — Western at 51st sits near the 60609/60632 line. Office
   hours still open; site currently states 24/7 availability only.
4. ~~Add Google Maps embed to Contact page~~ — done, keyless embed + Get directions link.
5. ~~Add schema.org markup~~ — done: `FuneralHome` JSON-LD injected at build from `site.ts`
   (`vite.config.ts`). `url`/`logo` track Netlify's `URL` and switch to the custom domain
   automatically. Still to add: `openingHoursSpecification` (hours on hold), `sameAs`.
7. ~~SEO basics~~ — done 2026-09-18: per-route titles/descriptions/canonical/Open Graph via
   `src/lib/seo.ts`; `robots.txt` + `sitemap.xml` generated at build (tribute pages listed
   from Sanity); per-obituary `Person`/`Event` JSON-LD on tribute pages.
8. ~~Security headers~~ — done 2026-09-18: CSP allowlist, HSTS, Permissions-Policy in
   `netlify.toml`. Adding any new third-party embed means adding its origin to the CSP first.
6. ~~Confirm phone number is active and monitored 24/7~~ — confirmed 2026-09-16.
