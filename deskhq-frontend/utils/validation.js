const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;

export const rules = {
  required: (label) => (value) =>
    !value || !value.trim() ? `${label} is required.` : null,

  email: (value) =>
    value && !EMAIL_REGEX.test(value) ? "Enter a valid email address." : null,

  minLength: (min, label) => (value) =>
    value && value.length < min
      ? `${label} must be at least ${min} characters.`
      : null,

  maxLength: (max, label) => (value) =>
    value && value.length > max
      ? `${label} must be at most ${max} characters.`
      : null,

  match: (otherValue, label) => (value) =>
    value !== otherValue ? `${label} does not match.` : null,
};

export function validateField(value, fieldRules) {
  for (const rule of fieldRules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
}

export function validateForm(fields) {
  const errors = {};
  for (const [name, { value, fieldRules }] of Object.entries(fields)) {
    const error = validateField(value, fieldRules);
    if (error) errors[name] = error;
  }
  return errors;
}

export const commonRules = {
  email: [rules.required("Email"), rules.email],
  password: [rules.required("Password"), rules.minLength(PASSWORD_MIN_LENGTH, "Password")],
};
