import { Phone } from "lucide-react";
import { site } from "../../data/site";

/**
 * Sits above the header on every page. Phone is tap-to-call.
 * Keep it to one line; it is signage, not a banner.
 */
export function AvailabilityBar() {
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 px-6 py-2 text-sm">
        <p className="truncate">{site.availability}</p>
        <a
          href={`tel:${site.phone.tel}`}
          className="flex shrink-0 items-center gap-2 font-bold text-pink hover:text-pink-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink rounded"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          <span>
            <span className="sr-only">Call </span>
            {site.phone.display}
          </span>
        </a>
      </div>
    </div>
  );
}
