import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { PHONE } from '../../data/navigation';
import { CONTACT_REASONS, toContactReason } from '../../data/contactReasons';
import { validateForm, focusFirstError, inputProps, type Errors, type FormSpec } from '../../lib/formValidation';
import FieldError from './FieldError';
import FormStatus from './FormStatus';
import Honeypot from './Honeypot';
import { submitForm, type SubmitStatus } from '../../lib/formSubmission';

const SUBJECT = "New contact message — emanuelschapel.org";

const SPEC: FormSpec = {
  name:    { id: 'cf-name',    label: 'Full name',     rules: ['required'] },
  phone:   { id: 'cf-phone',   label: 'Phone number',  rules: ['required', 'phone'] },
  email:   { id: 'cf-email',   label: 'Email address', rules: ['required', 'email'] },
  message: { id: 'cf-message', label: 'Your message',  rules: ['required'] },
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [sendError, setSendError] = useState<string>();

  // Clearing the error as soon as the field is corrected, rather than making them submit again.
  const set = (f: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [f]: e.target.value }));
    setErrors(p => (p[f] ? { ...p, [f]: '' } : p));
  };

  // Reason is derived from the URL rather than copied into state, so arriving at a new
  // ?reason= updates the field without an effect. Once the visitor picks one themselves,
  // their choice wins for the rest of the visit.
  const [params] = useSearchParams();
  const prefilled = toContactReason(params.get('reason'));
  const [chosenReason, setChosenReason] = useState<string | null>(null);
  const reason = chosenReason ?? prefilled;

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
    const outcome = await submitForm('contact', { ...form, reason, _subject: SUBJECT });
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
      <h3 className="font-display text-2xl text-ink mb-3">Message Received</h3>
      <p className="font-body text-muted">Thank you for reaching out. A team member will respond shortly. For immediate needs, please call <a href={`tel:${PHONE.replace(/\D/g,'')}`} className="text-ink font-bold">{PHONE}</a>.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <Honeypot />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cf-name" className="form-label">Full Name <span className="text-danger">*</span></label>
          <input id="cf-name" type="text" required value={form.name} onChange={set('name')} {...inputProps('cf-name', errors.name)} />
          <FieldError fieldId="cf-name" message={errors.name} />
        </div>
        <div>
          <label htmlFor="cf-phone" className="form-label">Phone Number <span className="text-danger">*</span></label>
          <input id="cf-phone" type="tel" required value={form.phone} onChange={set('phone')} placeholder="(000) 000-0000" {...inputProps('cf-phone', errors.phone)} />
          <FieldError fieldId="cf-phone" message={errors.phone} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-email" className="form-label">Email Address <span className="text-danger">*</span></label>
        <input id="cf-email" type="email" required value={form.email} onChange={set('email')} placeholder="your@email.com" {...inputProps('cf-email', errors.email)} />
        <FieldError fieldId="cf-email" message={errors.email} />
      </div>
      <div>
        <label htmlFor="cf-reason" className="form-label">Reason for Contacting</label>
        <select id="cf-reason" value={reason} onChange={e => setChosenReason(e.target.value)} className="form-input">
          <option value="">Please select</option>
          {CONTACT_REASONS.map(r => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cf-message" className="form-label">Your Message <span className="text-danger">*</span></label>
        <textarea id="cf-message" rows={5} required value={form.message} onChange={set('message')} placeholder="How can we help you?" {...inputProps('cf-message', errors.message)} />
        <FieldError fieldId="cf-message" message={errors.message} />
      </div>
      <FormStatus error={sendError} />
      <p className="font-body text-xs text-muted"><span className="text-danger">*</span> Required</p>
      <button type="submit" disabled={status === 'sending'} className=" disabled:opacity-60 disabled:cursor-not-allowed">
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
