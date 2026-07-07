const { validateCalculateProductsRequest } = require('../schemas/mortgage.schema');
const { calculateMatchingProducts } = require('../services/mortgage.service');

async function calculate(req, res) {
  const input = validateCalculateProductsRequest(req.body);
  const result = await calculateMatchingProducts(input);
  res.status(200).json(result);
}

module.exports = { calculate };
