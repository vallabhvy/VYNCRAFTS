import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

export function HeroGraphic() {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const springConfig = { stiffness: 90, damping: 18, mass: 0.4 }
  const sx = useSpring(pointerX, springConfig)
  const sy = useSpring(pointerY, springConfig)

  useEffect(() => {
    if (reduceMotion) return

    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      pointerX.set(nx)
      pointerY.set(ny)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [pointerX, pointerY, reduceMotion])

  // Different depth multipliers create a layered parallax field.
  const ring1X = useTransform(sx, (v) => v * 26)
  const ring1Y = useTransform(sy, (v) => v * 26)
  const ring2X = useTransform(sx, (v) => v * 40)
  const ring2Y = useTransform(sy, (v) => v * 40)
  const blobX = useTransform(sx, (v) => v * -58)
  const blobY = useTransform(sy, (v) => v * -58)
  const triX = useTransform(sx, (v) => v * 72)
  const triY = useTransform(sy, (v) => v * 72)
  const circX = useTransform(sx, (v) => v * -44)
  const circY = useTransform(sy, (v) => v * -44)
  const squareX = useTransform(sx, (v) => v * 88)
  const squareY = useTransform(sy, (v) => v * 88)

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[clamp(320px,38vw,560px)]">
      <motion.div
        className="absolute right-0 top-[6%] h-[78%] w-[78%] rounded-full border border-white/10"
        style={{ x: ring1X, y: ring1Y, willChange: 'transform' }}
      />
      <motion.div
        className="absolute right-[8%] top-[16%] h-[60%] w-[60%] rounded-full border border-indigo/30"
        style={{ x: ring2X, y: ring2Y, willChange: 'transform' }}
      />

      <motion.div style={{ x: blobX, y: blobY, willChange: 'transform' }} className="absolute right-[4%] top-[14%] h-[64%] w-[64%]">
        <div
          className="animate-float-slow h-full w-full rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-indigo opacity-95 shadow-[0_0_90px_rgba(91,79,255,0.45)]"
          style={{ '--tw-rotate': '12deg' } as React.CSSProperties}
        />
      </motion.div>

      <motion.div style={{ x: triX, y: triY, willChange: 'transform' }} className="absolute right-[34%] top-[36%] h-[34%] w-[34%]">
        <div
          className="animate-float-medium h-full w-full bg-lime opacity-95 shadow-[0_0_70px_rgba(200,255,62,0.3)]"
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', '--tw-rotate': '-12deg' } as React.CSSProperties}
        />
      </motion.div>

      <motion.div style={{ x: circX, y: circY, willChange: 'transform' }} className="absolute bottom-[10%] right-[10%] h-[42%] w-[42%]">
        <div className="animate-float-fast h-full w-full rounded-full bg-coral opacity-95 shadow-[0_0_70px_rgba(255,107,74,0.34)]" />
      </motion.div>

      <motion.div
        style={{ x: squareX, y: squareY, willChange: 'transform' }}
        className="absolute bottom-[20%] left-[2%] h-[16%] w-[16%] rotate-45 border border-lime/50"
      />
    </div>
  )
}
