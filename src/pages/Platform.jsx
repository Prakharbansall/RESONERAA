import React, { useState, useEffect, useRef } from "react";
import CTAButton from "../components/CTAButton";

/* ─────────────────────────────────────────────────────────
   Animated terminal - light-mode rose themed
───────────────────────────────────────────────────────── */
function Terminal() {
  const lines = [
    { t:0,    text:"$ resonera init --project ai-system",          type:"cmd" },
    { t:700,  text:"✓ Project structure initialised",               type:"ok"  },
    { t:1300, text:"$ resonera data connect --source postgres://…", type:"cmd" },
    { t:2000, text:"✓ Data source connected and structured",        type:"ok"  },
    { t:2700, text:"$ resonera model explore --dataset prepared",   type:"cmd" },
    { t:3400, text:"  Experimenting… ████████████████ 100%",        type:"dim" },
    { t:4100, text:"✓ Model behaviour observed and logged",         type:"ok"  },
    { t:4800, text:"$ resonera output structure --workflow active", type:"cmd" },
    { t:5500, text:"✓ Outputs structured and connected",            type:"ok"  },
    { t:6200, text:"✓ System monitoring active- refining ongoing", type:"ok"  },
  ];

  const [visible, setVisible] = useState([]);
  const [cycle,   setCycle]   = useState(0);

  useEffect(() => {
    setVisible([]);
    const timers = lines.map(l =>
      setTimeout(() => setVisible(v => [...v, l]), l.t)
    );
    const reset = setTimeout(() => setCycle(c => c + 1), lines[lines.length - 1].t + 2800);
    return () => { timers.forEach(clearTimeout); clearTimeout(reset); };
  }, [cycle]);

  return (
    <div className="term-wrap">
      <div className="term-topbar">
        <div className="term-dots">
          <span className="term-dot term-dot--r" />
          <span className="term-dot term-dot--y" />
          <span className="term-dot term-dot--g" />
        </div>
        <span className="term-title">resonera_platform - development</span>
        <span className="term-live">
          <span className="term-live-dot" />ACTIVE
        </span>
      </div>
      <div className="term-body">
        {visible.map((l, i) => (
          <div key={i} className={`term-line term-line--${l.type}`}>{l.text}</div>
        ))}
        <span className="term-cursor">▋</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Architecture diagram
───────────────────────────────────────────────────────── */
function ArchDiagram({ active }) {
  const layers = [
    { label:"Data Layer",    items:["Raw Data","Dataset Prep","Data Sources"],        highlight: active === "Data Layer"    || active === "Overview" },
    { label:"Model Layer",   items:["Model Dev","Experimentation","Evaluation"],      highlight: active === "Model Layer"   || active === "Overview" },
    { label:"Serve Layer",   items:["APIs & Outputs","Workflow Links","System Comms"],highlight: active === "Serve Layer"   || active === "Overview" },
    { label:"Observe Layer", items:["Performance","Data Patterns","Refinement"],      highlight: active === "Observe Layer" || active === "Overview" },
  ];

  return (
    <div className="arch-wrap">
      <p className="arch-heading">Platform Architecture</p>
      {layers.map((l) => (
        <div key={l.label} className={`arch-row ${l.highlight ? "arch-row--active" : ""}`}>
          <span className="arch-layer-label">{l.label}</span>
          <div className="arch-items">
            {l.items.map(item => (
              <span key={item} className={`arch-item ${l.highlight ? "arch-item--active" : ""}`}>{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────── */
const tabs = ["Overview", "Data Layer", "Model Layer", "Serve Layer", "Observe Layer"];

const tabContent = {
  Overview: {
    title:    "One platform. A structured way to explore AI systems.",
    desc:     "Artificial intelligence systems often involve multiple layers working together. The platform is being developed to bring these layers into a single, structured environment where they can be understood and managed more effectively. The focus is on creating clarity in how systems are designed, rather than increasing complexity.",
    features: [
      "Organising and preparing data",
      "Experimenting with different model approaches",
      "Structuring outputs and workflows",
      "Monitoring system behaviour and performance",
      "Unified framework rather than separate tools",
      "Understanding how AI systems behave over time",
      "Continuous improvement through observation",
      "Aligned with real-world operational needs",
    ],
  },
  "Data Layer": {
    title:    "Data Layer",
    desc:     "The data layer focuses on how raw and processed data is organised and prepared for use in AI systems. The goal is to ensure data is consistently structured and ready for experimentation across the platform.",
    features: [
      "Structuring input data",
      "Preparing datasets for experimentation",
      "Maintaining consistency across data sources",
      "Understanding data pipelines and flows",
      "Exploring storage structures and formats",
      "Data preparation techniques and validation",
      "Organising raw and processed data",
      "Supporting long-term data usability",
    ],
  },
  "Model Layer": {
    title:    "Model Layer",
    desc:     "The model layer explores how different AI models can be developed, tested, and refined. Rather than focusing only on outputs, the emphasis is on understanding how models behave and how they can be improved over time.",
    features: [
      "Experimenting with different model approaches",
      "Understanding model behaviour in context",
      "Evaluating outputs based on defined criteria",
      "Iterative model refinement through observation",
      "Structured experimentation workflows",
      "Tracking model performance over time",
      "Testing ideas through controlled prototypes",
      "Continuous improvement through iteration",
    ],
  },
  "Serve Layer": {
    title:    "Serve Layer",
    desc:     "The serve layer is focused on how AI outputs are delivered and integrated into workflows. This includes structuring how systems communicate and connect with other tools and environments.",
    features: [
      "Structuring APIs and outputs",
      "Connecting AI systems with other tools",
      "Enabling interaction between systems",
      "Designing output delivery workflows",
      "Integrating AI into existing operational environments",
      "Complementing rather than replacing existing workflows",
      "Structuring system communication layers",
      "Exploring integration patterns and approaches",
    ],
  },
  "Observe Layer": {
    title:    "Observe Layer",
    desc:     "The observation layer focuses on monitoring system behaviour and identifying areas for improvement. Observation is central to the platform's philosophy of continuous, structured refinement.",
    features: [
      "Tracking performance over time",
      "Identifying changes in data patterns",
      "Refining system behaviour through observation",
      "Monitoring interactions between layers",
      "Understanding how systems evolve",
      "Detecting areas requiring adjustment",
      "Supporting continuous improvement cycles",
      "Building foundational observability practices",
    ],
  },
};

const deployOptions = [
  { icon:"☁", title:"Cloud-based environments", desc:"Exploring flexible infrastructure setups that support scalability and accessibility.", tag:"Exploratory" },
  { icon:"⬡", title:"Private environments",      desc:"Understanding how systems can be structured within controlled infrastructure.",           tag:"Exploratory" },
  { icon:"⬢", title:"Local environments",        desc:"Exploring setups where systems operate within limited or isolated environments.",          tag:"Exploratory" },
];

const statusCards = [
  {
    icon:"⬡",
    title:"Building foundational components",
    desc:"Core system components are being developed and tested, forming the base of the platform architecture.",
    status:"In Progress",
  },
  {
    icon:"◈",
    title:"Understanding layer interactions",
    desc:"Work is ongoing to understand how the data, model, serve, and observe layers interact within a unified system.",
    status:"In Progress",
    featured: true,
  },
  {
    icon:"⊕",
    title:"Refining through iteration",
    desc:"Each development cycle contributes to refining the system's structure and behaviour. As development progresses, these components are expected to evolve further.",
    status:"Ongoing",
  },
];

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */
export default function Platform({ onNav }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const content = tabContent[activeTab];

  return (
    <>
      {/* ══ §1 HERO ════════════════════════════════════════ */}
      <section className="plt-hero" id="platform">
        <div className="plt-hero-inner pg-wrap">
          <div className="plt-hero-text">
            <span className="eyebrow">Our Platform</span>
            <h1 className="plt-h1">
              AI infrastructure<br />
              <em className="plt-em">for the real world.</em>
            </h1>
            <p className="plt-hero-sub">
              The Resonera platform is being developed as a structured environment
              where artificial intelligence systems can be explored, organised, and
              refined over time- moving away from fragmented experimentation and
              towards a more unified approach where data, models, and workflows are
              connected within a single system.
            </p>
            <div className="plt-hero-ctas">
              <CTAButton size="lg" onClick={() => onNav("contact")}>Start a Conversation</CTAButton>
              <CTAButton size="lg" variant="outline" onClick={() => onNav("contact")}>Learn More</CTAButton>
            </div>
          </div>
          <div className="plt-hero-terminal">
            <Terminal />
          </div>
        </div>
      </section>

      {/* ══ §2 TABS ════════════════════════════════════════ */}
      <section className="plt-caps">
        <div className="pg-wrap">
          <div className="plt-tab-bar">
            {tabs.map(t => (
              <button
                key={t}
                className={`plt-tab ${activeTab === t ? "plt-tab--active" : ""}`}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="plt-cap-grid" key={activeTab}>
            <div className="plt-cap-left">
              <h2 className="h2">{content.title}</h2>
              <p className="plt-cap-desc">{content.desc}</p>
              <ul className="plt-feature-list">
                {content.features.map(f => (
                  <li key={f} className="plt-feature-item">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l4 4 6-6" stroke="#e8294c" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="plt-cap-ctas">
                <CTAButton onClick={() => onNav("contact")}>Start a Conversation</CTAButton>
                <CTAButton variant="outline" onClick={() => onNav("contact")}>Learn More</CTAButton>
              </div>
            </div>
            <div className="plt-cap-right">
              <ArchDiagram active={activeTab} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ §3 STATEMENT ═══════════════════════════════════ */}
      <section className="plt-statement">
        <div className="pg-wrap">
          <blockquote className="plt-statement-inner">
            <p className="plt-statement-text">
              Rather than focusing only on outputs, the platform is being designed
              to help understand how AI systems behave, how they evolve, and how
              they can be improved continuously.
            </p>
            <footer className="plt-statement-foot">
              <span className="plt-statement-author">ResoneraAI Platform Team</span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ══ §4 DEPLOY OPTIONS ══════════════════════════════ */}
      <section className="plt-deploy">
        <div className="pg-wrap">
          <div className="plt-deploy-head">
            <div>
              <span className="eyebrow">Deployment Options</span>
              <h2 className="h2">Exploratory<br /><span className="rose">deployment stages.</span></h2>
            </div>
            <p className="plt-deploy-desc">
              Different environments are being considered as part of the platform's
              development, based on varying operational needs. These options are
              currently at an exploratory stage and will be refined over time.
            </p>
          </div>

          <div className="plt-deploy-grid">
            {deployOptions.map((d, i) => (
              <div key={d.title} className={`deploy-card ${i === 1 ? "deploy-card--featured" : ""}`}>
                <div className="deploy-card-top">
                  <span className="deploy-icon">{d.icon}</span>
                  <span className="deploy-tag">{d.tag}</span>
                </div>
                <h3 className="deploy-title">{d.title}</h3>
                <p className="deploy-desc">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ §5 HOW IT WORKS ════════════════════════════════ */}
      <section className="plt-how">
        <div className="pg-wrap">
          <div className="plt-how-head">
            <span className="eyebrow">How It Works</span>
            <h2 className="h2">A structured way to<br /><span className="rose">develop AI systems.</span></h2>
          </div>
          <div className="plt-how-steps">
            {[
              { n:"01", title:"Connect Data",      desc:"Understanding how different data sources can be brought into a structured system, ensuring consistency and usability across the platform." },
              { n:"02", title:"Explore Models",    desc:"Experimenting with how models behave when applied to structured datasets, observing the results, and identifying areas for improvement." },
              { n:"03", title:"Structure Outputs", desc:"Designing how outputs can be used within workflows and systems, connecting AI components to existing operational environments." },
              { n:"04", title:"Monitor & Refine",  desc:"Observing system behaviour over time and making continuous improvements based on what is learned through each iteration." },
            ].map((s, i) => (
              <div key={s.n} className="plt-step">
                <div className="plt-step-track">
                  <span className="plt-step-n">{s.n}</span>
                  {i < 3 && <div className="plt-step-connector" aria-hidden="true" />}
                </div>
                <h3 className="plt-step-title">{s.title}</h3>
                <p className="plt-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ §6 CURRENT STATUS ══════════════════════════════ */}
      <section className="plt-pricing">
        <div className="pg-wrap">
          <div className="plt-pricing-head">
            <span className="eyebrow">Current Status</span>
            <h2 className="h2">Platform under<br /><span className="rose">active development.</span></h2>
            <p className="plt-pricing-sub">
              The platform is currently under development, with ongoing work focused
              on building foundational system components, understanding interactions
              between layers, and refining structure through iteration. As development
              progresses, these components are expected to evolve further.
            </p>
          </div>

          <div className="status-grid">
            {statusCards.map(p => (
              <div key={p.title} className={`pricing-card ${p.featured ? "pricing-card--featured" : ""}`}>
                {p.featured && <span className="pricing-badge">Active Focus</span>}
                <span className="status-icon">{p.icon}</span>
                <h3 className="pricing-name">{p.title}</h3>
                <p className="pricing-desc">{p.desc}</p>
                <span className="status-tag">{p.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ §7 BOTTOM CTA ══════════════════════════════════ */}
      <section className="plt-cta">
        <div className="pg-wrap plt-cta-inner">
          <div>
            <span className="eyebrow" style={{color:"rgba(255,255,255,.55)"}}>Ready to explore?</span>
            <h2 className="h2" style={{color:"#fff", marginBottom:12}}>
              Let's discuss how structured AI<br />systems can work for you.
            </h2>
            <p className="plt-cta-sub">
              Free discussion. No commitment. We'd love to understand your operational
              environment and explore what's possible together.
            </p>
          </div>
          <div className="plt-cta-buttons">
            <CTAButton size="lg" onClick={() => onNav("contact")}>Start a Conversation</CTAButton>
          </div>
        </div>
        <span className="plt-cta-deco" aria-hidden="true">◈</span>
      </section>

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
          font-size: 1.5rem; font-weight: 600;
          letter-spacing: .11em; text-transform: uppercase;
          color: var(--r5); margin-bottom: 14px;
        }

        .h2 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(1.9rem, 3vw, 2.7rem);
          font-weight: 400; line-height: 1.18;
          color: var(--tp); letter-spacing: -.025em;
          margin: 0 0 20px;
        }

        .pg-wrap { max-width: 1120px; margin: 0 auto; width: 100%; }

        /* ── §1 HERO ───────────────────────────────────── */
        .plt-hero {
          background: var(--cr);
          padding: 120px 60px 0;
          border-bottom: 1px solid var(--bs);
        }

        .plt-hero-inner {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: center;
          padding-bottom: 64px;
        }

        .plt-h1 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(2.8rem, 5vw, 5rem);
          font-weight: 400; line-height: 1.06;
          letter-spacing: -.035em; color: var(--tp);
          margin: 0 0 24px;
        }

        .plt-em { color: var(--r5); font-style: italic; }

        .plt-hero-sub {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 1.05rem; color: var(--ts);
          line-height: 1.82; margin-bottom: 36px; max-width: 480px;
        }

        .plt-hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
        .plt-hero-terminal { position: relative; }

        .term-wrap {
          background: #1a1014;
          border-radius: 16px; overflow: hidden;
          border: 1px solid rgba(232,41,76,0.15);
          box-shadow: 0 8px 48px rgba(232,41,76,0.08), 0 2px 8px rgba(0,0,0,0.12);
        }

        .term-topbar {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 16px;
          background: rgba(255,255,255,.04);
          border-bottom: 1px solid rgba(232,41,76,0.1);
        }

        .term-dots { display: flex; gap: 6px; }
        .term-dot  { width: 11px; height: 11px; border-radius: 50%; }
        .term-dot--r { background: #ff5f56; }
        .term-dot--y { background: #ffbd2e; }
        .term-dot--g { background: #27c93f; }

        .term-title {
          font-family: 'DM Mono', 'Fira Code', monospace;
          font-size: .68rem; color: rgba(255,255,255,.35);
          margin-left: 8px; flex: 1;
        }

        .term-live {
          display: flex; align-items: center; gap: 5px;
          font-family: 'DM Mono', monospace;
          font-size: .6rem; font-weight: 600; color: #22c55e;
        }

        .term-live-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #22c55e;
          animation: blink-t 1.5s ease-in-out infinite;
        }

        @keyframes blink-t { 0%,100%{opacity:1} 50%{opacity:.3} }

        .term-body {
          padding: 24px 20px; min-height: 280px;
          font-family: 'DM Mono', 'Fira Code', monospace;
          font-size: .78rem; line-height: 2;
        }

        .term-line { animation: term-in .25s ease forwards; }
        @keyframes term-in { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }

        .term-line--cmd { color: #ffc1cc; }
        .term-line--ok  { color: #86efac; }
        .term-line--dim { color: rgba(255,255,255,.38); }

        .term-cursor {
          color: var(--r5); opacity: .9;
          animation: blink-c 1s step-start infinite;
        }

        @keyframes blink-c { 0%,100%{opacity:.9} 50%{opacity:0} }

        /* ── §2 TABS ───────────────────────────────────── */
        .plt-caps {
          background: #fff;
          padding: 80px 60px;
          border-bottom: 1px solid var(--bs);
        }

        .plt-tab-bar {
          display: flex; gap: 0;
          border-bottom: 1px solid var(--bs);
          margin-bottom: 64px; overflow-x: auto;
        }

        .plt-tab {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .88rem; font-weight: 500; color: var(--ts);
          background: none; border: none;
          padding: 14px 24px; cursor: pointer;
          position: relative; white-space: nowrap;
          transition: color .16s ease;
        }

        .plt-tab::after {
          content: ''; position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 2px; background: var(--r5);
          transform: scaleX(0);
          transition: transform .25s ease;
        }

        .plt-tab:hover { color: var(--tp); }
        .plt-tab--active { color: var(--r5); font-weight: 600; }
        .plt-tab--active::after { transform: scaleX(1); }

        .plt-cap-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; align-items: start;
          animation: fade-tab .2s ease;
        }

        @keyframes fade-tab { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

        .plt-cap-desc {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 1rem; color: var(--ts);
          line-height: 1.82; margin-bottom: 36px;
        }

        .plt-feature-list {
          list-style: none; padding: 0; margin: 0 0 40px;
          display: flex; flex-direction: column;
          border-top: 1px solid var(--bs);
        }

        .plt-feature-item {
          display: flex; align-items: center; gap: 12px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .9rem; color: var(--ts);
          padding: 12px 0; border-bottom: 1px solid var(--bs);
        }

        .plt-cap-ctas { display: flex; gap: 12px; flex-wrap: wrap; }

        .arch-wrap {
          background: var(--cr);
          border: 1px solid var(--bs);
          border-radius: 16px; padding: 32px 28px;
          display: flex; flex-direction: column; gap: 12px;
        }

        .arch-heading {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .68rem; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--tm); margin: 0 0 8px;
        }

        .arch-row {
          display: flex; align-items: center; gap: 16px;
          padding: 10px 12px; border-radius: 8px;
          transition: background .18s ease;
        }

        .arch-row--active { background: var(--r50); }

        .arch-layer-label {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .68rem; font-weight: 600; color: var(--tm);
          min-width: 96px; flex-shrink: 0;
        }

        .arch-row--active .arch-layer-label { color: var(--r5); }
        .arch-items { display: flex; gap: 6px; flex-wrap: wrap; }

        .arch-item {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .72rem; font-weight: 500;
          color: var(--ts); background: #fff;
          border: 1px solid var(--bs);
          padding: 4px 10px; border-radius: 6px;
          transition: all .18s ease;
        }

        .arch-item--active {
          color: var(--r5); background: var(--r100);
          border-color: var(--r200); font-weight: 600;
        }

        /* ── §3 STATEMENT ──────────────────────────────── */
        .plt-statement {
          background: var(--r50); padding: 80px 60px;
          border-top: 1px solid var(--bs);
          border-bottom: 1px solid var(--bs);
        }

        .plt-statement-inner { max-width: 800px; margin: 0 auto; }

        .plt-statement-text {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(1.5rem, 2.5vw, 2.2rem);
          font-weight: 400; font-style: italic;
          color: var(--tp); line-height: 1.5;
          letter-spacing: -.01em; margin-bottom: 24px;
        }

        .plt-statement-author {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .88rem; font-weight: 600; color: var(--r5);
        }

        /* ── §4 DEPLOY OPTIONS ─────────────────────────── */
        .plt-deploy {
          background: #fff; padding: 100px 60px;
          border-bottom: 1px solid var(--bs);
        }

        .plt-deploy-head {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 60px; align-items: end; margin-bottom: 60px;
        }

        .plt-deploy-desc {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 1rem; color: var(--ts); line-height: 1.82; margin: 0;
        }

        .plt-deploy-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--bs);
          border: 1px solid var(--bs);
          border-radius: 20px; overflow: hidden;
        }

        .deploy-card {
          background: #fff; padding: 48px 36px;
          transition: background .18s ease; position: relative;
        }

        .deploy-card:hover { background: var(--r50); }
        .deploy-card--featured { background: var(--cr); }
        .deploy-card--featured:hover { background: var(--r50); }

        .deploy-card-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 20px;
        }

        .deploy-icon { font-size: 1.8rem; color: var(--r5); line-height: 1; }

        .deploy-tag {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .62rem; font-weight: 700; letter-spacing: .08em;
          text-transform: uppercase; color: var(--r5);
          background: var(--r100); border: 1px solid var(--r200);
          padding: 3px 9px; border-radius: 20px;
        }

        .deploy-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.3rem; font-weight: 400; color: var(--tp);
          margin-bottom: 12px; letter-spacing: -.01em;
        }

        .deploy-desc {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .9rem; color: var(--ts); line-height: 1.8; margin: 0;
        }

        /* ── §5 HOW IT WORKS ───────────────────────────── */
        .plt-how {
          background: var(--cr); padding: 100px 60px;
          border-bottom: 1px solid var(--bs);
        }

        .plt-how-head { margin-bottom: 72px; }

        .plt-how-steps {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 0; border-top: 1px solid var(--bs);
        }

        .plt-step {
          padding: 40px 32px 40px 0;
          border-right: 1px solid var(--bs); position: relative;
        }

        .plt-step:last-child { border-right: none; padding-right: 0; }
        .plt-step:not(:first-child) { padding-left: 32px; }

        .plt-step-track {
          display: flex; align-items: center; gap: 12px; margin-bottom: 18px;
        }

        .plt-step-n {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 2rem; font-weight: 400; color: var(--r200);
          line-height: 1; letter-spacing: -.03em; transition: color .2s ease;
        }

        .plt-step:hover .plt-step-n { color: var(--r5); }
        .plt-step-connector { flex: 1; height: 1px; background: var(--bs); }

        .plt-step-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.1rem; font-weight: 400; color: var(--tp); margin-bottom: 10px;
        }

        .plt-step-desc {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .875rem; color: var(--ts); line-height: 1.78; margin: 0;
        }

        /* ── §6 CURRENT STATUS ─────────────────────────── */
        .plt-pricing {
          background: #fff; padding: 100px 60px;
          border-bottom: 1px solid var(--bs);
        }

        .plt-pricing-head { margin-bottom: 60px; }

        .plt-pricing-sub {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 1rem; color: var(--ts); line-height: 1.75;
          max-width: 520px; margin: 0;
        }

        .status-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: var(--bs);
          border: 1px solid var(--bs);
          border-radius: 20px; overflow: visible; position: relative;
        }

        .pricing-card {
          background: #fff; padding: 48px 36px;
          display: flex; flex-direction: column;
          position: relative; transition: background .18s ease;
        }

        .pricing-card:hover { background: var(--r50); }

        .pricing-card--featured {
          background: var(--r5);
          margin: -20px 0; padding: 68px 36px;
          z-index: 1;
          box-shadow: 0 8px 40px rgba(232,41,76,0.2);
        }

        .pricing-card--featured:hover { background: var(--r6); }

        .pricing-badge {
          display: inline-block;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .62rem; font-weight: 700; letter-spacing: .1em;
          text-transform: uppercase; color: #fff;
          background: rgba(255,255,255,.2);
          border-radius: 20px; padding: 3px 10px; margin-bottom: 16px;
        }

        .status-icon {
          display: block; font-size: 1.5rem; color: var(--r5);
          margin-bottom: 16px; line-height: 1;
        }

        .pricing-card--featured .status-icon { color: rgba(255,255,255,.85); }

        .pricing-name {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.3rem; font-weight: 400; color: var(--tp);
          margin-bottom: 12px; letter-spacing: -.01em;
        }

        .pricing-card--featured .pricing-name { color: #fff; }

        .pricing-desc {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .9rem; color: var(--ts);
          margin-bottom: 28px; line-height: 1.75; flex: 1;
        }

        .pricing-card--featured .pricing-desc { color: rgba(255,255,255,.8); }

        .status-tag {
          display: inline-block;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .68rem; font-weight: 700; letter-spacing: .08em;
          text-transform: uppercase; color: var(--r5);
          background: var(--r100); border: 1px solid var(--r200);
          padding: 4px 12px; border-radius: 20px;
          margin-top: auto; align-self: flex-start;
        }

        .pricing-card--featured .status-tag {
          color: var(--r5); background: #fff; border-color: transparent;
        }

        /* ── §7 CTA ────────────────────────────────────── */
        .plt-cta {
          background: var(--r5); padding: 100px 60px;
          position: relative; overflow: hidden;
        }

        .plt-cta-inner {
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 48px; flex-wrap: wrap;
          position: relative; z-index: 1;
        }

        .plt-cta-sub {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 1rem; color: rgba(255,255,255,.72);
          line-height: 1.7; margin: 0;
        }

        .plt-cta-buttons {
          display: flex; flex-direction: column; gap: 12px;
          align-items: flex-start; flex-shrink: 0;
        }

        .plt-cta-deco {
          position: absolute; right: -30px; bottom: -60px;
          font-size: clamp(180px, 22vw, 320px);
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,.08);
          line-height: 1; pointer-events: none; user-select: none;
        }

        /* ── RESPONSIVE ────────────────────────────────── */
        @media (max-width: 1024px) {
          .plt-hero, .plt-caps, .plt-statement, .plt-deploy,
          .plt-how, .plt-pricing, .plt-cta { padding-left: 32px; padding-right: 32px; }
        }

        @media (max-width: 860px) {
          .plt-hero { padding: 100px 24px 0; }
          .plt-hero-inner { grid-template-columns: 1fr; gap: 40px; padding-bottom: 48px; }
          .plt-h1 { font-size: clamp(2.6rem, 9vw, 4rem); }

          .plt-caps, .plt-statement, .plt-deploy,
          .plt-how, .plt-pricing, .plt-cta { padding-left: 24px; padding-right: 24px; }

          .plt-cap-grid { grid-template-columns: 1fr; gap: 48px; }
          .plt-deploy-head { grid-template-columns: 1fr; gap: 20px; }
          .plt-deploy-grid { grid-template-columns: 1fr; border-radius: 16px; }

          .plt-how-steps { grid-template-columns: 1fr 1fr; }
          .plt-step { border-right: none; border-bottom: 1px solid var(--bs); padding: 32px 0; }
          .plt-step:not(:first-child) { padding-left: 0; }
          .plt-step:nth-child(2), .plt-step:nth-child(4) { padding-left: 32px; border-left: 1px solid var(--bs); }
          .plt-step:nth-child(3), .plt-step:nth-child(4) { border-bottom: none; }

          .status-grid { grid-template-columns: 1fr; }
          .pricing-card--featured { margin: 0; padding: 48px 36px; }

          .plt-cta-inner { flex-direction: column; align-items: flex-start; gap: 32px; }
          .plt-cta-deco { display: none; }
        }

        @media (max-width: 560px) {
          .plt-h1 { font-size: clamp(2.2rem, 10vw, 3.2rem); }
          .plt-how-steps { grid-template-columns: 1fr; }
          .plt-step:nth-child(2), .plt-step:nth-child(4) { padding-left: 0; border-left: none; }
          .plt-step:nth-child(3) { border-bottom: 1px solid var(--bs); }
          .plt-step:nth-child(4) { border-bottom: none; }
        }
      `}</style>
    </>
  );
}