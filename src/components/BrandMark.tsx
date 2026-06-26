type BrandMarkProps = {
  className?: string
  size?: number
}

export function BrandMark({ className = '', size = 32 }: BrandMarkProps) {
  return (
    <img
      src="/brand/logo-mark.png"
      alt=""
      width={size}
      height={size}
      className={`object-contain ${className}`}
      aria-hidden
      draggable={false}
    />
  )
}
