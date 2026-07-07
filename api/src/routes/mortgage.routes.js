const express = require('express');

const { calculate } = require('../controllers/mortgage.controller');
const { asyncHandler } = require('../shared/http/async-handler');

const mortgageRouter = express.Router();

mortgageRouter.post('/calculate', asyncHandler(calculate));

module.exports = { mortgageRouter };
