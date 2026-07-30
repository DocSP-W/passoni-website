import { ArrowRight, Heart, Stethoscope, Dumbbell } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const services = [
  {
    icon: <Heart className="h-6 w-6 text-white" strokeWidth={2} />,
    title: 'Benessere Digestivo e Intestinale',
    description:
      'Percorsi personalizzati per migliorare la salute dell\'apparato digerente attraverso l\'analisi delle abitudini alimentari e strategie mirate.',
    includes: [
      'Analisi del profilo digestivo',
      'Strategie per ridurre reflusso, gonfiore, stitichezza e diarrea',
      'Integrazione mirata (quando necessaria)',
    ],
  },
  {
    icon: <Stethoscope className="h-6 w-6 text-white" strokeWidth={2} />,
    title: 'Dietoterapia',
    description:
      'Supporto nutrizionale specifico per la gestione di condizioni metaboliche, gastrointestinali e ormonali.',
    includes: [
      'Collaborazione con il medico curante',
      'Monitoraggio dei parametri clinici',
      'Educazione alimentare personalizzata',
    ],
  },
  {
    icon: <Dumbbell className="h-6 w-6 text-white" strokeWidth={2} />,
    title: 'Nutrizione Sportiva',
    description:
      'Un\'alimentazione studiata per sostenere la performance sportiva, migliorare i risultati e raggiungere i propri obiettivi senza rigidità o estremismi.',
    includes: [
      'Piano di idratazione personalizzato',
      'Strategie nutrizionali pre e post allenamento',
      'Protocollo di integrazione (quando necessario)',
    ],
  },
]

export default function Features() {
  return (
    <section id="servizi" className="bg-white py-24 px-6 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'oklch(0.653 0.157 144)' }}>
              I miei servizi
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight text-balance mb-4">
              Percorsi nutrizionali
              <br />
              su misura per te
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
              Offro percorsi nutrizionali completi e personalizzati per accompagnarti verso i tuoi obiettivi, dal miglioramento del benessere generale fino alla gestione di specifiche condizioni patologiche.
            </p>
          </div>
        </Reveal>

        {/* Cards Grid */}
        <Reveal.Group as="div" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-2xl bg-[oklch(0.975_0.012_144)] border border-[oklch(0.92_0.008_144)] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Content */}
              <div className="p-6">
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
                  aria-hidden="true"
                >
                  {service.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-500">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'oklch(0.653 0.157 144)' }} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </Reveal.Group>

        {/* CTA Button */}
        <Reveal>
          <div className="mt-12 flex justify-center">
            <a
              href="https://wa.me/393392501099"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
            >
              Scopri tutti i servizi
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
