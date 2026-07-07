import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"

import type {
  CreditScoreRating,
  EmploymentStatus,
  FieldErrors,
  MortgageCalculatorForm,
} from "@/types"

type MortgageFormProps = {
  form: MortgageCalculatorForm
  fieldErrors: FieldErrors
  isLoading: boolean
  onChange: <K extends keyof MortgageCalculatorForm>(
    field: K,
    value: MortgageCalculatorForm[K]
  ) => void
  onSubmit: () => void
}

const employmentStatuses: EmploymentStatus[] = [
  "Employed",
  "Self-Employed",
  "Retired",
]

const creditScoreRatings: CreditScoreRating[] = ["Excellent", "Good", "Fair"]

export function MortgageForm({
  form,
  fieldErrors,
  isLoading,
  onChange,
  onSubmit,
}: MortgageFormProps) {
  return (
    <section className="h-full rounded-[16px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-7">
      <h2 className="text-2xl font-semibold tracking-[-0.01em] text-zinc-950">
        Find matching products
      </h2>

      <form
        className="mt-7"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <FieldGroup className="gap-5">
          <Field data-invalid={Boolean(fieldErrors.propertyValue)}>
            <FieldLabel
              htmlFor="propertyValue"
              className="text-[13px] font-medium text-zinc-600"
            >
              Property amount
            </FieldLabel>
            <Input
              id="propertyValue"
              inputMode="numeric"
              aria-invalid={Boolean(fieldErrors.propertyValue)}
              className="h-11 rounded-[10px] border-zinc-300 bg-zinc-50/50 text-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors focus-visible:border-[#ec008c] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#ec008c]/20"
              value={form.propertyValue}
              onChange={(event) =>
                onChange("propertyValue", event.target.value)
              }
            />
            <FieldError>{fieldErrors.propertyValue}</FieldError>
          </Field>

          <Field data-invalid={Boolean(fieldErrors.deposit)}>
            <FieldLabel
              htmlFor="deposit"
              className="text-[13px] font-medium text-zinc-600"
            >
              Deposit
            </FieldLabel>
            <Input
              id="deposit"
              inputMode="numeric"
              aria-invalid={Boolean(fieldErrors.deposit)}
              className="h-11 rounded-[10px] border-zinc-300 bg-zinc-50/50 text-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors focus-visible:border-[#ec008c] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#ec008c]/20"
              value={form.deposit}
              onChange={(event) => onChange("deposit", event.target.value)}
            />
            <FieldError>{fieldErrors.deposit}</FieldError>
          </Field>

          <Field data-invalid={Boolean(fieldErrors.employmentStatus)}>
            <FieldLabel className="text-[13px] font-medium text-zinc-600">
              Employment Status
            </FieldLabel>
            <Select
              value={form.employmentStatus}
              onValueChange={(value) =>
                onChange("employmentStatus", value as EmploymentStatus)
              }
            >
              <SelectTrigger
                className="h-11 w-full rounded-[10px] border-zinc-300 bg-zinc-50/50 px-4 text-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors hover:bg-white focus-visible:border-[#ec008c] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#ec008c]/20"
                aria-invalid={Boolean(fieldErrors.employmentStatus)}
              >
                <SelectValue placeholder="Choose status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {employmentStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError>{fieldErrors.employmentStatus}</FieldError>
          </Field>

          <Field data-invalid={Boolean(fieldErrors.creditScoreRating)}>
            <FieldLabel className="text-[13px] font-medium text-zinc-600">
              Credit State
            </FieldLabel>
            <Select
              value={form.creditScoreRating}
              onValueChange={(value) =>
                onChange("creditScoreRating", value as CreditScoreRating)
              }
            >
              <SelectTrigger
                className="h-11 w-full rounded-[10px] border-zinc-300 bg-zinc-50/50 px-4 text-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors hover:bg-white focus-visible:border-[#ec008c] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#ec008c]/20"
                aria-invalid={Boolean(fieldErrors.creditScoreRating)}
              >
                <SelectValue placeholder="Choose credit state" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {creditScoreRatings.map((rating) => (
                    <SelectItem key={rating} value={rating}>
                      {rating}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError>{fieldErrors.creditScoreRating}</FieldError>
          </Field>

          <Button
            type="submit"
            className="mt-8 h-12 w-full gap-2 rounded-[10px] bg-[#ec008c] text-[15px] font-bold text-white shadow-none transition-[background-color,transform] hover:bg-[#d6007f] active:scale-[0.985]"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner data-icon="inline-start" />
            ) : (
              <SearchIcon data-icon="inline-start" />
            )}
            Search for products
          </Button>
        </FieldGroup>
      </form>
    </section>
  )
}
