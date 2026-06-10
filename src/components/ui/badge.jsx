import { cn } from '@/lib/utils'

export function Badge({ children, className }) {
  return (
    <span className={cn('tech-badge', className)}>
      {children}
    </span>
  )
}
