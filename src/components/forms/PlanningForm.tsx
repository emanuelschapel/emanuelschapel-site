import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { PHONE } from '../../data/navigation';

export default function PlanningForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:'', phone:'', email:'', contactMethod:'phone', interest:'', message:'' });
  const set = (f:string) => (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(p=>({...p,[f]:e.target.value}));

  if (submitted) return (
    <div className="bg-blush border border-rule rounded-sm p-10 text-center">
      <CheckCircle size={48} className="text-ink mx-auto mb-4" />
      <h3 className="font-display text-2xl text-ink mb-3">Consultation Request Received</h3>
      <p className="font-body text-muted">A member of our team will be in touch. You may also reach us at <a href={`tel:${PHONE.replace(/\D/g,'')}`} className="text-ink font-bold">{PHONE}</a>.</p>
    </div>
  );

  return (
    <form onSubmit={e=>{e.preventDefault();setSubmitted(true);}} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="pf-name" className="form-label">Full Name <span className="text-ink">*</span></label>
          <input id="pf-name" type="text" required value={form.name} onChange={set('name')} className="form-input" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="pf-phone" className="form-label">Phone Number <span className="text-ink">*</span></label>
          <input id="pf-phone" type="tel" required value={form.phone} onChange={set('phone')} className="form-input" placeholder="(000) 000-0000" />
        </div>
      </div>
      <div>
        <label htmlFor="pf-email" className="form-label">Email Address</label>
        <input id="pf-email" type="email" value={form.email} onChange={set('email')} className="form-input" placeholder="your@email.com" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="pf-contact" className="form-label">Preferred Contact Method</label>
          <select id="pf-contact" value={form.contactMethod} onChange={set('contactMethod')} className="form-input">
            <option value="phone">Phone call</option>
            <option value="email">Email</option>
            <option value="either">Either is fine</option>
          </select>
        </div>
        <div>
          <label htmlFor="pf-interest" className="form-label">Service Interest</label>
          <select id="pf-interest" value={form.interest} onChange={set('interest')} className="form-input">
            <option value="">Please select</option>
            <option value="burial">Burial</option>
            <option value="cremation">Cremation</option>
            <option value="unsure">Not yet sure</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="pf-message" className="form-label">Your Questions or Notes</label>
        <textarea id="pf-message" rows={4} value={form.message} onChange={set('message')} className="form-input resize-none" placeholder="Share any questions or thoughts..." />
      </div>
      <button type="submit" className="btn-primary w-full text-center">Request Consultation</button>
    </form>
  );
}
