/**
 * @packageDocumentation
 * mobile-sg-validator — Type-safe international mobile number validation
 *
 * @example
 * ```typescript
 * import { validateMobileNumber, validateMobileNumberDetailed } from 'mobile-sg-validator';
 *
 * // Simple boolean check
 * validateMobileNumber('+919876543210'); // true
 *
 * // Detailed result
 * const result = validateMobileNumberDetailed('+447911123456');
 * // { isValid: true, country: 'GB', formattedNumber: '+447911123456' }
 * ```
 */

// Public API — functions
export { validateMobileNumber, validateMobileNumberDetailed } from './validator';

// Public API — data
export { countryPhonePatterns } from './country';

// Public API — types
export type { CountryCode, CountryPhonePattern, ValidationResult } from './types';
