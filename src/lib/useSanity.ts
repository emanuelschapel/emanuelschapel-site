import { useEffect, useRef, useState } from 'react';

export type Remote<T> =
  | { status: 'loading' }
  | { status: 'ready'; data: T }
  | { status: 'error' };

/**
 * Ignore a focus event this soon after the last fetch.
 *
 * `focus` and `visibilitychange` both fire when a tab comes forward, so without this every
 * return to the page would fetch twice. Ten seconds also stops a burst of clicking between
 * windows from turning into a burst of requests, while still being far shorter than the gap
 * between opening the Studio, publishing, and coming back.
 */
const REFETCH_COOLDOWN_MS = 10_000;

/**
 * Run a Sanity fetch and expose its lifecycle.
 *
 * The result is stored together with the key it was fetched for, and "loading" is DERIVED
 * (result missing or for a different key) rather than set in the effect — so a route change
 * shows loading immediately without a setState-in-effect, and a slow response for the
 * previous key can never paint over the current one. Never throws: an error state renders a
 * calm message with the phone number, not a blank page.
 *
 * Refetches when the tab comes back to the foreground. Without that this fetched once per
 * mount and never again, so a page left open showed whatever it held when it was opened:
 * an editor who published an obituary in the Studio and tabbed back to the site saw no
 * change and would reasonably conclude the publish had failed. The data itself is only
 * seconds stale — Sanity's CDN serves these queries with max-age=3 — so a refetch on return
 * is all that was missing.
 */
export function useRemote<T>(load: () => Promise<T>, deps: readonly unknown[]): Remote<T> {
  const key = JSON.stringify(deps);
  const [result, setResult] = useState<{ key: string; value: Remote<T> } | null>(null);

  // `load` is a fresh closure every render. The listeners below are registered once per
  // key, so they read it through a ref to avoid resubscribing on every render — and to
  // avoid capturing the closure from the render that happened to register them.
  const loadRef = useRef(load);
  useEffect(() => {
    loadRef.current = load;
  });

  const lastFetched = useRef(0);

  useEffect(() => {
    let live = true;

    const run = (background: boolean) => {
      // Set before awaiting, so an in-flight fetch also holds off the next focus event.
      lastFetched.current = Date.now();
      loadRef.current().then(
        data => {
          if (live) setResult({ key, value: { status: 'ready', data } });
        },
        err => {
          console.error('[sanity] fetch failed', err);
          // A failed background refresh keeps what is already on screen. Replacing a
          // family's tribute with an error message because a refresh blipped is worse
          // than showing content that is a few minutes old.
          if (live && !background) setResult({ key, value: { status: 'error' } });
        },
      );
    };

    run(false);

    const onReturn = () => {
      if (document.visibilityState !== 'visible') return;
      if (Date.now() - lastFetched.current < REFETCH_COOLDOWN_MS) return;
      run(true);
    };
    document.addEventListener('visibilitychange', onReturn);
    window.addEventListener('focus', onReturn);

    return () => {
      live = false;
      document.removeEventListener('visibilitychange', onReturn);
      window.removeEventListener('focus', onReturn);
    };
    // `key` is the whole dependency: `load` is reached through a ref, so this effect no
    // longer needs the lint suppression the previous version carried.
  }, [key]);

  return result && result.key === key ? result.value : { status: 'loading' };
}
