import type { Metadata } from 'next'

/* ────────────────────────────────────────────────────────────
   Configurazione SEO centralizzata.
   Ogni pagina costruisce i propri metadati con `buildMetadata`,
   così title, description, canonical, Open Graph e Twitter Card
   restano coerenti e senza duplicati in tutto il sito.
   ──────────────────────────────────────────────────────────── */

export const SITE_URL = 'https://www.spnutrizione.it'
export const SITE_NAME = 'Dott. Stefano Passoni'
export const SITE_TAGLINE = 'Biologo Nutrizionista a Monza'
export const SITE_LOCALE = 'it_IT'

/** Descrizione della home, riutilizzata come default del sito. */
export const SITE_DESCRIPTION =
  'Biologo nutrizionista a Monza: percorsi alimentari personalizzati e scientifici per dimagrimento, benessere digestivo, dietoterapia e nutrizione sportiva.'

/** Parole chiave di base, condivise dalle pagine indicizzabili. */
export const SITE_KEYWORDS = [
  'biologo nutrizionista',
  'nutrizionista Monza',
  'nutrizionista Monza Brianza',
  'dieta personalizzata',
  'piano alimentare personalizzato',
  'dietoterapia',
  'nutrizione sportiva',
  'benessere digestivo',
  'educazione alimentare',
  'Stefano Passoni',
]

interface PageSeo {
  /** Titolo completo, ottimizzato (~50–60 caratteri). */
  title: string
  /** Meta description (~140–160 caratteri). */
  description: string
  /** Percorso della pagina, es. `/servizi`. Usato per canonical e og:url. */
  path: string
  keywords?: string[]
  /** Pagine di servizio (legali) da escludere dall'indicizzazione. */
  noindex?: boolean
}

/**
 * Costruisce l'oggetto `Metadata` di una pagina con canonical,
 * Open Graph e Twitter Card già impostati e coerenti.
 * Il titolo è `absolute` così da avere pieno controllo sulla
 * lunghezza, senza che il template del layout lo raddoppi.
 */
export function buildMetadata({ title, description, path, keywords, noindex }: PageSeo): Metadata {
  return {
    title: { absolute: title },
    description,
    keywords: keywords ?? SITE_KEYWORDS,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    robots: noindex
      ? { index: false, follow: true, googleBot: { index: false, follow: true } }
      : undefined,
  }
}
