# mobile-sg-validator

> Type-safe international mobile phone number validation for 200+ countries.

[![npm version](https://img.shields.io/npm/v/mobile-sg-validator)](https://www.npmjs.com/package/mobile-sg-validator)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

Powered by [`libphonenumber-js`](https://github.com/catamphetamine/libphonenumber-js) with an additional per-country regex layer for extra precision.

---

## Installation

```bash
npm install mobile-sg-validator
```

---

## Usage

### Simple validation (boolean)

```typescript
import { validateMobileNumber } from 'mobile-sg-validator';

validateMobileNumber('+919876543210');  // true  — India
validateMobileNumber('+447911123456'); // true  — United Kingdom
validateMobileNumber('+1234');         // false
validateMobileNumber('notanumber');    // false
```

### Detailed validation

Returns full country info including `country`, `country_code`, `country_name`, and `mobile_number`:

```typescript
import { validateMobileNumberDetailed } from 'mobile-sg-validator';

const result = validateMobileNumberDetailed('+918024571878');
// {
//   isValid: true,
//   country: 'IN',
//   country_code: '91',
//   country_name: 'India',
//   mobile_number: '8024571878',
//   formattedNumber: '+918024571878'
// }

const uk = validateMobileNumberDetailed('+447911123456');
// {
//   isValid: true,
//   country: 'GB',
//   country_code: '44',
//   country_name: 'United Kingdom',
//   mobile_number: '7911123456',
//   formattedNumber: '+447911123456'
// }

const bad = validateMobileNumberDetailed('+123');
// { isValid: false, error: 'Phone number is not valid' }
```

### Access country patterns directly

```typescript
import { countryPhonePatterns } from 'mobile-sg-validator';

const india = countryPhonePatterns['IN'];
console.log(india.code);         // '+91'
console.log(india.country_name); // 'India'
console.log(india.pattern);      // /^(?:\+91|91)?[-\s]?[6-9]\d{9}$/
```

---

## API

### `validateMobileNumber(phoneNumber: string): boolean`

Returns `true` when the phone number is valid for its detected country.

---

### `validateMobileNumberDetailed(phoneNumber: string): ValidationResult`

Returns a detailed result object:

```typescript
interface ValidationResult {
  isValid: boolean;
  country?: CountryCode;        // ISO 3166-1 alpha-2, e.g. 'IN'
  country_code?: string;        // Numeric dialing code, e.g. '91'
  country_name?: string;        // Full country name, e.g. 'India'
  mobile_number?: string;       // Local digits only, e.g. '8024571878'
  formattedNumber?: string;     // E.164 format, e.g. '+918024571878'
  error?: string;               // Present when isValid is false
}
```

---

### `countryPhonePatterns`

A `Readonly<Record<CountryCode, CountryPhonePattern>>` map.

```typescript
interface CountryPhonePattern {
  code: string;         // Dialing code, e.g. '+91'
  country_name: string; // Full country name, e.g. 'India'
  pattern: RegExp;      // Validation regex for E.164 numbers
}
```

---

### `CountryCode`

TypeScript union type of all 200+ supported ISO 3166-1 alpha-2 country codes.

---

## Supported Countries

200+ countries including 🇮🇳 India, 🇺🇸 USA, 🇬🇧 UK, 🇨🇳 China, 🇩🇪 Germany, 🇫🇷 France, 🇯🇵 Japan, and many more.

---

## License

ISC © Sangram Ghadage
