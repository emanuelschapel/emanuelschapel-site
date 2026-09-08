import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { heroQuickLinks, site } from "../../data/site";

/**
 * HERO — "the wall is the headline"
 *
 * The photograph already carries the wordmark and tagline, so this component writes no
 * competing H1 over it. The visually-hidden <h1> keeps document outline and SEO intact.
 *
 * Layout
 *  ≥ lg   photo fills the viewport below the header; a dark "plinth" rises from the marble
 *         counter at the bottom carrying the lede + CTAs. Quick links float at the right edge.
 *  < lg   photo (4:3, uncropped) → solid ink plinth beneath it. Nothing overlaps on mobile:
 *         a family in the first hour should never have to read text over a picture.
 *
 * IMAGE NOTE
 *  The source is a 1904×952 (exactly 2:1) extension of the original 1288×952 photograph.
 *  The photograph sits sharp in the centre; 308px per side is a blurred, darkened
 *  continuation of the room that fades toward ink, so the banner fills a wide viewport
 *  with no pillarbox. 308/1904 is exactly what a 1.353 container crops away, so phones and
 *  tablets (aspect-[1288/952]) land back on the ORIGINAL framing and never show the
 *  extension — one asset serves every breakpoint.
 *
 *  Band mode stays the shipping default: the "A prepared service to prepare people" prayer
 *  line is baked into the photo just above the counter, and the overlay plinth would cover
 *  it. Only move to overlay with artwork that has clear space at the bottom.
 */
interface HeroProps {
  /** "overlay" (chosen direction) or "band" (fallback while the 4:3 image is the only source) */
  desktopLayout?: "overlay" | "band";
}

const img = "/images/brand/hero-reception-wall";

export function Hero({ desktopLayout = "overlay" }: HeroProps) {
  const overlay = desktopLayout === "overlay";

  return (
    <section aria-labelledby="hero-heading" className="relative bg-ink">
      <h1 id="hero-heading" className="sr-only">
        {site.legalName} — {site.tagline}
      </h1>

      {/* Photograph */}
      <div
        className={
          overlay
            ? "relative aspect-[1288/952] w-full lg:aspect-auto lg:h-[calc(100vh-7rem)] lg:min-h-[640px] lg:max-h-[960px]"
            : "relative aspect-[1288/952] w-full lg:aspect-[2/1] lg:max-h-[78vh]"
        }
      >
        <picture>
          <source
            type="image/webp"
            srcSet={`${img}-800.webp 800w, ${img}-1200.webp 1200w, ${img}-1904.webp 1904w`}
            sizes="100vw"
          />
          <img
            src={`${img}-1200.jpg`}
            srcSet={`${img}-800.jpg 800w, ${img}-1200.jpg 1200w, ${img}-1904.jpg 1904w`}
            sizes="100vw"
            alt="Reception wall at Emanuel's Chapel with the wreath monogram, calla lilies, and candlelight"
            className="absolute inset-0 h-full w-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        </picture>

        {/* Quick links — desktop only, for visitors who are not in crisis */}
        <nav
          aria-label="Quick links"
          className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
        >
          {heroQuickLinks.map((q) => (
            <Link
              key={q.to}
              to={q.to}
              className="rounded-r border-l-[3px] border-pink bg-ivory/95 px-4 py-3 text-[13.5px] font-semibold text-ink shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
            >
              {q.label}
            </Link>
          ))}
        </nav>

        {/* Plinth — overlay mode on desktop rises from the counter */}
        {overlay && <Plinth className="absolute inset-x-0 bottom-0 hidden lg:block" gradient />}
      </div>

      {/* Plinth — always solid beneath the photo on mobile; on desktop only in band mode */}
      <Plinth className={overlay ? "lg:hidden" : ""} />
    </section>
  );
}

function Plinth({ className = "", gradient = false }: { className?: string; gradient?: boolean }) {
  return (
    <div
      className={`text-white ${
        gradient
          ? "bg-gradient-to-t from-ink/95 via-ink/60 to-transparent pt-24 pb-10"
          : "bg-ink py-8 lg:py-10"
      } ${className}`}
    >
      <div className="mx-auto grid max-w-site gap-7 px-6 lg:grid-cols-[minmax(0,1.3fr)_auto] lg:items-end lg:gap-8">
        <p className="max-w-[36ch] font-display text-[22px] leading-snug lg:text-[26px]">
          Family-owned on Chicago's South Side, ready the moment you call.
          <span className="mt-2.5 block font-body text-[14.5px] leading-relaxed text-white/75">
            If a death has just occurred, call us now. We will guide you through every step, at any hour.
          </span>
        </p>
        <div className="flex flex-wrap gap-3.5">
          <Button variant="accent" href={`tel:${site.phone.tel}`}>
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
            Call now, 24/7
          </Button>
          <Button variant="outline" tone="light" to="/immediate-need">
            Immediate need
          </Button>
        </div>
      </div>
    </div>
  );
}
