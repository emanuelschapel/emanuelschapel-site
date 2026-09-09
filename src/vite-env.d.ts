/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Formspree form ids — the hash from https://formspree.io/f/<hash>. One per form. */
  readonly VITE_FORMSPREE_IMMEDIATE?: string;
  readonly VITE_FORMSPREE_CONTACT?: string;
  readonly VITE_FORMSPREE_PLANNING?: string;
  readonly VITE_FORMSPREE_PRICING?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
