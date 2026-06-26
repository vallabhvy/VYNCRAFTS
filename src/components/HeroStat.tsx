import { useEffect, useRef, useState } from 'react'
import { useCounter } from '../hooks/useCounter'

type HeroStatProps = {
  value: number
  suffix: string
  label: string
  inView: boolean
}

export function HeroStat({ value, suffix, label, inView }: HeroStatProps) {
  const count = useCounter(value, 1400, inView)
  const display = value % 1 === 0 ? String(Math.round(count)) : count.toFixed(0)

  return (
    <div className="group flex h-full flex-col justify-between rounded-2xl border border-white/[0.12] bg-surface/60 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo/50 hover:bg-surface/80 hover:shadow-[0_12px_40px_rgba(91,79,255,0.18)]">
      <div className="border-b border-indigo/50 pb-2.5">
        <span className="font-mono text-2xl font-bold leading-none text-text lg:text-[1.75rem]">
          {display}
          {suffix}
        </span>
      </div>
      <p className="mt-3 font-body text-[13px] font-medium leading-snug text-muted">{label}</p>
    </div>
  )
}

export function useHeroStatsInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}
