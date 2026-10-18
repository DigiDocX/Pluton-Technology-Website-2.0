import { useMotionValueEvent, useScroll, useTransform, motion } from 'motion/react'
import { useRef, useState } from 'react'
import './ProcessSection.css'

const queueDocuments = [
  { filename: 'claim_form.pdf', metadata: '2.4 mb | Ingesting...', state: 'processing', type: 'pdf' },
  { filename: 'hospital bill.jpg', metadata: '11 mb | Pending', state: 'pending', type: 'image' },
  { filename: 'policy_doc.docx', metadata: '856 kb | Pending', state: 'pending', type: 'doc' },
  { filename: 'lab_report.pdf', metadata: '840 kb | Pending', state: 'pending', type: 'pdf' },
]

function DocumentIcon({ type = 'pdf' }) {
  return (
    <svg className={`process-file-icon ${type}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.5 2.75h7l4 4v14.5h-11z" />
      <path d="M13.5 2.75v4h4M9 12h6M9 15h6" />
      {type === 'pdf' && <path d="M8.5 18h7" />}
    </svg>
  )
}

function SourceDocumentCard() {
  return (
    <div className="source-document-card">
      <span className="source-document-icon">
        <DocumentIcon />
      </span>
      <span className="source-document-copy">
        <strong>PDF Documents</strong>
        <small>Invoices, claims, reports</small>
      </span>
    </div>
  )
}

function ProcessingNode() {
  return (
    <div className="processing-node" aria-label="Scanned document processing">
      <img className="processing-brand-mark" src="/images/brand/Pluton%20Logo.png" alt="" />
      <span className="processing-node-mark" aria-hidden="true">
        <span />
      </span>
    </div>
  )
}

function ProcessingQueue() {
  return (
    <section className="processing-queue" aria-label="Processing Queue">
      <header className="processing-queue-header">
        <span className="processing-queue-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 7h14M5 12h14M5 17h14" />
            <circle cx="8" cy="7" r="1.2" />
            <circle cx="13" cy="12" r="1.2" />
            <circle cx="10" cy="17" r="1.2" />
          </svg>
        </span>
        <strong>Processing Queue <span>(04)</span></strong>
      </header>
      <div className="processing-queue-list">
        {queueDocuments.map((document) => (
          <div className="processing-queue-row" key={document.filename}>
            <span className="queue-file-icon">
              <DocumentIcon type={document.type} />
            </span>
            <span className="queue-document-copy">
              <strong>{document.filename}</strong>
              <small>{document.metadata}</small>
            </span>
            <span className={`queue-state ${document.state}`} aria-label={document.state}>
              {document.state === 'processing' ? <i /> : null}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function ConnectionPaths() {
  return (
    <svg className="process-connections" viewBox="0 0 1295 500" preserveAspectRatio="none" aria-hidden="true">
      <path d="M 417 132 C 500 132, 510 218, 602 269" />
      <path d="M 417 223 C 492 223, 540 240, 602 269" />
      <path d="M 417 314 C 492 314, 540 297, 602 269" />
      <path d="M 417 405 C 500 405, 510 319, 602 269" />
      <path className="process-arrow-line" d="M 744 269 H 804" />
      <path className="process-arrow-head" d="m 792 257 12 12-12 12" />
    </svg>
  )
}

const processStages = [
  {
    number: '01',
    title: 'Source Document',
    support: <>One implementation plan.<br />Many sources.</>,
  },
  {
    number: '02',
    title: 'Intelligent Parsing',
    support: <>Understand documents<br />beyond simple steps.</>,
  },
  {
    number: '03',
    title: 'Structured Data',
    support: <>Turn understood information<br />into usable business data.</>,
  },
]

const extractedFields = [
  ['Document Type', 'Invoice'],
  ['Invoice Number', 'INV-42-2015'],
  ['Vendor Name', 'City Hospital'],
  ['Invoice Date', '12 Aug 2026'],
  ['Bill To', 'Rajesh Mehta'],
  ['Total Amount', '$20,500'],
  ['Currency', 'INR'],
]

const parsingFields = [
  ['Document Type', 'Insurance Claim Form', 'DETECTED'],
  ['Policy Number', 'POL-12-4125', 'EXTRACTED'],
  ['Claimant Name', 'Rajesh Mehta', 'EXTRACTED'],
  ['Date of Admission', '12 Aug 2026', 'EXTRACTED'],
  ['Total Claim Amount', '$20,500', 'EXTRACTED'],
  ['Diagnosis', 'Acute Gastritis', 'EXTRACTED'],
]

function ProcessStageNavigation({ activeStage }) {
  return (
    <ol className="process-stage-navigation" aria-label="Document-to-data stages">
      {processStages.map((stage, index) => (
        <li className={activeStage === index ? 'active' : ''} aria-current={activeStage === index ? 'step' : undefined} key={stage.number}>
          <span>{stage.number}</span>
          <strong>{stage.title}</strong>
        </li>
      ))}
    </ol>
  )
}

function ParsingCapabilities() {
  const items = [
    ['OCR & Text Recognition', 'Extract text from scans, pdf & images'],
    ['Layout Understanding', 'Detect section, tables & fields'],
    ['Entity & Field detection', 'Identify key information'],
    ['Validation & Enrichment', 'Improve accuracy & context'],
  ]

  return (
    <div className="parsing-capabilities">
      {items.map(([title, detail]) => (
        <div className="parsing-capability-row" key={title}>
          <span className="parsing-capability-icon"><DocumentIcon /></span>
          <span className="parsing-capability-copy">
            <strong>{title}</strong>
            <small>{detail}</small>
          </span>
        </div>
      ))}
    </div>
  )
}

function ParsingArtifact() {
  return (
    <div className="parsing-artifact">
      <nav className="parsing-artifact-tabs" aria-label="Extracted document views">
        <span className="selected">Extracted field</span>
        <span>Layout</span>
        <span>Entities</span>
        <span>JSON</span>
      </nav>
      <div className="parsing-artifact-fields">
        {parsingFields.map(([label, value, status]) => (
          <div className="parsing-artifact-field" key={label}>
            <small>{label}</small>
            <strong>{value}</strong>
            <span>{status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ParsingConnections() {
  return (
    <svg className="process-connections parsing-connections" viewBox="0 0 1295 500" preserveAspectRatio="none" aria-hidden="true">
      <path d="M 510 100 C 555 100, 570 225, 647 250" />
      <path d="M 510 200 C 555 200, 580 228, 647 250" />
      <path d="M 510 300 C 555 300, 580 272, 647 250" />
      <path d="M 510 400 C 555 400, 570 275, 647 250" />
      <path className="process-flow-line" d="M 670 250 H 759" />
    </svg>
  )
}

function IntelligentParsingStage({ ariaHidden }) {
  return (
    <div className="process-stage-panel parsing-stage-panel" aria-hidden={ariaHidden}>
      <ParsingConnections />
      <ParsingCapabilities />
      <div className="parsing-process-node" aria-hidden="true" />
      <ParsingArtifact />
    </div>
  )
}

function ExtractedFieldArtifact() {
  return (
    <section className="structured-field-card" aria-label="Extracted Field">
      <header className="structured-card-header">
        <span className="structured-card-icon"><DocumentIcon /></span>
        <strong>Extracted Field</strong>
        <span className="structured-header-action" aria-hidden="true"><CopyIcon /></span>
      </header>
      <div className="structured-field-list">
        {extractedFields.map(([label, value], index) => (
          <div className="structured-field-row" key={label}>
            <span className="structured-field-symbol" aria-hidden="true">
              <FieldIcon index={index} />
            </span>
            <span className="structured-field-copy"><small>{label}</small><strong>{value}</strong></span>
            <span className="structured-copy-action" aria-hidden="true"><CopyIcon /></span>
          </div>
        ))}
      </div>
    </section>
  )
}

function JsonArtifact() {
  return (
    <section className="structured-json-card" aria-label="Structured JSON">
      <header className="structured-card-header">
        <span className="structured-card-icon json-mark">{'{ }'}</span>
        <strong>Structured JSON</strong>
        <span className="structured-header-action" aria-hidden="true"><CopyIcon /></span>
        <button type="button" className="json-download">Download</button>
      </header>
      <div className="json-code">
        <ol>
          <li><span className="json-brace">{'{'}</span></li>
          <li className="indent-1"><span className="json-key">"document_type"</span><span className="json-punctuation">: </span><span className="json-string">"invoice"</span><span className="json-punctuation">,</span></li>
          <li className="indent-1"><span className="json-key">"invoice_number"</span><span className="json-punctuation">: </span><span className="json-string">"INV-2024-7783"</span><span className="json-punctuation">,</span></li>
          <li className="indent-1"><span className="json-key">"vendor_name"</span><span className="json-punctuation">: </span><span className="json-string">"City Care Hospital"</span><span className="json-punctuation">,</span></li>
          <li className="indent-1"><span className="json-key">"invoice_date"</span><span className="json-punctuation">: </span><span className="json-string">"2024-08-12"</span><span className="json-punctuation">,</span></li>
          <li className="indent-1"><span className="json-key">"bill_to"</span><span className="json-punctuation">: </span><span className="json-string">"Rajesh Mehta"</span><span className="json-punctuation">,</span></li>
          <li className="indent-1"><span className="json-key">"total_amount"</span><span className="json-punctuation">: </span><span className="json-number">20500</span><span className="json-punctuation">,</span></li>
          <li className="indent-1"><span className="json-key">"currency"</span><span className="json-punctuation">: </span><span className="json-string">"INR"</span><span className="json-punctuation">,</span></li>
          <li className="indent-1"><span className="json-key">"line_items"</span><span className="json-punctuation">: [</span></li>
          <li className="indent-2"><span className="json-brace">{'{'}</span></li>
          <li className="indent-3"><span className="json-key">"description"</span><span className="json-punctuation">: </span><span className="json-string">"Consultation"</span><span className="json-punctuation">,</span></li>
          <li className="indent-3"><span className="json-key">"quantity"</span><span className="json-punctuation">: </span><span className="json-number">1</span><span className="json-punctuation">,</span></li>
          <li className="indent-3"><span className="json-key">"amount"</span><span className="json-punctuation">: </span><span className="json-number">1500</span></li>
          <li className="indent-2"><span className="json-brace">{'}'}</span><span className="json-punctuation">,</span></li>
          <li className="indent-2"><span className="json-brace">{'{'}</span></li>
          <li className="indent-3"><span className="json-key">"description"</span><span className="json-punctuation">: </span><span className="json-string">"MRI Scan"</span><span className="json-punctuation">,</span></li>
          <li className="indent-3"><span className="json-key">"quantity"</span><span className="json-punctuation">: </span><span className="json-number">1</span><span className="json-punctuation">,</span></li>
          <li className="indent-3"><span className="json-key">"amount"</span><span className="json-punctuation">: </span><span className="json-number">12000</span></li>
          <li className="indent-2"><span className="json-brace">{'}'}</span></li>
          <li className="indent-1"><span className="json-punctuation">]</span></li>
          <li><span className="json-brace">{'}'}</span></li>
        </ol>
      </div>
    </section>
  )
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <rect x="5" y="5" width="8" height="9" rx="1" />
      <path d="M10.5 3H3.8a.8.8 0 0 0-.8.8v7.4" />
    </svg>
  )
}

function FieldIcon({ index }) {
  const paths = {
    0: <><path d="M4.5 2.5h5l3 3v8h-8z" /><path d="M9.5 2.5v3h3M6.5 8h4M6.5 10.5h4" /></>,
    1: <><path d="m6 3.5-1 9M11 3.5l-1 9M3.5 6.5h9M3 9.5h9" /></>,
    2: <><circle cx="8" cy="5" r="2.5" /><path d="M3.5 14c.4-2.4 1.9-3.7 4.5-3.7s4.1 1.3 4.5 3.7" /></>,
    3: <><rect x="3" y="4" width="10" height="9" rx="1" /><path d="M5.5 2.5v3M10.5 2.5v3M3 7h10" /></>,
    4: <><circle cx="6" cy="6" r="2" /><circle cx="11" cy="7" r="1.5" /><path d="M2.8 13c.3-2 1.4-3 3.2-3s2.9 1 3.2 3M9 10c1.8-.5 3.5.5 4 2.3" /></>,
    5: <><path d="M8 2.5v11M11 5c-.6-1.3-1.7-2-3.2-2-1.6 0-2.7.8-2.7 2 0 3.2 5.8 1.3 5.8 4.6 0 1.3-1.2 2.2-3 2.2-1.5 0-2.7-.6-3.4-1.8" /></>,
    6: <><circle cx="8" cy="8" r="5.5" /><path d="M8 4.5v7M9.8 6.3c-.4-.7-1-1-1.9-1-1 0-1.7.5-1.7 1.2 0 2 3.8.8 3.8 2.8 0 .8-.8 1.4-2 1.4-.9 0-1.7-.4-2.1-1" /></>,
  }

  return (
    <svg className="structured-field-icon" viewBox="0 0 16 16" aria-hidden="true">
      {paths[index]}
    </svg>
  )
}

function StructuredDataStage({ ariaHidden }) {
  return (
    <div className="process-stage-panel structured-stage-panel" aria-hidden={ariaHidden}>
      <ExtractedFieldArtifact />
      <JsonArtifact />
    </div>
  )
}

function SourceDocumentStage({ ariaHidden }) {
  return (
    <div className="process-stage-panel source-stage-panel" role="group" aria-label="Source documents flow through scanned document processing into the queue" aria-hidden={ariaHidden}>
      <ConnectionPaths />
      <div className="source-document-stack">
        {queueDocuments.map((document) => (
          <SourceDocumentCard key={document.filename} />
        ))}
      </div>
      <ProcessingNode />
      <ProcessingQueue />
    </div>
  )
}

function getStagePosition(progress) {
  const easeInOut = (value) => value * value * (3 - 2 * value)

  if (progress < 0.1) return 0
  if (progress < 0.22) return easeInOut((progress - 0.1) / 0.12)
  if (progress < 0.68) return 1
  if (progress < 0.8) return 1 + easeInOut((progress - 0.68) / 0.12)
  return 2
}

function ProcessSection() {
  const scrollTrackRef = useRef(null)
  const [activeStage, setActiveStage] = useState(0)
  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ['start start', 'end end'],
  })
  const trackX = useTransform(scrollYProgress, (progress) => `${-getStagePosition(progress) * 100 / 3}%`)
  const activeStageContent = processStages[activeStage]

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    setActiveStage(Math.min(2, Math.round(getStagePosition(progress))))
  })

  return (
    <section className="process-section" id="document-to-data">
      <div className="process-container">
        <header className="process-header">
          <p className="process-eyebrow">DOCUMENT-TO-DATA INTELLIGENCE</p>
          <h2>From a scanned claim to data a<br className="process-heading-break" /> system can trust.</h2>
        </header>

        <div className="process-scroll-track" ref={scrollTrackRef}>
          <div className="process-pinned-stage">
            <div className="process-stage-intro">
              <h3><span>{activeStageContent.number}</span> {activeStageContent.title}</h3>
              <p>{activeStageContent.support}</p>
            </div>

            <div className="document-process-scene" aria-label="Document intelligence process stages">
              <motion.div className="process-stage-track" style={{ x: trackX }}>
                <SourceDocumentStage ariaHidden={activeStage !== 0} />
                <IntelligentParsingStage ariaHidden={activeStage !== 1} />
                <StructuredDataStage ariaHidden={activeStage !== 2} />
              </motion.div>
            </div>
            <ProcessStageNavigation activeStage={activeStage} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProcessSection
