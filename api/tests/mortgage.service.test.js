const assert = require('node:assert/strict');
const test = require('node:test');

const { calculateMatchingProducts } = require('../src/services/mortgage.service');

const standardApplication = {
  propertyValue: 300000,
  deposit: 60000,
  employmentStatus: 'Employed',
  creditScoreRating: 'Good',
};

function productNames(result) {
  return result.products.map((product) => product.name);
}

function testProduct(overrides = {}) {
  return {
    id: 'test-product',
    name: 'Test Product',
    maxLtv: 80,
    employment: ['Employed'],
    minCredit: 'Good',
    interestRate: '4.00%',
    ...overrides,
  };
}

test('calculates loan amount and LTV', async () => {
  const result = await calculateMatchingProducts({
    ...standardApplication,
    propertyValue: 300000,
    deposit: 60000,
  }, []);

  assert.equal(result.loanAmount, 240000);
  assert.equal(result.ltv, 80);
});

test('matches the challenge product set for a standard employed applicant', async () => {
  const result = await calculateMatchingProducts(standardApplication);

  assert.deepEqual(productNames(result), [
    'Shawbrook First-Time Buyer',
    'Standard Residential Fixed',
  ]);
});

test('requires LTV to be less than or equal to product max LTV', async () => {
  const testProducts = [
    testProduct({ name: 'Allows 80 LTV', maxLtv: 80 }),
    testProduct({ name: 'Rejects 79 LTV', maxLtv: 79 }),
  ];

  const result = await calculateMatchingProducts({
    ...standardApplication,
    propertyValue: 300000,
    deposit: 60000,
  }, testProducts);

  assert.deepEqual(productNames(result), ['Allows 80 LTV']);
});

test('requires employment status to be allowed by the product', async () => {
  const testProducts = [
    testProduct({ name: 'Employed Product', employment: ['Employed'] }),
    testProduct({ name: 'Retired Product', employment: ['Retired'] }),
  ];

  const result = await calculateMatchingProducts({ ...standardApplication, employmentStatus: 'Employed' }, testProducts);

  assert.deepEqual(productNames(result), ['Employed Product']);
});

test('applies credit tier ranking rules', async () => {
  const testProducts = [
    testProduct({ name: 'Fair Product', minCredit: 'Fair' }),
    testProduct({ name: 'Good Product', minCredit: 'Good' }),
    testProduct({ name: 'Excellent Product', minCredit: 'Excellent' }),
  ];

  const goodApplicant = await calculateMatchingProducts({ ...standardApplication, creditScoreRating: 'Good' }, testProducts);
  const excellentApplicant = await calculateMatchingProducts({ ...standardApplication, creditScoreRating: 'Excellent' }, testProducts);
  const fairApplicant = await calculateMatchingProducts({ ...standardApplication, creditScoreRating: 'Fair' }, testProducts);

  assert.deepEqual(productNames(goodApplicant), ['Fair Product', 'Good Product']);
  assert.deepEqual(productNames(excellentApplicant), ['Fair Product', 'Good Product', 'Excellent Product']);
  assert.deepEqual(productNames(fairApplicant), ['Fair Product']);
});

test('returns no products when no rule set matches', async () => {
  const testProducts = [
    testProduct({ name: 'Excellent Retired Low LTV Product', employment: ['Retired'], minCredit: 'Excellent', maxLtv: 55 }),
  ];

  const result = await calculateMatchingProducts({
    ...standardApplication,
    employmentStatus: 'Self-Employed',
    creditScoreRating: 'Fair',
    deposit: 10000,
  }, testProducts);

  assert.deepEqual(productNames(result), []);
});
