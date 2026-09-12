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
(`#FDA8BF` on white is 1.75:1; on `#141414` it is ~11:1).

| Role | Token | Hex |
|------|-------|-----|
| Primary text, CTA fill, dark surfaces | `ink` | `#141414` |
| Ink hover | `ink-soft` | `#2A2628` |
| Brand accent (always with ink text) | `pink` | `#FDA8BF` |
| Accent hover | `pink-deep` | `#F98CA9` |
| Light accent tint | `pink-wash` | `#FDE3EA` |
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
- `/obituaries` — Obituaries (static data)
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
  data/          — services.ts, obituaries.ts, faqs.ts, resources.ts, navigation.ts, futurePhases.ts
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
2. Verify all staff names/titles with client before publishing
3. Confirm exact address and business hours with client
4. Add Google Maps embed to Contact page
5. Add verified schema.org LocalBusiness markup
6. Confirm phone number (773) 912-6745 is active and monitored 24/7
