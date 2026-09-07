import { Phone, MapPin, Clock, AlertCircle } from 'lucide-react';
import PageHero from '../components/sections/PageHero';
import ContactForm from '../components/forms/ContactForm';
import { Link } from 'react-router-dom';
import { PHONE, PHONE_HREF, ADDRESS, HOURS_NOTE, ADDRESS_NOTE } from '../data/navigation';

export default function Contact() {
  return (
    <main>
      <PageHero
        title="Contact Emanuel's Chapel"
        subtitle="We are here for you. Reach out by phone, form, or visit — we will respond with care."
        imageSrc="/facility_front_exterior_signage.jpg"
      />

      {/* Immediate CTA */}
      <section className="bg-ink py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertCircle size={18} className="text-pink" />
            <span className="font-body text-white/80 text-sm tracking-widest uppercase">Immediate Need?</span>
          </div>
          <p className="font-body text-white/70 mb-6 text-base">
            If you need immediate assistance, please call us directly. Our team answers around the clock.
          </p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 bg-pink hover:bg-pink-deep text-ink text-xl font-bold px-10 py-5 rounded-sm transition-all font-body tracking-wide"
          >
            <Phone size={22} />
            {PHONE}
          </a>
          <p className="font-body text-white/50 text-xs mt-4">Available 24 hours a day, 7 days a week</p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Info */}
          <div>
            <h2 className="section-title text-2xl mb-8">Get in Touch</h2>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Phone size={18} className="text-ink" />
                  <h3 className="font-heading text-ink font-semibold text-base">Phone</h3>
                </div>
                <a href={PHONE_HREF} className="font-body text-ink font-bold text-lg hover:text-ink transition-colors">
                  {PHONE}
                </a>
                <p className="font-body text-sm text-muted mt-1">Available 24/7 for immediate assistance</p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <MapPin size={18} className="text-ink" />
                  <h3 className="font-heading text-ink font-semibold text-base">Location</h3>
                </div>
                <p className="font-body text-ink text-sm leading-relaxed">{ADDRESS}</p>
                <p className="font-body text-xs text-muted mt-1">{ADDRESS_NOTE}</p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={18} className="text-ink" />
                  <h3 className="font-heading text-ink font-semibold text-base">Hours</h3>
                </div>
                <p className="font-body text-sm text-ink leading-relaxed">{HOURS_NOTE}</p>
                <p className="font-body text-xs text-muted mt-1">(Please call to confirm office appointment hours.)</p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-10 bg-blush rounded-sm h-52 flex items-center justify-center border border-rule">
              <div className="text-center">
                <MapPin size={32} className="text-ink mx-auto mb-3 opacity-50" />
                <p className="font-body text-sm text-muted">Map integration available</p>
                <p className="font-body text-xs text-muted">(Google Maps embed — Phase 2)</p>
              </div>
            </div>

            <div className="mt-8 bg-blush border-l-4 border-pink p-5 rounded-sm">
              <p className="font-body text-sm text-ink leading-relaxed">
                <strong>Immediate Need?</strong> Don't wait. Call us now or visit our{' '}
                <Link to="/immediate-need" className="text-ink underline">Immediate Need page</Link> for step-by-step guidance.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="section-title text-2xl mb-8">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Facility photo */}
      <section className="px-6 pb-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <img
            src="/facility_side_exterior_building.jpg"
            alt="Emanuel's Chapel Funeral Home building"
            className="w-full h-64 object-cover rounded-sm shadow-md"
          />
        </div>
      </section>
    </main>
  );
}
