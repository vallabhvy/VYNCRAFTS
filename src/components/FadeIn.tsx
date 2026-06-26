import type { ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

type FadeInProps = {
  children: ReactNode
  className?: string
  delay?: number
  eager?: boolean
  y?: number
}

export function FadeIn({ children, className = '', delay = 0, eager = false, y = 28 }: FadeInProps) {
  const reduceMotion = useReducedMotion()

  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const animateProps = eager
    ? { animate: 'visible' as const }
    : {
        whileInView: 'visible' as const,
        viewport: { once: true, margin: '0px 0px -40px 0px' },
      }

  return (
    <motion.div className={className} initial="hidden" variants={variants} {...animateProps}>
      {children}
    </motion.div>
  )
}
