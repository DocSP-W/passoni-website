// Plain (non-'use client') barrel module.
//
// The actual client components live in `reveal-impl.tsx`. We compose the
// `Reveal.Group` compound-component shape here, OUTSIDE the client boundary,
// because assigning `Reveal.Group = Group` inside a 'use client' file never
// survives into the server-compiled reference used by Server Components:
// Next replaces that file's contents with stub references per named export,
// discarding any runtime property assignment. Doing the composition in this
// plain module means the assignment runs for real in both environments.
import { Reveal as RevealImpl, Group } from './reveal-impl'

type RevealComponent = typeof RevealImpl & { Group: typeof Group }

const Reveal = RevealImpl as RevealComponent
Reveal.Group = Group

export { Reveal }
