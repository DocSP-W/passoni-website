# GSAP Animations — Design Spec

**Data:** 2026-07-26
**Progetto:** Sito Dott. Stefano Passoni (Next.js 16 / React 19 / Tailwind 4)

## Obiettivo

Integrare GSAP per aggiungere animazioni moderne, discrete e performanti, coerenti con
lo stile minimal/Apple-like esistente. Ogni animazione deve avere uno scopo (guidare
l'attenzione, aumentare la qualità percepita), senza compromettere leggibilità o
prestazioni. Rispetto pieno di `prefers-reduced-motion`.

## Scelte confermate

- **Ambito:** tutto il sito (Home, Chi Sono, Servizi). Le pagine legali restano statiche.
- **Hover:** restano in CSS (già curati e performanti). GSAP solo per scroll/reveal/stagger,
  barra "La Mia Storia" e menu mobile.
- **Transizioni UI:** solo il menu mobile viene animato con GSAP. Accordion FAQ e cookie
  banner restano come sono (già animati bene in CSS).

## Stato attuale rilevante

- Lenis già installato e attivo via `components/lenis-provider.tsx` (`ReactLenis root`,
  `lerp 0.1`, `duration 1.2`). GSAP non ancora presente.
- Pagine (`app/*/page.tsx`) sono Server Component; le sezioni mappano array statici.
- Hover esistenti in CSS: `hover:-translate-y-1 transition-all duration-300`, `hover:shadow-lg`.
- Sezione "La Mia Storia" in `app/chi-sono/page.tsx` (~riga 195): timeline con `border-l-2`
  verde chiaro statico e dots.
- Colore primario ricorrente: `oklch(0.52 0.115 152)`.

## Architettura

### 1. Setup dipendenze
- Aggiungere `gsap` e `@gsap/react` (hook `useGSAP` con cleanup automatico).
- Da GSAP 3.13 ScrollTrigger e tutti i plugin sono gratuiti nel pacchetto npm standard.
- Registrare `ScrollTrigger` una sola volta (in `lib/animation.ts`, lato client).

### 2. Integrazione Lenis ↔ ScrollTrigger (fondamentale per lo scrub)
Modificare `components/lenis-provider.tsx`:
- `ReactLenis` con `autoRaf: false`; Lenis viene guidato dal ticker di GSAP tramite
  `gsap.ticker.add((time) => lenis.raf(time * 1000))`.
- `lenis.on('scroll', ScrollTrigger.update)`.
- `gsap.ticker.lagSmoothing(0)` per movimento costante.
- Un solo loop di rendering → scrub perfettamente sincronizzato, nessuno scatto.
- Cleanup del ticker al dismount.

### 3. Utility condivise — `lib/animation.ts` (nuovo)
Unica fonte di verità per durate/easing, così l'intero sito è coerente:
```
EASE    = 'power3.out'
DUR     = 0.8      // durata reveal standard
Y       = 24       // traslazione verticale iniziale (px)
STAGGER = 0.08     // ritardo tra item di lista (contenuto)
```
Include anche la registrazione di ScrollTrigger e un helper per `gsap.matchMedia()`.

### 4. Componenti riutilizzabili — `components/reveal.tsx` (nuovo)
Wrapper client che avvolgono contenuto renderizzato dal server (le pagine restano
Server Component):
- **`<Reveal>`** — fade-in + traslazione dal basso all'ingresso nel viewport.
  Props: `as`, `delay`, `y`, `className`. Animazione `once` (non si ripete).
- **`<Reveal.Group>`** — stagger: anima i figli diretti in sequenza con ritardo `STAGGER`.
  Usato su card servizi, recensioni, formazione, filosofia, FAQ.
Entrambi usano `useGSAP` + `ScrollTrigger` con `start: 'top 85%'` circa, cleanup automatico.

### 5. Sezione "La Mia Storia" — `components/story-timeline.tsx` (nuovo)
- Estrarre il blocco timeline da `app/chi-sono/page.tsx` in un componente client che
  riceve l'array `story` come prop. Markup visivamente identico.
- Traccia grigio-chiara + barra verde `oklch(0.52 0.115 152)` sopra, `scaleY: 0 → 1`,
  `transformOrigin: top`.
- `ScrollTrigger` con `scrub: true`, ancorato all'inizio/fine della sezione → la barra
  cresce dall'alto verso il basso seguendo l'avanzamento della lettura.
- I dots si "accendono" progressivamente man mano che la barra li raggiunge.

### 6. Menu mobile — `components/navbar.tsx`
- Apertura morbida con GSAP (altezza + opacità + leggero stagger delle voci).
- Elemento mantenuto montato durante la chiusura per animare anche l'uscita.

### 7. Accessibilità e robustezza
- Tutto passa da `gsap.matchMedia()`: con `prefers-reduced-motion: reduce` gli elementi
  sono subito visibili (nessuna traslazione/fade; barra piena), esperienza completa.
- **Anti-flash (FOUC):** elementi in reveal nascosti via classe CSS in `app/globals.css`,
  con fallback che li rende visibili se reduced-motion è attivo o se JS non parte.
- Hover invariati (CSS); allineare durate/easing ai valori condivisi solo dove serve.

## File toccati

| File | Modifica |
|------|----------|
| `package.json` | + `gsap`, `@gsap/react` |
| `components/lenis-provider.tsx` | integrazione Lenis ↔ GSAP ticker |
| `lib/animation.ts` | **nuovo** — costanti + register + matchMedia helper |
| `components/reveal.tsx` | **nuovo** — `<Reveal>` + `<Reveal.Group>` |
| `components/story-timeline.tsx` | **nuovo** — barra scrub "La Mia Storia" |
| `app/globals.css` | classi anti-flash per reveal |
| `app/chi-sono/page.tsx`, `app/page.tsx`, `app/servizi/page.tsx`, `components/features.tsx`, `components/testimonials.tsx`, e altre sezioni | wrap con `<Reveal>` / `<Reveal.Group>` |
| `components/navbar.tsx` | menu mobile animato |

## Criteri di successo

- Reveal + stagger discreti su tutte le sezioni principali, ritmo uniforme.
- Barra "La Mia Storia" cresce in scrub perfettamente sincronizzata, senza scatti,
  su desktop/tablet/mobile.
- Nessun flash di contenuto nascosto; nessun degrado di performance nel caricamento.
- Con `prefers-reduced-motion` le animazioni sono ridotte/disattivate e il contenuto
  resta pienamente fruibile.
- Codice modulare: config centralizzata, componenti riutilizzabili, cleanup al dismount.

## Fuori ambito

- Riscrittura degli hover in GSAP.
- Rifacimento di accordion FAQ e cookie banner.
- Animazioni sulle pagine legali.
