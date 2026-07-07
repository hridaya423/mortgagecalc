const { AppError } = require('../shared/errors/app-error');

const employmentStatuses = Object.freeze(['Employed', 'Self-Employed', 'Retired']);
const creditRatings = Object.freeze(['Excellent', 'Good', 'Fair']);

function parseMoney(value, fieldName) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new AppError(`${fieldName} must be a valid number.`, 400, 'INVALID_INPUT');
  }
  return number;
}

function validateCalculateProductsRequest(input = {}) {
  const propertyValue = parseMoney(input.propertyValue, 'Property value');
  const deposit = parseMoney(input.deposit, 'Deposit');
  const employmentStatus = input.employmentStatus;
  const creditScoreRating = input.creditScoreRating;

  if (propertyValue <= 0) {
    throw new AppError('Enter a property value above £0.', 400, 'INVALID_PROPERTY_VALUE');
  }

  if (deposit < 0) {
    throw new AppError('Enter a deposit of £0 or more.', 400, 'INVALID_DEPOSIT');
  }

  if (deposit >= propertyValue) {
    throw new AppError('Deposit must be less than the property value.', 400, 'INVALID_DEPOSIT');
  }

  if (!employmentStatuses.includes(employmentStatus)) {
    throw new AppError('Choose an employment status.', 400, 'INVALID_EMPLOYMENT_STATUS');
  }

  if (!creditRatings.includes(creditScoreRating)) {
    throw new AppError('Choose a credit score rating.', 400, 'INVALID_CREDIT_SCORE');
  }

  return { propertyValue, deposit, employmentStatus, creditScoreRating };
}

module.exports = { creditRatings, employmentStatuses, validateCalculateProductsRequest };
