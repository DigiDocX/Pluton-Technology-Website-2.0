import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import faqData from './faqData.js'
import './FAQSection.css'

function FAQSection() {
  const [openId, setOpenId] = useState('01')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = (event) => setPrefersReducedMotion(event.matches)
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <div className="faq-container">
        <header className="faq-header">
          <p className="faq-eyebrow">BEYOND DOCUMENT PROCESSING</p>
          <h2 id="faq-title">
            Questions worth
            <br className="faq-heading-break" />
            {' '}
            asking
          </h2>
          <p className="faq-description">
            A few answers to the questions we hear most often about Pluton, our
            platform, and where we’re building next.
          </p>
        </header>

        <div className="faq-list" role="region" aria-label="Frequently Asked Questions">
          {faqData.map((item) => {
            const isOpen = openId === item.id
            return (
              <article
                className={`faq-item${isOpen ? ' is-open' : ''}`}
                key={item.id}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  id={`faq-btn-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="faq-question-title-group">
                    <span className="faq-number" aria-hidden="true">{item.id}</span>
                    <span className="faq-divider" aria-hidden="true">/</span>
                    <span className="faq-question-text">{item.question}</span>
                  </div>

                  <span className="faq-toggle-icon" aria-hidden="true">
                    <span className="faq-icon-line faq-icon-horizontal" />
                    <span className={`faq-icon-line faq-icon-vertical${isOpen ? ' is-open' : ''}`} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${item.id}`}
                      className="faq-answer-wrapper"
                      initial={prefersReducedMotion ? { opacity: 1, height: 'auto' } : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={prefersReducedMotion ? { opacity: 0, height: 0 } : { height: 0, opacity: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
                      }
                    >
                      <div className="faq-answer-inner">
                        <p className="faq-answer-text">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
