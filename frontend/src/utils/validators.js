// Centralized client-side validators. Mirrors backend rules so UX feels seamless.

export const RULES = {
  firstName: { min: 2, max: 50 },
  lastName: { min: 1, max: 50 },
  location: { max: 160 },
  profileImage: { max: 500 },
  phoneRegex: /^[0-9]{10}$/,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  // Accepts http(s) URLs only — must include protocol.
  urlRegex: /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
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

  if (values.location && values.location.length > RULES.location.max) {
    errors.location = `Location must be at most ${RULES.location.max} characters`;
  }

  if (values.profileImage && values.profileImage.trim()) {
    const url = values.profileImage.trim();
    if (url.length > RULES.profileImage.max) {
      errors.profileImage = `URL must be at most ${RULES.profileImage.max} characters`;
    } else if (!RULES.urlRegex.test(url)) {
      errors.profileImage = 'Enter a valid URL starting with http:// or https://';
    }
  }

  return errors;
}

export const isValid = (errors) => Object.keys(errors).length === 0;
