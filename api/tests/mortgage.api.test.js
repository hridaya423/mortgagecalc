const assert = require('node:assert/strict');
const test = require('node:test');
const request = require('supertest');

const { createApp } = require('../src/app');

const standardApplication = {
  propertyValue: 300000,
  deposit: 60000,
  employmentStatus: 'Employed',
  creditScoreRating: 'Good',
};

function api() {
  return request(createApp());
}

function productNames(responseBody) {
  return responseBody.products.map((product) => product.name);
}

test('GET /health returns ok', async () => {
  const response = await api().get('/health');

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: 'ok' });
});

test('POST /api/mortgage/calculate returns the API response contract', async () => {
  const response = await api()
    .post('/api/mortgage/calculate')
    .send(standardApplication);

  assert.equal(response.status, 200);
  assert.equal(response.body.loanAmount, 240000);
  assert.equal(response.body.ltv, 80);
  assert.deepEqual(productNames(response.body), [
    'Shawbrook First-Time Buyer',
    'Standard Residential Fixed',
  ]);
});

test('POST /api/mortgage/calculate returns structured validation errors', async () => {
  const response = await api()
    .post('/api/mortgage/calculate')
    .send({ ...standardApplication, propertyValue: 200000, deposit: 250000 });

  assert.equal(response.status, 400);
  assert.deepEqual(response.body, {
    error: {
      code: 'INVALID_DEPOSIT',
      message: 'Deposit must be less than the property value.',
    },
  });
});

test('unknown routes return a structured not-found error', async () => {
  const response = await api().get('/not-a-real-route');

  assert.equal(response.status, 404);
  assert.deepEqual(response.body, {
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: 'Route not found: GET /not-a-real-route',
    },
  });
});
