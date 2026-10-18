import { Mail, Phone } from 'lucide-react'
import './FooterSection.css'

const footerColumns = [
    {
        title: 'COMPANY',
        links: [
            { label: 'Platform', href: '#platform' },
            { label: 'Company', href: '#company' },
            { label: 'Careers', href: '#careers' },
            { label: 'Contact', href: '#contact' },
            { label: 'Investors', href: '#' },
        ],
    },
    {
        title: 'SCANO',
        links: [
            { label: 'The App', href: '#' },
            { label: 'App Privacy Policy', href: '#' },
            { label: 'App Terms', href: '#' },
            { label: 'Delete Account', href: '#' },
        ],
    },
    {
        title: 'LEGAL',
        links: [
            { label: 'Privacy & DPDP', href: '#' },
            { label: 'Terms of Use', href: '#' },
        ],
    },
]

function FooterSection() {
    return (
        <footer className="footer" id="footer">
            <div className="footer-container">

                <div className="footer-main">

                    <div className="footer-brand">

                        <a
                            className="footer-logo"
                            href="#top"
                            aria-label="Pluton home"
                        >
                            <img
                                src="/images/brand/Pluton%20Logo.png"
                                alt="Pluton"
                                className="footer-logo-image"
                            />
                            <span className="footer-logo-name">Pluton</span>
                        </a>

                        <p className="footer-tagline">
                            BUILD THE INTELLIGENCE LAYER
                            <br />
                            FOR ENTERPRISE AI.
                        </p>

                        <div className="footer-contact">

                            <a
                                href="mailto:support@plutontechnology.com"
                                className="footer-contact-item"
                            >
                                <span className="footer-contact-icon">
                                    <Mail size={16} strokeWidth={1.5} />
                                </span>

                                <span>support@plutontechnology.com</span>
                            </a>

                            <a
                                href="tel:+919054237669"
                                className="footer-contact-item"
                            >
                                <span className="footer-contact-icon">
                                    <Phone size={16} strokeWidth={1.5} />
                                </span>

                                <span>+91 90542 37669</span>
                            </a>

                        </div>
                    </div>

                    <nav
                        className="footer-navigation"
                        aria-label="Footer navigation"
                    >
                        {footerColumns.map((column) => (
                            <div className="footer-column" key={column.title}>

                                <h2>{column.title}</h2>

                                <ul>
                                    {column.links.map((link) => (
                                        <li key={link.label}>
                                            <a href={link.href}>
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        ))}
                    </nav>

                </div>

                <div className="footer-bottom">
                    <p>
                        © 2026 Pluton Technologies (OPC) Private Limited. All rights reserved.
                    </p>
                </div>

                <div className="footer-wordmark" aria-hidden="true">
                    <svg
                        className="footer-wordmark-svg"
                        viewBox="0 0 1600 330"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <text
                            x="800"
                            y="315"
                            textAnchor="middle"
                            className="footer-wordmark-text"
                        >
                            PLUTON
                        </text>
                    </svg>
                </div>

            </div>
        </footer>
    )
}

export default FooterSection