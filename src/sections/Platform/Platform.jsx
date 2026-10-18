import { useEffect, useRef, useState } from 'react'
import capabilities from './platformData.js'
import './Platform.css'

function useProgressiveReveal(sequenceLength) {
  const artifactRef = useRef(null)
  const [revealStep, setRevealStep] = useState(() => (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      || !('IntersectionObserver' in window)
      ? sequenceLength - 1
      : -1
  ))

  useEffect(() => {
    const artifact = artifactRef.current
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!artifact || !('IntersectionObserver' in window)) return undefined

    let timeoutId
    let sequenceId = 0
    let observer

    const observeArtifact = () => {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          const currentSequence = ++sequenceId
          window.clearTimeout(timeoutId)
          setRevealStep(0)

          let nextStep = 1
          const revealNextStep = () => {
            if (currentSequence !== sequenceId) return
            setRevealStep(nextStep)
            nextStep += 1
            if (nextStep < sequenceLength) {
              timeoutId = window.setTimeout(revealNextStep, 135)
            }
          }

          if (sequenceLength > 1) {
            timeoutId = window.setTimeout(revealNextStep, 135)
          }
        } else {
          sequenceId += 1
          window.clearTimeout(timeoutId)
          setRevealStep(-1)
        }
      }, { threshold: [0, 0.4] })

      observer.observe(artifact)
    }

    const handleMotionPreferenceChange = (event) => {
      if (event.matches) {
        sequenceId += 1
        window.clearTimeout(timeoutId)
        observer.disconnect()
        setRevealStep(sequenceLength - 1)
      } else {
        setRevealStep(-1)
        observeArtifact()
      }
    }

    if (!motionPreference.matches) observeArtifact()

    motionPreference.addEventListener('change', handleMotionPreferenceChange)

    return () => {
      sequenceId += 1
      window.clearTimeout(timeoutId)
      observer?.disconnect()
      motionPreference.removeEventListener('change', handleMotionPreferenceChange)
    }
  }, [sequenceLength])

  return { artifactRef, revealStep }
}

function revealClass(className, step, currentStep) {
  return `${className} artifact-reveal${step <= currentStep ? ' is-revealed' : ''}`
}

function DocumentArtifact() {
  const { artifactRef, revealStep } = useProgressiveReveal(10)

  return (
    <div className="artifact-card artifact-sequenced document-artifact" ref={artifactRef}>
      <div className={revealClass('document-artifact-header', 0, revealStep)}>
        <span className="artifact-icon document-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M7 3.75h6l4 4v12.5H7z" />
            <path d="M13 3.75v4h4M9.5 12h5M9.5 15h5" />
          </svg>
        </span>
        <div className="document-file">
          <strong>Document Understanding</strong>
          <span>DOC-2026-0147</span>
        </div>
        <span className="status-pill"><span />Processing</span>
      </div>
      <div className="document-metadata">
        <div className={revealClass('metadata-row', 1, revealStep)}>
          <span>DOCUMENT TYPE</span>
          <strong>Invoice</strong>
          <em>IDENTIFIED</em>
        </div>
        <div className={revealClass('metadata-row', 2, revealStep)}>
          <span>VENDOR NAME</span>
          <strong>Shree Ganesh Traders</strong>
          <em>EXTRACTED</em>
        </div>
        <div className={revealClass('metadata-row', 3, revealStep)}>
          <span>INVOICE NUMBER</span>
          <strong>MH-20481</strong>
          <em>EXTRACTED</em>
        </div>
        <div className={revealClass('metadata-row', 4, revealStep)}>
          <span>TOTAL AMOUNT</span>
          <strong>$1,200</strong>
          <em>EXTRACTED</em>
        </div>
      </div>
      <div className="document-key-fields">
        <div className={revealClass('key-fields-heading', 5, revealStep)}>
          <strong>KEY FIELDS</strong>
          <span>5 of 8 extracted</span>
        </div>
        <div className={revealClass('field-row', 6, revealStep)}>
          <span><i aria-hidden="true" />Billing Address</span>
          <strong>Pune, Maharashtra</strong>
        </div>
        <div className={revealClass('field-row', 7, revealStep)}>
          <span><i aria-hidden="true" />GST Number</span>
          <strong>27AJBVD...</strong>
        </div>
        <button className={revealClass('more-fields', 8, revealStep)} type="button">View 5 more fields <span aria-hidden="true">→</span></button>
      </div>
      <div className={revealClass('document-artifact-footer', 9, revealStep)}>
        <span className="text-extracted"><i aria-hidden="true" />Text Extracted</span>
        <span>Marathi / English</span>
        <button type="button">View JSON</button>
      </div>
    </div>
  )
}

function ArtifactHeader({ title, id, status, icon = 'document', revealStep, revealAt = 0 }) {
  return (
    <div className={revealClass('product-artifact-header', revealAt, revealStep)}>
      <span className={`product-artifact-icon ${icon}`} aria-hidden="true">
        {icon === 'relationship' ? (
          <svg viewBox="0 0 24 24">
            <circle cx="6" cy="12" r="2.2" />
            <circle cx="18" cy="6" r="2.2" />
            <circle cx="18" cy="18" r="2.2" />
            <path d="m8 11 7.8-4M8 13l7.8 4" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24">
            <path d="M7 3.75h6l4 4v12.5H7z" />
            <path d="M13 3.75v4h4M9.5 12h5M9.5 15h5" />
          </svg>
        )}
      </span>
      <span className="product-artifact-title">
        <strong>{title}</strong>
        <small>{id}</small>
      </span>
      <span className="product-status"><i aria-hidden="true" />{status}</span>
    </div>
  )
}

function ArtifactFooter({ status, action, secondaryAction, revealStep, revealAt }) {
  return (
    <div className={revealClass('product-artifact-footer', revealAt, revealStep)}>
      <span className="product-footer-status"><i aria-hidden="true" />{status}</span>
      {secondaryAction && <span className="product-footer-secondary">{secondaryAction}</span>}
      <span className="product-footer-action">{action}</span>
    </div>
  )
}

function KnowledgeArtifact() {
  const { artifactRef, revealStep } = useProgressiveReveal(9)
  const sources = [
    { kind: 'claim', title: 'Claim', detail: 'CLM - 20481', status: 'PRIMARY' },
    { kind: 'policy', title: 'Policy', detail: 'POL - 8821', status: 'LINKED' },
    { kind: 'customer', title: 'Customer', detail: 'Rahul Sharma', status: 'LINKED' },
    { kind: 'documents', title: 'Documents', detail: '4 related documents', status: 'LINKED' },
  ]
  const stats = [
    { label: 'ENTITIES', value: '6' },
    { label: 'RELATIONSHIPS', value: '8' },
    { label: 'SOURCES', value: '4' },
  ]

  return (
    <div className="artifact-card artifact-sequenced knowledge-artifact" ref={artifactRef}>
      <ArtifactHeader title="Knowledge Context" id="CASE-2026-0147" status="Processing" icon="relationship" revealStep={revealStep} />
      <div className="knowledge-related">
        <div className={revealClass('product-section-heading', 1, revealStep)}>
          <strong>RELATED INFORMATION</strong>
          <span>4 Linked sources</span>
        </div>
        <div className="relationship-list">
          {sources.map((source, index) => (
            <div className={revealClass(`relationship-row ${source.kind}`, index + 2, revealStep)} key={source.kind}>
              <span className="relationship-branch" aria-hidden="true" />
              <span className={`relationship-icon ${source.kind}`} aria-hidden="true">
                {source.kind === 'customer' ? (
                  <svg viewBox="0 0 20 20"><circle cx="10" cy="6.5" r="3" /><path d="M4.5 17c.4-3.1 2.4-4.7 5.5-4.7s5.1 1.6 5.5 4.7" /></svg>
                ) : (
                  <svg viewBox="0 0 20 20"><path d="M5 2.5h7l3.5 3.5v11H5z" /><path d="M12 2.5V6h3.5M7.5 10h5M7.5 13h5" /></svg>
                )}
              </span>
              <span className="relationship-copy">
                <strong>{source.title}</strong>
                <small>{source.detail}</small>
              </span>
              <span className={`relationship-state${index === 0 ? ' primary' : ''}`}>{source.status}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="context-overview">
        <div className={revealClass('product-section-heading', 6, revealStep)}>
          <strong>CONTEXT OVERVIEW</strong>
        </div>
        <div className={revealClass('context-stats', 7, revealStep)}>
          {stats.map((stat) => (
            <div className="context-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <ArtifactFooter status="Context Structured" action="View JSON" secondaryAction="View Details" revealStep={revealStep} revealAt={8} />
    </div>
  )
}

function WorkflowSteps({ steps, revealStep, firstRevealAt }) {
  return (
    <div className="workflow-list">
      {steps.map((step, index) => (
        <div className={revealClass(`workflow-row ${step.state}`, firstRevealAt + index, revealStep)} key={step.title}>
          <span className="workflow-marker" aria-hidden="true">
            {step.state === 'complete' ? '✓' : step.state === 'processing' ? <i /> : ''}
          </span>
          {index < steps.length - 1 && <span className="workflow-connector" aria-hidden="true" />}
          <span className="workflow-copy">
            <strong>{step.title}</strong>
            <small>{step.detail}</small>
          </span>
          <span className="workflow-state">{step.status}</span>
        </div>
      ))}
    </div>
  )
}

function ProcessArtifact() {
  const { artifactRef, revealStep } = useProgressiveReveal(8)
  const steps = [
    { title: 'Ingest Document', detail: 'Received 1 document', status: 'COMPLETED', state: 'complete' },
    { title: 'Extract Information', detail: 'Key fields extracted', status: 'COMPLETED', state: 'complete' },
    { title: 'Validate & Apply Rules', detail: 'Business rules validated', status: 'COMPLETED', state: 'complete' },
    { title: 'Match & Associate', detail: 'Linking with related records', status: 'PROCESSING', state: 'processing' },
    { title: 'Ready for Downstream', detail: 'Send to target system', status: 'PENDING', state: 'pending' },
  ]

  return (
    <div className="artifact-card artifact-sequenced process-artifact" ref={artifactRef}>
      <ArtifactHeader title="Process Execution" id="PROC-2026-0147" status="In Progress" revealStep={revealStep} />
      <div className="workflow-section">
        <div className={revealClass('product-section-heading', 1, revealStep)}>
          <strong>PROCESS STEPS</strong>
          <span>Step 4 of 5</span>
        </div>
        <WorkflowSteps steps={steps} revealStep={revealStep} firstRevealAt={1} />
      </div>
      <div className={revealClass('process-exceptions', 6, revealStep)}>
        <div className="product-section-heading">
          <strong>EXCEPTIONS</strong>
          <span>1 Item</span>
        </div>
        <div className="exception-row">
          <span className="exception-icon" aria-hidden="true">!</span>
          <span className="exception-copy">
            <strong>Vendor Not Found</strong>
            <small>No matching vendor in master data</small>
          </span>
          <strong className="exception-amount">$20,500</strong>
        </div>
      </div>
      <ArtifactFooter status="Processing Records" action="View Details" secondaryAction="Step 4 of 5" revealStep={revealStep} revealAt={7} />
    </div>
  )
}

function AgentsArtifact() {
  const { artifactRef, revealStep } = useProgressiveReveal(8)
  const steps = [
    { title: 'Understand Document', detail: 'Identified type, key & field information', status: 'COMPLETED', state: 'complete' },
    { title: 'Retrieve Related Information', detail: 'Fetched policies, customer history and past documents', status: 'COMPLETED', state: 'complete' },
    { title: 'Analyze & Generate Insights', detail: 'Create summary and flagged exceptions', status: 'COMPLETED', state: 'complete' },
    { title: 'Draft Response', detail: 'Preparing email with key details', status: 'IN PROGRESS', state: 'processing' },
    { title: 'Send To Stakeholder', detail: 'Notify customer / internal team', status: 'PENDING', state: 'pending' },
  ]

  return (
    <div className="artifact-card artifact-sequenced agents-artifact" ref={artifactRef}>
      <ArtifactHeader title="Document Assistant Agent" id="AGT-2026-0147" status="Running" revealStep={revealStep} />
      <div className="workflow-section agent-workflow-section">
        <div className={revealClass('product-section-heading', 1, revealStep)}>
          <strong>AGENT WORKFLOW</strong>
        </div>
        <WorkflowSteps steps={steps} revealStep={revealStep} firstRevealAt={1} />
      </div>
      <div className={revealClass('agent-output', 6, revealStep)}>
        <div className="product-section-heading">
          <strong>AGENT OUTPUT</strong>
          <span className="draft-ready">DRAFT READY</span>
        </div>
        <div className="agent-output-box">
          <p>“Hi Rahul, We have processed your claim CLM-2026-0147. Total approved amount is $20,500. The next steps and required documents are listed below...”</p>
          <button type="button">View Draft</button>
        </div>
      </div>
      <ArtifactFooter status="Agent Running" action="View Logs" revealStep={revealStep} revealAt={7} />
    </div>
  )
}

const artifactComponents = {
  document: DocumentArtifact,
  knowledge: KnowledgeArtifact,
  process: ProcessArtifact,
  agents: AgentsArtifact,
}

function Platform() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia('(min-width: 901px)').matches,
  )
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const activeIndex = Math.min(
    capabilities.length - 1,
    Math.floor(
      (scrollProgress / (capabilities.length - 1)) * capabilities.length + 0.001,
    ),
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 901px)')
    const updateViewport = () => {
      setIsDesktop(mediaQuery.matches)
      if (!mediaQuery.matches) setScrollProgress(0)
    }
    mediaQuery.addEventListener('change', updateViewport)

    return () => mediaQuery.removeEventListener('change', updateViewport)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', updateMotionPreference)

    return () => mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  useEffect(() => {
    if (!isDesktop) return undefined

    const updateProgress = () => {
      const section = sectionRef.current
      const stage = stageRef.current
      if (!section || !stage) return

      const scrollDistance = section.offsetHeight - stage.offsetHeight
      if (scrollDistance <= 0) {
        setScrollProgress(0)
        return
      }

      const distanceTravelled = -section.getBoundingClientRect().top
      const normalizedProgress = Math.max(0, Math.min(1, distanceTravelled / scrollDistance))
      setScrollProgress(normalizedProgress * (capabilities.length - 1))
    }

    const initialFrame = window.requestAnimationFrame(updateProgress)
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.cancelAnimationFrame(initialFrame)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [isDesktop])

  const selectCapability = (index) => {
    if (!isDesktop) return
    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage) return

    const scrollDistance = section.offsetHeight - stage.offsetHeight
    const nextTop = section.getBoundingClientRect().top + window.scrollY
    const progress = index / (capabilities.length - 1)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    window.scrollTo({
      top: nextTop + scrollDistance * progress,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  const artifactProgress = isDesktop && !prefersReducedMotion ? scrollProgress : activeIndex

  return (
    <section className={`platform-section${isDesktop ? ' is-desktop' : ''}`} id="platform" ref={sectionRef}>
      <div className="platform-stage" ref={stageRef}>
        <div className="platform-container">
          <header className="platform-header">
            <p className="platform-eyebrow">THE PLATFORM</p>
            <h2>Four capability layers, built toward enterprise intelligence.</h2>
            <p className="platform-intro">
              Pluton builds intelligence in layers — from understanding documents to structuring
              knowledge, automating processes, and connecting enterprise information to AI.
            </p>
          </header>

          <div className="platform-frame">
            <nav className="capability-navigation" aria-label="Platform capabilities">
              {capabilities.map((capability, index) => (
                <button
                  className={`capability-nav-item${activeIndex === index ? ' is-active' : ''}`}
                  type="button"
                  key={capability.number}
                  aria-pressed={activeIndex === index}
                  onClick={() => {
                    if (isDesktop) selectCapability(index)
                    else setScrollProgress(index)
                  }}
                >
                  <span className="capability-indicator" aria-hidden="true" />
                  <span className="capability-number">{capability.number}</span>
                  <span className="capability-name">{capability.title}</span>
                </button>
              ))}
            </nav>

            <div className="capability-content" aria-live="polite">
              {capabilities.map((capability, index) => (
                <div
                  className={`capability-copy${activeIndex === index ? ' is-active' : ''}`}
                  key={capability.number}
                  aria-hidden={activeIndex !== index}
                >
                    <div className="capability-title-row">
                      <span className="capability-copy-mark" aria-hidden="true" />
                      <h3>{capability.title}</h3>
                    </div>
                    <p>{capability.description}</p>
                  </div>
              ))}
            </div>

            <div className="right-artifact-viewport" aria-label="Capability visualization">
              <div
                className="right-artifact-track"
                style={{ transform: `translate3d(0, -${artifactProgress * 25}%, 0)` }}
              >
                {capabilities.map((capability) => {
                  const Artifact = artifactComponents[capability.artifact]
                  return (
                    <div className="right-artifact-slide" key={capability.number}>
                      <Artifact />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Platform
