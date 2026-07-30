'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/animation'

export default function StoryTimeline({ paragraphs }: { paragraphs: string[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const bar = el.querySelector<HTMLElement>('[data-story-bar]')
      const dots = gsap.utils.toArray<HTMLElement>('[data-story-dot]', el)
      if (!bar) return
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(bar, { scaleY: 0, transformOrigin: 'top center' })
        gsap.set(dots, { opacity: 0.25 })

        gsap.to(bar, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: true,
          },
        })

        // I dots si accendono man mano che la barra li raggiunge.
        dots.forEach((dot) => {
          gsap.to(dot, {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: dot,
              start: 'top 75%',
              end: 'top 55%',
              scrub: true,
            },
          })
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(bar, { scaleY: 1, transformOrigin: 'top center' })
        gsap.set(dots, { opacity: 1 })
      })

      return () => mm.revert()
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className="relative pl-8 md:pl-10 flex flex-col gap-6">
      {/* Traccia + barra animata */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
        style={{ backgroundColor: 'oklch(0.92 0.028 144)' }}
        aria-hidden="true"
      >
        <div
          data-story-bar
          className="absolute inset-0 w-full rounded-full"
          style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
        />
      </div>

      {paragraphs.map((paragraph, i) => (
        <div key={i} className="relative">
          <span
            data-story-dot
            className="absolute -left-[calc(2rem+4px)] md:-left-[calc(2.5rem+4px)] top-2 h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
            aria-hidden="true"
          />
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {paragraph}
          </p>
        </div>
      ))}
    </div>
  )
}
