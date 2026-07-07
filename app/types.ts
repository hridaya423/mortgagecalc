export type EmploymentStatus = "Employed" | "Self-Employed" | "Retired"

export type CreditScoreRating = "Excellent" | "Good" | "Fair"

export type MortgageCalculatorForm = {
  propertyValue: string
  deposit: string
  employmentStatus: EmploymentStatus | ""
  creditScoreRating: CreditScoreRating | ""
}

export type CalculateMortgageRequest = {
  propertyValue: number
  deposit: number
  employmentStatus: EmploymentStatus
  creditScoreRating: CreditScoreRating
}

export type MortgageProduct = {
  id: string
  name: string
  maxLtv: number
  employment: EmploymentStatus[]
  minCredit: CreditScoreRating
  interestRate: string
}

export type CalculateMortgageResponse = {
  loanAmount: number
  ltv: number
  products: MortgageProduct[]
}

export type FieldErrors = Partial<Record<keyof MortgageCalculatorForm, string>>

export type ApiErrorResponse = {
  error?: {
    code?: string
    message?: string
  }
}
