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

      // Concentric pulsing rings
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

      // Rotating petals (8 arms)
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

        // Spoke from centre
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(232, 41, 76, ${alpha * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Inner connector dots (secondary layer, blush pink)
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

      // Centre core
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
          ["Mission",  "Build AI that resonates with real human needs."],
          ["Vision",   "Make world-class AI accessible to every business."],
          ["Approach", "Transparent, ethical, outcome-driven delivery."],
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
  { icon: "✦", title: "Integrity First",    desc: "Every model we build is transparent, explainable, and aligned with human values. No black boxes." },
  { icon: "◎", title: "Innovation Always",  desc: "We stay at the cutting edge of AI research so our clients always have access to the best tools." },
  { icon: "◈", title: "Client-Centric",     desc: "Your success metric is our north star. We don't ship code - we deliver outcomes." },
  { icon: "⬡", title: "Responsible AI",     desc: "Ethics and safety are foundational to how we design, build, and deploy every system." },
  { icon: "⊕", title: "Speed to Value",     desc: "AI value should be realised in weeks, not years. Our processes are built for velocity." },
  { icon: "◬", title: "Deep Partnership",   desc: "We embed in your team, your domain, and your goals. We succeed when you succeed." },
];

const milestones = [
  { year: "", title: "Exploring the problem",  desc: "We’re still understanding where AI can create real value instead of just hype." },
  { year: "", title: "Learning from users",     desc: "Talking to people, studying workflows, and identifying actual pain points." },
  { year: "", title: "Building small experiments",  desc: "Testing ideas through simple prototypes to see what works." },
  { year: "", title: "Staying practical",  desc: "Avoiding overengineering and focusing only on useful solutions." },
  { year: "",    title: "Moving step by step",       desc: "No big claims - just consistent progress and learning." },
];

const team = [
  { role: "AI & ML Engineering",     icon: "⬡", desc: "Building and optimising models, pipelines, and infrastructure." },
  { role: "Solutions Architecture",  icon: "◈", desc: "Designing enterprise-grade systems that integrate cleanly with existing stacks." },
  { role: "Data Science",            icon: "◎", desc: "Turning raw data into insight, and insight into action." },
  { role: "Product & Design",        icon: "✦", desc: "Crafting intelligent products that users actually love." },
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
            <span className="rose-accent">Thinking Globally.</span>
          </h1>
          <p className="co-hero-sub">
            ResoneraAI Private Limited is an AI startup dedicated to making
            enterprise-grade artificial intelligence accessible, actionable,
            and transformative - for every organisation, everywhere.
          </p>
          <div className="co-hero-ctas">
            <CTAButton onClick={() => onNav("platform")}>See Our Platform</CTAButton>
            <CTAButton variant="outline" onClick={() => onNav("contact")}>Work With Us</CTAButton>
          </div>
          <div className="co-address-card">
            <span className="co-address-label">Registered Office</span>
            <address className="co-address-body">
              Room No.2, Kore Sankalp, Siddhi Chawl,<br />
              Chougle Nag, Borivali East,<br />
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
            Where Resonance<br />
            <span className="rose-accent">Meets Reason</span>
          </h2>
          <p className="body-copy">
            The name ResoneraAI is born from two ideas: <em>resonance</em> - the deep
            alignment between technology and human needs - and <em>AI</em>. We believe
            that truly effective artificial intelligence must resonate with the problems
            it solves and the people it serves.
          </p>
          <p className="body-copy">
            We were founded by technologists and domain experts who saw a gap: most AI
            companies were either too academic or too generic. Businesses needed a partner
            who could bridge cutting-edge AI research and real-world operational deployment.
          </p>
          <p className="body-copy">
            Proudly built in Borivali East, Mumbai - we are an Indian AI startup building
            world-class solutions with global ambition. Our work spans fintech, healthcare,
            retail, logistics, and beyond.
          </p>
        </div>

        <div className="co-timeline">
          <span className="eyebrow">WHAT WE’RE DOING</span>
          {milestones.map((m) => (
            <div key={m.year} className="timeline-row">
              <span className="timeline-year">{m.year}</span>
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
            Our multidisciplinary team combines deep AI expertise with domain knowledge
            across industries - engineers, scientists, strategists, and designers united
            by a passion for intelligent systems.
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
          <span className="eyebrow" style={{ justifyContent: "center" }}>Ready to Start?</span>
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Join Us on the <span className="rose-accent">AI Frontier</span>
          </h2>
          <p className="co-cta-sub">
            We're always looking for bold clients and brilliant partners to build
            the future of AI together.
          </p>
          <CTAButton size="lg" onClick={() => onNav("contact")}>Get in Touch</CTAButton>
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

        /* Shared typography */
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

        .rose-accent {
          color: var(--rose-500);
        }

        .body-copy {
          font-family:  'DM Sans', system-ui, sans-serif;
          font-size:    1rem;
          color:        var(--text-secondary);
          line-height:  1.85;
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
          font-family:  'DM Sans', system-ui, sans-serif;
          font-size:    1.05rem;
          color:        var(--text-secondary);
          line-height:  1.8;
          margin-bottom: 32px;
          max-width:    480px;
        }

        .co-hero-ctas {
          display:   flex;
          gap:       12px;
          flex-wrap: wrap;
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
          width:           100%;
          display:         flex;
          flex-direction:  column;
          gap:             24px;
        }

        .rose-canvas {
          width:         100%;
          height:        320px;
          border-radius: 16px;
          background:    var(--rose-50);
          border:        1px solid var(--border-soft);
        }

        .rose-pillars {
          display:       flex;
          flex-direction: column;
          gap:           0;
        }

        .rose-pillar {
          display:        flex;
          gap:            20px;
          padding:        14px 0;
          border-bottom:  1px solid var(--border-soft);
          align-items:    flex-start;
        }

        .rose-pillar:last-child {
          border-bottom: none;
        }

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
          max-width: 1120px;
          margin:    0 auto;
          padding:   100px 32px;
          display:   grid;
          grid-template-columns: 1fr 1fr;
          gap:       80px;
          align-items: start;
        }

        /* Timeline */
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
          gap:            0;
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

        .timeline-row:last-child .timeline-line {
          display: none;
        }

        .timeline-title {
          font-family:  'DM Serif Display', Georgia, serif;
          font-size:    1.1rem;
          font-weight:  400;
          color:        var(--text-primary);
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
          background: var(--rose-50);
          border-top:    1px solid var(--border-soft);
          border-bottom: 1px solid var(--border-soft);
          padding:       100px 32px;
        }

        .co-values-header {
          max-width:     1120px;
          margin:        0 auto 56px;
          display:       grid;
          grid-template-columns: 1fr 1fr;
          gap:           40px;
          align-items:   end;
        }

        .values-grid {
          max-width:              1120px;
          margin:                 0 auto;
          display:                grid;
          grid-template-columns:  repeat(3, 1fr);
          gap:                    1px;
          background:             var(--border-soft);
          border:                 1px solid var(--border-soft);
          border-radius:          16px;
          overflow:               hidden;
        }

        .val-card {
          background:  #fff;
          padding:     40px 32px;
          transition:  background 0.2s ease, transform 0.2s ease;
        }

        .val-card:hover {
          background: var(--rose-50);
        }

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
          max-width: 1120px;
          margin:    0 auto;
          padding:   100px 32px;
          display:   grid;
          grid-template-columns: 1fr 1fr;
          gap:       80px;
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

        .team-card:hover {
          background: var(--rose-50);
        }

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
          background:    var(--rose-50);
          border-top:    1px solid var(--border-soft);
          padding:       100px 32px;
          text-align:    center;
        }

        .co-cta-inner {
          max-width:      560px;
          margin:         0 auto;
          display:        flex;
          flex-direction: column;
          align-items:    center;
          gap:            0;
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
          .co-hero,
          .co-story,
          .co-team {
            grid-template-columns: 1fr;
            gap: 48px;
            padding-left:  24px;
            padding-right: 24px;
          }

          .co-values {
            padding-left:  24px;
            padding-right: 24px;
          }

          .co-values-header {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .values-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .co-hero { padding-top: 100px; }
          .co-hero-visual { order: -1; }
        }

        @media (max-width: 600px) {
          .values-grid {
            grid-template-columns: 1fr;
          }

          .co-hero-title {
            font-size: 2.1rem;
          }

          .timeline-row {
            grid-template-columns: 60px 20px 1fr;
          }
        }
      `}</style>
    </>
  );
}