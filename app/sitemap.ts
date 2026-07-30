import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// Generata al build time: il sito è esportato come statico (`output: 'export'`).
export const dynamic = 'force-static'

/**
 * Sitemap del sito. Include solo le pagine indicizzabili: le pagine
 * legali sono `noindex` e vengono volutamente escluse.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/servizi`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/chi-sono`, lastModified, changeFrequency: 'yearly', priority: 0.8 },
  ]
}
