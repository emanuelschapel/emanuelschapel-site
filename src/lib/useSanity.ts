import { useEffect, useState } from 'react';

export type Remote<T> =
  | { status: 'loading' }
  | { status: 'ready'; data: T }
  | { status: 'error' };

/**
 * Run a Sanity fetch and expose its lifecycle.
 *
 * The result is stored together with the key it was fetched for, and "loading" is DERIVED
 * (result missing or for a different key) rather than set in the effect — so a route change
 * shows loading immediately without a setState-in-effect, and a slow response for the
 * previous key can never paint over the current one. Never throws: an error state renders a
 * calm message with the phone number, not a blank page.
 */
export function useRemote<T>(load: () => Promise<T>, deps: readonly unknown[]): Remote<T> {
  const key = JSON.stringify(deps);
  const [result, setResult] = useState<{ key: string; value: Remote<T> } | null>(null);

  useEffect(() => {
    let live = true;
    load().then(
      data => { if (live) setResult({ key, value: { status: 'ready', data } }); },
      err => {
        console.error('[sanity] fetch failed', err);
        if (live) setResult({ key, value: { status: 'error' } });
      },
    );
    return () => { live = false; };
    // `load` is a fresh closure every render by design; `key` captures what it depends on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return result && result.key === key ? result.value : { status: 'loading' };
}
