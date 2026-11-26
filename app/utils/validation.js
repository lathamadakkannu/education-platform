export const NAME_MAX_LENGTH = 50;
export const EMAIL_MAX_LENGTH = 100;
export const MOBILE_LENGTH = 10;
export const ADDRESS_MAX_LENGTH = 150;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_REGEX = /^[A-Za-z\s.'-]+$/;
const HAS_LETTER_REGEX = /[A-Za-z]/;

export function sanitizeMobileInput(value) {
  return String(value || "").replace(/\D/g, "").slice(0, MOBILE_LENGTH);
}

export function validateName(value, label = "Name") {
  const trimmed = String(value || "").trim();
  if (!trimmed) return `${label} is required.`;
  if (trimmed.length > NAME_MAX_LENGTH) {
    return `${label} cannot exceed ${NAME_MAX_LENGTH} characters.`;
  }
  if (!NAME_REGEX.test(trimmed) || !HAS_LETTER_REGEX.test(trimmed)) {
    return "Enter a valid name using letters, spaces, periods, hyphens, or apostrophes.";
  }
  return "";
}

export function validateEmail(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "Email is required.";
  if (trimmed.length > EMAIL_MAX_LENGTH) {
    return `Email cannot exceed ${EMAIL_MAX_LENGTH} characters.`;
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return "Enter a valid email address.";
  }
  return "";
}

export function validateMobile(value) {
  const raw = String(value || "");
  if (!raw.trim()) return "Mobile number is required.";
  if (!/^\d{10}$/.test(raw)) {
    return "Mobile number must be exactly 10 digits.";
  }
  return "";
}

export function validateAddress(value, required = true) {
  const trimmed = String(value || "").trim();
  if (required && !trimmed) return "Address is required.";
  if (trimmed.length > ADDRESS_MAX_LENGTH) {
    return `Address cannot exceed ${ADDRESS_MAX_LENGTH} characters.`;
  }
  return "";
}

export function validatePassword(value) {
  const str = String(value || "");
  if (!str.trim()) return "Password is required.";
  if (str.length < 6) return "Password must be at least 6 characters.";
  return "";
}

export function validateRequired(value, label = "This field") {
  if (!String(value || "").trim()) return `${label} is required.`;
  return "";
}
