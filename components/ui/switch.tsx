'use client'

import { Switch as SwitchPrimitive } from '@base-ui/react/switch'

import { cn } from '@/lib/utils'

/**
 * Switch on/off in stile brand — costruito su Base UI (come `ui/button.tsx`),
 * quindi già accessibile: input nascosto etichettabile, gestione tastiera e
 * focus. Il colore attivo usa il verde brand del sito.
 */
function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'group/switch relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full',
        'border border-transparent bg-input transition-colors duration-200 outline-none',
        'focus-visible:ring-3 focus-visible:ring-ring/50',
        'data-[checked]:bg-primary',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-55',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-sm ring-0',
          'transition-transform duration-200 translate-x-0.5',
          'data-[checked]:translate-x-[1.375rem]',
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
