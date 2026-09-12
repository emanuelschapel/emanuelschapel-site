import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { PHONE, PHONE_HREF } from '../../data/navigation';
import { validateForm, focusFirstError, inputProps, type Errors, type FormSpec } from '../../lib/formValidation';
import FieldError from './FieldError';
import FormStatus from './FormStatus';
import Honeypot from './Honeypot';
import { submitForm, type SubmitStatus } from '../../lib/formSubmission';

const SPEC: FormSpec = {
  name:  { id: 'pf-name',  label: 'Full name',     rules: ['required'] },
  phone: { id: 'pf-phone', label: 'Phone number',  rules: ['required', 'phone'] },
  email: { id: 'pf-email', label: 'Email address', rules: ['required', 'email'] },
};

export default function PlanningForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [sendError, setSendError] = useState<string>();
  const [form, setForm] = useState({ name:'', phone:'', email:'', contactMethod:'phone', interest:'', message:'' });
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
    const outcome = await submitForm('planning', form);
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
      <h3 className="font-display text-2xl text-ink mb-3">Consultation Request Received</h3>
      <p className="font-body text-muted">A member of our team will be in touch. You may also reach us at <a href={PHONE_HREF} className="text-ink font-bold">{PHONE}</a>.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Honeypot />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="pf-name" className="form-label">Full Name <span className="text-danger">*</span></label>
          <input id="pf-name" type="text" required value={form.name} onChange={set('name')} {...inputProps('pf-name', errors.name)} placeholder="Your name" />
          <FieldError fieldId="pf-name" message={errors.name} />
        </div>
        <div>
          <label htmlFor="pf-phone" className="form-label">Phone Number <span className="text-danger">*</span></label>
          <input id="pf-phone" type="tel" required value={form.phone} onChange={set('phone')} {...inputProps('pf-phone', errors.phone)} placeholder="(000) 000-0000" />
          <FieldError fieldId="pf-phone" message={errors.phone} />
        </div>
      </div>
      <div>
        <label htmlFor="pf-email" className="form-label">Email Address <span className="text-danger">*</span></label>
        <input id="pf-email" type="email" required value={form.email} onChange={set('email')} {...inputProps('pf-email', errors.email)} placeholder="your@email.com" />
        <FieldError fieldId="pf-email" message={errors.email} />
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
      <FormStatus error={sendError} />
      <p className="font-body text-xs text-muted"><span className="text-danger">*</span> Required</p>
      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full text-center disabled:opacity-60 disabled:cursor-not-allowed">
        {status === 'sending' ? 'Sending…' : 'Request Consultation'}
      </button>
    </form>
  );
}
