import type { Metadata } from 'next'
import LegalPage, { type Section } from '@/components/legal-page'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy | Dott. Stefano Passoni',
  description:
    'Informativa sul trattamento dei dati personali degli utenti del sito del Dott. Stefano Passoni, ai sensi del Regolamento UE 2016/679 (GDPR).',
  path: '/privacy-policy',
  noindex: true,
})

const sections: Section[] = [
  {
    n: '1',
    title: 'Titolare del Trattamento',
    blocks: [
      {
        kind: 'contact',
        items: [
          { value: 'Dr. Stefano Passoni' },
          { value: 'Biologo Nutrizionista' },
          { label: 'P.IVA', value: 'IT12896870966' },
          { icon: 'map', value: 'Via Collodi 8, 20900 Monza (MB)' },
          { icon: 'mail', value: 'doc@spnutrizione.it', href: 'mailto:doc@spnutrizione.it' },
          { icon: 'phone', value: '+39 339 250 1099', href: 'tel:+393392501099' },
        ],
      },
    ],
  },
  {
    n: '2',
    title: 'Tipologie di Dati Raccolti',
    blocks: [
      {
        kind: 'cards',
        items: [
          {
            title: 'Dati di Contatto',
            desc: 'Nome, cognome, indirizzo email, numero di telefono, indirizzo di residenza.',
          },
          {
            title: 'Dati Sanitari',
            desc: 'Informazioni sulla salute, abitudini alimentari, allergie, intolleranze, patologie, esami clinici, composizione corporea.',
          },
          {
            title: 'Dati di Navigazione',
            desc: 'Indirizzo IP, tipo di browser, sistema operativo, pagine visitate, durata della visita.',
          },
          {
            title: 'Cookie e Tecnologie Simili',
            desc: "Cookie tecnici, di preferenza e di analisi per migliorare l'esperienza di navigazione.",
          },
        ],
      },
    ],
  },
  {
    n: '3',
    title: 'Finalità del Trattamento',
    blocks: [
      {
        kind: 'deflist',
        items: [
          {
            term: 'Prestazione di servizi nutrizionali',
            desc: 'Consulenze, elaborazione piani alimentari, monitoraggio del percorso nutrizionale.',
          },
          {
            term: 'Comunicazione',
            desc: 'Risposta a richieste di informazioni, invio di materiale informativo, supporto clienti.',
          },
          {
            term: 'Adempimenti legali',
            desc: 'Conservazione documentazione sanitaria, fatturazione, adempimenti fiscali.',
          },
          {
            term: 'Marketing',
            desc: 'Invio di newsletter, offerte personalizzate, comunicazioni promozionali (solo con consenso).',
          },
          {
            term: 'Miglioramento servizi',
            desc: 'Analisi statistiche, ottimizzazione del sito web e dei servizi offerti.',
          },
        ],
      },
    ],
  },
  {
    n: '4',
    title: 'Base Giuridica del Trattamento',
    blocks: [
      {
        kind: 'list',
        items: [
          "Consenso dell'interessato per dati sanitari e attività di marketing",
          'Esecuzione di un contratto per la prestazione di servizi nutrizionali',
          'Interesse legittimo per attività di comunicazione e miglioramento servizi',
          'Obbligo legale per adempimenti fiscali e conservazione documentazione',
        ],
      },
    ],
  },
  {
    n: '5',
    title: 'Modalità di Trattamento',
    blocks: [
      {
        kind: 'p',
        text: 'I dati personali sono trattati con strumenti automatizzati e/o manuali, nel rispetto delle misure di sicurezza tecniche e organizzative adeguate a garantire un livello di sicurezza adeguato al rischio.',
      },
      {
        kind: 'list',
        items: [
          'Crittografia dei dati sensibili',
          'Accesso limitato solo al personale autorizzato',
          'Backup regolari e sicuri',
          'Aggiornamenti di sicurezza costanti',
          'Formazione del personale sulla privacy',
        ],
      },
    ],
  },
  {
    n: '6',
    title: 'Destinatari dei Dati',
    blocks: [
      { kind: 'p', text: 'I dati personali possono essere comunicati alle seguenti categorie di soggetti:' },
      {
        kind: 'list',
        items: [
          'Fornitori di servizi IT e hosting (con garanzie contrattuali adeguate)',
          'Commercialista per adempimenti fiscali',
          'Autorità competenti per adempimenti legali',
          'Altri professionisti sanitari (solo con consenso e per finalità di cura)',
        ],
      },
    ],
  },
  {
    n: '7',
    title: 'Trasferimento Dati Estero',
    blocks: [
      {
        kind: 'p',
        text: "I dati non sono trasferiti verso paesi terzi al di fuori dell'Unione Europea, salvo i casi necessari per il funzionamento di servizi specifici. L'unico servizio di questo tipo è Google Maps, utilizzato per mostrare la mappa dello studio e caricato soltanto previo tuo consenso; il trasferimento avviene nel rispetto delle garanzie previste dal GDPR.",
      },
    ],
  },
  {
    n: '8',
    title: 'Periodo di Conservazione',
    blocks: [
      {
        kind: 'deflist',
        items: [
          { term: 'Dati sanitari', desc: '10 anni dalla conclusione del rapporto (obbligo deontologico)' },
          { term: 'Dati contrattuali', desc: '10 anni per adempimenti fiscali' },
          { term: 'Dati marketing', desc: 'Fino a revoca del consenso o cessazione attività' },
          { term: 'Cookie tecnici', desc: 'Durata della sessione o secondo le impostazioni del browser' },
        ],
      },
    ],
  },
  {
    n: '9',
    title: "Diritti dell'Interessato",
    blocks: [
      { kind: 'p', text: 'In qualità di interessato, hai il diritto di:' },
      {
        kind: 'list',
        items: [
          'Accesso ai dati',
          'Rettifica dei dati',
          'Cancellazione dei dati',
          'Limitazione del trattamento',
          'Portabilità dei dati',
          'Opposizione al trattamento',
          'Revoca del consenso',
          'Reclamo al Garante',
        ],
      },
    ],
  },
  {
    n: '10',
    title: 'Come Esercitare i Diritti',
    blocks: [
      {
        kind: 'p',
        text: 'Per esercitare i tuoi diritti o per qualsiasi chiarimento relativo al trattamento dei dati personali, puoi contattarci tramite:',
      },
      {
        kind: 'contact',
        items: [
          { icon: 'mail', label: 'Email', value: 'doc@spnutrizione.it', href: 'mailto:doc@spnutrizione.it' },
          { icon: 'phone', label: 'Telefono', value: '+39 339 250 1099', href: 'tel:+393392501099' },
        ],
      },
      { kind: 'callout', title: 'Tempi di risposta.', text: 'Ti risponderemo entro 30 giorni dalla ricezione della richiesta.' },
    ],
  },
  {
    n: '11',
    title: 'Modifiche alla Privacy Policy',
    blocks: [
      {
        kind: 'p',
        text: 'Questa informativa privacy può essere modificata periodicamente. Ti informeremo di eventuali modifiche significative tramite avviso sul sito web o comunicazione diretta. La versione più aggiornata è sempre disponibile su questa pagina.',
      },
    ],
  },
  {
    n: '12',
    title: 'Contatti del Garante',
    blocks: [
      {
        kind: 'contact',
        items: [
          { value: 'Garante per la Protezione dei Dati Personali' },
          { icon: 'map', value: 'Piazza Venezia 11, 00187 Roma' },
          { icon: 'phone', label: 'Tel', value: '+39 06 69677.1' },
          { icon: 'mail', label: 'Email', value: 'garante@gpdp.it', href: 'mailto:garante@gpdp.it' },
          { label: 'PEC', value: 'protocollo@pec.gpdp.it', href: 'mailto:protocollo@pec.gpdp.it' },
          { label: 'Sito web', value: 'www.garanteprivacy.it', href: 'https://www.garanteprivacy.it' },
        ],
      },
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="Privacy Policy"
      subtitle="Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)."
      lastUpdate="24/07/2026"
      sections={sections}
      footNote="Questa informativa è stata redatta in conformità al Regolamento UE 2016/679 (GDPR) e al Codice in materia di protezione dei dati personali (D.Lgs. 196/2003 e s.m.i.)."
    />
  )
}
