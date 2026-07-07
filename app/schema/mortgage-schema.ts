import type {
  CalculateMortgageRequest,
  CreditScoreRating,
  EmploymentStatus,
  FieldErrors,
  MortgageCalculatorForm,
} from "../types"

const employmentStatuses: EmploymentStatus[] = [
  "Employed",
  "Self-Employed",
  "Retired",
]

const creditScoreRatings: CreditScoreRating[] = ["Excellent", "Good", "Fair"]

export type MortgageValidationResult =
  | {
      ok: true
      data: CalculateMortgageRequest
    }
  | {
      ok: false
      errors: FieldErrors
    }

function parseMoney(value: string) {
  const normalized = value.replace(/,/g, "").trim()
  return Number(normalized)
}

export function validateMortgageForm(
  form: MortgageCalculatorForm
): MortgageValidationResult {
  const propertyValue = parseMoney(form.propertyValue)
  const deposit = parseMoney(form.deposit)
  const errors: FieldErrors = {}

  if (!Number.isFinite(propertyValue) || propertyValue <= 0) {
    errors.propertyValue = "Enter a property value above £0."
  }

  if (!Number.isFinite(deposit) || deposit < 0) {
    errors.deposit = "Enter a deposit of £0 or more."
  }

  if (
    Number.isFinite(propertyValue) &&
    Number.isFinite(deposit) &&
    deposit >= propertyValue
  ) {
    errors.deposit = "Deposit must be less than the property value."
  }

  if (!employmentStatuses.includes(form.employmentStatus as EmploymentStatus)) {
    errors.employmentStatus = "Choose an employment status."
  }

  if (!creditScoreRatings.includes(form.creditScoreRating as CreditScoreRating)) {
    errors.creditScoreRating = "Choose a credit score rating."
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  return {
    ok: true,
    data: {
      propertyValue,
      deposit,
      employmentStatus: form.employmentStatus as EmploymentStatus,
      creditScoreRating: form.creditScoreRating as CreditScoreRating,
    },
  }
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value)
}
