import { parsePhoneNumberFromString } from 'libphonenumber-js';
import type { CountryCode as LibCountryCode } from 'libphonenumber-js';
import { countryPhonePatterns } from './country';
import type { CountryCode, ValidationResult } from './types';

/**
 * Validates a mobile phone number (simple boolean result).
 *
 * The number must be in E.164 format (e.g. `+919876543210`) or include
 * a dialable country code so the library can detect the country.
 *
 * @param phoneNumber - The phone number string to validate
 * @returns `true` if the number is valid, `false` otherwise
 *
 * @example
 * validateMobileNumber('+919876543210'); // true  (India)
 * validateMobileNumber('+1234');         // false
 */
export const validateMobileNumber = (phoneNumber: string): boolean => {
    if (!phoneNumber || typeof phoneNumber !== 'string') {
        return false;
    }

    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber);

    if (!phoneNumberObj || !phoneNumberObj.isValid()) {
        return false;
    }

    const formattedNumber = phoneNumberObj.number;
    const countryCode = phoneNumberObj.country as CountryCode | undefined;

    if (!countryCode) {
        return false;
    }

    const patternObj = countryPhonePatterns[countryCode];

    if (patternObj && !patternObj.pattern.test(formattedNumber)) {
        return false;
    }

    return true;
};

/**
 * Validates a mobile phone number and returns detailed information.
 *
 * @param phoneNumber - The phone number string to validate
 * @returns A {@link ValidationResult} object with `isValid`, and optionally
 *          `country`, `formattedNumber`, and `error` fields.
 *
 * @example
 * const result = validateMobileNumberDetailed('+919876543210');
 * // { isValid: true, country: 'IN', formattedNumber: '+919876543210' }
 *
 * const bad = validateMobileNumberDetailed('hello');
 * // { isValid: false, error: 'Unable to parse phone number' }
 */
export const validateMobileNumberDetailed = (phoneNumber: string): ValidationResult => {
    if (!phoneNumber || typeof phoneNumber !== 'string') {
        return {
            isValid: false,
            error: 'Phone number must be a non-empty string',
        };
    }

    const phoneNumberObj = parsePhoneNumberFromString(phoneNumber);

    if (!phoneNumberObj) {
        return {
            isValid: false,
            error: 'Unable to parse phone number',
        };
    }

    if (!phoneNumberObj.isValid()) {
        return {
            isValid: false,
            error: 'Phone number is not valid',
        };
    }

    const formattedNumber = phoneNumberObj.number;
    const rawCountry = phoneNumberObj.country as LibCountryCode | undefined;
    const countryCode = rawCountry as CountryCode | undefined;

    if (!countryCode) {
        return {
            isValid: false,
            error: 'Could not determine country from phone number',
        };
    }

    const patternObj = countryPhonePatterns[countryCode];

    if (patternObj && !patternObj.pattern.test(formattedNumber)) {
        return {
            isValid: false,
            error: `Phone number does not match the expected pattern for country: ${countryCode}`,
        };
    }

    return {
        isValid: true,
        country: countryCode,
        formattedNumber,
    };
};
