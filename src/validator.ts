import { countryPhonePatterns } from './country';
import type { CountryCode, ValidationResult } from './types';

/**
 * Parsed phone number result returned by `parsePhoneNumber`.
 * @internal
 */
interface ParsedPhoneNumber {
    /** ISO 3166-1 alpha-2 country code (e.g. `"IN"`) */
    country: CountryCode;
    /** Numeric calling code without '+' (e.g. `"91"`) */
    callingCode: string;
    /** Local subscriber digits only, no country code (e.g. `"8024571878"`) */
    nationalNumber: string;
    /** Full E.164 number as provided (e.g. `"+918024571878"`) */
    number: string;
}

/**
 * Parses an E.164 phone number string using the built-in country patterns.
 * Iterates over `countryPhonePatterns` to find a matching country and extracts
 * the calling code + national number — no external library required.
 *
 * @param phoneNumber - Phone number in E.164 format (e.g. `+919876543210`)
 * @returns A {@link ParsedPhoneNumber} if a country match is found, otherwise `null`
 *
 * @example
 * parsePhoneNumber('+919876543210');
 * // { country: 'IN', callingCode: '91', nationalNumber: '9876543210', number: '+919876543210' }
 *
 * parsePhoneNumber('+1234'); // null  (no pattern matches)
 */
const parsePhoneNumber = (phoneNumber: string): ParsedPhoneNumber | null => {
    for (const [isoCode, entry] of Object.entries(countryPhonePatterns) as [CountryCode, typeof countryPhonePatterns[CountryCode]][]) {
        if (entry.pattern.test(phoneNumber)) {
            // Derive the numeric calling code from the entry's `code` field (e.g. "+91" → "91")
            const callingCode = entry.code.replace(/[^\d]/g, '');

            // Strip the leading '+' and calling code to get the national number
            const digits = phoneNumber.replace(/^\+/, '');
            const nationalNumber = digits.startsWith(callingCode)
                ? digits.slice(callingCode.length)
                : digits;

            return {
                country: isoCode,
                callingCode,
                nationalNumber,
                number: phoneNumber,
            };
        }
    }
    return null;
};

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

    const parsed = parsePhoneNumber(phoneNumber);
    return parsed !== null;
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

    const parsed = parsePhoneNumber(phoneNumber);

    if (!parsed) {
        return {
            isValid: false,
            error: 'Unable to parse phone number or no matching country pattern found',
        };
    }

    const patternObj = countryPhonePatterns[parsed.country];

    return {
        isValid: true,
        country: parsed.country,
        country_code: parsed.callingCode,
        country_name: patternObj.country_name,
        mobile_number: parsed.nationalNumber,
        formattedNumber: parsed.number,
    };
};
