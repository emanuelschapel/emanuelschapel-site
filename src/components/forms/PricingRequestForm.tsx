import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { PHONE } from '../../data/navigation';

export default function PricingRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:'', phone:'', email:'', interest:'', wantGPL:'yes', message:'' });
  const set = (f:string) => (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => setForm(p=>({...p,[f]:e.target.value}));

  if (submitted) return (
    <div className="bg-blush border border-rule rounded-sm p-10 text-center">
      <CheckCircle size={48} className="text-ink mx-auto mb-4" />
      <h3 className="font-display text-2xl text-ink mb-3">Pricing Request Received</h3>
      <p className="font-body text-muted">We'll be in touch shortly. For immediate questions, call <a href={`tel:${PHONE.replace(/\D/g,'')}`} className="text-ink font-bold">{PHONE}</a>.</p>
    </div>
  );

  return (
    <form onSubmit={e=>{e.preventDefault();setSubmitted(true);}} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="pr-name" className="form-label">Full Name <span className="text-ink">*</span></label>
          <input id="pr-name" type="text" required value={form.name} onChange={set('name')} className="form-input" />
        </div>
        <div>
          <label htmlFor="pr-phone" className="form-label">Phone Number <span className="text-ink">*</span></label>
          <input id="pr-phone" type="tel" required value={form.phone} onChange={set('phone')} className="form-input" placeholder="(000) 000-0000" />
        </div>
      </div>
      <div>
        <label htmlFor="pr-email" className="form-label">Email Address</label>
        <input id="pr-email" type="email" value={form.email} onChange={set('email')} className="form-input" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="pr-interest" className="form-label">Service Interest</label>
          <select id="pr-interest" value={form.interest} onChange={set('interest')} className="form-input">
            <option value="">Please select</option>
            <option value="burial">Burial</option>
            <option value="cremation">Cremation</option>
            <option value="memorial">Memorial Service</option>
            <option value="veteran">Veteran Services</option>
            <option value="unsure">Unsure</option>
          </select>
        </div>
        <div>
          <label htmlFor="pr-gpl" className="form-label">Would you like our General Price List?</label>
          <select id="pr-gpl" value={form.wantGPL} onChange={set('wantGPL')} className="form-input">
            <option value="yes">Yes, please send it</option>
            <option value="no">No, just general guidance</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="pr-message" className="form-label">Questions or Notes</label>
        <textarea id="pr-message" rows={4} value={form.message} onChange={set('message')} className="form-input resize-none" placeholder="What questions can we help answer?" />
      </div>
      <button type="submit" className="btn-primary w-full text-center">Request Pricing Information</button>
    </form>
  );
}
