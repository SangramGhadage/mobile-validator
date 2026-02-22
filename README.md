# mobile-validation

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
validateMobileNumber('+1234');         // false — too short
validateMobileNumber('notanumber');    // false
```

### Detailed validation

```typescript
import { validateMobileNumberDetailed } from 'mobile-sg-validator';

const result = validateMobileNumberDetailed('+919876543210');
// {
//   isValid: true,
//   country: 'IN',
//   formattedNumber: '+919876543210'
// }

const bad = validateMobileNumberDetailed('+123');
// {
//   isValid: false,
//   error: 'Phone number is not valid'
// }
```

### Access country patterns

```typescript
import { countryPhonePatterns } from 'mobile-sg-validator';

const india = countryPhonePatterns['IN'];
console.log(india.code);    // '+91'
console.log(india.pattern); // /^(?:\+91|91)?[-\s]?[6-9]\d{9}$/
```

---

## API

### `validateMobileNumber(phoneNumber: string): boolean`

Returns `true` when the phone number is valid for its detected country.

| Parameter     | Type     | Description                         |
| ------------- | -------- | ----------------------------------- |
| `phoneNumber` | `string` | Phone number in E.164 format        |

---

### `validateMobileNumberDetailed(phoneNumber: string): ValidationResult`

Returns a detailed result object.

```typescript
interface ValidationResult {
  isValid: boolean;
  country?: CountryCode;        // ISO 3166-1 alpha-2, e.g. 'IN'
  formattedNumber?: string;     // E.164 formatted number
  error?: string;               // Present when isValid is false
}
```

---

### `countryPhonePatterns`

A `Readonly<Record<CountryCode, CountryPhonePattern>>` map of all supported countries.

```typescript
interface CountryPhonePattern {
  code: string;    // International dialing code, e.g. '+91'
  pattern: RegExp; // Validation regex for E.164 formatted numbers
}
```

---

### `CountryCode`

TypeScript union type of all supported ISO 3166-1 alpha-2 country codes (e.g. `'IN' | 'US' | 'GB' | ...`).

---

## Supported Countries

200+ countries supported, including all major markets: 🇮🇳 India, 🇺🇸 USA, 🇬🇧 UK, 🇨🇳 China, 🇩🇪 Germany, 🇫🇷 France, 🇯🇵 Japan, and many more.

---

## License

ISC © Sangram Ghadage
