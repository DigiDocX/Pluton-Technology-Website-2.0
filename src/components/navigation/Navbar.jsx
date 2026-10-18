import { useState } from 'react'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <a className="brand" href="#home" aria-label="Pluton Technologies home" onClick={closeMenu}>
          <img src="/images/brand/Pluton%20Logo.png" alt="" className="brand-mark" />
          <span>Pluton</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>

        <div
          className={`navigation-content${menuOpen ? ' is-open' : ''}`}
          id="primary-navigation"
        >
          <div className="navigation-links">
            <a href="#platform" onClick={closeMenu}>Platform</a>
            <a href="#company" onClick={closeMenu}>Company</a>
            <a href="#careers" onClick={closeMenu}>Careers</a>
          </div>
          <div className="navigation-actions">
            <a className="contact-link" href="#contact" onClick={closeMenu}>Contact</a>
            <a className="nav-cta" href="#contact" onClick={closeMenu}>Book a Demo</a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
