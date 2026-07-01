import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  className?: string
  centered?: boolean
}

export default function SectionHeader({
  label,
  title,
  description,
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      {label && <p className="da-label mb-3">{label}</p>}
      <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-da-text">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-da-text-muted max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
