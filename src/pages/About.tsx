import { Link } from 'react-router-dom';
import PageHero from '../components/sections/PageHero';
import CTASection from '../components/sections/CTASection';

// Staff data — titles only; names not invented. Client to provide verified titles for production.
const staffMembers = [
  { id: 'fd-02', title: 'Funeral Director', image: '/staff_funeral_director_headshot_02.jpg', desc: 'Dedicated to guiding families through every arrangement with patience, clarity, and deep respect.' },
  { id: 'om-01', title: 'Office Manager', image: '/staff_office_manager_headshot.jpg', desc: 'Coordinates the administrative and operational aspects of our services to ensure every detail is handled with care.' },
  { id: 'oa-01', title: 'Office Administrator', image: '/staff_office_administrator_headshot.jpg', desc: 'Provides compassionate administrative support to families from first contact through service completion.' },
  { id: 'el-01', title: 'Senior Staff Member', image: '/staff_elder_headshot.jpg', desc: 'A trusted and experienced member of our team who brings wisdom and community commitment to every service.' },
  { id: 'at-01', title: 'Funeral Attendant', image: '/staff_attendant_headshot_01.jpg', desc: 'Provides respectful, professional support throughout every service to honor the dignity of your loved one.' },
];

/**
 * Featured funeral director.
 * TODO (client): confirm the full name, preferred title, and any credentials Mr. Jones
 * wants stated (licence, years in service, affiliations). The copy below is written to
 * the brief — dedication to the profession and to Chicagoland families — and deliberately
 * asserts no verifiable facts that have not been supplied.
 */
const director = {
  name: 'Mr. Jones',
  title: 'Funeral Director',
  image: '/staff_funeral_director_headshot_01.jpg',
};

const values = [
  { title: 'Dignity', desc: 'Every person deserves to be treated with the highest degree of professional care and respect.' },
  { title: 'Compassion', desc: 'We meet every family where they are — with patience, gentleness, and genuine care.' },
  { title: 'Transparency', desc: 'We believe families deserve honest, clear information to make confident decisions without pressure.' },
  { title: 'Community', desc: 'We are rooted in Chicago and committed to serving our neighbors with the care they deserve.' },
];

export default function About() {
  return (
    <main>
      <PageHero
        title="About Emanuel's Chapel"
        subtitle="A trusted Chicago funeral home rooted in compassion, dignity, and community service."
        imageSrc="/hero_exterior_fleet_staff_wide.jpg"
      />

      {/* Our Story */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-pink" />
              <span className="text-ink text-xs tracking-[0.4em] font-body uppercase">Our Story</span>
            </div>
            <h2 className="section-title mb-6">Serving Chicago Families with Care Since 1991</h2>
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
          <div className="space-y-4">
            <img
              src="/facility_front_exterior_signage.jpg"
              alt="Emanuel's Chapel Funeral Home exterior"
              className="w-full h-56 object-cover rounded-sm shadow-md"
            />
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/chapel_interior_extended_seating_view.jpg"
                alt="Chapel interior"
                className="w-full h-40 object-cover rounded-sm shadow-md"
              />
              <img
                src="/chapel_casket_display_gold_drapes.jpg"
                alt="Chapel display"
                className="w-full h-40 object-cover rounded-sm shadow-md"
              />
            </div>
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

      {/* Featured Funeral Director — ink surface so the profile reads as a feature,
          not another band, between Mission & Values (blush) and Our Team (white). */}
      <section className="bg-ink py-20 px-6" aria-labelledby="director-heading">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] gap-10 lg:gap-16 items-center">
          <div className="mx-auto w-full max-w-xs lg:max-w-none">
            <img
              src={director.image}
              alt={`${director.name}, ${director.title} at Emanuel's Chapel`}
              className="w-full aspect-[4/5] object-cover object-top rounded-sm shadow-lg"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-pink" />
              <span className="text-pink text-xs tracking-[0.4em] font-body uppercase">
                Meet Our Funeral Director
              </span>
            </div>

            <h2 id="director-heading" className="font-display text-3xl md:text-4xl text-white leading-tight mb-2">
              {director.name}
            </h2>
            <p className="font-heading text-pink text-lg italic mb-6">{director.title}</p>

            <p className="font-body text-white/75 leading-relaxed mb-5">
              For Mr. Jones, funeral service is less a profession he chose than a calling he
              answered. His work rests on a simple conviction: that every family who walks
              through our doors deserves patience, honesty, and unhurried attention — whatever
              the hour, whatever the circumstance.
            </p>
            <p className="font-body text-white/75 leading-relaxed mb-5">
              That commitment shows in the details. He guides families personally through the
              decisions that follow a loss, explains every option plainly, and never presses for
              more than a family needs. For households across the Chicagoland area, he has been
              the steady presence in the room on the hardest day of their lives.
            </p>
            <p className="font-body text-white/75 leading-relaxed">
              His dedication extends past any single service — to the funeral profession itself,
              and to the South Side community Emanuel's Chapel is proud to call home.
            </p>
          </div>
        </div>
      </section>

      {/* Staff */}
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

      {/* Facility */}
      <section className="bg-blush py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">Our Facility</h2>
            <p className="section-subtitle max-w-lg mx-auto">A peaceful, dignified space designed to provide comfort to families during a difficult time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { src: '/chapel_interior_main_seating_gray_chairs.jpg', alt: 'Main chapel seating' },
              { src: '/chapel_interior_burgundy_seating.jpg', alt: 'Chapel seating area' },
              { src: '/chapel_interior_extended_seating_view.jpg', alt: 'Extended chapel view' },
            ].map(img => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                className="w-full h-52 object-cover rounded-sm shadow-md"
              />
            ))}
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
