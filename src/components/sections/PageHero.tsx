interface PageHeroProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  isUrgent?: boolean;
}

export default function PageHero({ title, subtitle, imageSrc = '/hero_exterior_fleet_staff_wide.jpg', isUrgent = false }: PageHeroProps) {
  return (
    <section className="relative min-h-[42vh] flex items-end">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageSrc}')` }}
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
