const { validateCalculateProductsRequest } = require('../schemas/mortgage.schema');
const { calculateMatchingProducts } = require('../services/mortgage.service');

function createMortgageController(dependencies) {
  const {
    validateCalculateProductsRequest: validateRequest,
    calculateMatchingProducts: calculateProducts,
  } = dependencies;

  async function calculate(req, res) {
    const input = validateRequest(req.body);
    const result = await calculateProducts(input);
    res.status(200).json(result);
  }

  return { calculate };
}

const { calculate } = createMortgageController({
  validateCalculateProductsRequest,
  calculateMatchingProducts,
});

module.exports = { calculate, createMortgageController };
