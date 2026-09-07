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
| Role | Color | Hex |
|------|-------|-----|
| Primary CTA / Brand Accent | Brand Fuchsia | `#C4008F` |
| Hover / Highlight Accent | Bright Magenta | `#D9009F` |
| Header / Footer Contrast | Deep Formal Plum | `#2B001F` |
| Secondary Accent | Deep Plum | `#5E0044` |
| Page Background | White | `#FFFFFF` |
| Soft Section Background | Soft Blush | `#F9F3F7` |
| Body Text | Charcoal Black | `#1A1A1A` |
| Supporting Text | Medium Gray | `#6F6F6F` |

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
