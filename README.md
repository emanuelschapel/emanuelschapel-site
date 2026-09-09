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

## Form Submissions
All four forms POST to [Formspree](https://formspree.io), one endpoint per form.

1. Create four forms in the **client's** Formspree account — these submissions carry a
   deceased person's name and location, so the client is the data controller.
2. `cp .env.example .env` and paste each form id (the hash from `https://formspree.io/f/<hash>`).
3. Set the notification recipient in the Formspree dashboard. It is **not** part of the id,
   so changing it later needs no code change and no redeploy.

If an id is missing the form shows a failure notice with the phone number rather than a
false confirmation — a silently dropped death call is the worst outcome this code has.

Validation lives in `src/lib/formValidation.ts`; every form runs `noValidate` and validates
there, because native `required` treats a single space as a filled field.

**FUTURE (SMS):** hang a Formspree webhook off the Immediate Need endpoint → serverless
function → Twilio. No frontend change needed. Keep the deceased's name and location out of
the SMS body — that lands unencrypted on a lock screen.

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
1. Replace form handlers with real API endpoints (Formspree, EmailJS, or custom backend)
2. Verify all staff names/titles with client before publishing
3. Confirm exact address and business hours with client
4. Add Google Maps embed to Contact page
5. Add verified schema.org LocalBusiness markup
6. Confirm phone number (773) 912-6745 is active and monitored 24/7
