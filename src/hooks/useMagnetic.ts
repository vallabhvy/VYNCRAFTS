import { useCallback, useRef } from 'react'

export function useMagnetic(strength = 0.35, hoverScale = 1) {
  const ref = useRef<HTMLElement>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      el.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(${hoverScale})`
    },
    [strength, hoverScale],
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0) scale(1)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
