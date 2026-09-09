/**
 * Shared form validation.
 *
 * Every form runs with `noValidate` and validates here instead. That is deliberate: the
 * browser's own bubbles cannot be styled, read inconsistently across browsers, vanish on
 * blur, and — critically — `required` treats a single space as a filled field. These rules
 * trim first, so whitespace is not an answer.
 */
export type Rule = 'required' | 'email' | 'phone';

export interface FieldSpec {
  /** DOM id of the input, so a failed submit can move focus to it. */
  id: string;
  label: string;
  rules: Rule[];
}

export type FormSpec = Record<string, FieldSpec>;
export type Errors = Record<string, string>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const digitsOf = (value: string) => value.replace(/\D/g, '');

/** North American numbers: 10 digits, or 11 beginning with a country code of 1. */
const isPhone = (value: string) => {
  const d = digitsOf(value);
  return d.length === 10 || (d.length === 11 && d.startsWith('1'));
};

export function fieldError(value: string, spec: FieldSpec): string | undefined {
  const v = (value ?? '').trim();
  if (spec.rules.includes('required') && v === '') return `${spec.label} is required.`;
  if (v === '') return undefined; // optional and empty is fine
  if (spec.rules.includes('email') && !EMAIL.test(v)) {
    return 'Enter a valid email address, like name@example.com.';
  }
  if (spec.rules.includes('phone') && !isPhone(v)) {
    return 'Enter a 10-digit phone number, like (773) 912-6745.';
  }
  return undefined;
}

export function validateForm(values: Record<string, string>, spec: FormSpec): Errors {
  const errors: Errors = {};
  for (const [name, field] of Object.entries(spec)) {
    const message = fieldError(values[name] ?? '', field);
    if (message) errors[name] = message;
  }
  return errors;
}

export const errorId = (fieldId: string) => `${fieldId}-error`;

/** Wires aria-invalid / aria-describedby and the error border onto an input. */
export function inputProps(fieldId: string, message?: string) {
  return {
    'aria-invalid': message ? true : undefined,
    'aria-describedby': message ? errorId(fieldId) : undefined,
    className: message ? 'form-input form-input-error' : 'form-input',
  };
}

/** Moves focus to the first field that failed, so the problem is never off-screen. */
export function focusFirstError(errors: Errors, spec: FormSpec) {
  const first = Object.keys(spec).find(name => errors[name]);
  if (!first) return;
  document.getElementById(spec[first].id)?.focus();
}
