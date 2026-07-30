'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { Cookie, X } from 'lucide-react'

import CookieCategories from '@/components/cookie-categories'
import {
  OPEN_PREFERENCES_EVENT,
  defaultConsent,
  readConsent,
  useCookieConsent,
  type ConsentState,
  type CookieCategoryId,
} from '@/lib/cookie-consent'

const GREEN = 'oklch(0.653 0.157 144)'
const GREEN_DARK = 'oklch(0.5 0.14 144)'

/**
 * Banner cookie GDPR: barra in basso alla prima visita
 * (Accetta tutti / Rifiuta / Personalizza) e modale di personalizzazione
 * con le quattro categorie. Montato una sola volta nel layout, resta in
 * ascolto dell'evento `cookieconsent:open` per essere riaperto dalla
 * pagina "Impostazioni Cookie".
 */
export default function CookieBanner() {
  const { ready, hasChosen, consent, acceptAll, rejectAll, save } = useCookieConsent()

  // Manteniamo l'ultimo consenso in un ref per inizializzare la bozza del
  // modale con i valori correnti anche quando viene aperto dall'esterno.
  const consentRef = useRef<ConsentState>(consent)
  consentRef.current = consent

  const [barMounted, setBarMounted] = useState(false)
  const [barVisible, setBarVisible] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const [draft, setDraft] = useState<ConsentState>(defaultConsent())

  // Entrata/uscita fluida della barra in base allo stato del consenso.
  useEffect(() => {
    if (!ready) return
    if (!hasChosen) {
      setBarMounted(true)
      const raf = requestAnimationFrame(() => setBarVisible(true))
      return () => cancelAnimationFrame(raf)
    }
    setBarVisible(false)
    const timer = setTimeout(() => setBarMounted(false), 400)
    return () => clearTimeout(timer)
  }, [ready, hasChosen])

  const openModal = useCallback(() => {
    const current = readConsent()?.categories ?? consentRef.current
    setDraft({ ...current })
    setModalOpen(true)
  }, [])

  // Apertura del modale richiesta dalla pagina "Impostazioni Cookie".
  useEffect(() => {
    window.addEventListener(OPEN_PREFERENCES_EVENT, openModal)
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openModal)
  }, [openModal])

  const handleDraftChange = useCallback((id: CookieCategoryId, checked: boolean) => {
    setDraft((prev) => ({ ...prev, [id]: checked }))
  }, [])

  const handleAcceptAll = useCallback(() => {
    acceptAll()
    setModalOpen(false)
  }, [acceptAll])

  const handleRejectAll = useCallback(() => {
    rejectAll()
    setModalOpen(false)
  }, [rejectAll])

  const handleSave = useCallback(() => {
    save(draft)
    setModalOpen(false)
  }, [save, draft])

  return (
    <>
      {/* ─────────────  BARRA  ───────────── */}
      {barMounted && (
        <div
          role="region"
          aria-label="Informativa sui cookie"
          className={`fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6 transition-all duration-400 ease-out ${
            barVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div
            className="mx-auto max-w-4xl rounded-3xl border border-black/5 bg-white/95 p-5 shadow-2xl backdrop-blur-md md:p-6"
            style={{ boxShadow: '0 20px 50px -12px oklch(0.5 0.14 144 / 0.35)' }}
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-6">
              <div className="flex items-start gap-4">
                <span
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: 'oklch(0.96 0.035 144)' }}
                  aria-hidden="true"
                >
                  <Cookie className="h-5 w-5" style={{ color: GREEN_DARK }} strokeWidth={2.2} />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.95rem] font-semibold text-gray-900">Rispettiamo la tua privacy</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    Usiamo cookie per far funzionare il sito e, con il tuo consenso, per analisi e
                    personalizzazione. Puoi accettarli, rifiutarli o scegliere quali attivare. Leggi la{' '}
                    <a
                      href="/cookie-policy"
                      className="font-medium underline underline-offset-2 hover:no-underline"
                      style={{ color: GREEN_DARK }}
                    >
                      Cookie Policy
                    </a>
                    .
                  </p>
                </div>
              </div>

              <div className="flex flex-shrink-0 flex-col gap-2.5 sm:flex-row sm:flex-wrap md:flex-col lg:flex-row md:w-auto">
                <button
                  type="button"
                  onClick={acceptAll}
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  style={{ backgroundColor: GREEN }}
                >
                  Accetta tutti
                </button>
                <button
                  type="button"
                  onClick={rejectAll}
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  Rifiuta
                </button>
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  style={{ color: GREEN_DARK }}
                >
                  Personalizza
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────  MODALE DI PERSONALIZZAZIONE  ───────────── */}
      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-[70] bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
          <Dialog.Popup
            className="fixed left-1/2 top-1/2 z-[80] flex max-h-[90vh] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl bg-white shadow-2xl outline-none transition-all duration-300 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 pb-5 pt-6">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: 'oklch(0.96 0.035 144)' }}
                  aria-hidden="true"
                >
                  <Cookie className="h-5 w-5" style={{ color: GREEN_DARK }} strokeWidth={2.2} />
                </span>
                <div>
                  <Dialog.Title className="text-lg font-bold tracking-tight text-gray-900">
                    Preferenze cookie
                  </Dialog.Title>
                  <Dialog.Description className="mt-0.5 text-sm text-gray-500">
                    Scegli quali categorie attivare.
                  </Dialog.Description>
                </div>
              </div>
              <Dialog.Close
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                aria-label="Chiudi"
              >
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>

            {/* Categorie (scrollabili) */}
            <div className="min-h-0 flex-1 overflow-y-auto bg-[oklch(0.985_0.008_144)] px-6 py-5">
              <CookieCategories value={draft} onChange={handleDraftChange} />
            </div>

            {/* Footer azioni */}
            <div className="flex flex-col gap-2.5 border-t border-gray-100 px-6 py-5 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex flex-1 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                style={{ backgroundColor: GREEN }}
              >
                Salva preferenze
              </button>
              <button
                type="button"
                onClick={handleRejectAll}
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Rifiuta tutti
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                style={{ color: GREEN_DARK }}
              >
                Accetta tutti
              </button>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
