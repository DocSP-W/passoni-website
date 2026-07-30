import type { Metadata } from 'next'
import LegalPage, { type Section } from '@/components/legal-page'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Termini di Servizio | Dott. Stefano Passoni',
  description:
    "Condizioni generali per l'utilizzo del sito e dei servizi nutrizionali offerti dal Dott. Stefano Passoni, biologo nutrizionista a Monza.",
  path: '/termini-di-servizio',
  noindex: true,
})

const sections: Section[] = [
  {
    n: '1',
    title: 'Informazioni Generali',
    blocks: [
      {
        kind: 'contact',
        items: [
          { value: 'Dr. Stefano Passoni' },
          { value: 'Biologo Nutrizionista' },
          { value: 'Iscritto all’Ordine Nazionale dei Biologi' },
          { label: 'P.IVA', value: 'IT12896870966' },
          { icon: 'map', value: 'Via Collodi 8, 20900 Monza (MB)' },
          { icon: 'mail', value: 'doc@spnutrizione.it', href: 'mailto:doc@spnutrizione.it' },
          { icon: 'phone', value: '+39 339 250 1099', href: 'tel:+393392501099' },
        ],
      },
      {
        kind: 'p',
        text: 'I presenti termini e condizioni disciplinano l’utilizzo dei servizi nutrizionali offerti dal Dott. Stefano Passoni, biologo nutrizionista regolarmente iscritto all’albo.',
      },
    ],
  },
  {
    n: '2',
    title: 'Accettazione dei Termini',
    blocks: [
      {
        kind: 'p',
        text: "L'utilizzo dei servizi comporta l'accettazione integrale dei presenti termini e condizioni. Se non accetti anche solo una parte di questi termini, non potrai utilizzare i servizi offerti.",
      },
      {
        kind: 'callout',
        title: 'Importante:',
        text: "L'accettazione avviene automaticamente con la prenotazione del primo appuntamento o l'utilizzo dei servizi online.",
      },
    ],
  },
  {
    n: '3',
    title: 'Servizi Offerti',
    blocks: [
      { kind: 'subheading', text: '3.1 Servizi Principali' },
      {
        kind: 'list',
        items: [
          'Consulenze nutrizionali individuali',
          'Elaborazione piani alimentari personalizzati',
          'Nutrizione sportiva',
          'Alimentazione terapeutica',
          'Educazione alimentare familiare',
          'Consulenze di gruppo',
          'Follow-up nutrizionali',
          'Analisi composizione corporea',
        ],
      },
      { kind: 'subheading', text: '3.2 Modalità di Erogazione' },
      {
        kind: 'list',
        items: [
          'Consulenze in presenza presso lo studio',
          'Consulenze online tramite piattaforme video',
          'Supporto telefonico e WhatsApp',
          'Materiale informativo digitale',
        ],
      },
    ],
  },
  {
    n: '4',
    title: 'Prenotazioni e Appuntamenti',
    blocks: [
      { kind: 'subheading', text: '4.1 Modalità di Prenotazione' },
      { kind: 'p', text: 'Le prenotazioni possono essere effettuate tramite:' },
      {
        kind: 'list',
        items: [
          'WhatsApp: +39 339 250 1099',
          'Email: doc@spnutrizione.it',
          'Telefono: +39 339 250 1099',
          'Sito web tramite form di contatto',
        ],
      },
    ],
  },
  {
    n: '5',
    title: 'Tariffe e Pagamenti',
    blocks: [
      { kind: 'subheading', text: '5.1 Tariffe' },
      {
        kind: 'p',
        text: 'Le tariffe sono disponibili sul sito web e possono essere richieste durante la prenotazione. I prezzi possono variare senza preavviso.',
      },
      { kind: 'subheading', text: '5.2 Modalità di Pagamento' },
      {
        kind: 'list',
        items: [
          'Contanti presso lo studio',
          'Bonifico bancario',
          'Pagamento elettronico (POS)',
          'Per consulenze online: bonifico anticipato',
        ],
      },
      { kind: 'subheading', text: '5.3 Fatturazione' },
      {
        kind: 'p',
        text: 'Verrà emessa regolare fattura per tutti i servizi erogati, detraibile dalle tasse come spesa sanitaria secondo la normativa vigente.',
      },
    ],
  },
  {
    n: '6',
    title: 'Obblighi del Cliente',
    blocks: [
      {
        kind: 'deflist',
        items: [
          {
            term: 'Veridicità delle informazioni',
            desc: 'Fornire informazioni accurate e complete sulla propria storia clinica, allergie, intolleranze e stile di vita.',
          },
          {
            term: 'Comunicazione tempestiva',
            desc: 'Informare immediatamente di eventuali cambiamenti nella propria condizione di salute.',
          },
          { term: 'Seguire le indicazioni', desc: 'Attenersi al piano alimentare e alle indicazioni fornite.' },
          { term: 'Puntualità', desc: 'Presentarsi puntualmente agli appuntamenti.' },
          { term: 'Rispetto', desc: 'Mantenere un comportamento rispettoso verso il professionista e lo staff.' },
        ],
      },
    ],
  },
  {
    n: '7',
    title: 'Limitazioni e Responsabilità',
    blocks: [
      {
        kind: 'callout',
        variant: 'warning',
        title: 'Importante:',
        text: 'I servizi nutrizionali non sostituiscono il rapporto medico-paziente. In presenza di patologie, è necessario mantenere il controllo medico specialistico.',
      },
      { kind: 'subheading', text: '7.1 Ambito di Competenza' },
      {
        kind: 'list',
        items: [
          'I piani alimentari sono elaborati nell’ambito delle competenze del biologo nutrizionista',
          'Non vengono fornite diagnosi mediche o prescrizioni farmacologiche',
          'In caso di patologie, si raccomanda sempre il controllo medico',
        ],
      },
      { kind: 'subheading', text: '7.2 Responsabilità del Cliente' },
      {
        kind: 'p',
        text: 'Il cliente è responsabile dell’applicazione delle indicazioni ricevute e deve comunicare tempestivamente eventuali problemi o reazioni avverse.',
      },
    ],
  },
  {
    n: '8',
    title: 'Proprietà Intellettuale',
    blocks: [
      {
        kind: 'p',
        text: 'Tutti i materiali forniti (piani alimentari, ricettari, guide) sono di proprietà esclusiva del Dott. Stefano Passoni e sono destinati esclusivamente all’uso personale del cliente.',
      },
      {
        kind: 'callout',
        title: 'Divieto di riproduzione:',
        text: 'È vietata la riproduzione, distribuzione, modificazione o uso commerciale di qualsiasi materiale senza autorizzazione scritta.',
      },
    ],
  },
  {
    n: '9',
    title: 'Privacy e Trattamento Dati',
    blocks: [
      {
        kind: 'p',
        text: 'Il trattamento dei dati personali avviene nel rispetto del GDPR (Regolamento UE 2016/679). Per maggiori informazioni, consulta la nostra Privacy Policy.',
      },
      {
        kind: 'list',
        items: [
          'I dati sanitari sono trattati con il massimo riserbo',
          'La documentazione è conservata secondo gli obblighi deontologici',
          'È possibile richiedere l’accesso, la modifica o la cancellazione dei propri dati',
        ],
      },
    ],
  },
  {
    n: '10',
    title: 'Risoluzione Controversie',
    blocks: [
      { kind: 'subheading', text: '10.1 Procedura di Reclamo' },
      { kind: 'p', text: 'In caso di insoddisfazione, il cliente può presentare reclamo tramite:' },
      {
        kind: 'list',
        items: [
          'Email: doc@spnutrizione.it',
          'Lettera raccomandata all’indirizzo dello studio',
          'Colloquio diretto su appuntamento',
        ],
      },
      { kind: 'subheading', text: '10.2 Risoluzione Amichevole' },
      {
        kind: 'p',
        text: 'Si privilegerà sempre la risoluzione amichevole delle controversie attraverso il dialogo diretto.',
      },
      { kind: 'subheading', text: '10.3 Foro Competente' },
      {
        kind: 'p',
        text: 'Per eventuali controversie non risolte amichevolmente, sarà competente il Foro di Milano.',
      },
    ],
  },
  {
    n: '11',
    title: 'Codice Deontologico',
    blocks: [
      {
        kind: 'p',
        text: 'Il Dott. Stefano Passoni opera nel rispetto del Codice Deontologico dell’Ordine Nazionale dei Biologi e delle normative vigenti in materia di professioni sanitarie.',
      },
      {
        kind: 'list',
        items: [
          'Rispetto della dignità e dei diritti del cliente',
          'Competenza professionale e aggiornamento continuo',
          'Riservatezza e segreto professionale',
          'Correttezza nei rapporti professionali',
        ],
      },
    ],
  },
  {
    n: '12',
    title: 'Modifiche ai Termini',
    blocks: [
      {
        kind: 'p',
        text: "I presenti termini e condizioni possono essere modificati in qualsiasi momento. Le modifiche saranno pubblicate sul sito web e comunicate ai clienti attivi. L'utilizzo continuato dei servizi costituisce accettazione delle modifiche.",
      },
    ],
  },
  {
    n: '13',
    title: 'Validità e Clausola di Salvaguardia',
    blocks: [
      {
        kind: 'p',
        text: 'Qualora una o più clausole dei presenti termini dovessero risultare nulle o inefficaci, ciò non comporterà la nullità dell’intero contratto. Le clausole valide rimarranno pienamente efficaci.',
      },
    ],
  },
]

export default function TerminiDiServizioPage() {
  return (
    <LegalPage
      eyebrow="Termini di Servizio"
      title="Termini di Servizio"
      subtitle="Condizioni generali per l'utilizzo dei servizi nutrizionali del Dott. Stefano Passoni."
      lastUpdate="24/07/2026"
      sections={sections}
      footNote="Questi termini sono regolati dalla legge italiana e sono stati redatti in conformità alla normativa vigente in materia di professioni sanitarie e protezione dei consumatori."
    />
  )
}
