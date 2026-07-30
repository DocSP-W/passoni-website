import { ArrowRight, Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const reviews = [
  {
    quote: 'Stefano è molto professionale e attento alle esigenze del cliente. Crea una dieta personalizzata tenendo conto anche delle preferenze alimentari, non da tutti. Perso 12 kg in 3 mesi senza nessun problema. Consigliatissimo.',
    name: 'Claudio B.',
    title: 'Una dieta fatta per me',
  },
  {
    quote: 'Star bene con il tuo corpo, con il tuo stile di vita, essere felice quando ti guardi allo specchio... era quello che volevo! Senza stress e senza proibizioni alimentari drastiche, vivermi i week end e cene conviviali con la mia famiglia! Grazie al Dott. Stefano.',
    name: 'Jessica L.',
    title: 'Benessere e libertà alimentare',
  },
  {
    quote: 'Stefano è molto professionale e soprattutto preparato. Mi segue da circa 3 mesi ormai e grazie a lui sono riuscito ad ottenere dei buoni risultati per l\'incremento di massa muscolare e peso.',
    name: 'Shiran N.',
    title: 'Aumento massa muscolare',
  },
]

export default function Testimonials() {
  return (
    <section id="recensioni" className="bg-[oklch(0.975_0.012_144)] py-24 px-6 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <Reveal>
          <div className="text-center mb-5">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'oklch(0.653 0.157 144)' }}>
              Recensioni
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight text-balance mb-4">
              Cosa dicono di me
            </h2>
          </div>
          <p className="text-center text-gray-500 text-base leading-relaxed mb-16 max-w-2xl mx-auto">
            Scopri le esperienze di chi ha intrapreso un percorso nutrizionale personalizzato e sostenibile.
          </p>
        </Reveal>

        {/* Reviews Grid */}
        <Reveal.Group as="div" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="group rounded-2xl bg-white border border-[oklch(0.92_0.008_144)] p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4" aria-label="5 stelle">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-current"
                    style={{ color: 'oklch(0.78 0.17 80)' }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-3 leading-snug">
                &ldquo;{review.title}&rdquo;
              </h3>

              {/* Quote */}
              <p className="text-sm text-gray-500 leading-relaxed mb-6">
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div
                  className="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
                  aria-hidden="true"
                >
                  {review.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-gray-800">{review.name}</span>
              </div>
            </article>
          ))}
        </Reveal.Group>

        {/* CTA */}
        <Reveal>
          <div className="mt-12 flex justify-center">
            <a
              href="https://www.google.com/maps?cid=11536420464379775349"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 px-7 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{ borderColor: 'oklch(0.653 0.157 144)', color: 'oklch(0.5 0.14 144)' }}
            >
              Leggi tutte le recensioni
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
