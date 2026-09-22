import PageHero from '../components/sections/PageHero';
import { Button } from '../components/ui/Button';
import CTASection from '../components/sections/CTASection';
import { site } from '../data/site';
import { useSeo } from '../lib/seo';

/** The "Our Team" grid is hidden until the client confirms names and titles. Flip to show. */
const SHOW_TEAM = false;

// Staff data — titles only; names not invented. Client to provide verified titles for production.
const staffMembers = [
  { id: 'fd-02', title: 'Funeral Director', image: '/staff_funeral_director_headshot_02.jpg', desc: 'Dedicated to guiding families through every arrangement with patience, clarity, and deep respect.' },
  { id: 'om-01', title: 'Office Manager', image: '/staff_office_manager_headshot.jpg', desc: 'Coordinates the administrative and operational aspects of our services to ensure every detail is handled with care.' },
  { id: 'oa-01', title: 'Office Administrator', image: '/staff_office_administrator_headshot.jpg', desc: 'Provides compassionate administrative support to families from first contact through service completion.' },
  { id: 'el-01', title: 'Senior Staff Member', image: '/staff_elder_headshot.jpg', desc: 'A trusted and experienced member of our team who brings wisdom and community commitment to every service.' },
  { id: 'at-01', title: 'Funeral Attendant', image: '/staff_attendant_headshot_01.jpg', desc: 'Provides respectful, professional support throughout every service to honor the dignity of your loved one.' },
];

/**
 * Owner profile.
 * TODO (client): confirm any credentials Emanuel Jones wants stated — licence, years in
 * service, professional affiliations, and whether he founded the chapel or acquired it.
 * The copy below is written to the brief (dedication to the profession and to Chicagoland
 * families) and deliberately asserts no fact that has not been supplied. If he would like a
 * signed pull-quote here, send his words — I will not put sentences in his mouth.
 */
const owner = {
  name: 'Emanuel Jones',
  title: 'Owner & Funeral Director',
  image: '/staff_funeral_director_headshot_01.jpg',
};

const values = [
  { title: 'Dignity', desc: 'Every person deserves to be treated with the highest degree of professional care and respect.' },
  { title: 'Compassion', desc: 'We meet every family where they are — with patience, gentleness, and genuine care.' },
  { title: 'Transparency', desc: 'We believe families deserve honest, clear information to make confident decisions without pressure.' },
  { title: 'Community', desc: 'We are rooted in Chicago and committed to serving our neighbors with the care they deserve.' },
];

export default function About() {
  useSeo({
    title: "About Emanuel's Chapel — Family-Owned Since 1991 | South Side Chicago",
    description: "Meet Emanuel Jones and the chapel that has served Chicago's South Side since 1991: our story, our values, and our facility on S. Western Ave.",
    path: '/about',
  });
  return (
    <main>
      {/* Client campaign artwork (Sept 2026). The supplied 4:3 frame would lose half its
          height in this banner, so the bokeh flank was extended to ~2.45:1 and the baked-in
          text cleared — the headline below is that same line, now live copy. */}
      <PageHero
        eyebrow="About Emanuel's Chapel"
        title="Trusted by Our Community"
        subtitle="A trusted Chicago funeral home rooted in compassion, dignity, and community service."
        imageSrc="/images/heroes/about-family.jpg"
        focal="72% center"
        tone="light"
      />

      {/* Our Story — centred prose, matching how the other pages set a block of body copy.
          The three facility photographs that sat beside it are gone; the page now carries
          its imagery in the hero and the owner's portrait instead. Paragraphs stay
          left-aligned on phones, where centred body text is hard to read. */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-10 bg-pink" />
            <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">Our Story</span>
            <div className="h-px w-10 bg-pink" />
          </div>
          <h2 className="section-title mb-6">Serving Chicago Families with Care Since 1991</h2>
          <div className="text-left sm:text-center">
            <p className="font-body text-muted leading-relaxed mb-5">
              Emanuel's Chapel Funeral Home was established to bring compassionate, professional funeral care to the Chicago community. What began as a commitment to dignified service has grown into a trusted institution — one that families turn to in their most vulnerable moments with confidence and trust.
            </p>
            <p className="font-body text-muted leading-relaxed mb-5">
              We believe that honoring a life is a profound responsibility. Our team approaches every family, every service, and every arrangement with the same care and dedication — because every life deserves to be remembered with dignity.
            </p>
            <p className="font-body text-muted leading-relaxed">
              From the warmth of our chapel to the professionalism of our fleet, every detail of Emanuel's Chapel reflects our commitment to the families we serve and the community we call home.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-blush py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title mb-4">Our Mission & Values</h2>
            <p className="font-body text-muted text-lg italic max-w-2xl mx-auto">
              "To serve every family with the compassion, dignity, and professional care they deserve — from the first call to the final farewell."
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white p-7 rounded-sm shadow-sm text-center">
                <div className="w-10 h-10 rounded-full bg-pink-wash flex items-center justify-center mx-auto mb-4">
                  <span className="text-ink text-lg" aria-hidden="true">✦</span>
                </div>
                <h3 className="font-display text-lg text-ink mb-3">{v.title}</h3>
                <p className="font-body text-sm text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner profile — the anchor of the page: offset frame, ambient warmth, and an
          asymmetric 5/7 split so it reads as a considered portrait rather than a photo
          parked beside a paragraph. */}
      <section className="relative bg-ink overflow-hidden py-20 lg:py-28 px-6" aria-labelledby="owner-heading">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.09]"
          style={{ backgroundImage: 'radial-gradient(circle at 24% 45%, #FF96C5 0%, transparent 62%)' }}
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          {/* Portrait, held inside an offset pink rule */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div
                className="absolute -inset-3 sm:-inset-4 border border-pink/45 rounded-sm"
                aria-hidden="true"
              />
              <img
                src={owner.image}
                alt={`${owner.name}, ${owner.title} at Emanuel's Chapel`}
                className="relative w-full aspect-[4/5] object-cover object-top rounded-sm shadow-[0_18px_50px_rgba(0,0,0,0.45)]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Profile */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-pink" />
              <span className="text-pink text-xs tracking-[0.4em] font-body uppercase">
                Meet the Owner
              </span>
            </div>

            <h2
              id="owner-heading"
              className="font-display text-4xl md:text-5xl text-white leading-[1.1] mb-4"
            >
              {owner.name}
            </h2>

            <div className="flex items-center gap-4 mb-8">
              <span className="font-heading text-pink text-xl italic">{owner.title}</span>
              <span className="h-px flex-1 bg-white/15" />
              <span className="text-pink text-base leading-none" aria-hidden="true">&#10022;</span>
            </div>

            <div className="space-y-5 max-w-[62ch]">
              <p className="font-body text-white/80 text-[15.5px] leading-[1.75]">
                For Emanuel Jones, funeral service is less a profession he chose than a calling he
                answered. He leads Emanuel&rsquo;s Chapel by a simple conviction: that every family
                who walks through these doors deserves patience, honesty, and unhurried attention
                &mdash; whatever the hour, whatever the circumstance.
              </p>
              <p className="font-body text-white/80 text-[15.5px] leading-[1.75]">
                That commitment shows in the details. He guides families personally through the
                decisions that follow a loss, explains every option plainly, and never presses for
                more than a family needs. For households across the Chicagoland area, he has been
                the steady presence in the room on the hardest day of their lives.
              </p>
              <p className="font-body text-white/80 text-[15.5px] leading-[1.75]">
                His dedication extends past any single service &mdash; to the funeral profession
                itself, and to the South Side community Emanuel&rsquo;s Chapel is proud to call home.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button variant="accent" to="/contact?reason=general">
                Speak with Emanuel&rsquo;s Chapel
              </Button>
              <Button variant="outline" tone="light" to="/services">
                Our services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Staff — hidden for now (SHOW_TEAM). Kept intact so it is one word to bring back. */}
      {SHOW_TEAM && (
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px w-12 bg-pink" />
              <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">Our Team</span>
              <div className="h-px w-12 bg-pink" />
            </div>
            <h2 className="section-title mb-4">The People Who Care for Your Family</h2>
            <p className="section-subtitle max-w-xl mx-auto">Our professional team is dedicated to serving you with compassion, expertise, and genuine care.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {staffMembers.map(member => (
              <div key={member.id} className="text-center group">
                <div className="relative w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden border-4 border-blush group-hover:border-rule transition-all shadow-md">
                  <img
                    src={member.image}
                    alt={member.title}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '';
                      target.parentElement!.style.background = '#FBEEF1';
                    }}
                  />
                </div>
                <h4 className="font-heading text-ink font-semibold text-lg mb-2">{member.title}</h4>
                <p className="font-body text-sm text-muted leading-relaxed max-w-xs mx-auto">{member.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <img
              src="/team_staff_group_outdoor_closeup.jpg"
              alt="Emanuel's Chapel team"
              className="w-full max-w-3xl mx-auto h-72 object-cover object-top rounded-sm shadow-lg"
            />
          </div>
        </div>
      </section>
      )}

      {/* Facility — one feature photo with two supporting, every image captioned so each
          says what it IS. The previous strip was three near-identical shots of empty chairs
          with no words; the viewing room (the most distinctive photo) was not in it at all. */}
      <section className="bg-blush py-20 px-6" aria-labelledby="facility-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-end mb-9">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-pink" />
                <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">Our Facility</span>
              </div>
              <h2 id="facility-heading" className="section-title">
                A peaceful, dignified space<br className="hidden sm:block" /> for saying goodbye.
              </h2>
            </div>
            <p className="section-subtitle lg:max-w-md">
              Designed to give families comfort, privacy, and room to gather — from an intimate viewing to a full chapel service.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_1fr] lg:grid-rows-[280px_280px]">
            <FacilityPhoto
              feature
              src="/chapel_casket_display_gold_drapes.jpg"
              alt="The viewing room: a casket beneath draped gold curtains, flanked by pink and white floral arrangements"
              title="The Viewing Room"
              caption="Private, softly lit, arranged around your loved one."
            />
            <FacilityPhoto
              src="/chapel_interior_extended_seating_view.jpg"
              alt="The main chapel, rows of seating facing the front under a chandelier"
              title="The Main Chapel"
              caption="Room for everyone who loved them."
            />
            <FacilityPhoto
              src="/facility_front_exterior_signage.jpg"
              alt="The front entrance of Emanuel's Chapel Funeral Home with its street sign"
              title="Finding Us"
              caption={`${site.address.street} — our staff will meet you at the door.`}
            />
          </div>
        </div>
      </section>

      <CTASection
        headline="We would be honored to serve your family."
        subtext="Reach out today to speak with one of our compassionate funeral directors."
        secondaryLabel="Learn About Our Services"
        secondaryHref="/services"
      />
    </main>
  );
}

/**
 * A facility photo with its name and a one-line caption over a bottom scrim. The scrim is
 * ink at 85% at the baseline, so white copy clears 4.5:1 regardless of what is in the photo.
 * `feature` spans both rows of the desktop grid.
 */
function FacilityPhoto({
  src, alt, title, caption, feature = false,
}: { src: string; alt: string; title: string; caption: string; feature?: boolean }) {
  return (
    <figure
      className={`relative overflow-hidden rounded-sm ${
        feature
          ? 'aspect-[4/3] lg:aspect-auto lg:row-span-2 shadow-[0_18px_50px_rgba(0,0,0,0.14)]'
          : 'aspect-[4/3] lg:aspect-auto shadow-[0_6px_20px_rgba(0,0,0,0.10)]'
      }`}
    >
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
      <figcaption
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent text-white ${
          feature ? 'px-7 pb-7 pt-20' : 'px-5 pb-5 pt-14'
        }`}
      >
        <h3 className={`font-display font-normal leading-tight mb-1 ${feature ? 'text-2xl' : 'text-xl'}`}>{title}</h3>
        <p className={`font-body text-white/80 ${feature ? 'text-sm' : 'text-[13px]'}`}>{caption}</p>
      </figcaption>
    </figure>
  );
}
