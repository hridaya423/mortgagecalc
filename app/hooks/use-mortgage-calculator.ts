"use client"

import { useState } from "react"

import { calculateMortgageProducts } from "@/api/mortgage-api"
import { validateMortgageForm } from "@/schema/mortgage-schema"
import type {
  CalculateMortgageResponse,
  FieldErrors,
  MortgageCalculatorForm,
} from "@/types"

const initialForm: MortgageCalculatorForm = {
  propertyValue: "300000",
  deposit: "60000",
  employmentStatus: "Employed",
  creditScoreRating: "Good",
}

export function useMortgageCalculator() {
  const [form, setForm] = useState<MortgageCalculatorForm>(initialForm)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [result, setResult] = useState<CalculateMortgageResponse | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  function updateField<K extends keyof MortgageCalculatorForm>(
    field: K,
    value: MortgageCalculatorForm[K]
  ) {
    setForm((current) => ({ ...current, [field]: value }))
    setFieldErrors((current) => ({ ...current, [field]: undefined }))
    setError("")
  }

  async function submit() {
    const validation = validateMortgageForm(form)

    if (!validation.ok) {
      setFieldErrors(validation.errors)
      setResult(null)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const nextResult = await calculateMortgageProducts(validation.data)
      setResult(nextResult)
    } catch (caughtError) {
      setResult(null)
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Could not calculate matching products."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return {
    form,
    fieldErrors,
    result,
    error,
    isLoading,
    updateField,
    submit,
  }
}
