import React from "react";
import aiImg from "../assets/ai.jpg";

export default function Footer({ onNav }) {

  const companyLinks = ["Home", "Company", "Platform", "Insights", "Contact"];

  return (
    <>
      <footer className="footer">
        <div className="footer-rule" />

        <div className="footer-inner">
          {/* ── Brand & Identity ── */}
          <div className="footer-brand">
            <button className="footer-logo" onClick={() => onNav("home")}>
              <img src={aiImg} alt="ResoneraAI logo" className="footer-logo-img" />
              <span className="footer-logo-name">ResoneraAI Pvt. Ltd.</span>
            </button>

            <p className="footer-tagline">
              Intelligent systems that<br />create real impact.
            </p>
            
            <div className="footer-status-tag">
              Initiative under development
            </div>
          </div>

          {/* ── Navigation ── */}
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

          {/* ── Contact & Jurisdiction ── */}
          <div className="footer-col">
            <p className="footer-col-heading">Contact</p>
            <div className="footer-contact-list">
              <a href="mailto:hello@resoneraaipvtltd.in" className="footer-contact-item footer-contact-link">
                hello@resoneraaipvtltd.in
              </a>
              <span className="footer-contact-item">  </span>
              <span className="footer-contact-item footer-address">
                Borivali East,<br />
                Mumbai – 400066,<br />
                Maharashtra, India
              </span>
              <span className="footer-jurisdiction">
                Jurisdiction: Mumbai, IN
              </span>
            </div>
          </div>
        </div>

        {/* ── Legal & Compliance Bar ── */}
        <div className="footer-bottom">
          <div className="footer-legal-group">
            <span className="footer-copy">
              © ResoneraAI Private Limited.
            </span>
            
          </div>
          
          <div className="footer-legal">
            <button className="footer-legal-link" onClick={() => onNav("legal")}>Privacy & Terms</button>
          </div>
        </div>
      </footer>

      <style>{`
        .footer {
          --rose-50: #fff5f7;
          --rose-100: #ffe4ea;
          --rose-200: #ffc1cc;
          --rose-500: #e8294c;
          --text-primary: #1a1014;
          --text-secondary: #6b5059;
          --text-muted: #9d8089;
          --border-soft: rgba(232, 41, 76, 0.12);

          font-family: 'DM Sans', system-ui, sans-serif;
          background: var(--rose-50);
          padding: 0 24px;
        }

        .footer-rule {
          max-width: 1120px;
          margin: 0 auto;
          height: 1px;
          background: var(--border-soft);
        }

        .footer-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 72px 0 56px;
          display: grid;
          grid-template-columns: 2.2fr 1fr 1.4fr;
          gap: 48px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          margin-bottom: 16px;
        }

        .footer-logo-img {
          width: 60px;
          height: 48px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid var(--rose-100);
        }

        .footer-logo-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .footer-tagline {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .footer-status-tag {
          display: inline-block;
          font-size: 0.7rem;
          color: var(--rose-500);
          background: var(--rose-100);
          padding: 4px 10px;
          border-radius: 4px;
          font-weight: 600;
        }

        .footer-col-heading {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--rose-500);
          margin-bottom: 24px;
        }

        .footer-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-nav-link {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 0.9rem;
          text-align: left;
          cursor: pointer;
          padding: 4px 0;
          transition: 0.2s;
        }

        .footer-nav-link:hover { color: var(--rose-500); }

        .footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-contact-item {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .footer-contact-link {
          text-decoration: none;
          font-weight: 500;
        }

        .footer-contact-link:hover { color: var(--rose-500); }

        .footer-address { color: var(--text-muted); line-height: 1.5; }

        .footer-jurisdiction {
          font-size: 0.75rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border-soft);
          padding-top: 8px;
          margin-top: 4px;
        }

        .footer-bottom {
          max-width: 1120px;
          margin: 0 auto;
          padding: 24px 0 40px;
          border-top: 1px solid var(--border-soft);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-legal-group { display: flex; flex-direction: column; gap: 4px; }

        .footer-copy { font-size: 0.75rem; color: var(--text-primary); font-weight: 500; }

        .footer-update-tag { font-size: 0.7rem; color: var(--text-muted); }

        .footer-legal { display: flex; gap: 24px; }

        .footer-legal-link {
          background: none;
          border: none;
          font-size: 0.75rem;
          color: var(--text-muted);
          cursor: pointer;
          transition: 0.2s;
        }

        .footer-legal-link:hover { color: var(--rose-500); }

        @media (max-width: 768px) {
          .footer-inner { grid-template-columns: 1fr; gap: 40px; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 20px; }
        }
      `}</style>
    </>
  );
}
