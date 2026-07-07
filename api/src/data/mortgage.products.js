const products = Object.freeze([
  Object.freeze({
    id: 'first-time-buyer',
    name: 'Shawbrook First-Time Buyer',
    maxLtv: 90,
    employment: Object.freeze(['Employed']),
    minCredit: 'Good',
    interestRate: '4.59%',
  }),
  Object.freeze({
    id: 'standard-residential-fixed',
    name: 'Standard Residential Fixed',
    maxLtv: 80,
    employment: Object.freeze(['Employed', 'Self-Employed']),
    minCredit: 'Good',
    interestRate: '3.89%',
  }),
  Object.freeze({
    id: 'entrepreneur-specialist',
    name: 'Entrepreneur Specialist',
    maxLtv: 75,
    employment: Object.freeze(['Self-Employed']),
    minCredit: 'Excellent',
    interestRate: '4.99%',
  }),
  Object.freeze({
    id: 'golden-age-equity',
    name: 'Shawbrook Golden Age Equity',
    maxLtv: 55,
    employment: Object.freeze(['Retired']),
    minCredit: 'Good',
    interestRate: '3.49%',
  }),
  Object.freeze({
    id: 'credit-builder-recovery',
    name: 'Credit-Builder Recovery Deal',
    maxLtv: 70,
    employment: Object.freeze(['Employed', 'Self-Employed']),
    minCredit: 'Fair',
    interestRate: '5.89%',
  }),
]);

module.exports = { products };
