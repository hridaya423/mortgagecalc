const { products } = require('../data/mortgage.products');

const creditRank = Object.freeze({ Fair: 1, Good: 2, Excellent: 3 });

async function calculateMatchingProducts(input, activeProducts = products) {
  const loanAmount = input.propertyValue - input.deposit;
  const ltv = Number(((loanAmount / input.propertyValue) * 100).toFixed(2));

  const matchedProducts = activeProducts.filter((product) => (
    ltv <= product.maxLtv &&
    product.employment.includes(input.employmentStatus) &&
    creditRank[input.creditScoreRating] >= creditRank[product.minCredit]
  ));

  return {
    loanAmount,
    ltv,
    products: matchedProducts,
  };
}

module.exports = { calculateMatchingProducts, creditRank };
