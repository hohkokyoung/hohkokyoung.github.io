import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

const variants = {
  pill: 'btn-ghost-pill',
  filled: 'btn-filled',
  flat: 'btn-flat',
}

export function Button({ variant = 'pill', asChild = false, className, children, ...props }) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp className={cn(variants[variant], className)} {...props}>
      {children}
    </Comp>
  )
}
