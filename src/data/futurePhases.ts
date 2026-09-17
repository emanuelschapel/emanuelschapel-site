/**
 * FUTURE PHASES — INTEGRATION MAP
 * Emanuel's Chapel Funeral Home | KLC Consulting Group LLC
 *
 * This file documents where future functionality connects to the Phase 1 MVP codebase.
 * Do not build these in Phase 1 — this is architectural documentation only.
 */

export const futurePhases = {
  phase2: {
    title: 'Real Obituary Management & Tribute Pages',
    timeline: 'Phase 2',
    features: [
      'DONE 2026-09-17: obituaries come from Sanity (studio/, src/lib/sanity.ts)',
      'Tribute pages: dynamic /obituaries/:id route with individual tribute content',
      'Online flower ordering: integrate 1-800-Flowers or similar vendor API',
      'Donation links: connect to PayPal or Stripe donation forms on tribute pages',
      'DONE: livestream per obituary, on/off toggle + URL in the Studio',
      'Condolence submission: form that saves to database and notifies family',
      'Obituary search and filter: server-side pagination, date filter, name search',
    ],
    connectsIn: [
      'src/lib/sanity.ts → fetchObituaries / fetchObituary (done)',
      'src/pages/Obituaries.tsx → add pagination, search state, API integration',
      'src/components/cards/ObituaryCard.tsx → add "View Tribute" link to dynamic route',
      'src/pages/Tribute.tsx → /obituaries/:slug (done)',
    ],
  },

  phase3: {
    title: 'Online Arrangement Portal & Family Communication',
    timeline: 'Phase 3',
    features: [
      'Secure family account creation and login',
      'Online funeral arrangement form: step-by-step guided workflow',
      'Document upload: death certificates, military records, insurance policies',
      'E-signatures for arrangement authorization documents',
      'Family communication dashboard: messaging, status updates, and document access',
      'Notification system: email/SMS confirmations and reminders',
    ],
    connectsIn: [
      'src/components/forms/ImmediateNeedForm.tsx → connect to arrangement intake API',
      'New: src/pages/ArrangementPortal.tsx (authenticated, gated route)',
      'New: src/components/auth/ → login, registration, family session management',
    ],
  },

  phase4: {
    title: 'Payments, CRM, Analytics & Local SEO',
    timeline: 'Phase 4',
    features: [
      'Payment integration: Stripe or Square for deposits and final invoices',
      'CRM integration: connect inquiry forms to CRM (e.g., HubSpot, Salesforce, or funeral-specific software)',
      'Admin dashboard: obituary management, inquiry inbox, analytics overview',
      'Google Analytics 4 + Meta Pixel integration',
      'Local SEO landing pages: neighborhood-specific pages for Chicago communities',
      'Google My Business management and review integration',
    ],
    connectsIn: [
      'All forms → route to CRM API endpoint instead of console/state-only',
      'New: /admin route (protected, admin-only)',
      'src/index.html → add GTM snippet',
      'New: src/pages/LocalLanding/ → Chicago neighborhood landing pages',
    ],
  },
};
