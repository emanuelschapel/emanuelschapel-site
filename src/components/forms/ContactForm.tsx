import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { PHONE } from '../../data/navigation';
import { CONTACT_REASONS, toContactReason } from '../../data/contactReasons';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:'', phone:'', email:'', message:'' });
  const set = (f:string) => (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setForm(p=>({...p,[f]:e.target.value}));

  // Reason is derived from the URL rather than copied into state, so arriving at a new
  // ?reason= updates the field without an effect. Once the visitor picks one themselves,
  // their choice wins for the rest of the visit.
  const [params] = useSearchParams();
  const fromUrl = params.get('reason');
  const prefilled = toContactReason(fromUrl);
  const [chosenReason, setChosenReason] = useState<string | null>(null);
  const reason = chosenReason ?? prefilled;

  if (submitted) return (
    <div className="bg-blush border border-rule rounded-sm p-10 text-center">
      <CheckCircle size={48} className="text-ink mx-auto mb-4" />
      <h3 className="font-display text-2xl text-ink mb-3">Message Received</h3>
      <p className="font-body text-muted">Thank you for reaching out. A team member will respond shortly. For immediate needs, please call <a href={`tel:${PHONE.replace(/\D/g,'')}`} className="text-ink font-bold">{PHONE}</a>.</p>
    </div>
  );

  return (
    <form onSubmit={e=>{e.preventDefault();setSubmitted(true);}} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cf-name" className="form-label">Full Name <span className="text-ink">*</span></label>
          <input id="cf-name" type="text" required value={form.name} onChange={set('name')} className="form-input" />
        </div>
        <div>
          <label htmlFor="cf-phone" className="form-label">Phone Number</label>
          <input id="cf-phone" type="tel" value={form.phone} onChange={set('phone')} className="form-input" placeholder="(000) 000-0000" />
        </div>
      </div>
      <div>
        <label htmlFor="cf-email" className="form-label">Email Address <span className="text-ink">*</span></label>
        <input id="cf-email" type="email" required value={form.email} onChange={set('email')} className="form-input" />
      </div>
      <div>
        <label htmlFor="cf-reason" className="form-label">Reason for Contacting</label>
        <select
          id="cf-reason"
          value={reason}
          onChange={e => setChosenReason(e.target.value)}
          className="form-input"
        >
          <option value="">Please select</option>
          {CONTACT_REASONS.map(r => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cf-message" className="form-label">Your Message <span className="text-ink">*</span></label>
        <textarea id="cf-message" rows={5} required value={form.message} onChange={set('message')} className="form-input resize-none" placeholder="How can we help you?" />
      </div>
      <button type="submit" className="btn-primary w-full text-center">Send Message</button>
    </form>
  );
}
