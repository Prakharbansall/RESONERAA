import React from "react";
export default function CTAButton({ children, variant = "primary", href, onClick, className = "" }) {
  const Tag = href ? "a" : "button";
  return (
    <>
      <Tag href={href} onClick={onClick} className={`cta-btn cta-btn--${variant} ${className}`}>
        <span className="cta-btn__text">{children}</span>
        <span className="cta-btn__arrow">→</span>
        <span className="cta-btn__glow" />
      </Tag>
      <style>{`
        .cta-btn{display:inline-flex;align-items:center;gap:10px;padding:14px 32px;border:none;border-radius:3px;font-family:'Space Mono',monospace;font-size:.82rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;cursor:none;text-decoration:none;position:relative;overflow:hidden;transition:all .3s cubic-bezier(.16,1,.3,1);}
        .cta-btn--primary{background:var(--accent);color:var(--bg);}
        .cta-btn--primary:hover{background:var(--accent-bright);transform:translateY(-2px);box-shadow:0 0 36px rgba(0,255,163,.35);}
        .cta-btn--outline{background:transparent;color:var(--accent);border:1.5px solid var(--accent);}
        .cta-btn--outline:hover{background:rgba(0,255,163,.06);transform:translateY(-2px);box-shadow:0 0 28px rgba(0,255,163,.18);}
        .cta-btn__arrow{transition:transform .3s ease;}
        .cta-btn:hover .cta-btn__arrow{transform:translateX(5px);}
        .cta-btn__glow{position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgba(0,255,163,.18),transparent 70%);opacity:0;transition:opacity .3s;}
        .cta-btn:hover .cta-btn__glow{opacity:1;}
      `}</style>
    </>
  );
}