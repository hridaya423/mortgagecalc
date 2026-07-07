"use client"

import { useEffect, useState } from "react"

type CountUpValueProps = {
  value: number
  decimals?: number
  suffix?: string
}

export function CountUpValue({
  value,
  decimals = 0,
  suffix = "",
}: CountUpValueProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let frameId = 0
    const duration = 420
    const startTime = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      setDisplayValue(value * easedProgress)

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameId)
  }, [value])

  return (
    <span>
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  )
}
