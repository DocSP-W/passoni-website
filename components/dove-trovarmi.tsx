import { MapPin, Clock, Phone, Mail, ExternalLink } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import MapEmbed from '@/components/map-embed'

const info = [
  {
    icon: <MapPin className="h-5 w-5" />,
    label: 'Indirizzo',
    lines: ['Via Collodi 8', '20900 Monza (MB)'],
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: 'Orari di apertura',
    lines: ['Lunedì – Sabato', 'Solo su appuntamento', 'Domenica: Chiuso'],
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: 'Telefono',
    lines: ['+39 339 250 1099'],
    href: 'tel:+393392501099',
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: 'Email',
    lines: ['doc@spnutrizione.it'],
    href: 'mailto:doc@spnutrizione.it',
  },
]

export default function DoveTrovarmi() {
  return (
    <section id="contatti" className="bg-white py-24 px-6 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: 'oklch(0.653 0.157 144)' }}>
              Dove trovarmi
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4 text-balance">
              Il mio studio a Monza
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-2xl mx-auto">
              Il mio studio si trova a Monza, facilmente raggiungibile con i mezzi pubblici e con possibilità di parcheggio nelle vicinanze.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

          {/* Info Cards */}
          <Reveal.Group as="div" className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {info.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl p-6 border border-[oklch(0.92_0.008_144)] bg-[oklch(0.975_0.012_144)]"
              >
                <div
                  className="h-10 w-10 rounded-xl flex items-center justify-center text-white mb-4"
                  style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  {item.label}
                </p>
                {item.lines.map((line, i) =>
                  item.href && i === 0 ? (
                    <a
                      key={line}
                      href={item.href}
                      className="block text-sm font-medium hover:underline leading-relaxed"
                      style={{ color: 'oklch(0.5 0.14 144)' }}
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={line} className="text-sm text-gray-700 leading-relaxed">
                      {line}
                    </p>
                  )
                )}
              </div>
            ))}
          </Reveal.Group>

          {/* Map embed (subordinato al consenso cookie) + button below */}
          <div className="flex flex-col gap-5 h-full">
            <MapEmbed />
            <a
              href="https://www.google.com/maps/search/Via+Collodi+8,+Monza"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
            >
              <ExternalLink className="h-4 w-4" />
              Apri in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
