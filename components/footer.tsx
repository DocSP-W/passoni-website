import Image from 'next/image'
import { cn } from '@/lib/utils'

const footerLinks = {
  Menu: ['Home', 'Chi Sono', 'Servizi', 'Recensioni', 'Contatti'],
  Servizi: ['Consulenze Nutrizionali', 'Nutrizione Sportiva', 'Dietoterapia', 'Benessere Digestivo e Intestinale'],
  Contatti: ['+39 339 250 1099', 'doc@spnutrizione.it', 'Via Collodi 8, Monza'],
}

const menuHrefs: Record<string, string> = {
  'Home': '/#home',
  'Chi Sono': '/chi-sono',
  'Servizi': '/servizi',
  'Recensioni': '/#recensioni',
  'Contatti': '/#contatti',
}

const contattiHrefs: Record<string, string> = {
  '+39 339 250 1099': 'tel:+393392501099',
  'doc@spnutrizione.it': 'mailto:doc@spnutrizione.it',
  'Via Collodi 8, Monza': 'https://www.google.com/maps/search/Via+Collodi+8,+Monza',
}

export default function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn('text-white py-16 px-6 md:px-10 lg:px-16', className)}
      style={{ backgroundColor: 'oklch(0.653 0.157 144)' }}
      aria-label="Footer sito"
    >
      <div className="mx-auto max-w-7xl">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="/#home" className="flex items-center gap-2 mb-2 group">
              <Image
                src="/logo%20white%20trans.png"
                alt="Logo Dott. Stefano Passoni"
                width={454}
                height={549}
                className="h-14 w-auto transition-opacity group-hover:opacity-80"
              />
              <div>
                <p className="text-white font-bold text-base tracking-tight leading-tight">Dott. Stefano Passoni</p>
                <p className="text-white/60 text-xs">Biologo Nutrizionista</p>
              </div>
            </a>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs mt-4 italic">
              &ldquo;Mangiare bene per vivere meglio&rdquo;
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">
              Menu
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.Menu.map((link) => (
                <li key={link}>
                  <a
                    href={menuHrefs[link] ?? '#'}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Servizi */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">
              Servizi
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.Servizi.map((link) => (
                <li key={link}>
                  <a href="/servizi" className="text-white/60 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">
              Contatti
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.Contatti.map((item) => (
                <li key={item}>
                  <a
                    href={contattiHrefs[item] ?? '#'}
                    target={item.startsWith('Via') ? '_blank' : undefined}
                    rel={item.startsWith('Via') ? 'noopener noreferrer' : undefined}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/15 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
          <p className="text-white/40 text-sm">
            © 2026 Dott. Stefano Passoni. Tutti i diritti riservati.
          </p>
          <p className="text-white/40 text-sm">
            P.IVA IT12896870966
          </p>
          <div className="flex items-center gap-4">
            {([
              ['Privacy Policy', '/privacy-policy'],
              ['Termini di Servizio', '/termini-di-servizio'],
              ['Cookie Policy', '/cookie-policy'],
              ['Impostazioni Cookie', '/impostazioni-cookie'],
            ] as const).map(([item, href]) => (
              <a key={item} href={href} className="text-white/40 hover:text-white/70 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
