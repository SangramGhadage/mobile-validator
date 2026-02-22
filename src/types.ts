/**
 * ISO 3166-1 alpha-2 country codes supported for mobile validation.
 */
export type CountryCode =
  | 'AC' | 'AD' | 'AE' | 'AF' | 'AG' | 'AI' | 'AL' | 'AM' | 'AO' | 'AR'
  | 'AS' | 'AT' | 'AU' | 'AW' | 'AX' | 'AZ' | 'BA' | 'BB' | 'BD' | 'BE'
  | 'BF' | 'BG' | 'BH' | 'BI' | 'BJ' | 'BL' | 'BM' | 'BN' | 'BO' | 'BR'
  | 'BS' | 'BT' | 'BW' | 'BY' | 'BZ' | 'CA' | 'CH' | 'CN' | 'CO' | 'CR'
  | 'CU' | 'CZ' | 'DE' | 'DK' | 'DO' | 'DZ' | 'EG' | 'ES' | 'FI' | 'FR'
  | 'GB' | 'GH' | 'GM' | 'GR' | 'GT' | 'HK' | 'HN' | 'HR' | 'HU' | 'ID'
  | 'IE' | 'IL' | 'IN' | 'IQ' | 'IR' | 'IS' | 'IT' | 'JM' | 'JO' | 'JP'
  | 'KE' | 'KG' | 'KH' | 'KI' | 'KM' | 'KN' | 'KP' | 'KR' | 'KW' | 'KY'
  | 'KZ' | 'LA' | 'LB' | 'LC' | 'LI' | 'LK' | 'LR' | 'LS' | 'LT' | 'LU'
  | 'LV' | 'LY' | 'MA' | 'MC' | 'MD' | 'ME' | 'MF' | 'MG' | 'MH' | 'MK'
  | 'ML' | 'MM' | 'MN' | 'MO' | 'MP' | 'MQ' | 'MR' | 'MS' | 'MT' | 'MU'
  | 'MV' | 'MW' | 'MX' | 'MY' | 'MZ' | 'NA' | 'NC' | 'NE' | 'NF' | 'NG'
  | 'NI' | 'NL' | 'NO' | 'NP' | 'NR' | 'NU' | 'NZ' | 'OM' | 'PA' | 'PE'
  | 'PF' | 'PG' | 'PH' | 'PK' | 'PL' | 'PM' | 'PN' | 'PR' | 'PT' | 'PW'
  | 'PY' | 'QA' | 'RE' | 'RO' | 'RS' | 'RU' | 'RW' | 'SA' | 'SB' | 'SC'
  | 'SD' | 'SE' | 'SG' | 'SH' | 'SI' | 'SJ' | 'SK' | 'SL' | 'SM' | 'SN'
  | 'SO' | 'SR' | 'SS' | 'ST' | 'SV' | 'SX' | 'SY' | 'SZ' | 'TC' | 'TD'
  | 'TF' | 'TG' | 'TH' | 'TJ' | 'TK' | 'TL' | 'TM' | 'TN' | 'TO' | 'TR'
  | 'TT' | 'TV' | 'TZ' | 'UA' | 'UG' | 'US' | 'UY' | 'UZ' | 'VA' | 'VC'
  | 'VE' | 'VG' | 'VI' | 'VN' | 'VU' | 'WF' | 'WS' | 'YE' | 'ZA' | 'ZM'
  | 'ZW';

/**
 * Phone pattern entry for a specific country.
 */
export interface CountryPhonePattern {
  /** International dialing code (e.g. "+91") */
  code: string;
  /** Regex pattern to validate the full E.164 number */
  pattern: RegExp;
}

/**
 * Detailed result returned by `validateMobileNumberDetailed`.
 */
export interface ValidationResult {
  /** Whether the phone number is valid */
  isValid: boolean;
  /** Detected country code (ISO 3166-1 alpha-2) — present when valid */
  country?: CountryCode;
  /** Formatted E.164 number — present when valid */
  formattedNumber?: string;
  /** Human-readable error message — present when invalid */
  error?: string;
}
