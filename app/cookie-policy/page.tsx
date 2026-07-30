import type { Metadata } from 'next'
import LegalPage, { type Section } from '@/components/legal-page'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Cookie Policy | Dott. Stefano Passoni',
  description:
    'Scopri come il sito del Dott. Stefano Passoni utilizza i cookie e come gestire le tue preferenze in qualsiasi momento, nel rispetto del GDPR.',
  path: '/cookie-policy',
  noindex: true,
})

const sections: Section[] = [
  {
    n: '1',
    title: 'Cosa sono i Cookie',
    blocks: [
      {
        kind: 'p',
        text: 'I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web. Servono a migliorare la tua esperienza di navigazione e permettono al sito di riconoscerti quando torni a visitarlo.',
      },
      {
        kind: 'callout',
        title: 'Come funzionano i cookie:',
        text: 'I cookie non possono danneggiare il tuo computer o i tuoi file. Contengono informazioni che permettono al sito di ricordare le tue preferenze e migliorare la tua esperienza di navigazione.',
      },
    ],
  },
  {
    n: '2',
    title: 'Tipologie di Cookie Utilizzati',
    blocks: [
      {
        kind: 'cards',
        items: [
          {
            title: 'Cookie Tecnici (Necessari)',
            desc: 'Essenziali per il corretto funzionamento del sito web.',
            meta: [
              'Durata: Sessione di navigazione',
              'Consenso: Non richiesto (necessari per il funzionamento)',
              'Finalità: Sicurezza e corretta navigazione del sito',
            ],
            note: { title: 'Sempre attivi:', text: 'Questi cookie sono indispensabili e non possono essere disattivati.' },
          },
          {
            title: 'Cookie Analitici',
            desc: 'Comprendere come i visitatori utilizzano il sito web.',
            meta: [
              'Stato: Nessuno strumento di analisi attualmente attivo',
              'Consenso: Richiesto',
              'Finalità: Statistiche di navigazione, miglioramento del sito',
            ],
            note: {
              text: 'Al momento il sito non utilizza strumenti di analisi né installa cookie analitici. La categoria resta disponibile nel banner per eventuali attivazioni future, che avverranno solo previo tuo consenso.',
            },
          },
          {
            title: 'Cookie di Marketing e Terze Parti',
            desc: 'Contenuti forniti da servizi esterni integrati nelle pagine.',
            meta: [
              'Provider: Google Maps',
              'Consenso: Richiesto',
              'Finalità: Visualizzazione della mappa dello studio',
            ],
            note: {
              text: 'La mappa non viene caricata finché non presti il consenso: al suo posto trovi un segnaposto con il pulsante per attivarla. Senza consenso nessun dato viene inviato a Google.',
            },
          },
          {
            title: 'Cookie di Preferenze',
            desc: 'Ricordare le tue preferenze e personalizzare l’esperienza.',
            meta: [
              'Durata: 12 mesi',
              'Consenso: Richiesto',
              'Finalità: Tema preferito, lingua, impostazioni di accessibilità',
            ],
          },
          {
            title: 'Cookie di Consenso',
            desc: 'Memorizzare le tue scelte sui cookie.',
            meta: ['Nome: cookie-consent', 'Durata: 12 mesi', 'Finalità: Ricordare le tue preferenze sui cookie'],
          },
        ],
      },
    ],
  },
  {
    n: '3',
    title: 'Cookie di Terze Parti',
    blocks: [
      {
        kind: 'p',
        text: 'Il nostro sito utilizza alcuni servizi di terze parti che possono installare i propri cookie. Nessuno di questi viene caricato senza il tuo consenso:',
      },
      {
        kind: 'links',
        items: [
          {
            title: 'Google Maps',
            desc: 'Utilizzato per visualizzare la mappa dello studio. Caricato solo dopo il tuo consenso: finché non lo presti, la mappa resta sostituita da un segnaposto e nessun dato viene trasmesso a Google.',
            label: 'Privacy Policy',
            href: 'https://policies.google.com/privacy',
          },
          {
            title: 'WhatsApp',
            desc: 'I pulsanti "Scrivimi su WhatsApp" sono semplici collegamenti: non installano cookie e non trasmettono dati finché non sei tu a cliccarli, aprendo WhatsApp.',
            label: 'Privacy Policy',
            href: 'https://www.whatsapp.com/legal/privacy-policy',
          },
        ],
      },
    ],
  },
  {
    n: '4',
    title: 'Gestione delle Preferenze Cookie',
    blocks: [
      { kind: 'p', text: 'Puoi gestire le tue preferenze sui cookie in diversi modi:' },
      { kind: 'subheading', text: '🍪 Banner Cookie del Sito' },
      {
        kind: 'p',
        text: 'Al primo accesso, apparirà un banner che ti permetterà di scegliere quali cookie accettare. Puoi modificare le tue preferenze in qualsiasi momento attraverso il link presente nel footer.',
      },
      { kind: 'subheading', text: '⚙️ Impostazioni del Browser' },
      { kind: 'p', text: 'Puoi controllare i cookie attraverso le impostazioni del tuo browser:' },
      {
        kind: 'list',
        items: [
          'Chrome: Impostazioni → Privacy e sicurezza → Cookie',
          'Firefox: Impostazioni → Privacy e sicurezza → Cookie',
          'Safari: Preferenze → Privacy → Cookie',
          'Edge: Impostazioni → Privacy → Cookie',
        ],
      },
      {
        kind: 'callout',
        variant: 'warning',
        title: 'Attenzione:',
        text: 'Disabilitare tutti i cookie potrebbe compromettere il corretto funzionamento del sito web e limitare alcune funzionalità.',
      },
    ],
  },
  {
    n: '5',
    title: 'Consenso e Revoca',
    blocks: [
      { kind: 'subheading', text: '5.1 Consenso' },
      {
        kind: 'p',
        text: 'Il consenso per i cookie non tecnici viene richiesto alla prima visita del sito. Il consenso è specifico per ogni categoria di cookie e può essere revocato in qualsiasi momento.',
      },
      { kind: 'subheading', text: '5.2 Come Revocare il Consenso' },
      {
        kind: 'list',
        items: [
          'Utilizza il link "Impostazioni Cookie" nel footer del sito',
          'Cancella i cookie del sito dalle impostazioni del browser',
          'Contattaci all’email: doc@spnutrizione.it',
        ],
      },
      { kind: 'subheading', text: '5.3 Conservazione del Consenso' },
      {
        kind: 'p',
        text: 'Le tue preferenze sui cookie vengono memorizzate per 12 mesi. Dopo questo periodo, ti verrà nuovamente richiesto il consenso.',
      },
    ],
  },
  {
    n: '6',
    title: 'Cookie e Minori',
    blocks: [
      {
        kind: 'callout',
        variant: 'warning',
        title: 'Importante:',
        text: 'I nostri servizi sono destinati a persone maggiorenni. I minori di 16 anni devono ottenere il consenso dei genitori o tutori legali prima di utilizzare il sito e accettare i cookie.',
      },
    ],
  },
  {
    n: '7',
    title: 'Aggiornamenti della Cookie Policy',
    blocks: [
      {
        kind: 'p',
        text: 'Questa Cookie Policy può essere aggiornata periodicamente per riflettere modifiche nei cookie utilizzati o per conformarsi a nuove normative.',
      },
      {
        kind: 'list',
        items: [
          'Gli aggiornamenti saranno pubblicati su questa pagina',
          'La data dell’ultimo aggiornamento è indicata in alto',
          'Modifiche significative saranno comunicate tramite banner sul sito',
        ],
      },
    ],
  },
  {
    n: '8',
    title: 'Sicurezza dei Cookie',
    blocks: [
      { kind: 'p', text: 'Implementiamo misure di sicurezza per proteggere i cookie e i dati che contengono:' },
      {
        kind: 'list',
        items: [
          'Utilizzo di connessioni sicure HTTPS',
          'Cookie con flag "Secure" e "HttpOnly" quando appropriato',
          'Crittografia dei dati sensibili nei cookie',
          'Monitoraggio regolare per attività sospette',
        ],
      },
    ],
  },
  {
    n: '9',
    title: "Diritti dell'Utente",
    blocks: [
      { kind: 'p', text: 'Hai i seguenti diritti riguardo ai cookie e ai dati raccolti:' },
      {
        kind: 'list',
        items: [
          'Diritto di accesso alle informazioni',
          'Diritto di rettifica',
          'Diritto di cancellazione',
          'Diritto di limitazione',
          'Diritto di portabilità',
          'Diritto di opposizione',
          'Diritto di revoca del consenso',
          'Diritto di reclamo',
        ],
      },
    ],
  },
  {
    n: '10',
    title: 'Contatti',
    blocks: [
      { kind: 'p', text: 'Per qualsiasi domanda sui cookie o per esercitare i tuoi diritti:' },
      {
        kind: 'contact',
        items: [
          { value: 'Dr. Stefano Passoni' },
          { icon: 'mail', label: 'Email', value: 'doc@spnutrizione.it', href: 'mailto:doc@spnutrizione.it' },
          { icon: 'phone', label: 'Tel', value: '+39 339 250 1099', href: 'tel:+393392501099' },
          { icon: 'map', label: 'Indirizzo', value: 'Via Collodi 8, 20900 Monza (MB)' },
        ],
      },
    ],
  },
]

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Cookie Policy"
      title="Cookie Policy"
      subtitle="Informazioni sui cookie utilizzati sul sito web del Dott. Stefano Passoni."
      lastUpdate="24/07/2026"
      sections={sections}
      footNote="Questa Cookie Policy è conforme al Regolamento UE 2016/679 (GDPR) e alle Linee Guida del Garante per la Protezione dei Dati Personali."
    />
  )
}
