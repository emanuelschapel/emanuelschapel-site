interface PageHeroProps {
  title: string;
  subtitle?: string;
  /** Small caps line above the title. Defaults to the brand name. */
  eyebrow?: string;
  imageSrc?: string;
  /**
   * CSS object-position for the crop, e.g. "center 35%" to favour the upper third.
   * Default centres the photo. Tune per page when the subject sits off-centre.
   */
  focal?: string;
  /**
   * "dark" (default) — the original treatment: an ink gradient over the photograph and
   * white copy. Built for the real photography, which is mid-toned and busy.
   *
   * "light" — for pale, illustrative imagery (pastel skies, blossom, candlelight). No ink
   * overlay: the picture stays as bright as it was delivered, and the copy is ink on a soft
   * ivory wash that fades up from the bottom edge so it clears 4.5:1 without dimming the
   * whole image.
   */
  tone?: 'dark' | 'light';
  /** Where the copy sits. "center" suits compositions with open sky in the middle. */
  align?: 'left' | 'center';
  /** Optional button under the subtitle, for pages whose hero has a job to do. */
  cta?: { label: string; href: string };
  isUrgent?: boolean;
}

/**
 * Full-bleed page banner.
 *
 * HEIGHT — the height is driven by viewport WIDTH (38vw), not height. The previous
 * `min-h-[42vh]` held height constant while width grew, so the container ratio drifted
 * from ~1:1 on a phone to ~3.8:1 on a laptop and `object-cover` zoomed in hard to
 * compensate (roughly 64% of a 4:3 photo cropped away at 1440px). Tying height to width
 * keeps the crop close to constant from ~1024px up, and the clamp stops it running away
 * on ultrawide displays. `min-h` rather than `h` so a long title can still push it taller
 * on narrow screens instead of overflowing.
 */
export default function PageHero({
  title,
  subtitle,
  eyebrow = "Emanuel's Chapel",
  imageSrc = '/hero_exterior_fleet_staff_wide.jpg',
  focal = 'center',
  tone = 'dark',
  align = 'left',
  cta,
  isUrgent = false,
}: PageHeroProps) {
  const light = tone === 'light';
  const centered = align === 'center';

  return (
    <section className="relative flex items-end overflow-hidden min-h-[clamp(380px,38vw,540px)]">
      {/* Decorative: the <h1> below carries the meaning, so this is alt="". A real <img>
          rather than a CSS background so the preload scanner finds the LCP image early. */}
      <img
        src={imageSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: focal }}
        fetchPriority="high"
        decoding="async"
      />

      {light ? (
        // Ivory wash for legibility, strongest where the copy sits. Nothing over the top
        // half, so the artwork keeps its light.
        <div
          className={`absolute inset-x-0 bottom-0 ${
            centered
              ? 'h-[55%] bg-gradient-to-t from-ivory/80 via-ivory/30 to-transparent'
              : 'h-[70%] bg-gradient-to-t from-ivory/95 via-ivory/55 to-transparent'
          }`}
        />
      ) : (
        <>
          <div className={`absolute inset-0 ${isUrgent ? 'bg-ink/90' : 'hero-overlay'}`} />
          {/* Guarantees the white copy clears 4.5:1 even over the photo's blown-out highlights. */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/85 via-ink/45 to-transparent" />
        </>
      )}

      <div
        className={`relative z-10 max-w-5xl mx-auto px-6 pb-14 pt-24 w-full ${centered ? 'text-center' : ''}`}
      >
        <div className={`flex items-center gap-4 mb-4 ${centered ? 'justify-center' : ''}`}>
          <div className="h-px w-10 bg-pink" />
          <span
            className={`text-xs tracking-[0.4em] font-body uppercase ${light ? 'text-ink' : 'text-pink'}`}
          >
            {eyebrow}
          </span>
          {centered && <div className="h-px w-10 bg-pink" />}
        </div>
        <h1
          className={`font-display text-4xl md:text-5xl leading-tight mb-4 ${
            light ? 'text-ink' : 'text-white'
          }`}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`font-heading text-lg md:text-xl italic max-w-2xl ${
              light ? 'text-ink/80' : 'text-white/80'
            } ${centered ? 'mx-auto' : ''}`}
          >
            {subtitle}
          </p>
        )}
        {cta && (
          <a href={cta.href} className={`${light ? 'btn-ink' : 'btn-primary'} mt-8 inline-block`}>
            {cta.label}
          </a>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ivory to-transparent" />
    </section>
  );
}
