'use client'

import { useCallback } from 'react'
import { MapPin } from 'lucide-react'

import { openCookiePreferences, saveConsent, useCookieConsent } from '@/lib/cookie-consent'

const GREEN = 'oklch(0.653 0.157 144)'
const GREEN_DARK = 'oklch(0.5 0.14 144)'

/**
 * Categoria di consenso che sblocca l'embed. I cookie impostati da
 * Google Maps (NID e affini) sono usati anche per la profilazione
 * pubblicitaria, quindi ricadono sotto "marketing".
 */
const MAP_CONSENT_CATEGORY = 'marketing' as const

const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2793.5!2d9.2734!3d45.5845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786bd5f2d1c1b3b%3A0x0!2sVia+Collodi+8%2C+20900+Monza+MB%2C+Italy!5e0!3m2!1sit!2sit!4v1700000000000'

const FRAME = 'rounded-2xl overflow-hidden border border-[oklch(0.92_0.008_144)] w-full flex-1 min-h-[300px]'

/**
 * Mappa dello studio, caricata solo con il consenso dell'utente.
 * Finché il consenso manca l'iframe non viene montato — quindi nessuna
 * richiesta parte verso Google — e al suo posto compare un segnaposto
 * che spiega il motivo e permette di prestare il consenso sul momento.
 */
export default function MapEmbed() {
  const { consent, ready } = useCookieConsent()
  const allowed = consent[MAP_CONSENT_CATEGORY]

  /**
   * Consenso puntuale per la mappa: attiva la sola categoria necessaria
   * all'embed e lascia invariate le altre scelte già espresse.
   */
  const allowMap = useCallback(() => {
    saveConsent({ ...consent, [MAP_CONSENT_CATEGORY]: true })
  }, [consent])

  // Prima di aver letto le preferenze dal localStorage mostriamo un
  // segnaposto neutro: evita sia il flash del banner sia il salto di layout.
  if (!ready) {
    return <div className={`${FRAME} bg-[oklch(0.975_0.012_144)]`} aria-hidden="true" />
  }

  if (allowed) {
    return (
      <div className={FRAME}>
        <iframe
          title="Studio Dott. Stefano Passoni — Via Collodi 8, Monza"
          src={MAP_EMBED_SRC}
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    )
  }

  return (
    <div className={`${FRAME} flex flex-col items-center justify-center gap-4 bg-[oklch(0.975_0.012_144)] px-6 py-10 text-center`}>
      <span
        className="flex h-12 w-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: 'oklch(0.96 0.035 144)' }}
        aria-hidden="true"
      >
        <MapPin className="h-6 w-6" style={{ color: GREEN_DARK }} strokeWidth={2.2} />
      </span>

      <div className="max-w-sm">
        <p className="text-base font-semibold text-gray-900">Mappa non visualizzata</p>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
          Per mostrarti la mappa dobbiamo caricare Google Maps, un servizio di terze parti che
          installa cookie sul tuo dispositivo. Per visualizzarla è necessario accettare i cookie.
        </p>
      </div>

      <div className="flex flex-col items-center gap-2.5 sm:flex-row">
        <button
          type="button"
          onClick={allowMap}
          className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          style={{ backgroundColor: GREEN }}
        >
          Consenti i cookie
        </button>
        <button
          type="button"
          onClick={openCookiePreferences}
          className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          style={{ color: GREEN_DARK }}
        >
          Gestisci preferenze
        </button>
      </div>

      <p className="text-xs text-gray-500">
        Puoi comunque raggiungere lo studio con il pulsante qui sotto.
      </p>
    </div>
  )
}
