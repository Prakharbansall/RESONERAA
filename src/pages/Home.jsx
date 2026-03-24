import React, { useEffect, useRef, useState } from "react";
import CTAButton from "../components/CTAButton";

/* ─────────────────────────────────────────────────────────
   Animated canvas - soft rose particle field
───────────────────────────────────────────────────────── */
function RoseField() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let raf;
    const resize = () => {
      c.width  = c.offsetWidth  * devicePixelRatio;
      c.height = c.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    const pts = Array.from({ length: 48 }, () => ({
      px: 0.15 + Math.random() * 0.7,
      py: 0.15 + Math.random() * 0.7,
      r:  1 + Math.random() * 2.2,
      sp: 0.003 + Math.random() * 0.006,
      ph: Math.random() * Math.PI * 2,
    }));
    const draw = () => {
      const W = c.offsetWidth, H = c.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => { p.ph += p.sp; });
      for (let i = 0; i < pts.length; i++) {
        const xi = (pts[i].px + Math.sin(pts[i].ph) * 0.055) * W;
        const yi = (pts[i].py + Math.cos(pts[i].ph * .7) * 0.055) * H;
        for (let j = i + 1; j < pts.length; j++) {
          const xj = (pts[j].px + Math.sin(pts[j].ph) * 0.055) * W;
          const yj = (pts[j].py + Math.cos(pts[j].ph * .7) * 0.055) * H;
          const d = Math.hypot(xi - xj, yi - yj);
          if (d < 88) {
            ctx.beginPath(); ctx.moveTo(xi, yi); ctx.lineTo(xj, yj);
            ctx.strokeStyle = `rgba(232,41,76,${.065 * (1 - d / 88)})`;
            ctx.lineWidth = .8; ctx.stroke();
          }
        }
        const alpha = .16 + .12 * Math.sin(pts[i].ph);
        ctx.beginPath();
        ctx.arc(xi, yi, pts[i].r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,41,76,${alpha})`; ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const ro = new ResizeObserver(resize); ro.observe(c);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} style={{ position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none" }} />;
}

/* ─────────────────────────────────────────────────────────
   Double Marquee
───────────────────────────────────────────────────────── */
function Marquee({ reverse }) {
  const items = ["Machine Learning","NLP & LLMs","Computer Vision","AI Automation",
    "Data Strategy","Predictive Analytics","AI Consulting","LLM Integration"];
  return (
    <div className="mq-row" style={{"--dir": reverse ? "reverse" : "normal"}}>
      <div className="mq-track">
        {[...items,...items].map((s, i) => (
          <span key={i} className="mq-item">
            <span className="mq-dot" aria-hidden>◈</span>{s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Counting number on scroll into view
───────────────────────────────────────────────────────── */
function Ticker({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const dur = 1400, t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / dur, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────── */
const services = [
  { icon:"⬡", title:"Machine Learning",  tag:"Core",     desc:"Custom ML pipelines, predictive models, and AutoML solutions tailored to your data and goals." },
  { icon:"◎", title:"NLP & Language AI", tag:"Popular",  desc:"Fine-tuned LLMs, document intelligence, semantic search, and conversational AI systems." },
  { icon:"⬢", title:"AI Integration",    tag:"Core",     desc:"Embed AI into your existing stack - CRMs, ERPs, and cloud platforms - seamlessly." },
  { icon:"◈", title:"Data Strategy",     tag:"Strategy", desc:"End-to-end data architecture, governance, and analytics infrastructure for AI-readiness." },
  { icon:"⊕", title:"Computer Vision",   tag:"Advanced", desc:"Visual inspection, object detection, OCR, and video analytics for industrial use cases." },
  { icon:"◬", title:"AI Consulting",     tag:"Strategy", desc:"Strategic AI roadmaps, vendor evaluation, PoC design, and responsible AI adoption." },
];

const process = [
  { n:"01", title:"Discovery", desc:"We map your processes, data, and goals to surface the highest-impact AI opportunities for your business." },
  { n:"02", title:"Design",    desc:"Our architects blueprint a tailored solution - from data pipelines to model architecture and integration." },
  { n:"03", title:"Build",     desc:"Rapid cycles with continuous feedback. Working AI prototypes in weeks, not months." },
  { n:"04", title:"Deploy",    desc:"Production-grade deployment with monitoring, drift detection, and SLAs that keep AI performing." },
];

const industries = [
  { e:"🏦", n:"BFSI",               d:"Risk scoring, fraud detection, KYC automation" },
  { e:"🏥", n:"Healthcare",          d:"Clinical NLP, diagnostic assistance, patient analytics" },
  { e:"🛒", n:"Retail & D2C",        d:"Personalisation, demand forecasting, chatbots" },
  { e:"🏭", n:"Manufacturing",       d:"Visual quality inspection, predictive maintenance" },
  { e:"⚖️", n:"Legal & Compliance", d:"Contract intelligence, regulatory monitoring" },
  { e:"📦", n:"Logistics",           d:"Route optimisation, fleet intelligence, ETA" },
];

const testimonials = [
  { q:"Currently collaborating with early partners to validate and refine the product.", n:"Partner Validation & Collaboration",  r:"" },
  { q:"Building in public - learning, iterating, and improving with each release.", n:"Learning fast, shipping faster", r:"" },
  { q:"Looking for teams willing to collaborate and grow with us.", n:"Growing together", r:"" },
];

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */
export default function Home({ onNav }) {
  return (
    <>
      {/* ══ §1 HERO ════════════════════════════════════════ */}
      <section className="hero" id="home">
        <RoseField />

        <div className="hero-body">
          <div className="hero-badge">
            <span className="badge-dot" />
            AI-Native Software &amp; Services
          </div>

          <h1 className="hero-h1">
            <span className="hero-line-1">Intelligence</span>
            <span className="hero-line-2">
              <em className="hero-em">Re-engineered</em><span className="hero-period">.</span>
            </span>
          </h1>
          <div className="hero-ctas">
            <CTAButton size="lg" onClick={() => onNav("platform")}>Explore Platform</CTAButton>
            <CTAButton size="lg" variant="outline" onClick={() => onNav("contact")}>Talk to Us</CTAButton>
          </div>
        <div />
          <div className="hero-sub-row">
            <p className="hero-sub">
              ResoneraAI builds transformative AI systems that help businesses
              think faster, operate smarter, and grow without limits -
              from Mumbai to the world.
            </p>
          </div>


        </div>


      </section>

      {/* ══ §2 DOUBLE MARQUEE ══════════════════════════════ */}
      <div className="mq-wrap">
        <Marquee />
        
      </div>

      {/* ══ §3 STATEMENT - big editorial pull quote ════════ */}
      <section className="statement">
        <div className="statement-inner">
          <div className="statement-kicker">
            <span className="eyebrow">Why ResoneraAI</span>
            <div className="statement-rule" />
          </div>
          <p className="statement-text">
            Most AI companies are either too academic or too generic.
            We bridge <em>cutting-edge research</em> and{" "}
            <em>real-world deployment</em> - so your business gets AI
            that actually works, not just demos that impress.
          </p>
        </div>
      </section>

      {/* ══ §4 SERVICES - mosaic panel grid ═══════════════ */}
      <section className="svc-section">
        <div className="pg-wrap">
          <div className="svc-head">
            <div>
              <span className="eyebrow">What We Do</span>
              <h2 className="h2">AI Solutions<br /><span className="rose">Built to Scale</span></h2>
            </div>
          </div>

          <div className="svc-mosaic">
            {services.map((s, i) => (
              <article key={s.title} className="svc-card">
                <div className="svc-card-top">
                  <span className="svc-icon">{s.icon}</span>
                  <span className="svc-tag">{s.tag}</span>
                </div>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-body">{s.desc}</p>
                <div className="svc-hover-bar" />
              </article>
            ))}
          </div>
        </div>
      </section>

     

      {/* ══ §8 TESTIMONIALS - staggered heights ═══════════ */}
      <section className="testi-section">
        <div className="pg-wrap">
          <div className="testi-head">
            <span className="eyebrow">Stories</span>
            <h2 className="h2">Heard from those who<br /><span className="rose">built with us</span></h2>
          </div>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <blockquote key={i} className={`testi-card tc--${i}`}>
                <span className="testi-qmark" aria-hidden>"</span>
                <p className="testi-q">{t.q}</p>
                <footer className="testi-foot">
                  <span className="testi-name">{t.n}</span>
                  <span className="testi-role">{t.r}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ══ §9 WHY US - 2×2 reason grid ═══════════════════ */}
      <section className="why-section">
        <div className="pg-wrap">
          <div className="why-head">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="h2">The ResoneraAI<br /><span className="rose">Difference</span></h2>
          </div>
          <div className="why-grid">
            {[
              { icon:"◎", title:"Outcome-first",            desc:"We measure success by business impact, not model metrics. Your KPIs are our KPIs." },
              { icon:"⬡", title:"India-built, global-grade", desc:"World-class AI engineering priced for growing businesses. No compromise on quality." },
              { icon:"◈", title:"Transparent by design",    desc:"No black boxes. Every model is explainable, auditable, and yours to own." },
              { icon:"⊕", title:"Speed without shortcuts",  desc:"Working prototypes in weeks. Production systems in months. No vaporware." },
            ].map((w) => (
              <div key={w.title} className="why-card">
                <span className="why-icon">{w.icon}</span>
                <h3 className="why-title">{w.title}</h3>
                <p className="why-desc">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ §10 FINALE CTA - centred, oversized ═══════════ */}
      <section className="finale">
        <div className="finale-inner">
          <p className="finale-kicker">Ready to build?</p>
          <h2 className="finale-h2">
            Let's make your business<br />
            <em className="finale-em">AI-first.</em>
          </h2>
          <div className="finale-actions">
            <CTAButton size="lg" onClick={() => onNav("contact")}>Start a Conversation</CTAButton>
            <CTAButton size="lg" variant="outline" onClick={() => onNav("platform")}>See the Platform</CTAButton>
          </div>
          <p className="finale-note">Free discovery call · No commitment</p>
        </div>
        <span className="finale-deco" aria-hidden>◈</span>
      </section>

      {/* ══ STYLES ═════════════════════════════════════════ */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --r5:   #e8294c;
          --r6:   #c41f3e;
          --r50:  #fff5f7;
          --r100: #ffe4ea;
          --r200: #ffc1cc;
          --cr:   #fdf9fa;
          --tp:   #1a1014;
          --ts:   #6b5059;
          --tm:   #9d8089;
          --bs:   rgba(232,41,76,0.09);
          --bm:   rgba(232,41,76,0.18);
        }

        .rose { color: var(--r5); }

        .eyebrow {
          display: block;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 1.3rem; font-weight: 600;
          letter-spacing: .11em; text-transform: uppercase;
          color: var(--r5); margin-bottom: 14px;
        }

        .h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(2rem, 3.4vw, 2.85rem);
          font-weight: 400; line-height: 1.17;
          color: var(--tp); letter-spacing: -.025em;
          margin: 0 0 24px;
        }

        /* shared page wrapper */
        .pg-wrap { max-width: 1120px; margin: 0 auto; width: 100%; }

        /* ── §1 HERO ───────────────────────────────────── */
        .hero {
          position: relative; min-height: 100vh;
          background: var(--cr);
          display: flex; flex-direction: column;
          justify-content: center;
          padding: 68px 60px 0;
          overflow: hidden;
        }

        .hero-rail {
          position: absolute; left: 18px; top: 50%;
          transform: rotate(-90deg) translateX(-50%);
          transform-origin: left center;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .62rem; font-weight: 500;
          letter-spacing: .2em; text-transform: uppercase;
          color: var(--tm); white-space: nowrap; user-select: none;
        }

        .hero-body { max-width: 1120px; margin: 0 auto; width: 100%; padding: 72px 0 36px; position: relative; z-index: 1; }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .78rem; font-weight: 500; color: var(--r5);
          background: var(--r100); border: 1px solid var(--r200);
          border-radius: 20px; padding: 5px 14px; margin-bottom: 36px;
        }

        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--r5);
          animation: bdot 2s ease-in-out infinite; flex-shrink: 0;
        }

        @keyframes bdot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.8)} }

        .hero-h1 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(4rem,8.5vw,9.5rem);
          font-weight: 400; line-height: .96;
          letter-spacing: -.04em; color: var(--tp);
          margin: 0 0 36px; display: flex; flex-direction: column; gap: 6px;
        }

        .hero-line-1, .hero-line-2 { display: block; }
        .hero-em { color: var(--r5); font-style: italic; }
        .hero-period { color: var(--r5); }

        .hero-sub-row {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0; margin-bottom: 150px;
        }

        .hero-sub {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 1.05rem; color: var(--ts); line-height: 1.82;
          margin: 0; padding: 24px;
          border-left: 2px solid var(--bs);
        }

        .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }

        /* Metric strip */
        .hero-metrics {
          position: relative; z-index: 1;
          max-width: 1120px; margin: 0 auto; width: 100%;
          display: flex; align-items: stretch;
          border-top: 1px solid var(--bs);
          padding: 28px 0 48px;
          gap: 0;
        }

        .hm-cell {
          flex: 1; display: flex; flex-direction: column; gap: 4px;
          padding: 0 0 0 24px;
          border-left: 1px solid var(--bs);
        }

        .hm-cell:first-child { border-left: none; padding-left: 0; }

        .hm-val {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 2rem; font-weight: 400;
          color: var(--r5); line-height: 1; letter-spacing: -.02em;
        }

        .hm-label {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .72rem; font-weight: 500; color: var(--tm);
          letter-spacing: .04em;
        }

        .hm-cell--trust { flex: 1.6; }
        .hm-label--trust { margin-bottom: 6px; }
        .hm-tags { display: flex; flex-wrap: wrap; gap: 6px; }

        .hm-tag {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .7rem; font-weight: 500; color: var(--ts);
          border: 1px solid var(--bs); border-radius: 20px;
          padding: 2px 10px; background: #fff;
        }

        /* ── §2 MARQUEE ────────────────────────────────── */
        .mq-wrap {
          overflow: hidden;
          border-top: 1px solid var(--bs);
          border-bottom: 1px solid var(--bs);
          background: var(--r50);
        }

        .mq-row {
          padding: 13px 0;
          border-bottom: 1px solid var(--bs);
        }
        .mq-row:last-child { border-bottom: none; }

        .mq-track {
          display: flex; width: max-content;
          animation: mqs 32s linear infinite;
          animation-direction: var(--dir, normal);
        }

        @keyframes mqs { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .mq-item {
          display: flex; align-items: center; gap: 10px;
          padding: 0 36px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .8rem; font-weight: 500; color: var(--ts);
          white-space: nowrap; letter-spacing: .03em;
        }

        .mq-dot { color: var(--r5); font-size: .55rem; opacity: .7; }

        /* ── §3 STATEMENT ──────────────────────────────── */
        .statement { background: #fff; padding: 120px 60px; }

        .statement-inner {
          max-width: 880px; margin: 0 auto;
          display: grid; grid-template-columns: 160px 1fr;
          gap: 60px; align-items: start;
        }

        .statement-kicker { padding-top: 8px; }

        .statement-rule {
          width: 32px; height: 2px;
          background: var(--r5); margin-top: 16px;
        }

        .statement-text {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(1.6rem, 2.8vw, 2.4rem);
          font-weight: 400; line-height: 1.45;
          color: var(--tp); letter-spacing: -.01em;
          margin: 0 0 36px;
        }

        .statement-text em { color: var(--r5); font-style: italic; }

        .statement-cta { margin-left: 0; }

        /* ── §4 SERVICES ───────────────────────────────── */
        .svc-section {
          background: var(--cr); padding: 120px 60px;
          border-top: 1px solid var(--bs);
        }

        .svc-head {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: end; margin-bottom: 64px;
        }

        .svc-desc-right {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 1rem; color: var(--ts); line-height: 1.85; margin: 0;
        }

        .svc-mosaic {
          display: grid;
          grid-template-columns: 1.35fr 1fr .8fr;
          gap: 1px;
          background: var(--bs);
          border: 1px solid var(--bs);
          border-radius: 20px; overflow: hidden;
        }

        .svc-card {
          background: #fff; padding: 44px 36px;
          position: relative; overflow: hidden;
          transition: background .2s ease;
        }

        .svc-card:hover { background: var(--r50); }

        .svc-card-top {
          display: flex; justify-content: space-between;
          align-items: center; margin-bottom: 22px;
        }

        .svc-icon { font-size: 1.55rem; color: var(--r5); line-height: 1; }

        .svc-tag {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .62rem; font-weight: 600; letter-spacing: .08em;
          color: var(--r5); background: var(--r100);
          border: 1px solid var(--r200); padding: 3px 9px; border-radius: 20px;
        }

        .svc-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.22rem; font-weight: 400;
          color: var(--tp); margin-bottom: 12px; letter-spacing: -.01em;
        }

        .svc-body {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .88rem; color: var(--ts); line-height: 1.8; margin: 0;
        }

        .svc-hover-bar {
          position: absolute; bottom: 0; left: 0;
          height: 2px; width: 0; background: var(--r5);
          transition: width .35s ease;
        }

        .svc-card:hover .svc-hover-bar { width: 100%; }

        /* ── §5 NUMBERS ────────────────────────────────── */
        .numbers { background: var(--r5); padding: 100px 60px; }

        .numbers-inner {
          display: grid; grid-template-columns: 300px 1fr;
          gap: 80px; align-items: center;
        }

        .numbers-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 2px; background: rgba(255,255,255,.16);
          border-radius: 16px; overflow: hidden;
        }

        .num-cell {
          background: rgba(255,255,255,.08); padding: 36px 32px;
          transition: background .2s ease;
        }

        .num-cell:hover { background: rgba(255,255,255,.14); }

        .num-val {
          display: block;
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 3.2rem; font-weight: 400; color: #fff;
          line-height: 1; letter-spacing: -.03em; margin-bottom: 8px;
        }

        .num-label {
          display: block;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .88rem; font-weight: 600;
          color: rgba(255,255,255,.9); margin-bottom: 4px;
        }

        .num-sub {
          display: block;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .72rem; color: rgba(255,255,255,.52); line-height: 1.5;
        }

        /* ── §6 PROCESS ────────────────────────────────── */
        .process-section {
          background: #fff; padding: 120px 60px;
          border-top: 1px solid var(--bs);
          border-bottom: 1px solid var(--bs);
        }

        .process-head { margin-bottom: 72px; }

        .process-list {
          display: flex; flex-direction: column;
          border-top: 1px solid var(--bs);
        }

        .pz {
          display: grid; grid-template-columns: 100px 1px 1fr;
          gap: 48px; align-items: center;
          padding: 44px 0; border-bottom: 1px solid var(--bs);
          transition: padding .2s ease, background .2s ease;
        }

        .pz:hover { background: var(--r50); padding-left: 20px; padding-right: 20px; margin: 0 -20px; }

        /* Flip: number right, body left */
        .pz--flip {
          grid-template-columns: 1fr 1px 100px;
          padding-left: 60px;
        }

        .pz--flip .pz-n    { order: 3; text-align: right; }
        .pz--flip .pz-divider { order: 2; }
        .pz--flip .pz-body { order: 1; }

        .pz-n {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 3.5rem; font-weight: 400; color: var(--r200);
          line-height: 1; letter-spacing: -.03em;
          transition: color .2s ease;
        }

        .pz:hover .pz-n { color: var(--r5); }

        .pz-divider { width: 1px; align-self: stretch; background: var(--bs); }

        .pz-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.4rem; font-weight: 400;
          color: var(--tp); margin-bottom: 10px;
        }

        .pz-desc {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .95rem; color: var(--ts); line-height: 1.8; margin: 0;
        }

        /* ── §7 INDUSTRIES ─────────────────────────────── */
        .ind-section {
          background: var(--cr); padding: 120px 60px;
          border-bottom: 1px solid var(--bs);
        }

        .ind-head {
          display: flex; justify-content: space-between;
          align-items: flex-end; margin-bottom: 60px;
        }

        .ind-h2 { margin-bottom: 0; }

        .ind-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--bs);
          border: 1px solid var(--bs);
          border-radius: 20px; overflow: hidden;
        }

        .ind-card {
          background: #fff; padding: 40px 32px;
          position: relative; overflow: hidden;
          transition: background .18s ease;
        }

        .ind-card::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 2px; background: var(--r5);
          transition: width .3s ease;
        }

        .ind-card:hover { background: var(--r50); }
        .ind-card:hover::after { width: 100%; }

        .ind-emoji { display: block; font-size: 1.8rem; margin-bottom: 16px; line-height: 1; }

        .ind-name {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .8rem; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase;
          color: var(--tp); margin-bottom: 10px;
        }

        .ind-desc {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .875rem; color: var(--ts); line-height: 1.75; margin: 0;
        }

        /* ── §8 TESTIMONIALS ───────────────────────────── */
        .testi-section {
          background: var(--r50); padding: 120px 60px;
          border-top: 1px solid var(--bs);
          border-bottom: 1px solid var(--bs);
        }

        .testi-head { margin-bottom: 60px; }

        .testi-grid {
          display: grid; grid-template-columns: 1fr 1.15fr 1fr;
          gap: 20px; align-items: start;
        }

        .testi-card {
          background: #fff; border: 1px solid var(--bs);
          border-radius: 18px; padding: 36px 30px; margin: 0;
          transition: box-shadow .2s ease, transform .2s ease;
        }

        .testi-card:hover {
          box-shadow: 0 8px 32px rgba(232,41,76,.07);
          transform: translateY(-3px);
        }

        /* Middle card - full rose, raised */
        .tc--1 {
          margin-top: -24px;
          background: var(--r5);
          border-color: var(--r6);
        }

        /* Third card - drops down */
        .tc--2 { margin-top: 24px; }

        .testi-qmark {
          display: block;
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 5rem; line-height: .75; color: var(--r100);
          margin-bottom: 8px; user-select: none;
        }

        .tc--1 .testi-qmark { color: rgba(255,255,255,.22); }

        .testi-q {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.05rem; font-style: italic; font-weight: 400;
          line-height: 1.65; color: var(--tp); margin-bottom: 24px;
        }

        .tc--1 .testi-q { color: rgba(255,255,255,.92); }

        .testi-foot { display: flex; flex-direction: column; gap: 3px; }

        .testi-name {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .88rem; font-weight: 600; color: var(--tp);
        }

        .tc--1 .testi-name { color: #fff; }

        .testi-role {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .75rem; color: var(--tm);
        }

        .tc--1 .testi-role { color: rgba(255,255,255,.58); }

        /* ── §9 WHY US ─────────────────────────────────── */
        .why-section { background: #fff; padding: 120px 60px; }

        .why-head { margin-bottom: 60px; }

        .why-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1px; background: var(--bs);
          border: 1px solid var(--bs);
          border-radius: 20px; overflow: hidden;
        }

        .why-card {
          background: #fff; padding: 52px 44px;
          transition: background .18s ease;
        }

        .why-card:hover { background: var(--r50); }

        .why-icon {
          display: block; font-size: 1.5rem; color: var(--r5); margin-bottom: 20px;
        }

        .why-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.25rem; font-weight: 400;
          color: var(--tp); margin-bottom: 12px; letter-spacing: -.01em;
        }

        .why-desc {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .9rem; color: var(--ts); line-height: 1.82; margin: 0;
        }

        /* ── §10 FINALE ────────────────────────────────── */
        .finale {
          background: var(--cr); padding: 140px 60px;
          text-align: center;
          border-top: 1px solid var(--bs);
          position: relative; overflow: hidden;
        }

        .finale-inner {
          max-width: 680px; margin: 0 auto;
          position: relative; z-index: 1;
        }

        .finale-kicker {
          display: block;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 2rem; font-weight: 600;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--r5); margin-bottom: 24px;
        }

        .finale-h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(2.8rem, 5.5vw, 5.5rem);
          font-weight: 400; line-height: 1.08;
          letter-spacing: -.04em; color: var(--tp); margin-bottom: 48px;
        }

        .finale-em { color: var(--r5); font-style: italic; }

        .finale-actions {
          display: flex; justify-content: center;
          gap: 12px; flex-wrap: wrap; margin-bottom: 28px;
        }

        .finale-note {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .78rem; color: var(--tm); letter-spacing: .03em;
        }

        .finale-deco {
          position: absolute; bottom: -80px; right: -40px;
          font-size: clamp(200px, 26vw, 380px);
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(232,41,76,.06);
          line-height: 1; pointer-events: none; user-select: none;
        }

        /* ── RESPONSIVE ────────────────────────────────── */
        @media (max-width: 1024px) {
          .hero, .statement, .svc-section, .numbers,
          .process-section, .ind-section, .testi-section,
          .why-section, .finale { padding-left: 32px; padding-right: 32px; }

          .numbers-inner { grid-template-columns: 1fr; gap: 48px; }
          .numbers-grid  { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 860px) {
          .hero { padding-left: 24px; padding-right: 24px; }
          .hero-rail { display: none; }
          .hero-h1 { font-size: clamp(3.2rem, 11vw, 5.5rem); }
          .hero-sub-row { grid-template-columns: 2fr; }
          .hero-sub { padding-left: 0; border-left: none; border-top: 2px solid var(--bs); padding-top: 18px; }
          .hero-metrics { flex-wrap: wrap; gap: 16px 0; }
          .hm-cell { min-width: 50%; }
          .hm-cell:nth-child(3) { border-left: none; padding-left: 0; }
          .hm-cell--trust { min-width: 100%; border-left: none; padding-left: 0; }

          .statement-inner { grid-template-columns: 1fr; gap: 24px; }
          .svc-head { grid-template-columns: 1fr; gap: 20px; }
          .svc-mosaic { grid-template-columns: 1fr 1fr; }

          .pz { grid-template-columns: 80px 1px 1fr; gap: 28px; padding: 36px 0; }
          .pz--flip { grid-template-columns: 1fr 1px 80px; padding-left: 0; }
          .pz:hover { margin: 0; padding: 36px 0; }

          .ind-head { flex-direction: column; align-items: flex-start; gap: 8px; }
          .ind-grid { grid-template-columns: 1fr 1fr; }

          .testi-grid { grid-template-columns: 1fr; }
          .tc--1, .tc--2 { margin-top: 0; }

          .why-grid { grid-template-columns: 1fr; }

          .statement, .svc-section, .numbers, .process-section,
          .ind-section, .testi-section, .why-section { padding-top: 80px; padding-bottom: 80px; }
          .finale { padding: 100px 24px; }
        }

        @media (max-width: 560px) {
          .svc-mosaic { grid-template-columns: 1fr; }
          .ind-grid   { grid-template-columns: 1fr; }
          .numbers-grid { grid-template-columns: 1fr; }
          .hero-h1 { font-size: clamp(2.8rem, 12vw, 4.5rem); }
        }
      `}</style>
    </>
  );
}
