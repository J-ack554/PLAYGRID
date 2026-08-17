import type { ReactNode } from 'react'

type Variant = 'brand' | 'accent' | 'neutral' | 'danger' | 'success'

const variants: Record<Variant, string> = {
  brand: 'bg-brand-500/15 text-brand-300 border border-brand-500/30',
  accent: 'bg-accent-500/15 text-accent-400 border border-accent-500/30',
  neutral: 'bg-white/10 text-white/70 border border-white/10',
  danger: 'bg-red-500/15 text-red-400 border border-red-500/30',
  success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
}

export default function Badge({
  children,
  variant = 'neutral',
  className = '',
}: {
  children: ReactNode
  variant?: Variant
  className?: string
}) {
  return <span className={`badge ${variants[variant]} ${className}`}>{children}</span>
}
