import { Card, CardContent } from "@/components/ui/card"

import type { MortgageProduct } from "@/types"
import { CountUpValue } from "./count-up-value"

type ProductCardProps = {
  product: MortgageProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const rate = Number(product.interestRate.replace("%", ""))

  return (
    <Card
      className="rounded-[12px] border-zinc-200 bg-white shadow-none transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[#ec008c]/35 hover:shadow-[0_16px_42px_rgba(15,23,42,0.08)]"
      size="sm"
    >
      <CardContent className="grid grid-cols-[minmax(0,1fr)_80px_80px] items-center gap-5 px-4 py-2 sm:px-5">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-bold tracking-[-0.01em] text-zinc-950">
            {product.name}
          </h3>
          <p className="mt-1 truncate text-xs text-zinc-500">
            {product.employment.join(", ")} · {product.minCredit}+ credit
          </p>
        </div>

        <div className="flex flex-col items-end gap-1 text-right">
          <p className="text-[11px] font-medium leading-none text-zinc-500">Rate</p>
          <p className="mt-0.5 font-mono text-[16px] font-bold text-zinc-950">
            <CountUpValue value={rate} decimals={2} suffix="%" />
          </p>
        </div>

        <div className="flex flex-col items-end gap-1 text-right">
          <p className="text-[11px] font-medium leading-none text-zinc-500">
            Max LTV
          </p>
          <p className="mt-0.5 font-mono text-[16px] font-bold text-zinc-950">
            <CountUpValue value={product.maxLtv} suffix="%" />
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
