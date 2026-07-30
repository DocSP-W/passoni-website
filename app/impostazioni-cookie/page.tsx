import type { Metadata } from 'next'
import CookieSettings from '@/components/cookie-settings'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Impostazioni Cookie | Dott. Stefano Passoni',
  description:
    'Gestisci le tue preferenze sui cookie: visualizza lo stato del consenso, modifica le categorie o revoca il consenso in qualsiasi momento.',
  path: '/impostazioni-cookie',
  noindex: true,
})

export default function ImpostazioniCookiePage() {
  return <CookieSettings />
}
