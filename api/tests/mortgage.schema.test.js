const assert = require('node:assert/strict');
const test = require('node:test');

const { validateCalculateProductsRequest } = require('../src/schemas/mortgage.schema');

const standardApplication = {
  propertyValue: 300000,
  deposit: 60000,
  employmentStatus: 'Employed',
  creditScoreRating: 'Good',
};

test('normalizes valid numeric input', () => {
  const input = validateCalculateProductsRequest({
    ...standardApplication,
    propertyValue: '300000',
    deposit: '60000',
  });

  assert.deepEqual(input, {
    propertyValue: 300000,
    deposit: 60000,
    employmentStatus: 'Employed',
    creditScoreRating: 'Good',
  });
});

test('rejects property value at or below zero', () => {
  assert.throws(
    () => validateCalculateProductsRequest({ ...standardApplication, propertyValue: 0 }),
    /Enter a property value above £0/,
  );
});

test('rejects deposits below zero', () => {
  assert.throws(
    () => validateCalculateProductsRequest({ ...standardApplication, deposit: -1 }),
    /Enter a deposit of £0 or more/,
  );
});

test('rejects deposits greater than property value', () => {
  assert.throws(
    () => validateCalculateProductsRequest({ ...standardApplication, propertyValue: 200000, deposit: 250000 }),
    /Deposit must be less than the property value/,
  );
});

test('rejects unsupported employment status', () => {
  assert.throws(
    () => validateCalculateProductsRequest({ ...standardApplication, employmentStatus: 'Student' }),
    /Choose an employment status/,
  );
});

test('rejects unsupported credit score rating', () => {
  assert.throws(
    () => validateCalculateProductsRequest({ ...standardApplication, creditScoreRating: 'Poor' }),
    /Choose a credit score rating/,
  );
});
