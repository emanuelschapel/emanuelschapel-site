interface PageHeroProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  /**
   * CSS object-position for the crop, e.g. "center 35%" to favour the upper third.
   * Default centres the photo. Tune per page when the subject sits off-centre.
   */
  focal?: string;
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
  imageSrc = '/hero_exterior_fleet_staff_wide.jpg',
  focal = 'center',
  isUrgent = false,
}: PageHeroProps) {
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
      <div className={`absolute inset-0 ${isUrgent ? 'bg-ink/90' : 'hero-overlay'}`} />
      {/* Guarantees the white copy clears 4.5:1 even over the photo's blown-out highlights. */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/85 via-ink/45 to-transparent" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-14 pt-24 w-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-10 bg-pink" />
          <span className="text-pink text-xs tracking-[0.4em] font-body uppercase">
            Emanuel's Chapel
          </span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4">{title}</h1>
        {subtitle && (
          <p className="font-heading text-white/80 text-lg md:text-xl italic max-w-2xl">{subtitle}</p>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ivory to-transparent" />
    </section>
  );
}
