import type { Metadata } from 'next'
import {
  ArrowRight,
  GraduationCap,
  Calendar,
  Star,
  FlaskConical,
  UserRoundCheck,
  BookOpen,
  Sprout,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import SmoothLink from '@/components/smooth-link'
import StoryTimeline from '@/components/story-timeline'
import { Reveal } from '@/components/reveal'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Chi Sono — Biologo Nutrizionista | Stefano Passoni',
  description:
    'Scopri la storia, la formazione e la filosofia del Dott. Stefano Passoni, biologo nutrizionista a Monza: un approccio scientifico, personalizzato e sostenibile.',
  path: '/chi-sono',
})

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const credentials = [
  'Laurea in Biologia Applicata alle Scienze della Nutrizione',
  'Master in Nutrizione Clinica'
]

const story = [
  'La mia passione per la nutrizione nasce durante gli ultimi anni del liceo, quando ho iniziato ad approfondire il legame tra alimentazione, salute, energia e benessere mentale.',
  'Dopo gli studi liceali ho scelto di intraprendere un percorso come personal trainer, approfondendo fin da subito la relazione tra alimentazione, composizione corporea e performance fisica.',
  'Successivamente ho conseguito la Laurea in Biologia Applicata alle Scienze della Nutrizione e, durante il tirocinio universitario presso l’IRCCS Ospedale San Raffaele, ho avuto modo di approfondire l’approccio nutrizionale alla gestione di condizioni complesse come obesità, diabete e patologie oncologiche.',
  'Ho poi completato un Master in Nutrizione Clinica, perfezionando le mie competenze nell’ambito della nutrizione clinica e della dietoterapia.',
  'Oggi, dopo oltre 4 anni di esperienza e numerosi pazienti seguiti, continuo il mio percorso di formazione per offrire strategie nutrizionali sempre aggiornate, basate sulle evidenze scientifiche e costruite sulle esigenze personali di ogni individuo.',
]

const education = [
  {
    title: 'Master in Nutrizione Clinica',
    institution: 'Tech University',
    year: '2023',
  },
  {
    title: 'Laurea Magistrale in Biologia Applicata alle Scienze della Nutrizione',
    institution: 'Università degli Studi di Milano',
    year: '2022',
  },
  {
    title: 'Laurea Triennale in Scienze Biologiche',
    institution: 'Università degli Studi di Milano - Bicocca',
    year: '2020',
  },
  {
    title: 'Diploma Personal Trainer',
    institution: 'Project Invictus',
    year: '2019',
  },
]

const philosophy = [
  {
    icon: <FlaskConical className="h-6 w-6 text-white" strokeWidth={2} />,
    title: 'Approccio Scientifico',
    description:
      'Ogni percorso nutrizionale nasce dall’analisi delle evidenze scientifiche più aggiornate per garantire strategie efficaci e sicure.',
  },
  {
    icon: <UserRoundCheck className="h-6 w-6 text-white" strokeWidth={2} />,
    title: 'Personalizzazione Totale',
    description:
      'Non esistono diete universali. Ogni piano viene costruito considerando obiettivi, esigenze, abitudini e stile di vita della persona.',
  },
  {
    icon: <BookOpen className="h-6 w-6 text-white" strokeWidth={2} />,
    title: 'Educazione Alimentare',
    description:
      'Il mio obiettivo non è semplicemente fornire una dieta, ma trasmettere conoscenze e strumenti per sviluppare autonomia e consapevolezza.',
  },
  {
    icon: <Sprout className="h-6 w-6 text-white" strokeWidth={2} />,
    title: 'Sostenibilità',
    description:
      'Creo strategie alimentari realistiche, integrate nella vita quotidiana e senza restrizioni estreme.',
  },
]

export default function ChiSonoPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ─────────────────────────  HERO  ───────────────────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
        aria-label="Chi sono — introduzione"
      >
        <div className="absolute inset-0 bg-black/5 pointer-events-none" aria-hidden="true" />
        {/* Subtle decorative circles, consistent with the CTA section */}
        <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-40 -left-24 h-64 w-64 rounded-full bg-white/5 pointer-events-none" aria-hidden="true" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-10 lg:px-16 pt-32 pb-24 md:pt-36 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Text side */}
            <Reveal.Group immediate as="div">
              <p className="mb-4 text-white/70 text-sm font-semibold tracking-widest uppercase">
                Chi sono
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-5 text-balance">
                Dietro ogni piano c’è una storia… la tua
              </h1>
              <p className="text-white/70 text-base md:text-lg italic mb-8">
                — Dott. Stefano Passoni
              </p>
              <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                Un percorso basato su studio, passione e ricerca scientifica per aiutarti a raggiungere i tuoi obiettivi di salute attraverso un approccio nutrizionale personalizzato.
              </p>

              {/* Credential pills */}
              <ul className="flex flex-wrap gap-2.5 mb-10">
                {credentials.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/25 bg-white/10 backdrop-blur-sm px-4 py-2 text-xs md:text-sm font-medium text-white/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/393392501099"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[oklch(0.5_0.14_144)] hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Scrivimi su WhatsApp
                </a>
                <SmoothLink
                  href="#la-mia-storia"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-all duration-200"
                >
                  La mia storia
                  <ArrowRight className="h-4 w-4" />
                </SmoothLink>
              </div>
            </Reveal.Group>

            {/* Image side — tilted green frame, matching the landing "Chi sono" section */}
            <div className="relative flex justify-center lg:justify-end">
              <Reveal immediate delay={0.2} className="relative w-full max-w-[240px] sm:max-w-xs lg:max-w-md rounded-3xl p-3 -rotate-3 bg-white/15 backdrop-blur-sm">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl">
                  <img
                    src="/dott-passoni.png"
                    alt="Dott. Stefano Passoni — biologo nutrizionista"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Diagonal clip at bottom, same as the landing hero */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
          aria-hidden="true"
        />
      </section>

      {/* ─────────────────────────  LA MIA STORIA  ───────────────────────── */}
      <section id="la-mia-storia" className="relative z-10 -mt-px bg-white py-24 px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'oklch(0.653 0.157 144)' }}>
                La mia storia
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4 text-balance">
                Un percorso di passione, studio e dedizione al benessere delle persone
              </h2>
            </div>
          </Reveal>

          <StoryTimeline paragraphs={story} />
        </div>
      </section>

      {/* ─────────────────────────  FORMAZIONE E TITOLI  ───────────────────────── */}
      <section className="py-24 px-6 md:px-10 lg:px-16" style={{ backgroundColor: 'oklch(0.975 0.012 144)' }}>
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'oklch(0.653 0.157 144)' }}>
                Formazione e Titoli
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight text-balance mb-4">
                Un percorso accademico di eccellenza
              </h2>
              <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
                Studio continuo e titoli mirati per garantire competenza e professionalità in ogni percorso nutrizionale.
              </p>
            </div>
          </Reveal>

          <Reveal.Group as="div" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((item) => (
              <article
                key={item.title}
                className="group rounded-2xl bg-white border border-[oklch(0.92_0.008_144)] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="h-11 w-11 flex-shrink-0 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
                    aria-hidden="true"
                  >
                    <GraduationCap className="h-6 w-6 text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 leading-snug mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{item.institution}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.96_0.035_144)] px-3 py-1 text-xs font-medium" style={{ color: 'oklch(0.5 0.14 144)' }}>
                        <Calendar className="h-3.5 w-3.5" />
                        {item.year}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.96_0.035_144)] px-3 py-1 text-xs font-medium" style={{ color: 'oklch(0.5 0.14 144)' }}>
                        <Star className="h-3.5 w-3.5 fill-current" />
                        Eccellente
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </Reveal.Group>
        </div>
      </section>

      {/* ─────────────────────────  LA MIA FILOSOFIA  ───────────────────────── */}
      <section className="bg-white py-24 px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'oklch(0.653 0.157 144)' }}>
                La mia filosofia
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4 text-balance">
                I principi che guidano il mio approccio
              </h2>
              <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
                I valori professionali su cui costruisco ogni percorso, insieme alla persona.
              </p>
            </div>
          </Reveal>

          <Reveal.Group as="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophy.map((item) => (
              <article
                key={item.title}
                className="group rounded-2xl bg-[oklch(0.975_0.012_144)] border border-[oklch(0.92_0.008_144)] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </Reveal.Group>
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
                  Inizia il tuo percorso oggi
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6 text-balance">
                  Ogni cambiamento parte da una scelta
                </h2>
                <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-4">
                  Contattami direttamente su WhatsApp per raccontarmi i tuoi obiettivi e ricevere una consulenza personalizzata.
                </p>
                <p className="text-white/65 text-base leading-relaxed max-w-xl mx-auto mb-12">
                  Rispondo personalmente a ogni messaggio.
                </p>

                <a
                  href="https://wa.me/393392501099"
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
