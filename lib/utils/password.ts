/**
 * Password validation rules
 */
export interface PasswordStrength {
  isValid: boolean;
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

/**
 * Validate password complexity
 * Requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character (!@#$%^&*)
 */
export function validatePasswordStrength(password: string): PasswordStrength {
  return {
    isValid:
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password),
    hasMinLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*]/.test(password),
  };
}

/**
 * Get human-readable error message for password validation
 */
export function getPasswordErrorMessage(strength: PasswordStrength): string | null {
  if (strength.isValid) return null;

  const missing: string[] = [];
  if (!strength.hasMinLength) missing.push('mínimo 8 caracteres');
  if (!strength.hasUppercase) missing.push('una mayúscula (A-Z)');
  if (!strength.hasLowercase) missing.push('una minúscula (a-z)');
  if (!strength.hasNumber) missing.push('un número (0-9)');
  if (!strength.hasSpecialChar) missing.push('un carácter especial (!@#$%^&*)');

  return `La contraseña debe contener: ${missing.join(', ')}`;
}
