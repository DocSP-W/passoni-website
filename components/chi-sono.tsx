import { ArrowRight, CheckCircle } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const values = [
  'Approccio scientifico e basato sulle evidenze',
  'Piani personalizzati sullo stile di vita di ogni persona',
  'No diete drastiche, sì abitudini sostenibili',
  'Educazione alimentare come strumento di libertà',
]

export default function ChiSono() {
  return (
    <section id="chi-sono" className="relative z-10 -mt-px bg-white py-24 px-6 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image side */}
          <Reveal>
            <div className="relative flex justify-center">
              {/* Green frame — tilted; the image lives inside it and can never overflow */}
              <div
                className="relative w-full max-w-[240px] sm:max-w-xs lg:max-w-md rounded-3xl p-3 -rotate-3"
                style={{ backgroundColor: 'oklch(0.94 0.04 144)' }}
              >
                <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl">
                  <img
                    src="/dott-passoni.png"
                    alt="Dott. Stefano Passoni — biologo nutrizionista"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text side */}
          <Reveal>
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'oklch(0.653 0.157 144)' }}>
                Chi sono
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6 text-balance">
                Dott. Stefano Passoni
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-5">
                Con oltre 4 anni di esperienza nel campo della nutrizione, ho aiutato diverse persone a migliorare il proprio rapporto con il cibo e raggiungere i loro obiettivi di salute e benessere.
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-8">
                La mia filosofia si basa su un approccio scientifico e personalizzato, costruito sulle esigenze individuali, sullo stile di vita e sulle preferenze alimentari di ogni persona. Non credo nelle diete drastiche o nelle soluzioni miracolose. Credo invece nell&apos;importanza dell&apos;educazione alimentare e nella costruzione di abitudini sane e sostenibili nel tempo.
              </p>


              <a
                href="/chi-sono"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
              >
                Leggi la mia storia completa
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
