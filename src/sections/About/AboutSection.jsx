import { motion, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import capabilityStages from './aboutData.js'
import './AboutSection.css'

const SECTION_SCROLL_VIEWPORTS = 2.8
const VISUAL_STATES = [<InputFormatsVisual key="input-formats" />]

function getCapabilityProgress(stage, sectionProgress) {
  if (sectionProgress <= stage.progressStart) return stage.initialProgress

  const stageProgress = Math.min(
    1,
    (sectionProgress - stage.progressStart) / (stage.progressEnd - stage.progressStart),
  )

  return stage.initialProgress + (stage.progressTarget - stage.initialProgress) * stageProgress
}

function CapabilityStage({ stage, sectionProgress }) {
  const progress = useTransform(sectionProgress, (value) => getCapabilityProgress(stage, value))
  const progressRef = useRef(null)

  useMotionValueEvent(progress, 'change', (value) => {
    progressRef.current?.setAttribute('aria-valuenow', String(Math.round(value * 100)))
  })

  return (
    <li className="about-capability-stage">
      <div className="about-stage-heading">
        <span className="about-stage-number">{stage.number}</span>
        <h3>{stage.title}</h3>
      </div>
      <div
        className="about-progress-track"
        role="progressbar"
        aria-label={`${stage.title} progress`}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(stage.initialProgress * 100)}
        ref={progressRef}
      >
        <motion.span className="about-progress-fill" style={{ scaleX: progress }} />
      </div>
    </li>
  )
}

function InputFormatsVisual() {
  return (
    <div className="about-visual-state">
      <strong className="about-visual-metric">4+</strong>
      <span className="about-visual-label">[ INPUT FORMATS ]</span>
      <p>PDF • images • scans • DOCX</p>
    </div>
  )
}

function IntelligenceVisual({ sectionProgress }) {
  const visualOffset = useTransform(sectionProgress, (progress) => `${progress * -25}%`)

  return (
    <aside className="about-visual-viewport" aria-label="Input formats visualization">
      <motion.div className="about-visual-track" style={{ y: visualOffset }}>
        {VISUAL_STATES.map((visual) => (
          <div className="about-visual-slot" key={visual.key}>
            {visual}
          </div>
        ))}
        {Array.from({ length: 3 }, (_, index) => (
          <div className="about-visual-slot" aria-hidden="true" key={`reserved-state-${index + 2}`} />
        ))}
      </motion.div>
    </aside>
  )
}

function useAboutScrollProgress(sectionRef, enabled) {
  const progress = useMotionValue(0)

  useEffect(() => {
    if (!enabled) {
      progress.set(0)
      return undefined
    }

    let frameId = 0

    const updateProgress = () => {
      if (frameId) return

      frameId = window.requestAnimationFrame(() => {
        frameId = 0
        const section = sectionRef.current
        if (!section) return

        const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight)
        const distanceTravelled = -section.getBoundingClientRect().top
        progress.set(Math.max(0, Math.min(1, distanceTravelled / scrollDistance)))
      })
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [enabled, progress, sectionRef])

  return progress
}

function AboutSection() {
  const sectionRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 901px)').matches)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const scrollDriven = isDesktop && !prefersReducedMotion
  const sectionProgress = useAboutScrollProgress(sectionRef, !prefersReducedMotion)

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 901px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateViewport = () => setIsDesktop(desktopQuery.matches)
    const updateMotionPreference = () => setPrefersReducedMotion(motionQuery.matches)

    desktopQuery.addEventListener('change', updateViewport)
    motionQuery.addEventListener('change', updateMotionPreference)
    return () => {
      desktopQuery.removeEventListener('change', updateViewport)
      motionQuery.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  return (
    <section
      className={`about-section${scrollDriven ? ' is-scroll-driven' : ''}`}
      id="about-pluton"
      ref={sectionRef}
      style={scrollDriven ? { '--about-scroll-height': `${SECTION_SCROLL_VIEWPORTS * 100}vh` } : undefined}
    >
      <div className="about-story">
        <div className="about-container">
          <header className="about-intro">
            <div className="about-intro-copy">
              <p className="about-eyebrow">ABOUT PLUTON</p>
              <h2>We build the intelligence layer between enterprise information and AI.</h2>
              <p className="about-description">
                Pluton transforms complex enterprise information into structured, contextual data
                that software, workflows, and AI can understand and act on.
              </p>
            </div>
            <a className="about-cta" href="#contact">
              Book a Demo <span aria-hidden="true">→</span>
            </a>
          </header>

          <div className="about-frame">
            <ol className="about-capability-list" aria-label="Pluton capability stages">
              {capabilityStages.map((stage) => (
                <CapabilityStage
                  key={stage.number}
                  stage={stage}
                  sectionProgress={sectionProgress}
                />
              ))}
            </ol>
            <IntelligenceVisual sectionProgress={sectionProgress} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
