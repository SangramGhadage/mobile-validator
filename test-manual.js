// Manual test — runs against the compiled dist/ output
// Usage: node test-manual.js

const { validateMobileNumber, validateMobileNumberDetailed } = require('./dist/cjs/index.js');

const GREEN = '\x1b[32m✅';
const RED = '\x1b[31m❌';
const RESET = '\x1b[0m';

function test(label, actual, expected) {
    const pass = actual === expected;
    console.log(`${pass ? GREEN : RED} ${label}${RESET}`);
    if (!pass) {
        console.log(`   Expected: ${expected}`);
        console.log(`   Got:      ${actual}`);
    }
}

console.log('\n=== validateMobileNumber (boolean) ===\n');

test('India  +91 valid', validateMobileNumberDetailed('+919876543210'), true);
test('USA    +1  valid', validateMobileNumber('+12125551234'), true);
test('UK     +44 valid', validateMobileNumber('+447911123456'), true);
test('Germany +49 valid', validateMobileNumber('+4915117778899'), true);
test('Australia +61 valid', validateMobileNumber('+61412345678'), true);
test('Empty string → false', validateMobileNumber(''), false);
test('Plain text → false', validateMobileNumber('notanumber'), false);
test('Too short → false', validateMobileNumber('+91123'), false);
test('No country code → false', validateMobileNumber('9876543210'), false);

console.log('\n=== validateMobileNumberDetailed (object) ===\n');

const goodResult = validateMobileNumberDetailed('+919876543210');
console.log('India valid:', JSON.stringify(goodResult));

const badResult = validateMobileNumberDetailed('+123');
console.log('Short number:', JSON.stringify(badResult));

const emptyResult = validateMobileNumberDetailed('');
console.log('Empty string:', JSON.stringify(emptyResult));

console.log('\nDone.\n');
