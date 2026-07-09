const requestBody = {
    propertyValue: 300000,
    deposit: 60000,
    employmentStatus: 'Employed',
    creditScoreRating: 'Good',
};

const standardApplication = {
  propertyValue: 300000,
  deposit: 60000,
  employmentStatus: 'Employed',
  creditScoreRating: 'Good',
};

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


module.exports = {
  requestBody,
  standardApplication,
  testProduct,
};