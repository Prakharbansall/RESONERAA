import React from "react";
import aiImg from "../assets/ai.jpg";


export default function Footer({ onNav }) {
  const year = new Date().getFullYear();

  const companyLinks = ["Home", "Company", "Platform", "Insights", "Contact"];



  return (
    <>
      <footer className="footer">
        {/* Top divider line */}
        <div className="footer-rule" />

        <div className="footer-inner">
          {/* Brand column */}
          <div className="footer-brand">
            <button className="footer-logo" onClick={() => onNav("home")}>
              <img src={aiImg} alt="ResoneraAI logo" className="footer-logo-img" />
              <span className="footer-logo-name">ResoneraAI Pvt. Ltd. </span>
            </button>

            <p className="footer-tagline">
              Intelligent systems that<br />create real impact.
            </p>

            
          </div>

          {/* Company links */}
          <div className="footer-col">
            <p className="footer-col-heading">Company</p>
            <nav className="footer-nav">
              {companyLinks.map((link) => (
                <button
                  key={link}
                  className="footer-nav-link"
                  onClick={() => onNav(link.toLowerCase())}
                >
                  {link}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <p className="footer-col-heading">Contact</p>
            <div className="footer-contact-list">
              <a href="mailto:hello@resoneraai.com" className="footer-contact-item footer-contact-link">
                hello@resoneraai.com
              </a>
              <span className="footer-contact-item">+91 98000 00000</span>
              <span className="footer-contact-item footer-address">
                Borivali East,<br />Mumbai – 400066,<br />Maharashtra, India
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span className="footer-copy">
            © ResoneraAI Pvt. Ltd. All rights reserved.
          </span>
          <div className="footer-legal">
            <button className="footer-legal-link" onClick={() => onNav("legal")}>Privacy</button>
            <button className="footer-legal-link" onClick={() => onNav("legal")}>Terms</button>
          </div>
        </div>
      </footer>

      <style>{`
        /* ── Design tokens ─────────────────────────── */
        .footer {
          --rose-50:  #fff5f7;
          --rose-100: #ffe4ea;
          --rose-200: #ffc1cc;
          --rose-500: #e8294c;
          --rose-600: #c41f3e;
          --text-primary:   #1a1014;
          --text-secondary: #6b5059;
          --text-muted:     #9d8089;
          --border-soft:    rgba(232, 41, 76, 0.12);

          font-family: 'DM Sans', system-ui, sans-serif;
          background: var(--rose-50);
          padding: 0 24px 0;
        }

        /* ── Top rule ──────────────────────────────── */
        .footer-rule {
          max-width: 1120px;
          margin: 0 auto;
          height: 1px;
          background: var(--border-soft);
        }

        /* ── Inner grid ────────────────────────────── */
        .footer-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 72px 0 56px;
          display: grid;
          grid-template-columns: 2.2fr 1fr 1.4fr;
          gap: 48px;
        }

        /* ── Brand ─────────────────────────────────── */
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          margin-bottom: 20px;
        }

        .footer-logo-img {
          width: 67px;
          height: 52px;
          border-radius: 9px;
          object-fit: cover;
          border: 0.4px solid var(--rose-200);
        }

        .footer-logo-name {
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        .footer-tagline {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--text-secondary);
          margin: 0 0 28px;
          max-width: 240px;
        }

        .footer-social {
          display: flex;
          gap: 4px;
        }

        .footer-social-link {
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: var(--text-muted);
          text-decoration: none;
          padding: 5px 10px;
          border-radius: 20px;
          border: 1px solid var(--border-soft);
          transition: color 0.18s ease, border-color 0.18s ease, background 0.18s ease;
        }

        .footer-social-link:hover {
          color: var(--rose-500);
          border-color: var(--rose-200);
          background: var(--rose-100);
        }

        /* ── Column heading ────────────────────────── */
        .footer-col-heading {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--rose-500);
          margin: 0 0 20px;
        }

        /* ── Navigation links ──────────────────────── */
        .footer-nav {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .footer-nav-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.9rem;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 0;
          text-align: left;
          transition: color 0.16s ease, transform 0.16s ease;
          width: fit-content;
        }

        .footer-nav-link::before {
          content: '';
          display: block;
          width: 0;
          height: 1px;
          background: var(--rose-500);
          transition: width 0.2s ease;
          flex-shrink: 0;
        }

        .footer-nav-link:hover {
          color: var(--rose-500);
        }

        .footer-nav-link:hover::before {
          width: 12px;
        }

        /* ── Contact ───────────────────────────────── */
        .footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-contact-item {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        .footer-contact-link {
          text-decoration: none;
          transition: color 0.16s ease;
        }

        .footer-contact-link:hover {
          color: var(--rose-500);
        }

        .footer-address {
          color: var(--text-muted);
          font-size: 0.84rem;
        }

        /* ── Bottom bar ────────────────────────────── */
        .footer-bottom {
          max-width: 1120px;
          margin: 0 auto;
          padding: 20px 0 32px;
          border-top: 1px solid var(--border-soft);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .footer-copy {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .footer-legal {
          display: flex;
          gap: 20px;
        }

        .footer-legal-link {
          font-size: 0.78rem;
          color: var(--text-muted);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.16s ease;
        }

        .footer-legal-link:hover {
          color: var(--rose-500);
        }

        /* ── Responsive ────────────────────────────── */
        @media (max-width: 860px) {
          .footer-inner {
            grid-template-columns: 1fr 1fr;
            padding: 56px 0 40px;
          }

          .footer-brand {
            grid-column: 1 / -1;
          }

          .footer-tagline {
            max-width: 100%;
          }
        }

        @media (max-width: 520px) {
          .footer-inner {
            grid-template-columns: 1fr;
            gap: 36px;
            padding: 48px 0 36px;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}</style>
    </>
  );
}