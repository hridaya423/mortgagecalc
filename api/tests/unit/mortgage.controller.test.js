const assert = require('node:assert/strict');
const test = require('node:test');

const { createMortgageController } = require('../../src/controllers/mortgage.controller');
const requestBody = require('./constants').requestBody;

function createResponse() {
  const res = {};

  res.statusCode = null;
  res.body = null;
  res.status = test.mock.fn((statusCode) => {
    res.statusCode = statusCode;
    return res;
  });
  res.json = test.mock.fn((body) => {
    res.body = body;
    return res;
  });

  return res;
}

test('calculate validates the request and returns matching products', async () => {
  const validatedInput = { ...requestBody };
  const serviceResult = {
    loanAmount: 240000,
    ltv: 80,
    products: [{ id: 'standard', name: 'Standard Residential Fixed' }],
  };
  const validateCalculateProductsRequest = test.mock.fn(() => validatedInput);
  const calculateMatchingProducts = test.mock.fn(async () => serviceResult);
  const { calculate } = createMortgageController({
    validateCalculateProductsRequest,
    calculateMatchingProducts,
  });
  const res = createResponse();

  await calculate({ body: requestBody }, res);

  assert.equal(validateCalculateProductsRequest.mock.callCount(), 1);
  assert.deepEqual(validateCalculateProductsRequest.mock.calls[0].arguments, [requestBody]);
  assert.equal(calculateMatchingProducts.mock.callCount(), 1);
  assert.deepEqual(calculateMatchingProducts.mock.calls[0].arguments, [validatedInput]);
  assert.equal(res.status.mock.callCount(), 1);
  assert.deepEqual(res.status.mock.calls[0].arguments, [200]);
  assert.equal(res.json.mock.callCount(), 1);
  assert.deepEqual(res.json.mock.calls[0].arguments, [serviceResult]);
});

test('calculate lets validation errors bubble to the async error handler', async () => {
  const validationError = new Error('Invalid request');
  const validateCalculateProductsRequest = test.mock.fn(() => {
    throw validationError;
  });
  const calculateMatchingProducts = test.mock.fn();
  const { calculate } = createMortgageController({
    validateCalculateProductsRequest,
    calculateMatchingProducts,
  });
  const res = createResponse();

  await assert.rejects(
    () => calculate({ body: {} }, res),
    validationError,
  );

  assert.equal(validateCalculateProductsRequest.mock.callCount(), 1);
  assert.equal(calculateMatchingProducts.mock.callCount(), 0);
  assert.equal(res.status.mock.callCount(), 0);
  assert.equal(res.json.mock.callCount(), 0);
});
