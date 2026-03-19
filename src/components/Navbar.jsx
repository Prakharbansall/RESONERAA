import React, { useState, useEffect } from "react";
const links = ["Home","Company","Platform","Insights","Contact"];
export default function Navbar({ activePage, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <>
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <button className="nav__logo" onClick={() => { onNav("home"); setMenuOpen(false); }}>
          <span className="nav__logo-mark">◈</span>
          <span className="nav__logo-text">RESONERA<span className="nav__logo-ai">AI</span></span>
        </button>
        <ul className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
          {links.map(l => (
            <li key={l}>
              <button className={`nav__link ${activePage === l.toLowerCase() ? "nav__link--active" : ""}`}
                onClick={() => { onNav(l.toLowerCase()); setMenuOpen(false); }}>{l}</button>
            </li>
          ))}
        </ul>
        <button className="nav__cta" onClick={() => { onNav("contact"); setMenuOpen(false); }}>Get Started</button>
        <button className={`nav__burger ${menuOpen ? "nav__burger--open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <style>{`
        .nav{position:fixed;top:0;left:0;right:0;z-index:1000;display:flex;align-items:center;justify-content:space-between;padding:22px 80px;transition:all .4s ease;}
        .nav--scrolled{background:rgba(5,5,12,.94);backdrop-filter:blur(24px);padding:14px 80px;border-bottom:1px solid rgba(0,255,163,.08);}
        .nav__logo{display:flex;align-items:center;gap:10px;background:none;border:none;cursor:none;}
        .nav__logo-mark{font-size:1.4rem;color:var(--accent);animation:pulse-glow 3s ease-in-out infinite;}
        .nav__logo-text{font-family:'Space Mono',monospace;font-size:.95rem;font-weight:700;color:var(--fg);letter-spacing:.15em;}
        .nav__logo-ai{color:var(--accent);}
        .nav__links{display:flex;gap:40px;list-style:none;}
        .nav__link{font-family:'Space Mono',monospace;font-size:.72rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;background:none;border:none;color:var(--fg-muted);position:relative;padding:4px 0;transition:color .2s;cursor:none;}
        .nav__link::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1.5px;background:var(--accent);transition:width .3s ease;}
        .nav__link:hover,.nav__link--active{color:var(--accent);}
        .nav__link:hover::after,.nav__link--active::after{width:100%;}
        .nav__cta{font-family:'Space Mono',monospace;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--bg);background:var(--accent);padding:10px 22px;border:none;border-radius:3px;cursor:none;transition:all .3s;}
        .nav__cta:hover{background:var(--accent-bright);box-shadow:0 0 22px rgba(0,255,163,.38);}
        .nav__burger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:none;padding:4px;z-index:10;}
        .nav__burger span{display:block;width:24px;height:2px;background:var(--accent);transition:all .3s;}
        .nav__burger--open span:nth-child(1){transform:translateY(7px) rotate(45deg);}
        .nav__burger--open span:nth-child(2){opacity:0;}
        .nav__burger--open span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
        @media(max-width:860px){
          .nav,.nav--scrolled{padding:18px 24px;}
          .nav__links{display:none;position:fixed;top:0;left:0;right:0;bottom:0;flex-direction:column;align-items:center;justify-content:center;gap:32px;background:rgba(5,5,12,.98);backdrop-filter:blur(24px);}
          .nav__links--open{display:flex;}
          .nav__link{font-size:1.1rem;}
          .nav__cta{display:none;}
          .nav__burger{display:flex;}
        }
      `}</style>
    </>
  );
}