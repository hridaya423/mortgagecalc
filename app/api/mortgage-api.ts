import type {
  ApiErrorResponse,
  CalculateMortgageRequest,
  CalculateMortgageResponse,
} from "../types"

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"

export async function calculateMortgageProducts(
  payload: CalculateMortgageRequest
): Promise<CalculateMortgageResponse> {
  const response = await fetch(`${apiBaseUrl}/api/mortgage/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const body = (await response.json()) as
    | CalculateMortgageResponse
    | ApiErrorResponse

  if (!response.ok) {
    throw new Error(
      "error" in body && body.error?.message
        ? body.error.message
        : "Could not calculate matching products."
    )
  }

  return body as CalculateMortgageResponse
}
