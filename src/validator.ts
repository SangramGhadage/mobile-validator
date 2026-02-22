import { parsePhoneNumberFromString } from 'libphonenumber-js';
import type { CountryCode as LibCountryCode } from 'libphonenumber-js';
import { countryPhonePatterns } from './country';
import type { CountryCode, ValidationResult } from './types';

/**
 * Validates a mobile phone number (simple boolean result).
 *
 * @param phoneNumber - Phone number in E.164 format (e.g. `+919876543210`)
 * @returns `true` if the number is valid, `false` otherwise
 *
 * @example
 * validateMobileNumber('+919876543210'); // true
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
 * Validates a mobile phone number and returns detailed country information.
 *
 * @param phoneNumber - Phone number in E.164 format (e.g. `+919876543210`)
 * @returns A {@link ValidationResult} with `isValid`, `country`, `country_code`,
 *          `country_name`, `mobile_number`, `formattedNumber`, and optionally `error`.
 *
 * @example
 * validateMobileNumberDetailed('+918024571878');
 * // {
 * //   isValid: true,
 * //   country: 'IN',
 * //   country_code: '91',
 * //   country_name: 'India',
 * //   mobile_number: '8024571878',
 * //   formattedNumber: '+918024571878'
 * // }
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

    const formattedNumber = phoneNumberObj.number; // E.164 e.g. "+918024571878"
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

    // Extract numeric country_code from the dialing code field (strip "+", parentheses etc.)
    const rawDialCode = patternObj?.code ?? phoneNumberObj.countryCallingCode;
    const country_code = rawDialCode.replace(/[^\d]/g, '').replace(/^(\d+).*$/, '$1');

    // Extract local mobile_number: strip the leading "+" and country calling code
    const callingCode = phoneNumberObj.countryCallingCode; // e.g. "91"
    const e164 = formattedNumber.replace(/^\+/, '');       // e.g. "918024571878"
    const mobile_number = e164.startsWith(callingCode)
        ? e164.slice(callingCode.length)                      // e.g. "8024571878"
        : e164;

    const country_name = patternObj?.country_name;

    return {
        isValid: true,
        country: countryCode,
        country_code,
        country_name,
        mobile_number,
        formattedNumber,
    };
};
