import type { ReactNode } from 'react'
import { useMagnetic } from '../hooks/useMagnetic'

type MagneticButtonProps = {
  href: string
  children: ReactNode
  className?: string
  ariaLabel?: string
  hoverScale?: number
  external?: boolean
}

export function MagneticButton({
  href,
  children,
  className = '',
  ariaLabel,
  hoverScale = 1.03,
  external = false,
}: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic(0.28, hoverScale)

  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      aria-label={ariaLabel}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`magnetic-btn inline-block transition-transform duration-200 ease-out ${className}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  )
}
