import { ArrowLeft, AlertTriangle, Info, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

/* ────────────────────────────────────────────────────────────
   Content model — le pagine legali sono descritte come dati e
   renderizzate da questo componente, così restano coerenti tra loro.
   ──────────────────────────────────────────────────────────── */

export type ContactItem = { icon?: 'mail' | 'phone' | 'map'; label?: string; value: string; href?: string }

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'lead'; text: string }
  | { kind: 'subheading'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'deflist'; items: { term: string; desc: string }[] }
  | {
      kind: 'cards'
      cols?: 2 | 3
      items: { title: string; desc?: string; meta?: string[]; note?: { title?: string; text: string } }[]
    }
  | { kind: 'callout'; variant?: 'info' | 'warning'; title?: string; text: string }
  | { kind: 'contact'; items: ContactItem[] }
  | { kind: 'links'; items: { title: string; desc: string; label: string; href: string }[] }

export type Section = { n: string; title: string; blocks: Block[] }

export type LegalPageProps = {
  eyebrow: string
  title: string
  subtitle: string
  lastUpdate: string
  sections: Section[]
  /** Nota conclusiva mostrata in un riquadro sotto le sezioni. */
  footNote?: string
}

const GREEN = 'oklch(0.653 0.157 144)'
const GREEN_DARK = 'oklch(0.5 0.14 144)'
const CARD_BORDER = 'oklch(0.92 0.008 144)'

const contactIcon = (icon?: ContactItem['icon']) => {
  const cls = 'h-4 w-4 flex-shrink-0'
  if (icon === 'mail') return <Mail className={cls} style={{ color: GREEN }} />
  if (icon === 'phone') return <Phone className={cls} style={{ color: GREEN }} />
  if (icon === 'map') return <MapPin className={cls} style={{ color: GREEN }} />
  return null
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'lead':
      return <p className="text-gray-600 text-base md:text-lg leading-relaxed">{block.text}</p>

    case 'p':
      return <p className="text-gray-600 text-[0.95rem] md:text-base leading-relaxed">{block.text}</p>

    case 'subheading':
      return (
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mt-2 leading-snug">{block.text}</h3>
      )

    case 'list':
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-600 text-[0.95rem] md:text-base leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ backgroundColor: GREEN }} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'deflist':
      return (
        <ul className="flex flex-col gap-3.5">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="rounded-xl border bg-[oklch(0.985_0.008_144)] px-4 py-3.5"
              style={{ borderColor: CARD_BORDER }}
            >
              <p className="text-[0.95rem] md:text-base leading-relaxed text-gray-600">
                <span className="font-semibold text-gray-900">{item.term}: </span>
                {item.desc}
              </p>
            </li>
          ))}
        </ul>
      )

    case 'cards':
      return (
        <div className={`grid grid-cols-1 gap-4 ${block.cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {block.items.map((card, i) => (
            <article
              key={i}
              className="rounded-2xl border bg-white p-5 h-full"
              style={{ borderColor: CARD_BORDER }}
            >
              <div className="mb-2 flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: GREEN }} aria-hidden="true" />
                <h3 className="text-[0.95rem] md:text-base font-semibold text-gray-900">{card.title}</h3>
              </div>
              {card.desc && <p className="text-sm md:text-[0.95rem] text-gray-600 leading-relaxed">{card.desc}</p>}
              {card.meta && (
                <ul className="mt-3 flex flex-col gap-1.5">
                  {card.meta.map((m, j) => (
                    <li key={j} className="text-sm text-gray-500 leading-relaxed">
                      {m}
                    </li>
                  ))}
                </ul>
              )}
              {card.note && (
                <div
                  className="mt-3 rounded-lg px-3 py-2 text-xs md:text-sm leading-relaxed"
                  style={{ backgroundColor: 'oklch(0.96 0.035 144)', color: GREEN_DARK }}
                >
                  {card.note.title && <span className="font-semibold">{card.note.title} </span>}
                  {card.note.text}
                </div>
              )}
            </article>
          ))}
        </div>
      )

    case 'callout': {
      const warning = block.variant === 'warning'
      const Icon = warning ? AlertTriangle : Info
      return (
        <div
          className="flex items-start gap-3 rounded-xl border-l-4 px-4 py-4"
          style={
            warning
              ? { backgroundColor: 'oklch(0.97 0.03 85)', borderColor: 'oklch(0.72 0.14 70)' }
              : { backgroundColor: 'oklch(0.96 0.035 144)', borderColor: GREEN }
          }
        >
          <Icon
            className="mt-0.5 h-5 w-5 flex-shrink-0"
            style={{ color: warning ? 'oklch(0.55 0.14 65)' : GREEN_DARK }}
            aria-hidden="true"
          />
          <p className="text-[0.95rem] leading-relaxed text-gray-700">
            {block.title && (
              <span className="font-semibold" style={{ color: warning ? 'oklch(0.45 0.13 60)' : GREEN_DARK }}>
                {block.title}{' '}
              </span>
            )}
            {block.text}
          </p>
        </div>
      )
    }

    case 'contact':
      return (
        <div className="rounded-2xl border bg-[oklch(0.985_0.008_144)] p-5 md:p-6" style={{ borderColor: CARD_BORDER }}>
          <ul className="flex flex-col gap-2.5">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[0.95rem] leading-relaxed">
                {contactIcon(item.icon)}
                <span className="text-gray-700">
                  {item.label && <span className="font-medium text-gray-900">{item.label}: </span>}
                  {item.href ? (
                    <a href={item.href} className="hover:underline" style={{ color: GREEN_DARK }}>
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'links':
      return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {block.items.map((item, i) => (
            <article key={i} className="flex flex-col rounded-2xl border bg-white p-5" style={{ borderColor: CARD_BORDER }}>
              <h3 className="text-[0.95rem] font-semibold text-gray-900 mb-1.5">{item.title}</h3>
              <p className="flex-1 text-sm text-gray-600 leading-relaxed mb-3">{item.desc}</p>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                style={{ color: GREEN_DARK }}
              >
                {item.label}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      )
  }
}

export default function LegalPage({ eyebrow, title, subtitle, lastUpdate, sections, footNote }: LegalPageProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />

      {/* ─────────────  HERO  ───────────── */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: GREEN }} aria-label={`${title} — intestazione`}>
        <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-40 -left-24 h-64 w-64 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />

        <div className="relative mx-auto max-w-4xl px-6 md:px-10 lg:px-16 pt-28 pb-24 md:pt-32 md:pb-28">
          <a
            href="/#home"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alla Home
          </a>
          <p className="mb-4 text-white/70 text-sm font-semibold tracking-widest uppercase">{eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-5 text-balance">
            {title}
          </h1>
          <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl">{subtitle}</p>
          <p className="mt-6 inline-flex items-center rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm text-white/80">
            Ultimo aggiornamento: {lastUpdate}
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
          aria-hidden="true"
        />
      </section>

      {/* ─────────────  CONTENUTO  ───────────── */}
      <section className="px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-10 lg:gap-14">

          {/* Indice — sticky su desktop */}
          <nav className="hidden lg:block" aria-label="Indice della pagina">
            <div className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Indice</p>
              <ul className="flex flex-col gap-2 border-l" style={{ borderColor: CARD_BORDER }}>
                {sections.map((s) => (
                  <li key={s.n}>
                    <a
                      href={`#sez-${s.n}`}
                      className="block -ml-px border-l-2 border-transparent pl-4 py-0.5 text-sm text-gray-500 hover:text-gray-900 hover:border-[oklch(0.653_0.157_144)] transition-colors"
                    >
                      <span className="text-gray-400">{s.n}.</span> {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Sezioni */}
          <div className="flex flex-col gap-12 md:gap-14 min-w-0">
            {sections.map((s) => (
              <section key={s.n} id={`sez-${s.n}`} className="scroll-mt-24">
                <div className="flex items-baseline gap-3 mb-5">
                  <span
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{ backgroundColor: GREEN }}
                    aria-hidden="true"
                  >
                    {s.n}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight leading-tight">
                    {s.title}
                  </h2>
                </div>
                <div className="flex flex-col gap-4">
                  {s.blocks.map((block, i) => (
                    <BlockView key={i} block={block} />
                  ))}
                </div>
              </section>
            ))}

            {footNote && (
              <p className="rounded-2xl border bg-[oklch(0.985_0.008_144)] px-5 py-4 text-sm text-gray-500 leading-relaxed" style={{ borderColor: CARD_BORDER }}>
                {footNote}
              </p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
