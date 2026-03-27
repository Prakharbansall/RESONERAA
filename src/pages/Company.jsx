import React, { useEffect, useRef } from "react";
import CTAButton from "../components/CTAButton";

/* ─────────────────────────────────────────────────────────────
   RoseVisual - replaces neon DNA canvas
   Soft animated petal/ring illustration, light-mode native
───────────────────────────────────────────────────────────── */
function RoseVisual() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let t = 0;
    let raf;

    const resize = () => {
      c.width  = c.offsetWidth  * window.devicePixelRatio;
      c.height = c.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const draw = () => {
      const W = c.offsetWidth;
      const H = c.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;

      const rings = [
        { r: 120, alpha: 0.06, speed: 0.4 },
        { r: 90,  alpha: 0.09, speed: 0.7 },
        { r: 58,  alpha: 0.13, speed: 1.1 },
      ];
      rings.forEach(({ r, alpha, speed }) => {
        const pulse = r + Math.sin(t * speed) * 6;
        ctx.beginPath();
        ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(232, 41, 76, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      const petals = 8;
      for (let i = 0; i < petals; i++) {
        const angle  = (i / petals) * Math.PI * 2 + t * 0.18;
        const r      = 100 + Math.sin(t * 0.6 + i) * 12;
        const x      = cx + Math.cos(angle) * r;
        const y      = cy + Math.sin(angle) * r;
        const alpha  = 0.18 + Math.abs(Math.sin(t * 0.5 + i * 0.8)) * 0.28;
        const radius = 6 + Math.sin(t * 0.9 + i) * 2;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 41, 76, ${alpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(232, 41, 76, ${alpha * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 - t * 0.28;
        const r     = 50 + Math.sin(t * 0.8 + i * 1.2) * 8;
        const x     = cx + Math.cos(angle) * r;
        const y     = cy + Math.sin(angle) * r;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 107, 138, ${0.25 + Math.abs(Math.sin(t + i)) * 0.3})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(cx, cy, 10 + Math.sin(t * 1.2) * 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(232, 41, 76, 0.85)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();

      t += 0.012;
      raf = requestAnimationFrame(draw);
    };

    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(c);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <div className="rose-visual-wrap">
      <canvas ref={canvasRef} className="rose-canvas" />
      <div className="rose-pillars">
        {[
          ["Mission",  "To explore how AI systems can be structured in a way that aligns with real-world operational needs and workflows."],
          ["Vision",   "To contribute towards making structured AI systems more accessible and adaptable across different industries and use cases."],
          ["Approach", "Gradual and structured development- studying workflows, identifying opportunities, building components, and refining through observation."],
        ].map(([k, v]) => (
          <div key={k} className="rose-pillar">
            <span className="rose-pillar-key">{k}</span>
            <span className="rose-pillar-val">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────── */
const values = [
  { icon: "✦", title: "Clarity over complexity",      desc: "We prioritise clear, understandable systems over unnecessarily complex ones. Simplicity is a feature, not a limitation." },
  { icon: "◎", title: "Continuous learning",           desc: "Every iteration teaches us something. We build with the expectation of refining, not finishing." },
  { icon: "◈", title: "Responsible system design",    desc: "We approach AI development with care- ensuring systems are interpretable, ethical, and aligned with real needs." },
  { icon: "⬡", title: "Practical implementation",     desc: "Ideas matter only when they translate into working systems. We focus on what is usable, not just what is theoretically possible." },
  { icon: "⊕", title: "Transparency in development",  desc: "We are open about what we are building, what stage we are at, and what we are still learning." },
];

const milestones = [
  { title: "Exploring the problem",      desc: "Understanding where AI can provide practical value rather than theoretical capability." },
  { title: "Learning from workflows",    desc: "Studying how systems operate in real environments to identify genuine opportunities." },
  { title: "Building small experiments", desc: "Testing ideas through controlled prototypes to see what works in practice." },
  { title: "Staying practical",          desc: "Focusing on systems that are usable and relevant rather than overengineered." },
  { title: "Moving step by step",        desc: "Progressing through continuous learning and iteration- no big claims, just consistent progress." },
];

const team = [
  { role: "AI & ML Engineering",    icon: "⬡", desc: "Building and optimising models, pipelines, and infrastructure." },
  { role: "Solutions Architecture", icon: "◈", desc: "Designing systems that integrate cleanly with existing operational environments." },
  { role: "Data Science",           icon: "◎", desc: "Structuring data and understanding how it can be prepared for AI applications." },
  { role: "Product & Design",       icon: "✦", desc: "Shaping how systems are experienced and how they align with user needs." },
];

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */
export default function Company({ onNav }) {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="co-hero">
        <div className="co-hero-text">
          <span className="eyebrow">Who We Are</span>
          <h1 className="co-hero-title">
            Built in Mumbai.<br />
            <span className="rose-accent">Thinking ahead with clarity.</span>
          </h1>
          <p className="co-hero-sub">
            ResoneraAI Private Limited is an AI-focused startup working on exploring
            how artificial intelligence systems can be structured, organised, and applied
            in real-world environments. The initiative is centred on making AI systems
            more understandable, adaptable, and aligned with practical workflows.
          </p>
          <div className="co-hero-ctas">
            <CTAButton onClick={() => onNav("platform")}>See Our Platform</CTAButton>
            <CTAButton variant="outline" onClick={() => onNav("contact")}>Work With Us</CTAButton>
          </div>
          <div className="co-address-card">
            <span className="co-address-label">Registered Office</span>
            <address className="co-address-body">
              Room No.2, Kore Sankalp, Siddhi Chawl,<br />
              Chougle Nagar, Borivali East,<br />
              Mumbai, Maharashtra 400066, India
            </address>
          </div>
        </div>
        <div className="co-hero-visual">
          <RoseVisual />
        </div>
      </section>

      {/* ── Story + Timeline ────────────────────────────────── */}
      <section className="co-story">
        <div className="co-story-text">
          <span className="eyebrow">Our Story</span>
          <h2 className="section-title">
            Where Structure<br />
            <span className="rose-accent">Meets Intelligence</span>
          </h2>
          <p className="body-copy">
            ResoneraAI originated from the observation that artificial intelligence is
            often approached in two extremes- either as highly technical research or
            as generic, one-size-fits-all solutions.
          </p>
          <p className="body-copy">
            In both cases, the connection between technology and real-world usability
            can become unclear. The initiative aims to explore a more balanced approach,
            where AI systems are <em>technically structured</em>, <em>practically applicable</em>,
            and <em>continuously refined</em>.
          </p>
          <p className="body-copy">
            The work is currently focused on understanding how organisations interact
            with data and how AI can be introduced in a structured and meaningful way.
          </p>
        </div>

        <div className="co-timeline">
          <span className="eyebrow">WHAT WE'RE DOING</span>
          {milestones.map((m) => (
            <div key={m.title} className="timeline-row">
              <span className="timeline-year"></span>
              <div className="timeline-connector">
                <div className="timeline-dot" />
                <div className="timeline-line" />
              </div>
              <div className="timeline-body">
                <h3 className="timeline-title">{m.title}</h3>
                <p className="timeline-desc">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Values ─────────────────────────────────────────── */}
      <section className="co-values">
        <div className="co-values-header">
          <span className="eyebrow">Our Values</span>
          <h2 className="section-title">
            Principles That <span className="rose-accent">Drive Us</span>
          </h2>
        </div>
        <div className="values-grid">
          {values.map((v) => (
            <div key={v.title} className="val-card">
              <span className="val-icon">{v.icon}</span>
              <h3 className="val-title">{v.title}</h3>
              <p className="val-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Team ───────────────────────────────────────────── */}
      <section className="co-team">
        <div className="co-team-left">
          <span className="eyebrow">The Team</span>
          <h2 className="section-title">
            People Who<br />
            <span className="rose-accent">Build AI</span>
          </h2>
          <p className="body-copy" style={{ maxWidth: 360, marginTop: 12, marginBottom: 32 }}>
            The initiative is currently in a development phase focused on system
            exploration, experimentation, and design. As the platform evolves, the
            team structure will expand based on technical and operational requirements.
          </p>
          <CTAButton variant="outline" onClick={() => onNav("contact")}>
            Join the Team
          </CTAButton>
        </div>
        <div className="co-team-right">
          {team.map((t) => (
            <div key={t.role} className="team-card">
              <span className="team-icon">{t.icon}</span>
              <div>
                <h3 className="team-role">{t.role}</h3>
                <p className="team-desc">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────── */}
      <section className="co-cta">
        <div className="co-cta-inner">
          <span className="eyebrow" style={{ justifyContent: "center" }}>Ready to explore AI systems?</span>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Let's begin a <span className="rose-accent">conversation</span>
          </h2>
          <p className="co-cta-sub">
            We're looking for teams willing to collaborate and grow together-
            exploring how structured AI systems can be designed and applied in
            practical environments.
          </p>
          <CTAButton size="lg" onClick={() => onNav("contact")}>Start a Conversation</CTAButton>
        </div>
      </section>

      {/* ── Styles ─────────────────────────────────────────── */}
      <style>{`
        /* ── Tokens ───────────────────────────────────────── */
        .co-hero, .co-story, .co-values, .co-team, .co-cta,
        .co-hero *, .co-story *, .co-values *, .co-team *, .co-cta * {
          --rose-500:      #e8294c;
          --rose-600:      #c41f3e;
          --rose-50:       #fff5f7;
          --rose-100:      #ffe4ea;
          --rose-200:      #ffc1cc;
          --text-primary:  #1a1014;
          --text-secondary:#6b5059;
          --text-muted:    #9d8089;
          --border-soft:   rgba(232,41,76,0.1);
          --border-light:  rgba(232,41,76,0.06);
        }

        .eyebrow {
          display:        block;
          font-family:    'DM Sans', system-ui, sans-serif;
          font-size:      1.5rem;
          font-weight:    600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color:          var(--rose-500);
          margin-bottom:  14px;
        }

        .section-title {
          font-family:    'DM Serif Display', Georgia, serif;
          font-size:      clamp(1.9rem, 3.5vw, 2.7rem);
          font-weight:    400;
          line-height:    1.2;
          color:          var(--text-primary);
          letter-spacing: -0.02em;
          margin:         0 0 24px;
        }

        .rose-accent { color: var(--rose-500); }

        .body-copy {
          font-family:   'DM Sans', system-ui, sans-serif;
          font-size:     1rem;
          color:         var(--text-secondary);
          line-height:   1.85;
          margin-bottom: 18px;
        }

        .body-copy em {
          color:       var(--rose-500);
          font-style:  normal;
          font-weight: 600;
        }

        /* ── Hero ─────────────────────────────────────────── */
        .co-hero {
          max-width:   1120px;
          margin:      0 auto;
          padding:     120px 32px 80px;
          display:     grid;
          grid-template-columns: 1fr 1fr;
          gap:         64px;
          align-items: center;
        }

        .co-hero-title {
          font-family:    'DM Serif Display', Georgia, serif;
          font-size:      clamp(2.4rem, 4.5vw, 3.4rem);
          font-weight:    400;
          line-height:    1.15;
          letter-spacing: -0.03em;
          color:          var(--text-primary);
          margin:         0 0 20px;
        }

        .co-hero-sub {
          font-family:   'DM Sans', system-ui, sans-serif;
          font-size:     1.05rem;
          color:         var(--text-secondary);
          line-height:   1.8;
          margin-bottom: 32px;
          max-width:     480px;
        }

        .co-hero-ctas {
          display:       flex;
          gap:           12px;
          flex-wrap:     wrap;
          margin-bottom: 36px;
        }

        .co-address-card {
          background:    var(--rose-50);
          border:        1px solid var(--border-soft);
          border-radius: 12px;
          padding:       20px 24px;
          display:       inline-block;
        }

        .co-address-label {
          display:        block;
          font-size:      0.68rem;
          font-weight:    600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color:          var(--rose-500);
          margin-bottom:  8px;
          font-family:    'DM Sans', system-ui, sans-serif;
        }

        .co-address-body {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size:   0.88rem;
          color:       var(--text-secondary);
          line-height: 1.85;
          font-style:  normal;
        }

        /* ── Rose Visual ──────────────────────────────────── */
        .co-hero-visual {
          display:         flex;
          align-items:     stretch;
          justify-content: center;
        }

        .rose-visual-wrap {
          width:          100%;
          display:        flex;
          flex-direction: column;
          gap:            24px;
        }

        .rose-canvas {
          width:         100%;
          height:        320px;
          border-radius: 16px;
          background:    var(--rose-50);
          border:        1px solid var(--border-soft);
        }

        .rose-pillars {
          display:        flex;
          flex-direction: column;
          gap:            0;
        }

        .rose-pillar {
          display:       flex;
          gap:           20px;
          padding:       14px 0;
          border-bottom: 1px solid var(--border-soft);
          align-items:   flex-start;
        }

        .rose-pillar:last-child { border-bottom: none; }

        .rose-pillar-key {
          font-family:    'DM Sans', system-ui, sans-serif;
          font-size:      0.7rem;
          font-weight:    600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color:          var(--rose-500);
          min-width:      76px;
          padding-top:    2px;
        }

        .rose-pillar-val {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size:   0.9rem;
          color:       var(--text-secondary);
          line-height: 1.65;
        }

        /* ── Story ────────────────────────────────────────── */
        .co-story {
          max-width:   1120px;
          margin:      0 auto;
          padding:     100px 32px;
          display:     grid;
          grid-template-columns: 1fr 1fr;
          gap:         80px;
          align-items: start;
        }

        .co-timeline {
          display:        flex;
          flex-direction: column;
        }

        .timeline-row {
          display:     grid;
          grid-template-columns: 72px 24px 1fr;
          gap:         12px;
          align-items: start;
          padding:     20px 0;
        }

        .timeline-year {
          font-family:    'DM Sans', system-ui, sans-serif;
          font-size:      0.7rem;
          font-weight:    700;
          letter-spacing: 0.06em;
          color:          var(--rose-500);
          padding-top:    4px;
        }

        .timeline-connector {
          display:        flex;
          flex-direction: column;
          align-items:    center;
          padding-top:    4px;
        }

        .timeline-dot {
          width:         8px;
          height:        8px;
          border-radius: 50%;
          background:    var(--rose-500);
          flex-shrink:   0;
        }

        .timeline-line {
          width:      1px;
          flex:       1;
          min-height: 32px;
          background: var(--border-soft);
          margin-top: 4px;
        }

        .timeline-row:last-child .timeline-line { display: none; }

        .timeline-title {
          font-family:   'DM Serif Display', Georgia, serif;
          font-size:     1.1rem;
          font-weight:   400;
          color:         var(--text-primary);
          margin-bottom: 4px;
        }

        .timeline-desc {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size:   0.875rem;
          color:       var(--text-secondary);
          line-height: 1.7;
        }

        /* ── Values ───────────────────────────────────────── */
        .co-values {
          background:    var(--rose-50);
          border-top:    1px solid var(--border-soft);
          border-bottom: 1px solid var(--border-soft);
          padding:       100px 32px;
        }

        .co-values-header {
          max-width:   1120px;
          margin:      0 auto 56px;
          display:     grid;
          grid-template-columns: 1fr 1fr;
          gap:         40px;
          align-items: end;
        }

        .values-grid {
          max-width:             1120px;
          margin:                0 auto;
          display:               grid;
          grid-template-columns: repeat(3, 1fr);
          gap:                   1px;
          background:            var(--border-soft);
          border:                1px solid var(--border-soft);
          border-radius:         16px;
          overflow:              hidden;
        }

        .val-card {
          background: #fff;
          padding:    40px 32px;
          transition: background 0.2s ease;
        }

        .val-card:hover { background: var(--rose-50); }

        .val-icon {
          display:       block;
          font-size:     1.5rem;
          color:         var(--rose-500);
          margin-bottom: 18px;
          line-height:   1;
        }

        .val-title {
          font-family:   'DM Serif Display', Georgia, serif;
          font-size:     1.2rem;
          font-weight:   400;
          color:         var(--text-primary);
          margin-bottom: 10px;
        }

        .val-desc {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size:   0.875rem;
          color:       var(--text-secondary);
          line-height: 1.8;
        }

        /* ── Team ─────────────────────────────────────────── */
        .co-team {
          max-width:   1120px;
          margin:      0 auto;
          padding:     100px 32px;
          display:     grid;
          grid-template-columns: 1fr 1fr;
          gap:         80px;
          align-items: start;
        }

        .co-team-right {
          display:        flex;
          flex-direction: column;
          gap:            1px;
          background:     var(--border-soft);
          border:         1px solid var(--border-soft);
          border-radius:  16px;
          overflow:       hidden;
        }

        .team-card {
          display:     flex;
          gap:         18px;
          align-items: flex-start;
          padding:     28px 24px;
          background:  #fff;
          transition:  background 0.18s ease;
        }

        .team-card:hover { background: var(--rose-50); }

        .team-icon {
          font-size:   1.3rem;
          color:       var(--rose-500);
          flex-shrink: 0;
          margin-top:  2px;
        }

        .team-role {
          font-family:   'DM Serif Display', Georgia, serif;
          font-size:     1.05rem;
          font-weight:   400;
          color:         var(--text-primary);
          margin-bottom: 6px;
        }

        .team-desc {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size:   0.875rem;
          color:       var(--text-secondary);
          line-height: 1.7;
        }

        /* ── Bottom CTA ───────────────────────────────────── */
        .co-cta {
          background:  var(--rose-50);
          border-top:  1px solid var(--border-soft);
          padding:     100px 32px;
          text-align:  center;
        }

        .co-cta-inner {
          max-width:      560px;
          margin:         0 auto;
          display:        flex;
          flex-direction: column;
          align-items:    center;
        }

        .co-cta-sub {
          font-family:   'DM Sans', system-ui, sans-serif;
          font-size:     1.05rem;
          color:         var(--text-secondary);
          line-height:   1.75;
          margin-bottom: 36px;
          max-width:     440px;
        }

        /* ── Responsive ───────────────────────────────────── */
        @media (max-width: 960px) {
          .co-hero, .co-story, .co-team {
            grid-template-columns: 1fr;
            gap:           48px;
            padding-left:  24px;
            padding-right: 24px;
          }

          .co-values { padding-left: 24px; padding-right: 24px; }

          .co-values-header { grid-template-columns: 1fr; gap: 8px; }

          .values-grid { grid-template-columns: repeat(2, 1fr); }

          .co-hero { padding-top: 100px; }
          .co-hero-visual { order: -1; }
        }

        @media (max-width: 600px) {
          .values-grid { grid-template-columns: 1fr; }
          .co-hero-title { font-size: 2.1rem; }
          .timeline-row { grid-template-columns: 60px 20px 1fr; }
        }
      `}</style>
    </>
  );
}