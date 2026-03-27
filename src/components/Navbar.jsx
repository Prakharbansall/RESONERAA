import React, { useState, useEffect } from "react";
import aiImg from "../assets/ai.jpg";

const links = ["Home", "Company", "Platform", "Insights"];

export default function Navbar({ activePage, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = (page) => {
    onNav(page);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav-inner">

          {/* ── Logo ── */}
          <button className="nav-logo" onClick={() => window.location.href = 'https://resoneraaipvtltd.in/'}>
            <img src={aiImg} alt="ResoneraAI" className="nav-logo-img" />
            <span className="nav-logo-word">Resonera<span className="nav-logo-ai">AI</span></span>
            
          </button>

          {/* ── Desktop links ── */}
          <ul className="nav-links" role="list">
            {links.map((l) => {
              const active = activePage === l.toLowerCase();
              return (
                <li key={l}>
                  <button
                    className={`nav-link ${active ? "nav-link--active" : ""}`}
                    onClick={() => handleNav(l.toLowerCase())}
                    aria-current={active ? "page" : undefined}
                  >
                    {l}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ── Desktop CTA ── */}
          <div className="nav-actions">

            <button
              className="nav-cta"
              onClick={() => handleNav("contact")}
            >
              Get Started
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* ── Burger (mobile) ── */}
          <button
            className={`nav-burger ${menuOpen ? "nav-burger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className="burger-bar" />
            <span className="burger-bar" />
            <span className="burger-bar" />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div
        className={`nav-drawer ${menuOpen ? "nav-drawer--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="nav-drawer-inner">
          <ul className="nav-drawer-links" role="list">
            {links.map((l) => {
              const active = activePage === l.toLowerCase();
              return (
                <li key={l}>
                  <button
                    className={`nav-drawer-link ${active ? "nav-drawer-link--active" : ""}`}
                    onClick={() => handleNav(l.toLowerCase())}
                    tabIndex={menuOpen ? 0 : -1}
                  >
                    {l}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="nav-drawer-actions">
            <button
              className="nav-drawer-cta-ghost"
              onClick={() => handleNav("contact")}
              tabIndex={menuOpen ? 0 : -1}
            >
              Sign in
            </button>
            <button
              className="nav-drawer-cta"
              onClick={() => handleNav("contact")}
              tabIndex={menuOpen ? 0 : -1}
            >
              Get Started →
            </button>
          </div>
        </div>
      </div>

      {/* ── Backdrop ── */}
      {menuOpen && (
        <div
          className="nav-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <style>{`
        /* ── Tokens ──────────────────────────────────── */
        .nav {
          --rose-500:   #e8294c;
          --rose-600:   #c41f3e;
          --rose-50:    #fff5f7;
          --rose-100:   #ffe4ea;
          --rose-200:   #ffc1cc;
          --text-primary:   #1a1014;
          --text-secondary: #6b5059;
          --border-soft:    rgba(232, 41, 76, 0.12);

          position:      fixed;
          top:           0;
          left:          0;
          right:         0;
          z-index:       1000;
          padding:       0 32px;
          transition:    background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease;
        }

        /* Transparent on top, frosted when scrolled */
        .nav--scrolled {
          background:    rgba(255, 245, 247, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:    0 1px 0 var(--border-soft), 0 4px 24px rgba(232,41,76,0.06);
        }

        /* ── Inner layout ────────────────────────────── */
        .nav-inner {
          max-width:      1120px;
          margin:         0 auto;
          height:         68px;
          display:        flex;
          align-items:    center;
          justify-content: space-between;
          gap:            24px;
        }

        /* ── Logo ────────────────────────────────────── */
        .nav-logo {
          display:     flex;
          align-items: center;
          gap:         9px;
          background:  none;
          border:      none;
          cursor:      pointer;
          flex-shrink: 0;
          padding:     0;
        }

        .nav-logo-img {
          width:         67px;
          height:        52px;
          border-radius: 8px;
          object-fit:    cover;
          border:        1.5px solid var(--rose-200);
          flex-shrink:   0;
        }

        .nav-logo-word {
          font-family:    'DM Sans', system-ui, sans-serif;
          font-size:      1.05rem;
          font-weight:    700;
          letter-spacing: -0.025em;
          color:          var(--text-primary);
        }

        .nav-logo-ai {
          font-family:    'DM Sans', system-ui, sans-serif;
          font-size:      1.05rem;
          font-weight:    700;
          letter-spacing: -0.025em;
          color:          var(--rose-500);
        }

        /* ── Desktop nav links ───────────────────────── */
        .nav-links {
          display:     flex;
          align-items: center;
          gap:         4px;
          list-style:  none;
          margin:      0;
          padding:     0;
        }

        .nav-link {
          font-family:  'DM Sans', system-ui, sans-serif;
          font-size:    0.9rem;
          font-weight:  500;
          color:        var(--text-secondary);
          background:   none;
          border:       none;
          cursor:       pointer;
          padding:      6px 14px;
          border-radius: 8px;
          transition:   color 0.16s ease, background 0.16s ease;
          position:     relative;
        }

        .nav-link:hover {
          color:      var(--text-primary);
          background: var(--rose-50);
        }

        .nav-link--active {
          color:      var(--rose-500);
          background: var(--rose-50);
          font-weight: 600;
        }

        /* Dot indicator for active */
        .nav-link--active::after {
          content:       '';
          position:      absolute;
          bottom:        -2px;
          left:          50%;
          transform:     translateX(-50%);
          width:         4px;
          height:        4px;
          border-radius: 50%;
          background:    var(--rose-500);
        }

        /* ── Desktop actions ─────────────────────────── */
        .nav-actions {
          display:     flex;
          align-items: center;
          gap:         8px;
          flex-shrink: 0;
        }

        .nav-cta-ghost {
          font-family:  'DM Sans', system-ui, sans-serif;
          font-size:    0.9rem;
          font-weight:  500;
          color:        var(--text-secondary);
          background:   none;
          border:       none;
          cursor:       pointer;
          padding:      8px 14px;
          border-radius: 8px;
          transition:   color 0.16s ease, background 0.16s ease;
        }

        .nav-cta-ghost:hover {
          color:      var(--text-primary);
          background: var(--rose-50);
        }

        .nav-cta {
          display:        inline-flex;
          align-items:    center;
          gap:            7px;
          font-family:    'DM Sans', system-ui, sans-serif;
          font-size:      0.9rem;
          font-weight:    600;
          color:          #fff;
          background:     var(--rose-500);
          border:         none;
          border-radius:  9px;
          padding:        9px 20px;
          cursor:         pointer;
          transition:     background 0.16s ease, box-shadow 0.16s ease, transform 0.14s ease;
          box-shadow:     0 1px 2px rgba(232,41,76,0.18), 0 3px 10px rgba(232,41,76,0.14);
        }

        .nav-cta svg {
          transition: transform 0.18s ease;
        }

        .nav-cta:hover {
          background:  var(--rose-600);
          box-shadow:  0 2px 4px rgba(232,41,76,0.22), 0 6px 18px rgba(232,41,76,0.2);
          transform:   translateY(-1px);
        }

        .nav-cta:hover svg {
          transform: translateX(2px);
        }

        .nav-cta:active {
          transform:  translateY(0);
          box-shadow: 0 1px 2px rgba(232,41,76,0.18);
        }

        .nav-cta:focus-visible,
        .nav-cta-ghost:focus-visible,
        .nav-link:focus-visible,
        .nav-logo:focus-visible {
          outline:        2px solid var(--rose-500);
          outline-offset: 3px;
        }

        /* ── Burger ──────────────────────────────────── */
        .nav-burger {
          display:        none;
          flex-direction: column;
          gap:            5px;
          background:     none;
          border:         none;
          cursor:         pointer;
          padding:        6px;
          border-radius:  8px;
          z-index:        1100;
          flex-shrink:    0;
          transition:     background 0.16s ease;
        }

        .nav-burger:hover {
          background: var(--rose-50);
        }

        .burger-bar {
          display:       block;
          width:         22px;
          height:        2px;
          border-radius: 2px;
          background:    var(--text-primary);
          transition:    transform 0.25s ease, opacity 0.2s ease;
          transform-origin: center;
        }

        .nav-burger--open .burger-bar:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .nav-burger--open .burger-bar:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .nav-burger--open .burger-bar:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* ── Mobile drawer ───────────────────────────── */
        .nav-drawer {
          position:      fixed;
          top:           0;
          right:         0;
          bottom:        0;
          width:         min(320px, 88vw);
          background:    #fff;
          z-index:       1050;
          transform:     translateX(100%);
          transition:    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow:    -4px 0 32px rgba(232,41,76,0.08);
          overflow-y:    auto;
        }

        .nav-drawer--open {
          transform: translateX(0);
        }

        .nav-drawer-inner {
          padding: 96px 28px 40px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-height: 100%;
        }

        .nav-drawer-links {
          list-style: none;
          margin:     0;
          padding:    0;
          display:    flex;
          flex-direction: column;
          gap:        2px;
        }

        .nav-drawer-link {
          display:      block;
          width:        100%;
          font-family:  'DM Sans', system-ui, sans-serif;
          font-size:    1.05rem;
          font-weight:  500;
          color:        var(--text-secondary);
          background:   none;
          border:       none;
          cursor:       pointer;
          padding:      12px 16px;
          border-radius: 10px;
          text-align:   left;
          transition:   color 0.16s ease, background 0.16s ease;
        }

        .nav-drawer-link:hover {
          color:      var(--text-primary);
          background: var(--rose-50);
        }

        .nav-drawer-link--active {
          color:       var(--rose-500);
          background:  var(--rose-50);
          font-weight: 600;
        }

        .nav-drawer-actions {
          margin-top:     auto;
          padding-top:    32px;
          display:        flex;
          flex-direction: column;
          gap:            10px;
        }

        .nav-drawer-cta-ghost {
          font-family:  'DM Sans', system-ui, sans-serif;
          font-size:    0.95rem;
          font-weight:  500;
          color:        var(--text-secondary);
          background:   none;
          border:       1.5px solid var(--rose-200);
          cursor:       pointer;
          padding:      13px 20px;
          border-radius: 10px;
          text-align:   center;
          transition:   border-color 0.16s ease, background 0.16s ease;
        }

        .nav-drawer-cta-ghost:hover {
          border-color: var(--rose-500);
          background:   var(--rose-50);
        }

        .nav-drawer-cta {
          font-family:  'DM Sans', system-ui, sans-serif;
          font-size:    0.95rem;
          font-weight:  600;
          color:        #fff;
          background:   var(--rose-500);
          border:       none;
          cursor:       pointer;
          padding:      13px 20px;
          border-radius: 10px;
          text-align:   center;
          box-shadow:   0 2px 12px rgba(232,41,76,0.2);
          transition:   background 0.16s ease;
        }

        .nav-drawer-cta:hover {
          background: var(--rose-600);
        }

        /* ── Backdrop ────────────────────────────────── */
        .nav-backdrop {
          position:   fixed;
          inset:      0;
          z-index:    1040;
          background: rgba(26, 16, 20, 0.28);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          animation:  fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Responsive breakpoints ──────────────────── */
        @media (max-width: 860px) {
          .nav { padding: 0 20px; }
          .nav-links,
          .nav-actions { display: none; }
          .nav-burger   { display: flex; }
        }

        @media (max-width: 480px) {
          .nav-logo-word,
          .nav-logo-ai {
            font-size: 0.97rem;
          }
        }
      `}</style>
    </>
  );
}