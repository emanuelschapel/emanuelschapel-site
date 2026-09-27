/**
 * Pure URL helpers, with no dependency on the Sanity client.
 *
 * Split out of sanity.ts so the build can use them. vite.config.ts imports this module to
 * bake tribute <head> tags at build time, and importing sanity.ts there would drag in
 * `@sanity/client` and `import.meta.env`, neither of which exists in the config context.
 *
 * sanity.ts re-exports everything here, so existing call sites are unchanged.
 */

/**
 * The livestream link as an href. Editors paste links as people write them —
 * "youtube.com/live/abc" — and the Studio accepts that; this is where the scheme is added.
 * Always https: a livestream host without TLS is not something to send a family to.
 * Returns undefined for an empty or unusable value so callers render no button at all.
 */
export function livestreamHref(value: string | undefined | null): string | undefined {
  const v = (value ?? '').trim();
  if (!v) return undefined;
  const withScheme = /^https?:\/\//i.test(v) ? v.replace(/^http:\/\//i, 'https://') : `https://${v}`;
  try {
    const u = new URL(withScheme);
    return u.protocol === 'https:' && u.hostname.includes('.') ? u.href : undefined;
  } catch {
    return undefined;
  }
}
