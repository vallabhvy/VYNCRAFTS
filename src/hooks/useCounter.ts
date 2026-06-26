import { useEffect, useState } from 'react'

export function useCounter(end: number, duration: number = 1500, inView: boolean = true) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let startTime: number | null = null
    let animationFrameId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      // ease-out quint
      const t = Math.min(progress / duration, 1)
      const easeOut = 1 - Math.pow(1 - t, 5)

      setCount(end * easeOut)

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [end, duration, inView])

  return count
}
