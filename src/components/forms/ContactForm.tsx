import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { PHONE } from '../../data/navigation';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:'', phone:'', email:'', reason:'', message:'' });
  const set = (f:string) => (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(p=>({...p,[f]:e.target.value}));

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
        <select id="cf-reason" value={form.reason} onChange={set('reason')} className="form-input">
          <option value="">Please select</option>
          <option value="immediate">Immediate Need</option>
          <option value="services">Service Information</option>
          <option value="pricing">Pricing Information</option>
          <option value="preplanning">Pre-Planning</option>
          <option value="obituary">Obituary Submission</option>
          <option value="general">General Question</option>
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
