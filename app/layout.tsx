import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/lenis-provider'
import CookieBanner from '@/components/cookie-banner'
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_LOCALE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
} from '@/lib/seo'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const HOME_TITLE = `${SITE_TAGLINE} | ${SITE_NAME}`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    // Ogni sottopagina che imposta un titolo "semplice" eredita il brand.
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: SITE_KEYWORDS,
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/fav%20192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/fav%20512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/fav%20180x180.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
  },
  twitter: {
    card: 'summary',
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#48a84d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${inter.variable} bg-background no-js`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');",
          }}
        />
        <LenisProvider>{children}</LenisProvider>
        <CookieBanner />
      </body>
    </html>
  )
}
