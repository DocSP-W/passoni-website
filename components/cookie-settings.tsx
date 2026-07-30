'use client'

import { ArrowLeft, RotateCcw, SlidersHorizontal, ShieldCheck } from 'lucide-react'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CookieCategories from '@/components/cookie-categories'
import {
  cookieCategories,
  openCookiePreferences,
  useCookieConsent,
} from '@/lib/cookie-consent'

const GREEN = 'oklch(0.653 0.157 144)'
const GREEN_DARK = 'oklch(0.5 0.14 144)'
const CARD_BORDER = 'oklch(0.92 0.008 144)'

function formatDate(ts: number) {
  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(ts))
}

/**
 * Pagina "Impostazioni Cookie" — client component perché legge e modifica
 * il consenso in tempo reale. Riprende esattamente l'impaginazione delle
 * pagine legali (hero verde + Navbar/Footer) e riusa la stessa lista di
 * categorie e lo stesso modale del banner.
 */
export default function CookieSettings() {
  const { ready, hasChosen, consent, timestamp, revoke } = useCookieConsent()

  const activeCount = cookieCategories.filter((c) => consent[c.id]).length

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      {/* ─────────────  HERO  ───────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: GREEN }}
        aria-label="Impostazioni Cookie — intestazione"
      >
        <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-40 -left-24 h-64 w-64 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />

        <div className="relative mx-auto max-w-4xl px-6 md:px-10 lg:px-16 pt-28 pb-24 md:pt-32 md:pb-28">
          <a
            href="/#home"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alla Home
          </a>
          <p className="mb-4 text-white/70 text-sm font-semibold tracking-widest uppercase">Impostazioni Cookie</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-5 text-balance">
            Gestisci le tue preferenze
          </h1>
          <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl">
            Qui puoi vedere lo stato attuale del tuo consenso e decidere in ogni momento quali cookie
            attivare o disattivare. Le tue scelte vengono salvate sul tuo dispositivo.
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
          aria-hidden="true"
        />
      </section>

      {/* ─────────────  CONTENUTO  ─────────────
          -mt-[3px] + z-10: la sezione si sovrappone di pochi pixel all'hero per
          coprire la linea verde lasciata dall'arrotondamento sub-pixel del clip-path. */}
      <section className="relative z-10 -mt-[3px] bg-white px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="mx-auto flex max-w-3xl flex-col gap-12">

          {/* Introduzione */}
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline gap-3">
              <span
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: GREEN }}
                aria-hidden="true"
              >
                1
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                Come usiamo i cookie
              </h2>
            </div>
            <p className="text-gray-600 text-[0.95rem] md:text-base leading-relaxed">
              I cookie sono piccoli file di testo salvati sul tuo dispositivo. Alcuni sono
              indispensabili per far funzionare il sito, altri — solo con il tuo consenso — ci
              aiutano a capire come viene utilizzato e a offrirti un’esperienza più personalizzata.
              Puoi modificare o revocare le tue preferenze in qualsiasi momento da questa pagina.
              Per maggiori dettagli consulta la{' '}
              <a href="/cookie-policy" className="font-medium hover:underline" style={{ color: GREEN_DARK }}>
                Cookie Policy
              </a>
              .
            </p>
          </div>

          {/* Stato attuale del consenso */}
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline gap-3">
              <span
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: GREEN }}
                aria-hidden="true"
              >
                2
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                Stato attuale del consenso
              </h2>
            </div>

            <div
              className="rounded-2xl border p-5 md:p-6"
              style={{ borderColor: CARD_BORDER, backgroundColor: 'oklch(0.985 0.008 144)' }}
            >
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: GREEN_DARK }} aria-hidden="true" />
                <div aria-live="polite">
                  {!ready ? (
                    <p className="text-[0.95rem] text-gray-500">Verifica delle preferenze in corso…</p>
                  ) : hasChosen ? (
                    <>
                      <p className="text-[0.95rem] font-semibold text-gray-900">
                        Hai personalizzato le tue preferenze.
                      </p>
                      <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                        Categorie attive: <span className="font-medium">{activeCount}</span> su{' '}
                        {cookieCategories.length}.
                        {timestamp && <> Ultimo aggiornamento: {formatDate(timestamp)}.</>}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[0.95rem] font-semibold text-gray-900">
                        Non hai ancora espresso una preferenza.
                      </p>
                      <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                        Al momento sono attivi solo i cookie necessari. Usa i pulsanti qui sotto per
                        scegliere.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Elenco categorie (stato corrente, sola lettura) */}
          <div className="flex flex-col gap-4">
            <div className="flex items-baseline gap-3">
              <span
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: GREEN }}
                aria-hidden="true"
              >
                3
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                Le categorie di cookie
              </h2>
            </div>
            <p className="text-gray-600 text-[0.95rem] md:text-base leading-relaxed">
              Di seguito lo stato attuale di ogni categoria. Per modificarlo usa il pulsante
              <span className="font-medium"> “Modifica preferenze”</span>.
            </p>
            <CookieCategories value={consent} />
          </div>

          {/* Azioni: modifica / revoca */}
          <div
            className="flex flex-col gap-4 rounded-2xl border p-5 md:p-6"
            style={{ borderColor: CARD_BORDER }}
          >
            <div>
              <h3 className="text-base font-semibold text-gray-900">Modifica o revoca il consenso</h3>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                Apri il pannello per aggiornare le tue scelte, oppure revoca il consenso per
                ripristinare lo stato iniziale (verrà mostrato di nuovo il banner).
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={openCookiePreferences}
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                style={{ backgroundColor: GREEN }}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Modifica preferenze
              </button>
              <button
                type="button"
                onClick={revoke}
                disabled={!ready || !hasChosen}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
              >
                <RotateCcw className="h-4 w-4" />
                Revoca consenso
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
