import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { PHONE } from '../../data/navigation';
import { validateForm, focusFirstError, inputProps, type Errors, type FormSpec } from '../../lib/formValidation';
import FieldError from './FieldError';

const SPEC: FormSpec = {
  name:             { id: 'inf-name',            label: 'Your name',            rules: ['required'] },
  phone:            { id: 'inf-phone',           label: 'Phone number',         rules: ['required', 'phone'] },
  email:            { id: 'inf-email',           label: 'Email address',        rules: ['required', 'email'] },
  lovedOneName:     { id: 'inf-loved-name',      label: 'Name of loved one',    rules: ['required'] },
  lovedOneLocation: { id: 'inf-loved-location',  label: 'Location of loved one', rules: ['required'] },
};

export default function ImmediateNeedForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({
    name: '', phone: '', email: '', lovedOneName: '', lovedOneLocation: '',
    deathOccurred: '', serviceType: '', message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateForm(form, SPEC);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusFirstError(found, SPEC);
      return;
    }
    // FUTURE: POST `form` to the form endpoint. Nothing is sent yet.
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
    { setForm(f => ({ ...f, [field]: e.target.value })); setErrors(p => (p[field] ? { ...p, [field]: '' } : p)); }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="inf-name" className="form-label">Your Name <span className="text-danger">*</span></label>
          <input id="inf-name" type="text" required value={form.name} onChange={set('name')} {...inputProps('inf-name', errors.name)} placeholder="Full name" />
          <FieldError fieldId="inf-name" message={errors.name} />
        </div>
        <div>
          <label htmlFor="inf-phone" className="form-label">Phone Number <span className="text-danger">*</span></label>
          <input id="inf-phone" type="tel" required value={form.phone} onChange={set('phone')} {...inputProps('inf-phone', errors.phone)} placeholder="(000) 000-0000" />
          <FieldError fieldId="inf-phone" message={errors.phone} />
        </div>
      </div>
      <div>
        <label htmlFor="inf-email" className="form-label">Email Address <span className="text-danger">*</span></label>
        <input id="inf-email" type="email" required value={form.email} onChange={set('email')} {...inputProps('inf-email', errors.email)} placeholder="your@email.com" />
        <FieldError fieldId="inf-email" message={errors.email} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="inf-loved-name" className="form-label">Name of Loved One <span className="text-danger">*</span></label>
          <input id="inf-loved-name" type="text" required value={form.lovedOneName} onChange={set('lovedOneName')} {...inputProps('inf-loved-name', errors.lovedOneName)} placeholder="Full name" />
          <FieldError fieldId="inf-loved-name" message={errors.lovedOneName} />
        </div>
        <div>
          <label htmlFor="inf-loved-location" className="form-label">Location of Loved One <span className="text-danger">*</span></label>
          <input id="inf-loved-location" type="text" required value={form.lovedOneLocation} onChange={set('lovedOneLocation')} {...inputProps('inf-loved-location', errors.lovedOneLocation)} placeholder="Hospital, home, address..." />
          <FieldError fieldId="inf-loved-location" message={errors.lovedOneLocation} />
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
      <p className="font-body text-xs text-muted"><span className="text-danger">*</span> Required</p>
      <button type="submit" className="btn-primary w-full text-center justify-center">
        Submit Request
      </button>
      <p className="font-body text-xs text-muted text-center">
        For urgent matters, please call <a href={`tel:${PHONE.replace(/\D/g,'')}`} className="text-ink font-bold">{PHONE}</a> immediately.
      </p>
    </form>
  );
}
