import './Hero.css'

function Hero() {
  return (
    <section className="hero-section" id="home" aria-labelledby="hero-title">
      <div className="hero-artwork" aria-hidden="true">
        <img
          src="/images/hero/pluton-hero-landscape.png"
          alt=""
          fetchPriority="high"
        />
      </div>
      <div className="hero-artwork-fade" aria-hidden="true" />
      <div className="hero-copy">
        <p className="hero-eyebrow">
          Document Intelligence <span aria-hidden="true">•</span> Enterprise AI
        </p>
        <h1 id="hero-title">
          <span className="headline-line">
            The document{' '}
            <span className="headline-accent">{'{Intelligence}'}</span>
          </span>
          <span className="headline-line">layer for enterprise AI</span>
        </h1>
        <p className="hero-description">
          Pluton transforms complex, unstructured business information into
          structured, contextual, machine-processable data for software,
          workflows and AI systems.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#contact">
            Book a Demo <span className="button-arrow" aria-hidden="true">↗</span>
          </a>
          <a className="button button-secondary" href="#platform">Explore The Platform</a>
        </div>
      </div>
    </section>
  )
}

export default Hero
