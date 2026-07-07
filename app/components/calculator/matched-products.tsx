import { Skeleton } from "@/components/ui/skeleton"

import type { CalculateMortgageResponse } from "@/types"
import { ProductCard } from "./product-card"

type MatchedProductsProps = {
  result: CalculateMortgageResponse | null
  error: string
  isLoading: boolean
}

function ProductSkeleton() {
  return (
    <div className="rounded-[12px] border border-zinc-200 bg-white p-4">
      <div className="grid grid-cols-[1fr_64px_64px] items-center gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-3 w-32" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-5 w-10" />
        </div>
      </div>
    </div>
  )
}

export function MatchedProducts({
  result,
  error,
  isLoading,
}: MatchedProductsProps) {
  const hasProducts = Boolean(result?.products.length)

  return (
    <section className="flex h-full flex-col rounded-[16px] border border-zinc-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.01em] text-zinc-950">
            Matched products
          </h2>
        </div>
      </div>

      <div className="mt-8 flex flex-1 flex-col gap-4">
        {isLoading ? (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        ) : null}

        {!isLoading && error ? (
          <div className="rounded-[14px] border border-destructive/20 bg-destructive/5 p-4 text-sm font-medium text-destructive">
            {error}
          </div>
        ) : null}

        {!isLoading && !error && hasProducts
          ? result?.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : null}

        {!isLoading && !error && result && !hasProducts ? (
          <div className="flex flex-1 items-center justify-center rounded-[16px] border border-dashed border-zinc-200 bg-zinc-50/40 p-8 text-center">
            <p className="max-w-56 text-sm text-muted-foreground">
              No products match this application.
            </p>
          </div>
        ) : null}

        {!isLoading && !error && !result ? (
          <div className="flex flex-1 items-center justify-center rounded-[16px] border border-dashed border-zinc-200 bg-zinc-50/40 p-8 text-center">
            <p className="max-w-60 text-sm text-muted-foreground">
              Enter the details and search to see matching products.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
