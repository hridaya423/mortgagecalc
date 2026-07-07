# Mortgage Calculator Express API

## Run

```bash
npm install
npm run dev
```

API runs at `http://localhost:4000` by default.

## Tests

```bash
npm test
```

## Architecture

![MVC diagram](./docs/diagram.svg)

I've gone with a MVC architecture, with view as the api response itself.
Microservices would be over-engineering for this usecase as we don't have different services to seperate.
Feature based architecture has the same, where there are no other features other than the main calculation. 
Repository based architecture is also unneeded for this backend as there is no complex DB integration atm.

## Endpoints

### `GET /health`

Response:
```json
{ "status": "ok" }
```

### `POST /api/mortgage/calculate`

Body example:
```json
{
  "propertyValue": 300000,
  "deposit": 60000,
  "employmentStatus": "Employed",
  "creditScoreRating": "Good"
}
```

Response example:
```json
{
  "loanAmount": 240000,
  "ltv": 80,
  "products": [
    {
      "id": "first-time-buyer",
      "name": "Shawbrook First-Time Buyer",
      "maxLtv": 90,
      "employment": ["Employed"],
      "minCredit": "Good",
      "interestRate": "4.59%"
    }
  ]
}
```

Validation error:
```json
{
  "error": {
    "code": "INVALID_DEPOSIT",
    "message": "Deposit must be less than the property value."
  }
}
```
