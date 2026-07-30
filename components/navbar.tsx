'use client'

import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { Menu, X } from 'lucide-react'
import { useLenis } from 'lenis/react'
import Image from 'next/image'
import { gsap, EASE } from '@/lib/animation'

const navLinks: { label: string; href: string; smooth?: boolean }[] = [
  { label: 'Home', href: '/#home', smooth: true },
  { label: 'Chi Sono', href: '/chi-sono' },
  { label: 'Servizi', href: '/servizi' },
  { label: 'Recensioni', href: '/#recensioni', smooth: true },
  { label: 'Contatti', href: '/#contatti', smooth: true },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const lenis = useLenis()

  const menuRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  useGSAP(
    () => {
      const el = menuRef.current
      if (!el) return
      const items = gsap.utils.toArray<HTMLElement>('li', el)
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (mobileOpen) {
          gsap.set(el, { display: 'block' })
          gsap.fromTo(
            el,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.35, ease: EASE },
          )
          gsap.fromTo(
            items,
            { opacity: 0, y: -8 },
            { opacity: 1, y: 0, duration: 0.3, ease: EASE, stagger: 0.05, delay: 0.05 },
          )
        } else if (firstRender.current) {
          // Primo mount: nessuna animazione, il pannello parte chiuso senza tween/onComplete.
          gsap.set(el, { display: 'none', height: 0, opacity: 0 })
        } else {
          gsap.to(el, {
            height: 0,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => gsap.set(el, { display: 'none' }),
          })
        }
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(el, { display: mobileOpen ? 'block' : 'none', height: 'auto', opacity: 1 })
      })

      firstRender.current = false

      return () => mm.revert()
    },
    { dependencies: [mobileOpen], scope: menuRef },
  )

  const handleSmoothClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Only intercept for smooth scrolling when the target exists on this page.
      // Otherwise (e.g. clicking a home anchor from the Chi Sono page) let the
      // browser navigate to the home route normally.
      const hash = href.includes('#') ? `#${href.split('#')[1]}` : ''
      const target = hash ? document.querySelector(hash) : null
      if (!lenis || !target) {
        setMobileOpen(false)
        return
      }
      e.preventDefault()
      setMobileOpen(false)
      lenis.scrollTo(hash, { duration: 1.4 })
    }

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <nav
        className="mx-auto flex items-center justify-between px-6 py-4 md:px-10 lg:px-16"
        aria-label="Navigazione principale"
      >
        {/* Logo */}
        <a href="/#home" className="flex items-center gap-2 group">
          <Image
            src="/logo%20white%20trans.png"
            alt="Logo Dott. Stefano Passoni"
            width={454}
            height={549}
            priority
            className="h-14 w-auto transition-opacity group-hover:opacity-80"
          />
          <span className="text-white font-semibold text-base tracking-tight leading-tight">
            Dott. Stefano Passoni
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={link.smooth ? handleSmoothClick(link.href) : undefined}
                className="text-white/85 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a
            href="https://wa.me/393392501099"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm px-5 py-2 text-sm font-medium text-white hover:bg-white/20 transition-all duration-200"
          >
            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Scrivimi su WhatsApp
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="md:hidden bg-[oklch(0.653_0.157_144)] px-6 py-4 border-t border-white/10"
        style={{ display: 'none', overflow: 'hidden' }}
      >
        <ul className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-white/90 hover:text-white text-sm font-medium"
                onClick={
                  link.smooth
                    ? handleSmoothClick(link.href)
                    : () => setMobileOpen(false)
                }
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://wa.me/393392501099"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-sm font-medium text-white hover:bg-white/10 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              Scrivimi su WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
