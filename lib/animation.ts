import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrazione idempotente, solo lato client.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Unica fonte di verità per il ritmo delle animazioni del sito.
export const EASE = 'power2.out'
export const DUR = 0.45
export const Y = 18
export const STAGGER = 0.05
// Parte prima: l'elemento è già in movimento quando entra bene nel viewport.
export const REVEAL_START = 'top 95%'

// Hero: animazione al caricamento (nessuno scroll trigger, è above the fold).
export const HERO_DUR = 0.6
export const HERO_Y = 20
export const HERO_STAGGER = 0.07
export const HERO_DELAY = 0.05

export { gsap, ScrollTrigger }
