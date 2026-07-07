"use client"

import { MatchedProducts } from "./matched-products"
import { MortgageForm } from "./mortgage-form"
import { useMortgageCalculator } from "@/hooks/use-mortgage-calculator"

export function CalculatorShell() {
  const calculator = useMortgageCalculator()

  return (
    <main className="min-h-dvh bg-[#f8f8f8] px-5 py-8 text-foreground sm:px-8 lg:px-12">
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-6xl flex-col justify-center gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold tracking-[-0.035em] text-zinc-950 sm:text-5xl">
            Mortgage Calculator
          </h1>
        </div>

        <div className="grid w-full items-stretch gap-6 lg:grid-cols-[minmax(360px,470px)_minmax(440px,1fr)]">
          <div className="h-full">
            <MortgageForm
              form={calculator.form}
              fieldErrors={calculator.fieldErrors}
              isLoading={calculator.isLoading}
              onChange={calculator.updateField}
              onSubmit={calculator.submit}
            />
          </div>

          <div className="h-full">
            <MatchedProducts
              result={calculator.result}
              error={calculator.error}
              isLoading={calculator.isLoading}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
