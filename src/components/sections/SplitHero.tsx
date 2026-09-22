interface SplitHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
  /** CSS object-position for the image crop. */
  focal?: string;
  cta?: { label: string; href: string };
}

/**
 * Two-panel page banner: copy on a blush panel, artwork beside it.
 *
 * For pages where the picture is illustrative rather than documentary — it is given its
 * own frame instead of being cropped to a letterbox and written over. The copy never
 * competes with the image for contrast, so the artwork can be as light as it likes.
 * Stacks on phones: image first (it is the emotional cue), copy beneath.
 */
export default function SplitHero({
  eyebrow = "Emanuel's Chapel",
  title,
  subtitle,
  imageSrc,
  imageAlt = '',
  focal = 'center',
  cta,
}: SplitHeroProps) {
  return (
    <section className="bg-blush">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,46%)] lg:min-h-[clamp(420px,38vw,560px)]">
        <div className="order-2 lg:order-1 flex items-center">
          <div className="w-full max-w-[36rem] mx-auto lg:ml-auto lg:mr-0 px-6 lg:pl-8 lg:pr-16 py-14 lg:py-20">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-10 bg-pink" />
              <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">{eyebrow}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-5">{title}</h1>
            {subtitle && (
              <p className="font-heading text-ink/80 text-lg md:text-xl italic max-w-xl leading-relaxed">{subtitle}</p>
            )}
            {cta && (
              <a href={cta.href} className="btn-ink mt-8">
                {cta.label}
              </a>
            )}
          </div>
        </div>
        <div className="order-1 lg:order-2 relative aspect-[16/10] lg:aspect-auto">
          <img
            src={imageSrc}
            alt={imageAlt}
            aria-hidden={imageAlt === '' ? 'true' : undefined}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: focal }}
            fetchPriority="high"
            decoding="async"
          />
          {/* Feather the seam so the panel and the picture read as one surface. */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-blush to-transparent hidden lg:block" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-blush to-transparent lg:hidden" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
