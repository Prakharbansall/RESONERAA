import React from "react";
export default function Footer({ onNav }) {
  const year = new Date().getFullYear();
  const navLinks = ["Home","Company","Platform","Insights","Contact"];
  const services = ["AI Consulting","Custom ML Models","NLP Solutions","AI Integration","Data Strategy","Computer Vision"];
  return (
    <>
      <footer className="footer">
        <div className="footer__top-line" />
        <div className="footer__inner">
          <div className="footer__brand">
            <button className="footer__logo" onClick={() => onNav("home")}>
              <span className="footer__logo-mark">◈</span>
              <span className="footer__logo-text">RESONERA<span style={{color:"var(--accent)"}}>AI</span></span>
            </button>
            <p className="footer__tagline">Intelligent systems.<br/>Transformative outcomes.</p>
            <p className="footer__cin">RESONERAAI PRIVATE LIMITED<br/>Mumbai · Maharashtra · India</p>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Navigate</h4>
            {navLinks.map(l => (
              <button key={l} className="footer__link" onClick={() => onNav(l.toLowerCase())}>{l}</button>
            ))}
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Services</h4>
            {services.map(s => <span key={s} className="footer__link footer__link--static">{s}</span>)}
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <a href="mailto:hello@resoneraai.com" className="footer__link footer__link--a">hello@resoneraai.com</a>
            <span className="footer__link footer__link--static">+91 98000 00000</span>
            <span className="footer__link footer__link--static footer__addr">
              Room No.2, Kore Sankalp,<br/>Siddhi Chawl, Chougle Nag,<br/>Borivali East, Mumbai 400066<br/>Maharashtra, India
            </span>
          </div>
        </div>
        <div className="footer__bottom">
          <span className="footer__copy">© {year} RESONERAAI PRIVATE LIMITED. All rights reserved.</span>
          <span className="footer__legal">Designed & Built in India 🇮🇳</span>
        </div>
      </footer>
      <style>{`
        .footer{background:var(--bg-2);border-top:1px solid var(--border);padding:80px 80px 40px;position:relative;overflow:hidden;}
        .footer::before{content:'';position:absolute;bottom:-150px;right:-100px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(0,255,163,.03) 0%,transparent 70%);pointer-events:none;}
        .footer__top-line{position:absolute;top:0;left:80px;right:80px;height:1px;background:linear-gradient(90deg,transparent,rgba(0,255,163,.25),transparent);}
        .footer__inner{display:grid;grid-template-columns:2fr 1fr 1fr 1.6fr;gap:60px;margin-bottom:60px;}
        .footer__logo{display:flex;align-items:center;gap:10px;background:none;border:none;cursor:none;margin-bottom:18px;}
        .footer__logo-mark{font-size:1.4rem;color:var(--accent);}
        .footer__logo-text{font-family:'Space Mono',monospace;font-size:.92rem;font-weight:700;color:var(--fg);letter-spacing:.15em;}
        .footer__tagline{font-family:'Crimson Pro',serif;font-size:1.05rem;color:var(--fg-muted);line-height:1.75;margin-bottom:16px;}
        .footer__cin{font-family:'Space Mono',monospace;font-size:.62rem;color:rgba(255,255,255,.22);letter-spacing:.08em;line-height:1.8;margin-bottom:20px;}
        .footer__socials{display:flex;gap:12px;}
        .footer__social{font-family:'Space Mono',monospace;font-size:.62rem;font-weight:700;letter-spacing:.1em;color:var(--fg-muted);text-decoration:none;border:1px solid rgba(255,255,255,.1);padding:5px 10px;border-radius:2px;transition:all .2s;}
        .footer__social:hover{border-color:var(--accent);color:var(--accent);}
        .footer__col{display:flex;flex-direction:column;gap:10px;}
        .footer__col-title{font-family:'Space Mono',monospace;font-size:.65rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);margin-bottom:12px;}
        .footer__link{font-size:.875rem;color:var(--fg-muted);background:none;border:none;cursor:none;text-align:left;padding:0;transition:color .2s;line-height:1.5;}
        .footer__link:not(.footer__link--static):hover{color:var(--accent);}
        .footer__link--a{text-decoration:none;cursor:none;}
        .footer__addr{font-size:.8rem;line-height:1.9;}
        .footer__bottom{display:flex;justify-content:space-between;align-items:center;padding-top:32px;border-top:1px solid rgba(255,255,255,.05);}
        .footer__copy,.footer__legal{font-family:'Space Mono',monospace;font-size:.65rem;color:rgba(255,255,255,.22);letter-spacing:.08em;}
        @media(max-width:900px){.footer{padding:60px 24px 32px;}.footer__top-line{left:24px;right:24px;}.footer__inner{grid-template-columns:1fr 1fr;gap:36px;}.footer__bottom{flex-direction:column;gap:10px;text-align:center;}}
        @media(max-width:480px){.footer__inner{grid-template-columns:1fr;}}
      `}</style>
    </>
  );
}