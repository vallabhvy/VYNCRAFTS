type BrandWordmarkProps = {
  className?: string
}

export function BrandWordmark({ className = '' }: BrandWordmarkProps) {
  return (
    <span className={`truncate font-display tracking-tight ${className}`}>
      <span className="text-indigo">Vyn</span>
      <span className="text-text">crafts</span>
    </span>
  )
}
