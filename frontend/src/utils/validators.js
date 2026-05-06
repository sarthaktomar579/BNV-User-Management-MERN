// Centralized client-side validators. Mirrors backend rules so UX feels seamless.

export const RULES = {
  firstName: { min: 2, max: 50 },
  lastName: { min: 1, max: 50 },
  phoneRegex: /^[0-9]{10}$/,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export function validateUser(values) {
  const errors = {};

  if (!values.firstName?.trim()) {
    errors.firstName = 'First name is required';
  } else if (
    values.firstName.trim().length < RULES.firstName.min ||
    values.firstName.trim().length > RULES.firstName.max
  ) {
    errors.firstName = `First name must be ${RULES.firstName.min}-${RULES.firstName.max} characters`;
  }

  if (!values.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  } else if (values.lastName.trim().length > RULES.lastName.max) {
    errors.lastName = `Last name must be at most ${RULES.lastName.max} characters`;
  }

  if (!values.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!RULES.emailRegex.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.phone?.trim()) {
    errors.phone = 'Phone is required';
  } else if (!RULES.phoneRegex.test(values.phone.trim())) {
    errors.phone = 'Phone must be exactly 10 digits';
  }

  if (values.gender && !['Male', 'Female', 'Other'].includes(values.gender)) {
    errors.gender = 'Invalid gender';
  }

  if (values.city && values.city.length > 80) {
    errors.city = 'City must be at most 80 characters';
  }

  if (values.country && values.country.length > 80) {
    errors.country = 'Country must be at most 80 characters';
  }

  return errors;
}

export const isValid = (errors) => Object.keys(errors).length === 0;
