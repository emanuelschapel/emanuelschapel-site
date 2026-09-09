import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { PHONE } from '../../data/navigation';
import { validateForm, focusFirstError, inputProps, type Errors, type FormSpec } from '../../lib/formValidation';
import FieldError from './FieldError';
import FormStatus from './FormStatus';
import Honeypot from './Honeypot';
import { submitForm, type SubmitStatus } from '../../lib/formSubmission';

const SUBJECT = "Pricing information request — emanuelschapel.org";

const SPEC: FormSpec = {
  name:  { id: 'pr-name',  label: 'Full name',     rules: ['required'] },
  phone: { id: 'pr-phone', label: 'Phone number',  rules: ['required', 'phone'] },
  email: { id: 'pr-email', label: 'Email address', rules: ['required', 'email'] },
};

export default function PricingRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [sendError, setSendError] = useState<string>();
  const [form, setForm] = useState({ name:'', phone:'', email:'', interest:'', wantGPL:'yes', message:'' });
  const set = (f:string) => (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => { setForm(p=>({...p,[f]:e.target.value})); setErrors(p => (p[f] ? { ...p, [f]: '' } : p)); }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateForm(form, SPEC);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusFirstError(found, SPEC);
      return;
    }
    setStatus('sending');
    setSendError(undefined);
    const outcome = await submitForm('pricing', { ...form, _subject: SUBJECT });
    if (!outcome.ok) {
      setStatus('error');
      setSendError(outcome.error);
      return;
    }
    setStatus('idle');
    setSubmitted(true);
  };

  if (submitted) return (
    <div className="bg-blush border border-rule rounded-sm p-10 text-center">
      <CheckCircle size={48} className="text-ink mx-auto mb-4" />
      <h3 className="font-display text-2xl text-ink mb-3">Pricing Request Received</h3>
      <p className="font-body text-muted">We'll be in touch shortly. For immediate questions, call <a href={`tel:${PHONE.replace(/\D/g,'')}`} className="text-ink font-bold">{PHONE}</a>.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Honeypot />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="pr-name" className="form-label">Full Name <span className="text-danger">*</span></label>
          <input id="pr-name" type="text" required value={form.name} onChange={set('name')} {...inputProps('pr-name', errors.name)} />
          <FieldError fieldId="pr-name" message={errors.name} />
        </div>
        <div>
          <label htmlFor="pr-phone" className="form-label">Phone Number <span className="text-danger">*</span></label>
          <input id="pr-phone" type="tel" required value={form.phone} onChange={set('phone')} {...inputProps('pr-phone', errors.phone)} placeholder="(000) 000-0000" />
          <FieldError fieldId="pr-phone" message={errors.phone} />
        </div>
      </div>
      <div>
        <label htmlFor="pr-email" className="form-label">Email Address <span className="text-danger">*</span></label>
        <input id="pr-email" type="email" required value={form.email} onChange={set('email')} {...inputProps('pr-email', errors.email)} />
        <FieldError fieldId="pr-email" message={errors.email} />
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
      <FormStatus error={sendError} />
      <p className="font-body text-xs text-muted"><span className="text-danger">*</span> Required</p>
      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full text-center disabled:opacity-60 disabled:cursor-not-allowed">
        {status === 'sending' ? 'Sending…' : 'Request Pricing Information'}
      </button>
    </form>
  );
}
