import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'tertiary'

interface ButtonProps {
  variant?: Variant
  href?: string
  external?: boolean
  children: ReactNode
  className?: string
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm md:text-base font-medium transition-transform duration-300 hover:-translate-y-0.5'

const variants: Record<Variant, string> = {
  primary:
    'bg-[#051A24] text-white shadow-[0_1px_2px_0_rgba(5,26,36,0.1),0_4px_4px_0_rgba(5,26,36,0.09),0_9px_6px_0_rgba(5,26,36,0.05),0_17px_7px_0_rgba(5,26,36,0.01),0_26px_7px_0_rgba(5,26,36,0),inset_0_2px_8px_0_rgba(255,255,255,0.5)]',
  secondary:
    'bg-white text-[#051A24] shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.08)]',
  tertiary:
    'bg-white text-[#051A24] shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.08),inset_0_2px_8px_0_rgba(255,255,255,0.5)]',
}

export default function Button({
  variant = 'primary',
  href,
  external,
  children,
  className = '',
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      >
        {children}
      </a>
    )
  }
  return <button className={classes}>{children}</button>
}
