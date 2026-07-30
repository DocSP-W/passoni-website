'use client'

import { useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from '@/lib/animation'

/**
 * Ponte GSAP ↔ Lenis.
 *
 * Vive in un componente figlio di <ReactLenis> perché l'istanza Lenis non
 * esiste al primo commit: ReactLenis la crea in un proprio useEffect e la
 * espone via state, quindi `ref.current.lenis` è ancora `undefined` quando un
 * useEffect([]) del componente padre gira. Con `autoRaf: false` questo
 * significava non registrare mai il ticker: Lenis intercettava la rotella
 * (preventDefault) senza mai far avanzare lo scroll, bloccando la pagina.
 *
 * `useLenis()` è reattivo: il body gira di nuovo appena l'istanza è pronta.
 */
function GsapLenisBridge() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    // Un solo loop di rendering: GSAP guida Lenis.
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // ScrollTrigger legge sempre la posizione reale di Lenis.
    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    return () => {
      gsap.ticker.remove(update)
      lenis.off('scroll', onScroll)
    }
  }, [lenis])

  return null
}

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, autoRaf: false }}
    >
      <GsapLenisBridge />
      {children}
    </ReactLenis>
  )
}
