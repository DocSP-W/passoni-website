import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
      aria-label="Hero section"
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16 pt-32 pb-0 md:pt-36">
        <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-8">

          {/* Text Content */}
          <Reveal.Group immediate as="div" className="pb-16 md:pb-20">
            {/* Eyebrow */}
            <p className="mb-4 text-white/70 text-sm font-medium tracking-widest uppercase">
              Biologo Nutrizionista
            </p>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6 text-balance">
              Trasforma la tua vita con la nutrizione giusta
            </h1>

            {/* Description */}
            <p className="text-white/75 text-base md:text-lg leading-relaxed mb-10 max-w-md">
              Sono il Dott. Stefano Passoni, biologo nutrizionista. Ti aiuto a raggiungere i tuoi obiettivi di salute attraverso un approccio scientifico, personalizzato e sostenibile.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/393392501099"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[oklch(0.5_0.14_144)] hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Scrivimi su WhatsApp
              </a>
              <a
                href="#chi-sono"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all duration-200"
              >
                Scopri di più
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal.Group>

          {/* Hero Image */}
          <div className="flex justify-center md:justify-end items-end">
            <Reveal immediate delay={0.2} className="relative w-full max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl">
              <img
                src="/dott-passoni.png"
                alt="Dott. Stefano Passoni, biologo nutrizionista, in camice bianco"
                className="w-full object-contain object-bottom max-h-[580px] md:max-h-[680px] lg:max-h-[760px]"
              />
            </Reveal>
          </div>
        </div>
      </div>

      {/* Diagonal clip at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 bg-white"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
        aria-hidden="true"
      />
    </section>
  )
}
