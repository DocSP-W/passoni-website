import type { Metadata } from 'next'
import {
  ArrowRight,
  Check,
  Star,
  Clock,
  Stethoscope,
  Activity,
  Heart,
  Dumbbell,
  Video,
  Scale,
  Laptop,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import FaqAccordion from '@/components/faq-accordion'
import { Reveal } from '@/components/reveal'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Servizi di Nutrizione a Monza | Dott. Stefano Passoni',
  description:
    'Prima visita e controlli, benessere digestivo, dietoterapia e nutrizione sportiva: percorsi nutrizionali personalizzati a Monza e online, su base scientifica.',
  path: '/servizi',
})

const WA_LINK = 'https://wa.me/393392501099'
const REVIEWS_LINK = 'https://www.google.com/maps?cid=11536420464379775349'

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const mainServices = [
  {
    icon: <Stethoscope className="h-6 w-6 text-white" strokeWidth={2} />,
    title: 'Prima Visita Nutrizionale',
    duration: '60 minuti',
    tagline: 'Un percorso completo per iniziare il tuo cambiamento',
    description:
      'La prima visita rappresenta il punto di partenza per costruire un piano alimentare personalizzato e sostenibile, basato sulle tue caratteristiche e sui tuoi obiettivi.',
    includes: [
      'Anamnesi alimentare e farmacologica',
      'Analisi degli esami del sangue',
      'Valutazione della composizione corporea',
      'Misurazioni antropometriche',
      'Creazione del piano alimentare personalizzato',
      'Assistenza diretta tramite WhatsApp',
    ],
  },
  {
    icon: <Activity className="h-6 w-6 text-white" strokeWidth={2} />,
    title: 'Controllo Nutrizionale',
    duration: '30 minuti',
    tagline: 'Monitoraggio dei progressi e ottimizzazione del percorso',
    description:
      'Gli incontri di controllo permettono di valutare i risultati raggiunti e modificare il piano nutrizionale in base ai cambiamenti ottenuti.',
    includes: [
      'Valutazione della composizione corporea',
      'Misurazioni antropometriche',
      'Aggiornamento del piano alimentare',
      'Assistenza diretta tramite WhatsApp',
    ],
  },
]

const specializations = [
  {
    icon: <Heart className="h-6 w-6 text-white" strokeWidth={2} />,
    title: 'Benessere Digestivo e Intestinale',
    tagline: 'Ritrovare equilibrio e migliorare la digestione attraverso l’alimentazione',
    description:
      'Percorsi mirati per supportare la salute intestinale e migliorare il rapporto con il cibo attraverso strategie personalizzate.',
    includes: [
      'Analisi del profilo digestivo',
      'Strategie per reflusso, gonfiore, stitichezza e diarrea',
      'Integrazione mirata quando necessaria',
    ],
  },
  {
    icon: <Stethoscope className="h-6 w-6 text-white" strokeWidth={2} />,
    title: 'Dietoterapia',
    tagline: 'Supporto nutrizionale nella gestione di condizioni specifiche',
    description:
      'Percorsi alimentari personalizzati per supportare la gestione nutrizionale di problematiche metaboliche e cliniche.',
    includes: [
      'Collaborazione con il medico curante',
      'Monitoraggio dei parametri clinici',
      'Educazione alimentare specifica',
    ],
  },
  {
    icon: <Dumbbell className="h-6 w-6 text-white" strokeWidth={2} />,
    title: 'Nutrizione Sportiva',
    tagline: 'Alimentazione strategica per migliorare performance e risultati',
    description:
      'Un approccio nutrizionale studiato per sostenere l’attività fisica, migliorare il recupero e raggiungere i propri obiettivi senza estremismi.',
    includes: [
      'Piano di idratazione personalizzato',
      'Strategie nutrizionali pre e post allenamento',
      'Protocollo di integrazione quando necessario',
    ],
  },
]

const additionalServices = [
  {
    icon: <Video className="h-6 w-6 text-white" strokeWidth={2} />,
    title: 'Consulenze Online',
    description:
      'Percorsi nutrizionali personalizzati direttamente online, comodamente da casa tua.',
    list: null as string[] | null,
  },
  {
    icon: <Scale className="h-6 w-6 text-white" strokeWidth={2} />,
    title: 'Analisi della Composizione Corporea',
    description: 'Valutazione avanzata attraverso:',
    list: [
      'BIA (Bioimpedenziometria)',
      'Pliche cutanee',
      'Circonferenze corporee',
      'Diametri ossei',
      'ACC',
    ],
    footer: 'Per ottenere una visione completa della composizione corporea.',
  }
]

const reviews = [
  {
    quote:
      'Stefano è molto professionale e attento alle esigenze del cliente. Crea una dieta personalizzata tenendo conto anche delle preferenze alimentari, non da tutti. Perso 12 kg in 3 mesi senza nessun problema. Consigliatissimo.',
    name: 'Claudio B.',
    title: 'Una dieta fatta per me',
  },
  {
    quote:
      'Star bene con il tuo corpo, con il tuo stile di vita, essere felice quando ti guardi allo specchio... era quello che volevo! Senza stress e senza proibizioni alimentari drastiche, vivermi i week end e cene conviviali con la mia famiglia! Grazie al Dott. Stefano.',
    name: 'Jessica L.',
    title: 'Benessere e libertà alimentare',
  },
  {
    quote:
      'Stefano è molto professionale e soprattutto preparato. Mi segue da circa 3 mesi ormai e grazie a lui sono riuscito ad ottenere dei buoni risultati per l’incremento di massa muscolare e peso.',
    name: 'Shiran N.',
    title: 'Aumento massa muscolare',
  },
]

const faqs = [
  {
    question: 'Quanto dura una consulenza?',
    answer: (
      <p>
        La prima consulenza dura circa 60 minuti e permette di conoscersi, analizzare la situazione
        iniziale e creare un piano personalizzato. I controlli successivi durano circa 30 minuti.
      </p>
    ),
  },
  {
    question: 'I piani alimentari sono personalizzati?',
    answer: (
      <div>
        <p className="mb-3">Assolutamente sì. Ogni piano viene creato su misura considerando:</p>
        <ul className="flex flex-col gap-1.5">
          {['Preferenze alimentari', 'Intolleranze', 'Stile di vita', 'Obiettivi personali'].map(
            (item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
                  aria-hidden="true"
                />
                {item}
              </li>
            ),
          )}
        </ul>
      </div>
    ),
  },
  {
    question: 'Offri supporto tra le consulenze?',
    answer: (
      <p>
        Sì. Durante il percorso è disponibile un supporto tramite WhatsApp per eventuali dubbi o
        domande. Dopo la prima consulenza viene inoltre incluso un follow-up telefonico gratuito.
      </p>
    ),
  },
  {
    question: 'Cosa devo portare alla prima visita?',
    answer: (
      <div>
        <p className="mb-3">È consigliato portare:</p>
        <ul className="flex flex-col gap-1.5">
          {[
            'Un diario alimentare di 3-4 giorni (facoltativo)',
            'Gli esami del sangue degli ultimi 3 mesi (fortemente consigliato)',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span
                className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    question: 'Quanto dura il percorso nutrizionale?',
    answer: (
      <p>
        La durata è completamente personalizzata e dipende dai tuoi obiettivi, dalle tue esigenze e
        dai risultati che vuoi raggiungere.
      </p>
    ),
  },
  {
    question: 'Sono previsti pacchetti di consulenze?',
    answer: (
      <p>No. Ogni percorso viene costruito individualmente senza pacchetti standardizzati.</p>
    ),
  },
  {
    question: 'I controlli sono programmati ogni mese?',
    answer: (
      <p>
        Non necessariamente. La frequenza degli incontri viene stabilita insieme in base alle tue
        necessità e all’evoluzione del percorso.
      </p>
    ),
  },
]

export default function ServiziPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ─────────────────────────  HERO  ───────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
        aria-label="Servizi nutrizionali — introduzione"
      >
        <div className="absolute inset-0 bg-black/5 pointer-events-none" aria-hidden="true" />
        <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-40 -left-24 h-64 w-64 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />

        <Reveal.Group
          immediate
          as="div"
          className="relative mx-auto max-w-3xl px-6 md:px-10 lg:px-16 pt-36 pb-24 md:pt-40 md:pb-28 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-5 text-balance">
            Servizi Nutrizionali
          </h1>
          <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 text-balance">
            Soluzioni personalizzate per ogni esigenza nutrizionale
          </p>
          <p className="text-white/75 text-base md:text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
            Dalla consulenza individuale alla nutrizione sportiva, ti accompagno con un approccio
            scientifico, personalizzato e basato su risultati concreti.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[oklch(0.5_0.14_144)] hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Scrivimi su WhatsApp
            </a>
            <a
              href={REVIEWS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all duration-200"
            >
              Leggi Recensioni
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal.Group>

        {/* Diagonal clip at bottom, same as the landing hero */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
          aria-hidden="true"
        />
      </section>

      {/* ─────────────────────────  SERVIZI PRINCIPALI  ───────────────────────── */}
      <section className="relative z-10 -mt-px bg-white py-24 px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'oklch(0.653 0.157 144)' }}>
                Servizi Principali
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight text-balance mb-4">
                Percorsi studiati per offrirti il massimo valore e risultati misurabili
              </h2>
              <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
                Ogni servizio viene personalizzato in base alla tua situazione, ai tuoi obiettivi e
                alle tue necessità nutrizionali.
              </p>
            </div>
          </Reveal>

          <Reveal.Group as="div" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainServices.map((service) => (
              <article
                key={service.title}
                className="group flex flex-col rounded-2xl bg-[oklch(0.975_0.012_144)] border border-[oklch(0.92_0.008_144)] p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div
                    className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
                    aria-hidden="true"
                  >
                    {service.icon}
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.96_0.035_144)] px-3 py-1.5 text-xs font-semibold"
                    style={{ color: 'oklch(0.5 0.14 144)' }}
                  >
                    <Clock className="h-3.5 w-3.5" />
                    {service.duration}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1.5 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm font-medium mb-4" style={{ color: 'oklch(0.653 0.157 144)' }}>
                  {service.tagline}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {service.description}
                </p>

                <p className="text-xs font-semibold tracking-wide uppercase text-gray-400 mb-3">
                  Cosa include
                </p>
                <ul className="flex flex-col gap-2.5 mb-8">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span
                        className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: 'oklch(0.96 0.035 144)' }}
                        aria-hidden="true"
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={3} style={{ color: 'oklch(0.653 0.157 144)' }} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Scrivimi per saperne di più
                </a>
              </article>
            ))}
          </Reveal.Group>
        </div>
      </section>

      {/* ─────────────────────────  AREE DI SPECIALIZZAZIONE  ───────────────────────── */}
      <section className="py-24 px-6 md:px-10 lg:px-16" style={{ backgroundColor: 'oklch(0.975 0.012 144)' }}>
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'oklch(0.653 0.157 144)' }}>
                Aree di Specializzazione
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight text-balance mb-4">
                In particolare mi occupo di...
              </h2>
              <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
                Percorsi specifici e personalizzati per diverse esigenze nutrizionali.
              </p>
            </div>
          </Reveal>

          <Reveal.Group as="div" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specializations.map((service) => (
              <article
                key={service.title}
                className="group flex flex-col rounded-2xl bg-white border border-[oklch(0.92_0.008_144)] p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
                  aria-hidden="true"
                >
                  {service.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm font-medium mb-4" style={{ color: 'oklch(0.653 0.157 144)' }}>
                  {service.tagline}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  {service.description}
                </p>

                <p className="text-xs font-semibold tracking-wide uppercase text-gray-400 mb-3">
                  Cosa include
                </p>
                <ul className="flex flex-col gap-2.5 mb-8">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <span
                        className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: 'oklch(0.96 0.035 144)' }}
                        aria-hidden="true"
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={3} style={{ color: 'oklch(0.653 0.157 144)' }} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: 'oklch(0.5 0.14 144)' }}
                >
                  Scrivimi per saperne di più
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </Reveal.Group>
        </div>
      </section>

      {/* ─────────────────────────  SERVIZI AGGIUNTIVI  ───────────────────────── */}
      <section className="bg-white py-24 px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'oklch(0.653 0.157 144)' }}>
                Servizi Aggiuntivi
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4 text-balance">
                Completa il tuo percorso nutrizionale
              </h2>
              <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
                Strumenti di supporto avanzati per ottenere una visione completa e seguirti ovunque tu
                sia.
              </p>
            </div>
          </Reveal>

          <Reveal.Group as="div" className="mx-auto max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {additionalServices.map((service) => (
              <article
                key={service.title}
                className="group rounded-2xl bg-[oklch(0.975_0.012_144)] border border-[oklch(0.92_0.008_144)] p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
                  aria-hidden="true"
                >
                  {service.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {service.description}
                </p>

                {service.list && (
                  <ul className="mt-4 flex flex-col gap-1.5">
                    {service.list.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                        <span
                          className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {'footer' in service && service.footer && (
                  <p className="mt-4 text-sm text-gray-500 leading-relaxed">{service.footer}</p>
                )}
              </article>
            ))}
          </Reveal.Group>
        </div>
      </section>

      {/* ─────────────────────────  RECENSIONI  ───────────────────────── */}
      <section
        id="recensioni"
        className="py-24 px-6 md:px-10 lg:px-16"
        style={{ backgroundColor: 'oklch(0.975 0.012 144)' }}
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center mb-5">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'oklch(0.653 0.157 144)' }}>
                Recensioni
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight text-balance mb-4">
                Cosa dicono i miei pazienti
              </h2>
            </div>
            <p className="text-center text-gray-500 text-base leading-relaxed mb-16 max-w-2xl mx-auto">
              Scopri le esperienze di chi ha scelto un percorso nutrizionale personalizzato e
              sostenibile.
            </p>
          </Reveal>

          <Reveal.Group as="div" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <article
                key={review.name}
                className="group rounded-2xl bg-white border border-[oklch(0.92_0.008_144)] p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
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

                <h3 className="text-base font-semibold text-gray-900 mb-3 leading-snug">
                  &ldquo;{review.title}&rdquo;
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  &ldquo;{review.quote}&rdquo;
                </p>

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
                href={REVIEWS_LINK}
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

      {/* ─────────────────────────  FAQ  ───────────────────────── */}
      <section className="bg-white py-24 px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'oklch(0.653 0.157 144)' }}>
                FAQ
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4 text-balance">
                Domande Frequenti
              </h2>
              <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
                Le risposte alle domande più comuni sul percorso nutrizionale.
              </p>
            </div>
          </Reveal>

          <FaqAccordion items={faqs} />
        </div>
      </section>

      {/* ──────────  CTA FINALE — bolla verde sopra il footer  ────────── */}
      <section className="bg-white px-6 md:px-10 lg:px-16 py-24" aria-label="Inizia il tuo percorso">
        <div className="mx-auto max-w-5xl">
          <div
            className="relative overflow-hidden rounded-[2.5rem] px-6 py-16 md:px-16 md:py-20 text-center shadow-2xl"
            style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
          >
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />

            <Reveal>
              <div className="relative mx-auto max-w-3xl">
                <p className="text-white/60 text-sm font-medium tracking-widest uppercase mb-6">
                  Inizia oggi
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6 text-balance">
                  Inizia oggi il tuo percorso nutrizionale
                </h2>
                <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
                  Un approccio scientifico, personalizzato e sostenibile per raggiungere i tuoi
                  obiettivi.
                </p>

                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold transition-all duration-200 hover:bg-white/90 hover:shadow-2xl hover:-translate-y-0.5 shadow-lg"
                  style={{ color: 'oklch(0.5 0.14 144)' }}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Scrivimi su WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
