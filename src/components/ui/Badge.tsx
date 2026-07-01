import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'accent' | 'muted' | 'success' | 'error'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-da-surface-raised text-da-text-muted border border-da-border',
  accent: 'bg-da-accent-dim text-da-accent border border-da-accent/20',
  muted: 'bg-da-surface text-da-text-faint border border-da-border-subtle',
  success: 'bg-green-950/40 text-green-400 border border-green-900/40',
  error: 'bg-red-950/40 text-red-400 border border-red-900/40',
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
