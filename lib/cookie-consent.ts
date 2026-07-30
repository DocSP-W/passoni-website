'use client'

import { useCallback, useEffect, useState } from 'react'

/* ────────────────────────────────────────────────────────────
   Gestione del consenso cookie — logica pura + hook React.
   Le preferenze sono persistite in localStorage (chiave
   `cookie-consent`, coerente con la Cookie Policy del sito) e
   ogni modifica emette un evento globale così che banner e
   pagina "Impostazioni Cookie" restino sempre sincronizzati.
   ──────────────────────────────────────────────────────────── */

export type CookieCategoryId = 'necessary' | 'analytics' | 'marketing' | 'preferences'

export type ConsentState = Record<CookieCategoryId, boolean>

export interface StoredConsent {
  version: number
  /** Timestamp (ms) dell'ultima scelta dell'utente. */
  timestamp: number
  categories: ConsentState
}

export interface CookieCategory {
  id: CookieCategoryId
  name: string
  /** Descrizione breve mostrata accanto allo switch. */
  description: string
  /** I cookie necessari sono sempre attivi e non disattivabili. */
  locked: boolean
}

export const CONSENT_STORAGE_KEY = 'cookie-consent'
export const CONSENT_VERSION = 1

/** Emesso quando le preferenze cambiano o vengono revocate. */
export const CONSENT_CHANGE_EVENT = 'cookieconsent:change'
/** Emesso per chiedere al banner di aprire il modale di personalizzazione. */
export const OPEN_PREFERENCES_EVENT = 'cookieconsent:open'

export const cookieCategories: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Cookie necessari',
    description:
      'Indispensabili per il funzionamento del sito: sicurezza, navigazione e memorizzazione delle tue preferenze sui cookie. Sono sempre attivi.',
    locked: true,
  },
  {
    id: 'analytics',
    name: 'Cookie analitici',
    description:
      'Ci aiutano a capire in forma anonima come viene usato il sito, così da migliorarne contenuti e usabilità.',
    locked: false,
  },
  {
    id: 'marketing',
    name: 'Cookie di marketing',
    description:
      'Utilizzati per mostrarti comunicazioni pertinenti e misurare l’efficacia delle campagne. Nessun dato viene usato senza il tuo consenso.',
    locked: false,
  },
  {
    id: 'preferences',
    name: 'Cookie di preferenza',
    description:
      'Ricordano le tue scelte (come lingua o impostazioni) per offrirti un’esperienza più personalizzata.',
    locked: false,
  },
]

/** Consenso di partenza: solo i cookie necessari sono attivi. */
export function defaultConsent(): ConsentState {
  return { necessary: true, analytics: false, marketing: false, preferences: false }
}

/** Tutte le categorie attive. */
export function fullConsent(): ConsentState {
  return { necessary: true, analytics: true, marketing: true, preferences: true }
}

function normalize(categories: Partial<ConsentState>): ConsentState {
  const base = defaultConsent()
  return {
    necessary: true, // sempre attivo, non modificabile
    analytics: Boolean(categories.analytics ?? base.analytics),
    marketing: Boolean(categories.marketing ?? base.marketing),
    preferences: Boolean(categories.preferences ?? base.preferences),
  }
}

/** Legge il consenso salvato, o `null` se l'utente non ha ancora scelto. */
export function readConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<StoredConsent>
    if (!parsed || typeof parsed !== 'object' || !parsed.categories) return null
    // Se la versione è cambiata, il consenso va richiesto di nuovo.
    if (parsed.version !== CONSENT_VERSION) return null
    return {
      version: CONSENT_VERSION,
      timestamp: typeof parsed.timestamp === 'number' ? parsed.timestamp : Date.now(),
      categories: normalize(parsed.categories),
    }
  } catch {
    return null
  }
}

function dispatchChange(consent: StoredConsent | null) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<StoredConsent | null>(CONSENT_CHANGE_EVENT, { detail: consent }))
}

/** Salva le preferenze e notifica gli ascoltatori. */
export function saveConsent(categories: Partial<ConsentState>): StoredConsent {
  const stored: StoredConsent = {
    version: CONSENT_VERSION,
    timestamp: Date.now(),
    categories: normalize(categories),
  }
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(stored))
    } catch {
      /* storage non disponibile (es. modalità privata): ignoriamo silenziosamente */
    }
  }
  dispatchChange(stored)
  return stored
}

/** Revoca il consenso: rimuove le preferenze salvate e fa ricomparire il banner. */
export function revokeConsent() {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY)
    } catch {
      /* no-op */
    }
  }
  dispatchChange(null)
}

/** Chiede al banner di aprire il modale di personalizzazione. */
export function openCookiePreferences() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))
}

/**
 * Verifica se una categoria ha il consenso attivo. Utile per agganciare
 * il caricamento condizionato di script terzi, es.:
 *   if (hasConsent('analytics')) loadAnalytics()
 */
export function hasConsent(category: CookieCategoryId): boolean {
  const stored = readConsent()
  if (!stored) return category === 'necessary'
  return stored.categories[category]
}

/* ────────────────────────────────────────────────────────────
   Hook React: espone lo stato del consenso e le azioni,
   restando in ascolto degli eventi per aggiornarsi in tempo reale.
   ──────────────────────────────────────────────────────────── */

export interface UseCookieConsent {
  /** Preferenze correnti (default: solo necessari) prima che l'utente scelga. */
  consent: ConsentState
  /** `true` quando l'utente ha già espresso una scelta. */
  hasChosen: boolean
  /** `true` finché non abbiamo letto il localStorage lato client (evita flash). */
  ready: boolean
  timestamp: number | null
  acceptAll: () => void
  rejectAll: () => void
  save: (categories: Partial<ConsentState>) => void
  revoke: () => void
}

export function useCookieConsent(): UseCookieConsent {
  const [stored, setStored] = useState<StoredConsent | null>(null)
  const [hasChosen, setHasChosen] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const current = readConsent()
    setStored(current)
    setHasChosen(current !== null)
    setReady(true)

    const handleChange = (event: Event) => {
      const detail = (event as CustomEvent<StoredConsent | null>).detail
      const next = detail ?? readConsent()
      setStored(next)
      setHasChosen(next !== null)
    }
    // Aggiornamenti da altre tab del browser.
    const handleStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_STORAGE_KEY) handleChange(new Event(CONSENT_CHANGE_EVENT))
    }

    window.addEventListener(CONSENT_CHANGE_EVENT, handleChange)
    window.addEventListener('storage', handleStorage)
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, handleChange)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const acceptAll = useCallback(() => setStored(saveConsent(fullConsent())), [])
  const rejectAll = useCallback(() => setStored(saveConsent(defaultConsent())), [])
  const save = useCallback((categories: Partial<ConsentState>) => setStored(saveConsent(categories)), [])
  const revoke = useCallback(() => {
    revokeConsent()
    setStored(null)
    setHasChosen(false)
  }, [])

  return {
    consent: stored?.categories ?? defaultConsent(),
    hasChosen,
    ready,
    timestamp: stored?.timestamp ?? null,
    acceptAll,
    rejectAll,
    save,
    revoke,
  }
}
