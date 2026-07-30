'use client'

import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import {
  cookieCategories,
  type ConsentState,
  type CookieCategoryId,
} from '@/lib/cookie-consent'

const GREEN_DARK = 'oklch(0.5 0.14 144)'

interface CookieCategoriesProps {
  value: ConsentState
  /** Assente = sola lettura (nessuno switch modificabile, usato per mostrare lo stato). */
  onChange?: (id: CookieCategoryId, checked: boolean) => void
  className?: string
}

/**
 * Elenco presentazionale delle categorie di cookie con switch on/off.
 * Riutilizzato dal modale del banner e dalla pagina "Impostazioni Cookie",
 * così l'aspetto e le descrizioni restano identici ovunque.
 */
export default function CookieCategories({ value, onChange, className }: CookieCategoriesProps) {
  const readOnly = !onChange

  return (
    <ul className={cn('flex flex-col gap-3', className)}>
      {cookieCategories.map((category) => {
        const checked = category.locked ? true : value[category.id]
        const switchId = `cookie-cat-${category.id}`
        const descId = `cookie-cat-${category.id}-desc`

        return (
          <li
            key={category.id}
            className="rounded-2xl border bg-white p-4 md:p-5"
            style={{ borderColor: 'oklch(0.92 0.008 144)' }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <label
                  htmlFor={switchId}
                  className="flex items-center gap-2 text-[0.95rem] font-semibold text-gray-900 cursor-pointer"
                >
                  <span
                    className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
                    aria-hidden="true"
                  />
                  {category.name}
                </label>
                <p id={descId} className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="flex flex-shrink-0 flex-col items-end gap-1.5 pt-0.5">
                <Switch
                  id={switchId}
                  checked={checked}
                  disabled={category.locked || readOnly}
                  aria-describedby={descId}
                  aria-label={`${category.name}${category.locked ? ' (sempre attivi)' : ''}`}
                  onCheckedChange={
                    onChange && !category.locked
                      ? (next) => onChange(category.id, next)
                      : undefined
                  }
                />
                {category.locked && (
                  <span
                    className="text-[0.7rem] font-medium whitespace-nowrap"
                    style={{ color: GREEN_DARK }}
                  >
                    Sempre attivi
                  </span>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
