import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { PHONE } from '../../data/navigation';

export default function ImmediateNeedForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', lovedOneName: '', lovedOneLocation: '',
    deathOccurred: '', serviceType: '', message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // FUTURE PHASE: Connect to backend API endpoint or form service (e.g., Formspree, EmailJS, custom Express API)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-blush border border-rule rounded-sm p-10 text-center">
        <CheckCircle size={48} className="text-ink mx-auto mb-4" />
        <h3 className="font-display text-2xl text-ink mb-3">Your Request Has Been Received</h3>
        <p className="font-body text-muted text-base leading-relaxed max-w-md mx-auto">
          Thank you. A member of our team will contact you as soon as possible. If this is urgent, please call us directly at{' '}
          <a href={`tel:${PHONE.replace(/\D/g,'')}`} className="text-ink font-bold">{PHONE}</a>.
        </p>
      </div>
    );
  }

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="inf-name" className="form-label">Your Name <span className="text-ink">*</span></label>
          <input id="inf-name" type="text" required value={form.name} onChange={set('name')} className="form-input" placeholder="Full name" />
        </div>
        <div>
          <label htmlFor="inf-phone" className="form-label">Phone Number <span className="text-ink">*</span></label>
          <input id="inf-phone" type="tel" required value={form.phone} onChange={set('phone')} className="form-input" placeholder="(000) 000-0000" />
        </div>
      </div>
      <div>
        <label htmlFor="inf-email" className="form-label">Email Address</label>
        <input id="inf-email" type="email" value={form.email} onChange={set('email')} className="form-input" placeholder="your@email.com" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="inf-loved-name" className="form-label">Name of Loved One <span className="text-ink">*</span></label>
          <input id="inf-loved-name" type="text" required value={form.lovedOneName} onChange={set('lovedOneName')} className="form-input" placeholder="Full name" />
        </div>
        <div>
          <label htmlFor="inf-loved-location" className="form-label">Location of Loved One <span className="text-ink">*</span></label>
          <input id="inf-loved-location" type="text" required value={form.lovedOneLocation} onChange={set('lovedOneLocation')} className="form-input" placeholder="Hospital, home, address..." />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="inf-death" className="form-label">Has a death occurred?</label>
          <select id="inf-death" value={form.deathOccurred} onChange={set('deathOccurred')} className="form-input">
            <option value="">Please select</option>
            <option value="yes">Yes</option>
            <option value="no">No — planning ahead</option>
            <option value="unsure">Unsure</option>
          </select>
        </div>
        <div>
          <label htmlFor="inf-service" className="form-label">Preferred Service Type</label>
          <select id="inf-service" value={form.serviceType} onChange={set('serviceType')} className="form-input">
            <option value="">Please select</option>
            <option value="burial">Burial</option>
            <option value="cremation">Cremation</option>
            <option value="memorial">Memorial Service</option>
            <option value="unsure">Unsure</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="inf-message" className="form-label">Additional Information</label>
        <textarea id="inf-message" rows={4} value={form.message} onChange={set('message')} className="form-input resize-none" placeholder="Share anything that would help our team reach out to you..." />
      </div>
      <button type="submit" className="btn-primary w-full text-center justify-center">
        Submit Request
      </button>
      <p className="font-body text-xs text-muted text-center">
        For urgent matters, please call <a href={`tel:${PHONE.replace(/\D/g,'')}`} className="text-ink font-bold">{PHONE}</a> immediately.
      </p>
    </form>
  );
}
