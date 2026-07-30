'use client'

import { useRef, type ElementType, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import {
  gsap,
  EASE,
  DUR,
  Y,
  STAGGER,
  REVEAL_START,
  HERO_DUR,
  HERO_Y,
  HERO_STAGGER,
  HERO_DELAY,
} from '@/lib/animation'

// `immediate` = anima al mount invece che allo scroll. Serve per gli hero,
// che sono above the fold: aspettare lo ScrollTrigger li lascerebbe invisibili.

type RevealProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  y?: number
  delay?: number
  immediate?: boolean
}

export function Reveal({
  children,
  className,
  as: Tag = 'div',
  y,
  delay,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()

      const dy = y ?? (immediate ? HERO_Y : Y)
      const dDelay = delay ?? (immediate ? HERO_DELAY : 0)

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(el, { opacity: 0, y: dy })
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: immediate ? HERO_DUR : DUR,
          ease: EASE,
          delay: dDelay,
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: el, start: REVEAL_START, once: true } }),
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(el, { opacity: 1, y: 0 })
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={`reveal-init ${className ?? ''}`}>
      {children}
    </Tag>
  )
}

type GroupProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  stagger?: number
  y?: number
  delay?: number
  immediate?: boolean
}

export function Group({
  children,
  className,
  as: Tag = 'div',
  stagger,
  y,
  delay,
  immediate = false,
}: GroupProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const items = Array.from(el.children) as HTMLElement[]
      if (items.length === 0) return
      const mm = gsap.matchMedia()

      const dy = y ?? (immediate ? HERO_Y : Y)
      const dStagger = stagger ?? (immediate ? HERO_STAGGER : STAGGER)
      const dDelay = delay ?? (immediate ? HERO_DELAY : 0)

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(items, { opacity: 0, y: dy })
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: immediate ? HERO_DUR : DUR,
          ease: EASE,
          delay: dDelay,
          stagger: dStagger,
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: el, start: REVEAL_START, once: true } }),
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(items, { opacity: 1, y: 0 })
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={`reveal-group-init ${className ?? ''}`}>
      {children}
    </Tag>
  )
}
