/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Sanity project id (public by design — it is in every API URL). See .env.example. */
  readonly VITE_SANITY_PROJECT_ID?: string;
  /** Sanity dataset; defaults to "production". */
  readonly VITE_SANITY_DATASET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Absolute site origin, no trailing slash. Baked at build from Netlify's URL — see vite.config.ts. */
declare const __SITE_URL__: string;
/** True while the site is served from netlify.app rather than its real domain. */
declare const __PRELAUNCH__: boolean;
