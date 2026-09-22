/**
 * Service packages, transcribed from the client's pricing flyer (Sept 2026).
 *
 * Silver is the recommended package and the one the page presents in full; Gold and
 * Platinum are shown as what they ADD over Silver, so a family can see exactly what the
 * extra money buys. `includes` on Silver is the complete list; `adds` on the others is
 * only the difference. Prices are whole dollars.
 *
 * The contact and pricing forms carry the chosen package as `package` — if you add a
 * package here, add nothing else: PackageTiers, the pricing form's select, and the
 * ?package= prefill all read this list.
 */
export interface ServicePackage {
  id: 'silver' | 'gold' | 'platinum';
  name: string;
  tagline: string;
  price: number;
  recommended?: boolean;
  /** Complete inclusions (the recommended package). */
  includes?: string[];
  /** What this package adds over the recommended one. */
  adds?: string[];
}

export const PACKAGES: ServicePackage[] = [
  {
    id: 'silver',
    name: 'Silver',
    tagline: 'Economical option — complete, nothing missing',
    price: 5500,
    recommended: true,
    includes: [
      'Hearse',
      'Limousine',
      'Casket spray',
      'Register book',
      'Professional service',
      '100 colored programs',
      '3 certified copies of certificates',
      '20-gauge metal casket, any color',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    tagline: 'Added flowers and programs',
    price: 8000,
    adds: [
      '200 colored programs (instead of 100)',
      '3-piece carnation flower set, colors of your choice',
      '20–18-gauge metal casket, any color',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    tagline: 'Sealer or wood casket',
    price: 8500,
    adds: [
      '200 colored programs (instead of 100)',
      '3-piece carnation flower set of choice',
      '18-gauge sealer casket, or wood',
    ],
  },
];

export const RECOMMENDED = PACKAGES.find(p => p.recommended)!;
export const UPGRADES = PACKAGES.filter(p => !p.recommended);

export const formatPrice = (n: number) => `$${n.toLocaleString('en-US')}`;

/** Narrows an arbitrary query value to a known package id, or '' for "Please select". */
export function toPackageId(value: string | null): string {
  return PACKAGES.some(p => p.id === value) ? (value as string) : '';
}
