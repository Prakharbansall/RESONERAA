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
  const items = [
    "Machine Learning","NLP & LLM Systems","Computer Vision","AI Automation",
    "Data Strategy","Predictive Modelling","AI System Design","LLM Integration"
  ];
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
  {
    icon:"⬡", title:"Machine Learning", tag:"Core",
    desc:"Work is ongoing to understand how machine learning pipelines can be structured in a way that supports data preparation, experimentation, and continuous improvement. This includes exploring how datasets are prepared, how models are trained and evaluated, and how outcomes can be refined over time."
  },
  {
    icon:"◎", title:"NLP & Language AI", tag:"Popular",
    desc:"The platform is being designed to explore how language-based systems can be organised into structured workflows. This includes document processing, conversational interfaces, and systems that interpret and respond to natural language inputs."
  },
  {
    icon:"⬢", title:"AI Integration", tag:"Core",
    desc:"A key focus area is understanding how AI components can be integrated into existing tools, internal systems, and operational platforms. The goal is to explore how AI can complement existing workflows rather than replace them entirely."
  },
  {
    icon:"◈", title:"Data Strategy", tag:"Strategy",
    desc:"Data plays a foundational role in AI systems. The initiative is exploring how data can be structured, maintained, and governed to support long-term usability. This includes examining data pipelines, storage structures, and preparation techniques."
  },
  {
    icon:"⊕", title:"Computer Vision", tag:"Advanced",
    desc:"Exploration is ongoing in understanding how visual data can be processed and interpreted through structured systems. This includes studying recognition tasks, analysis pipelines, and practical applications."
  },
  {
    icon:"◬", title:"AI System Planning", tag:"Strategy",
    desc:"Beyond technical implementation, the initiative also focuses on understanding how organisations can approach AI adoption through structured planning. This includes identifying use cases, evaluating feasibility, and aligning systems with real-world needs."
  },
];

const testimonials = [
  {
    q:"Initial conversations and exploratory collaborations are helping shape the direction of the platform.  ",
    n:"Partner Validation & Collaboration",
    r:""
  },
  {
    q:"Progress is being made through consistent iteration, where each step contributes to refining the system and its direction.",
    n:"Learning continuously, improving gradually",
    r:""
  },
  {
    q:"The initiative is currently evolving through early-stage exploration, discussions, and iterative development  ",
    n:"Building in public, iterating openly",
    r:""
  },
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
            AI-Native Software &amp; Systems
          </div>

          <h1 className="hero-h1">
            <span className="hero-line-1">Intelligence,</span>
            <span className="hero-line-2">
              <em className="hero-em">thoughtfully</em><span className="hero-period"> structured.</span>
            </span>
          </h1>
          <div className="hero-ctas">
            <CTAButton size="lg" onClick={() => onNav("platform")}>Explore Platform</CTAButton>
            <CTAButton size="lg" variant="outline" onClick={() => onNav("contact")}>Talk to Us</CTAButton>
          </div>
          <div />
          <div className="hero-sub-row">
            <p className="hero-sub">
              ResoneraAI is an emerging initiative focused on exploring how artificial intelligence
              systems can be designed, organised, and gradually applied across real-world operational
              environments- understanding how AI can move beyond isolated experimentation and become
              part of structured systems that connect data, workflows, and decision-making processes
              in a meaningful way.
            </p>
          </div>
        </div>
      </section>

      {/* ══ §2 DOUBLE MARQUEE ══════════════════════════════ */}
      <div className="mq-wrap">
        <Marquee />
      </div>

      {/* ══ §3 STATEMENT ═══════════════════════════════════ */}
      <section className="statement">
        <div className="statement-inner">
          <div className="statement-kicker">
            <span className="eyebrow">Why ResoneraAI</span>
            <div className="statement-rule" />
          </div>
          <div>
            <p className="statement-text">
              Many artificial intelligence initiatives today face a common challenge- they either
              remain <em>highly experimental</em> or become overly standardised, making it difficult
              to translate technical capability into <em>practical, usable systems</em>.
            </p>
            <p className="statement-body">
              In many cases, organisations struggle not because AI is unavailable, but because there
              is no structured way to approach its design, integration, and long-term usage.
              ResoneraAI is being developed to explore a more structured approach- where systems are
              designed with clear workflows, data and models are aligned within a single framework,
              and transparency and usability remain central to development.
            </p>
          </div>
        </div>
      </section>

      {/* ══ §4 SERVICES ════════════════════════════════════ */}
      <section className="svc-section">
        <div className="pg-wrap">
          <div className="svc-head">
            <div>
              <span className="eyebrow">What We Do</span>
              <h2 className="h2">AI Systems- Being Designed<br /><span className="rose">for Practical Use</span></h2>
            </div>
            <p className="svc-desc-right">
              The initiative is currently focused on exploring and developing foundational components
              that may support applied AI systems across different industries and operational environments.
            </p>
          </div>

          <div className="svc-mosaic">
            {services.map((s) => (
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

      {/* ══ §8 TESTIMONIALS ════════════════════════════════ */}
      <section className="testi-section">
        <div className="pg-wrap">
          <div className="testi-head">
            <span className="eyebrow">Stories</span>
            <h2 className="h2">Heard from those<br /><span className="rose">exploring with us</span></h2>
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

      {/* ══ §9 WHY US ══════════════════════════════════════ */}
      <section className="why-section">
        <div className="pg-wrap">
          <div className="why-head">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="h2">The ResoneraAI<br /><span className="rose">Difference</span></h2>
          </div>
          <div className="why-grid">
            {[
              {
                icon:"◎", title:"Outcome Awareness",
                desc:"The focus remains on understanding how AI systems can create meaningful and measurable impact over time. We measure success by what the system achieves, not just how it is built."
              },
              {
                icon:"⬡", title:"Built with Long-term Adaptability",
                desc:"Systems are being designed to evolve as requirements and use cases become clearer. No rigid, one-size-fits-all solutions- the architecture grows with the need."
              },
              {
                icon:"◈", title:"Transparent by Design",
                desc:"Efforts are being made to ensure that system behaviour remains understandable and interpretable throughout development. No black boxes- every component is designed to be auditable and explainable."
              },
              {
                icon:"⊕", title:"Structured Development Approach",
                desc:"Development is carried out in stages, allowing continuous validation and refinement. Each phase is observed, evaluated, and improved before progressing further."
              },
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

      {/* ══ §10 FINALE CTA ═════════════════════════════════ */}
      <section className="finale">
        <div className="finale-inner">
          <p className="finale-kicker">Ready to explore AI systems?</p>
          <h2 className="finale-h2">
            Let's begin a conversation<br />
            <em className="finale-em">around structured AI.</em>
          </h2>
          <div className="finale-actions">
            <CTAButton size="lg" onClick={() => onNav("contact")}>Start a Conversation</CTAButton>
            <CTAButton size="lg" variant="outline" onClick={() => onNav("platform")}>See the Platform</CTAButton>
          </div>
          <p className="finale-note">Free discussion · No commitment</p>
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
        .hero-period { color: var(--tp); }

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
          margin: 0 0 24px;
        }

        .statement-text em { color: var(--r5); font-style: italic; }

        .statement-body {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 1rem; color: var(--ts); line-height: 1.85; margin: 0;
        }

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

        .tc--1 {
          margin-top: -24px;
          background: var(--r5);
          border-color: var(--r6);
        }

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
          .hero, .statement, .svc-section,
          .testi-section, .why-section, .finale { padding-left: 32px; padding-right: 32px; }
        }

        @media (max-width: 860px) {
          .hero { padding-left: 24px; padding-right: 24px; }
          .hero-h1 { font-size: clamp(3.2rem, 11vw, 5.5rem); }
          .hero-sub-row { grid-template-columns: 1fr; }
          .hero-sub { padding-left: 0; border-left: none; border-top: 2px solid var(--bs); padding-top: 18px; }

          .statement-inner { grid-template-columns: 1fr; gap: 24px; }
          .svc-head { grid-template-columns: 1fr; gap: 20px; }
          .svc-mosaic { grid-template-columns: 1fr 1fr; }

          .testi-grid { grid-template-columns: 1fr; }
          .tc--1, .tc--2 { margin-top: 0; }

          .why-grid { grid-template-columns: 1fr; }

          .statement, .svc-section,
          .testi-section, .why-section { padding-top: 80px; padding-bottom: 80px; }
          .finale { padding: 100px 24px; }
        }

        @media (max-width: 560px) {
          .svc-mosaic { grid-template-columns: 1fr; }
          .hero-h1 { font-size: clamp(2.8rem, 12vw, 4.5rem); }
        }
      `}</style>
    </>
  );
}
