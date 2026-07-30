# GSAP Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrare GSAP per reveal-on-scroll, stagger, barra "La Mia Storia" in scrub e menu mobile animato, in modo discreto, performante e accessibile.

**Architecture:** Un file di config centralizza easing/durate e registra ScrollTrigger. Lenis viene guidato dal ticker di GSAP per uno scrub sincronizzato. Componenti client riutilizzabili (`<Reveal>`, `<Reveal.Group>`) avvolgono contenuto renderizzato dai Server Component. La timeline "La Mia Storia" e il menu mobile sono componenti client dedicati. Tutto passa da `gsap.matchMedia()` per `prefers-reduced-motion`.

**Tech Stack:** Next.js 16, React 19, Tailwind 4, Lenis, gsap 3.13+, @gsap/react.

## Global Constraints

- Next.js 16 / React 19 — App Router; le pagine restano Server Component dove possibile.
- Hover NON riscritti in GSAP: restano in CSS.
- Solo il menu mobile viene animato con GSAP (accordion FAQ e cookie banner invariati).
- Colore primario barra: `oklch(0.52 0.115 152)`.
- Valori condivisi: `EASE='power3.out'`, `DUR=0.8`, `Y=24`, `STAGGER=0.08`.
- Rispetto pieno di `prefers-reduced-motion`: contenuto sempre fruibile, nessun flash.
- Nessun framework di test installato → verifica via `npm run build` + `npm run lint` + controllo visivo su `npm run dev`. Il progetto NON è un repo git → nessun commit; ogni task termina con verifica build/lint.
- Import alias: `@/` → root del progetto.

---

### Task 1: Installare dipendenze GSAP

**Files:**
- Modify: `package.json`

**Interfaces:**
- Consumes: nulla.
- Produces: pacchetti `gsap` e `@gsap/react` disponibili per gli import successivi.

- [ ] **Step 1: Installare i pacchetti**

Run:
```
npm install gsap @gsap/react
```

- [ ] **Step 2: Verificare l'installazione**

Confermare che `package.json` elenca `gsap` (>= 3.13.0) e `@gsap/react` in `dependencies`.
Run: `npm ls gsap @gsap/react`
Expected: entrambe risolte senza errori.

- [ ] **Step 3: Build di sanity**

Run: `npm run build`
Expected: build completata senza errori (nessun uso di GSAP ancora).

---

### Task 2: File di configurazione animazioni condivise

**Files:**
- Create: `lib/animation.ts`

**Interfaces:**
- Consumes: `gsap`, `gsap/ScrollTrigger`.
- Produces:
  - `export const EASE = 'power3.out'`
  - `export const DUR = 0.8`
  - `export const Y = 24`
  - `export const STAGGER = 0.08`
  - `export const REVEAL_START = 'top 85%'`
  - Side-effect: registra `ScrollTrigger` (solo lato client, idempotente).

- [ ] **Step 1: Creare `lib/animation.ts`**

```ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrazione idempotente, solo lato client.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Unica fonte di verità per il ritmo delle animazioni del sito.
export const EASE = 'power3.out'
export const DUR = 0.8
export const Y = 24
export const STAGGER = 0.08
export const REVEAL_START = 'top 85%'

export { gsap, ScrollTrigger }
```

- [ ] **Step 2: Verificare typecheck/build**

Run: `npm run build`
Expected: build ok. `lib/animation.ts` compila senza errori di tipo.

---

### Task 3: Integrare Lenis con il ticker di GSAP

**Files:**
- Modify: `components/lenis-provider.tsx`

**Interfaces:**
- Consumes: `gsap`, `ScrollTrigger` da `@/lib/animation`; `ReactLenis`, tipo `LenisRef` da `lenis/react`.
- Produces: contesto Lenis guidato dal ticker GSAP; `ScrollTrigger.update` chiamato ad ogni scroll. Nessun export nuovo.

- [ ] **Step 1: Riscrivere il provider**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { ReactLenis, type LenisRef } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger } from '@/lib/animation'

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    const lenis = lenisRef.current?.lenis
    if (!lenis) return

    // Un solo loop di rendering: GSAP guida Lenis.
    function update(time: number) {
      lenis!.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // ScrollTrigger legge sempre la posizione reale di Lenis.
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(update)
      lenis.off('scroll', ScrollTrigger.update)
    }
  }, [])

  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, duration: 1.2, smoothWheel: true, autoRaf: false }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  )
}
```

- [ ] **Step 2: Verificare build**

Run: `npm run build`
Expected: build ok.

- [ ] **Step 3: Verifica visiva scroll**

Run: `npm run dev`, aprire la home.
Expected: lo smooth scroll di Lenis funziona ancora normalmente (nessun blocco, nessun doppio-scroll). La pagina scrolla fluida come prima.

---

### Task 4: Anti-flash CSS per gli elementi in reveal

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: nulla.
- Produces: classe `.reveal-init` che nasconde l'elemento fino all'animazione, con fallback sicuri.

- [ ] **Step 1: Aggiungere le regole in fondo a `app/globals.css`**

```css
/* Anti-flash reveal: nascondi finché GSAP non anima.
   Fallback: se reduced-motion o JS assente, il contenuto resta visibile. */
.reveal-init {
  opacity: 0;
  will-change: opacity, transform;
}

@media (prefers-reduced-motion: reduce) {
  .reveal-init {
    opacity: 1 !important;
  }
}

/* Failsafe: se JS non parte, mostra comunque il contenuto. */
.no-js .reveal-init {
  opacity: 1;
}
```

- [ ] **Step 2: Aggiungere il failsafe no-js in `app/layout.tsx`**

Nel tag `<html>` aggiungere la classe `no-js` e uno script inline sincrono che la rimuove
appena JS è attivo (così `.reveal-init` resta nascosto solo quando JS c'è davvero).

In `app/layout.tsx`, modificare l'apertura di `<html>`:
```tsx
<html lang="it" className={`${inter.variable} bg-background no-js`}>
```
e come primo figlio di `<body>`, prima di `<LenisProvider>`:
```tsx
<script
  dangerouslySetInnerHTML={{
    __html:
      "document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');",
  }}
/>
```

- [ ] **Step 3: Verificare build**

Run: `npm run build`
Expected: build ok.

---

### Task 5: Componenti riutilizzabili `<Reveal>` e `<Reveal.Group>`

**Files:**
- Create: `components/reveal.tsx`

**Interfaces:**
- Consumes: `gsap`, `REVEAL_START`, `EASE`, `DUR`, `Y`, `STAGGER` da `@/lib/animation`; `useGSAP` da `@gsap/react`.
- Produces:
  - `Reveal` (default-ish named export) — props: `children`, `className?`, `as?: React.ElementType` (default `'div'`), `y?: number` (default `Y`), `delay?: number` (default `0`).
  - `Reveal.Group` — props: `children`, `className?`, `as?`, `stagger?: number` (default `STAGGER`), `y?: number`. Anima i figli diretti in sequenza.

- [ ] **Step 1: Creare `components/reveal.tsx`**

```tsx
'use client'

import { useRef, type ElementType, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, EASE, DUR, Y, STAGGER, REVEAL_START } from '@/lib/animation'

type RevealProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  y?: number
  delay?: number
}

export function Reveal({
  children,
  className,
  as: Tag = 'div',
  y = Y,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(el, { opacity: 0, y })
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: DUR,
          ease: EASE,
          delay,
          scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
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
}

function Group({
  children,
  className,
  as: Tag = 'div',
  stagger = STAGGER,
  y = Y,
}: GroupProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const items = Array.from(el.children) as HTMLElement[]
      if (items.length === 0) return
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(items, { opacity: 0, y })
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: DUR,
          ease: EASE,
          stagger,
          scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
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
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

Reveal.Group = Group
```

- [ ] **Step 2: Verificare build**

Run: `npm run build`
Expected: build ok, nessun errore di tipo su `as` / `ref`.

Nota: se il typecheck di `ref` con `ElementType` dà problemi, usare `ref={ref as never}` sul `Tag` — accettabile perché il wrapper è generico. Preferire prima la forma pulita.

---

### Task 6: Componente `<StoryTimeline>` con barra in scrub

**Files:**
- Create: `components/story-timeline.tsx`
- Modify: `app/chi-sono/page.tsx` (sostituire il blocco timeline, ~righe 195-208; spostare l'array `story` come prop)

**Interfaces:**
- Consumes: `gsap`, `ScrollTrigger` da `@/lib/animation`; `useGSAP`.
- Produces: `StoryTimeline` — props: `paragraphs: string[]`. Rende la timeline con traccia + barra verde animata in scrub e dots progressivi.

- [ ] **Step 1: Creare `components/story-timeline.tsx`**

```tsx
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
        style={{ backgroundColor: 'oklch(0.92 0.02 152)' }}
        aria-hidden="true"
      >
        <div
          data-story-bar
          className="absolute inset-0 w-full rounded-full"
          style={{ backgroundColor: 'oklch(0.52 0.115 152)' }}
        />
      </div>

      {paragraphs.map((paragraph, i) => (
        <div key={i} className="relative">
          <span
            data-story-dot
            className="absolute -left-[calc(2rem+4px)] md:-left-[calc(2.5rem+4px)] top-2 h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: 'oklch(0.52 0.115 152)' }}
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
```

- [ ] **Step 2: Usare il componente in `app/chi-sono/page.tsx`**

Aggiungere l'import in cima:
```tsx
import StoryTimeline from '@/components/story-timeline'
```
Sostituire l'intero blocco `<div className="relative border-l-2 ...">...</div>`
(le righe della timeline, ~195-208) con:
```tsx
<StoryTimeline paragraphs={story} />
```
L'array `story` esistente resta dov'è (Server Component che passa la prop).

- [ ] **Step 3: Verificare build**

Run: `npm run build`
Expected: build ok.

- [ ] **Step 4: Verifica visiva scrub**

Run: `npm run dev`, aprire `/chi-sono`, scrollare la sezione "La Mia Storia".
Expected: la barra verde cresce dall'alto verso il basso, sincronizzata con lo scroll,
senza scatti; i dots si accendono al passaggio. Il markup resta visivamente coerente
con il resto della pagina.

---

### Task 7: Menu mobile animato

**Files:**
- Modify: `components/navbar.tsx`

**Interfaces:**
- Consumes: `gsap` da `@/lib/animation`; `useGSAP`.
- Produces: pannello menu mobile animato in apertura/chiusura. Nessun export nuovo.

- [ ] **Step 1: Rendere il pannello sempre montato e animarlo**

In `components/navbar.tsx`:
- Aggiungere import: `import { useRef } from 'react'` (unire a `useState`), `import { useGSAP } from '@gsap/react'`, `import { gsap, EASE } from '@/lib/animation'`.
- Aggiungere un ref: `const menuRef = useRef<HTMLDivElement>(null)`.
- Sostituire il render condizionale `{mobileOpen && ( ... )}` con un pannello sempre
  montato (rimuovere `{mobileOpen && (` e la relativa `)}`), aggiungendo `ref={menuRef}`
  al div del menu e lasciando invariato il contenuto interno.
- Aggiungere l'effetto di animazione:

```tsx
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

    return () => mm.revert()
  },
  { dependencies: [mobileOpen], scope: menuRef },
)
```

- Impostare lo stato iniziale nascosto: al div del menu aggiungere
  `style={{ display: 'none', overflow: 'hidden' }}`.

- [ ] **Step 2: Verificare build**

Run: `npm run build`
Expected: build ok.

- [ ] **Step 3: Verifica visiva menu mobile**

Run: `npm run dev`, ridurre la finestra a viewport mobile, aprire/chiudere il menu.
Expected: il menu si apre con altezza+opacità morbide e voci in leggero stagger;
si chiude con animazione inversa. Nessuno scatto. Lo smooth-scroll dei link continua
a funzionare.

---

### Task 8: Applicare i reveal alle sezioni del sito

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/servizi/page.tsx`
- Modify: `app/chi-sono/page.tsx`
- Modify: `components/features.tsx`
- Modify: `components/testimonials.tsx`
- Modify: `components/dove-trovarmi.tsx`
- Modify: `components/cta-section.tsx` (se presente sezione con lista/heading)

**Interfaces:**
- Consumes: `Reveal` da `@/components/reveal`.
- Produces: sezioni con reveal-on-scroll e liste con stagger. Nessun export nuovo.

Regole di applicazione (coerenti su tutto il sito):
- Avvolgere **header di sezione** (occhiello + `<h2>` + sottotitolo) in un singolo `<Reveal>`.
- Avvolgere **griglie/liste di card** (servizi, recensioni, formazione, filosofia) in
  `<Reveal.Group>` — al posto del `div` griglia esistente, passando le stesse `className`
  (`grid ...`) al `Reveal.Group` via prop `className` e `as="div"`.
- NON avvolgere l'hero above-the-fold (deve essere immediatamente visibile; niente reveal
  che nasconde il primo viewport). Applicare i reveal dalle sezioni sotto la piega.
- NON toccare gli hover (restano CSS).

- [ ] **Step 1: `components/features.tsx` — header + griglia**

Aggiungere in cima: `import { Reveal } from '@/components/reveal'`.
Avvolgere il blocco `Section Header` (`<div className="text-center mb-16"> ... </div>`)
con `<Reveal>...</Reveal>`.
Sostituire il `div` della griglia:
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
```
con:
```tsx
<Reveal.Group as="div" className="grid grid-cols-1 md:grid-cols-3 gap-6">
```
e la corrispondente `</div>` di chiusura con `</Reveal.Group>`.

- [ ] **Step 2: `components/testimonials.tsx` — header + lista recensioni**

Aggiungere l'import `Reveal`. Avvolgere l'header di sezione in `<Reveal>`. Sostituire il
contenitore della griglia/lista delle recensioni con `<Reveal.Group as="div" className="...(stesse classi)...">` e chiudere con `</Reveal.Group>`.

- [ ] **Step 3: `app/chi-sono/page.tsx` — sezioni Formazione e Filosofia**

Aggiungere l'import `Reveal`. Avvolgere gli header delle sezioni "Formazione e Titoli" e
"La mia filosofia" in `<Reveal>`. Sostituire i due `div` griglia
(`grid ... gap-6`) con `<Reveal.Group as="div" className="...(stesse classi)...">` e relativa chiusura.
La sezione "La Mia Storia" è già gestita da `StoryTimeline` (Task 6): avvolgere solo il suo
header (`<div className="text-center mb-14">`) in `<Reveal>`.

- [ ] **Step 4: `app/servizi/page.tsx` — header e liste**

Aggiungere l'import `Reveal`. Avvolgere gli header di sezione in `<Reveal>` e i contenitori
di card/lista in `<Reveal.Group as="div" className="...(stesse classi)...">`. Non avvolgere
l'hero above-the-fold.

- [ ] **Step 5: `components/dove-trovarmi.tsx` e `components/cta-section.tsx`**

Aggiungere l'import `Reveal`. Avvolgere l'header/contenuto principale (non-hero) di ciascuna
sezione in un `<Reveal>`. Se contengono liste, usare `<Reveal.Group>` per lo stagger.

- [ ] **Step 6: `app/page.tsx` — verificare copertura**

Assicurarsi che ogni sezione della home sotto l'hero sia coperta dai reveal applicati ai
rispettivi componenti (features, testimonials, chi-sono, dove-trovarmi, cta). Se `app/page.tsx`
compone direttamente sezioni inline, applicare lo stesso schema header→`<Reveal>` /
lista→`<Reveal.Group>`.

- [ ] **Step 7: Verificare build e lint**

Run: `npm run build && npm run lint`
Expected: entrambi ok, nessun errore.

- [ ] **Step 8: Verifica visiva completa**

Run: `npm run dev`. Scorrere Home, Chi Sono, Servizi.
Expected:
- Le sezioni sotto la piega entrano con fade-in + leggera traslazione.
- Le liste di card entrano in stagger contenuto.
- Nessun flash di contenuto nascosto; l'hero è subito visibile.
- Con DevTools → Rendering → "Emulate prefers-reduced-motion: reduce", ricaricare:
  tutto è subito visibile, nessun movimento, la barra "La Mia Storia" è piena.

---

### Task 9: Verifica finale responsive e performance

**Files:** nessuno (solo verifica).

- [ ] **Step 1: Build di produzione**

Run: `npm run build`
Expected: build ok, nessun warning bloccante.

- [ ] **Step 2: Verifica responsive**

Run: `npm run dev`. Testare a viewport desktop (~1440px), tablet (~768px), mobile (~390px).
Expected: reveal, stagger, barra scrub e menu mobile funzionano correttamente su tutte le
dimensioni; nessun overflow orizzontale introdotto.

- [ ] **Step 3: Verifica reduced-motion end-to-end**

Con `prefers-reduced-motion: reduce` attivo, navigare tutte le pagine.
Expected: contenuto sempre pienamente visibile e leggibile, nessuna animazione di movimento;
lo scroll resta usabile.

---

## Note di esecuzione

- Il progetto NON è un repo git: ignorare gli step di commit; ogni task termina con la
  verifica `npm run build` (ed eventualmente `npm run lint`) più il controllo visivo indicato.
- Nessun framework di test: le "verifiche" sono build + lint + controllo visivo nel dev server.
- Se un import di ScrollTrigger dà errore di path, usare `'gsap/ScrollTrigger'` (già previsto
  in `lib/animation.ts`); non importarlo direttamente altrove — passare sempre da `@/lib/animation`.
