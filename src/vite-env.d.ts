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
