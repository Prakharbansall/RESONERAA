import React, { useState } from "react";
import CTAButton from "../components/CTAButton";

const takes = [
  { 
    n:"01", 
    tag:"Approach", 
    title:"Understanding before building.", 
    body:"Many AI initiatives begin with implementation before clearly understanding the problem. Our current approach focuses on exploring the problem space first, ensuring that systems are built with a clear purpose rather than just technical novelty." 
  },
  { 
    n:"02", 
    tag:"Strategy", 
    title:"Practical use over complexity.", 
    body:"Not all problems require highly complex AI systems. In many cases, structured workflows and simpler approaches are more effective. We explore how to balance high-level capability with day-to-day practicality." 
  },
  { 
    n:"03", 
    tag:"Ethics", 
    title:"Responsibility in system design.", 
    body:"AI systems influence decision-making processes, which makes transparency and accountability vital. Our work includes investigating how systems can remain interpretable and reliable in production environments." 
  },
];

const focusAreas = [
  { type:"Focus",    title:"Data Readiness",      desc:"Analyzing how data quality and structure directly impact AI outcomes and long-term project viability.", action:"Read Notes",    color:"blue" },
  { type:"Design",   title:"System Architecture", desc:"Exploring design approaches for various use cases, from RAG layers to agentic workflows.", action:"View Research",  color:"rose" },
  { type:"Framework", title:"Workflow Clarity",   desc:"Developing methods for improving clarity and predictability in complex AI-driven workflows.", action:"See Framework", color:"green" },
];

const faqs = [
  { q:"What is the goal of this initiative?", a:"ResoneraAI is currently in an early stage, focusing on understanding how artificial intelligence systems can be structured effectively to solve real-world problems." },
  { q:"How do you approach AI design?", a:"We analyze different design patterns, observe how organizations attempt to use AI, and identify recurring patterns in both successful and unsuccessful implementations." },
  { q:"Is this a finished product?", a:"No—this is 'Building in Public.' We are documenting how ideas evolve over time rather than just presenting final conclusions." },
  { q:"How can I stay updated?", a:"We share periodic updates as new learnings emerge. Our goal is to provide meaningful insights rather than frequent, low-value content." },
];

export default function Insights({ onNav }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [email, setEmail]     = useState("");
  const [sent, setSent]       = useState(false);

  const handleSubscribe = (e) => { e.preventDefault(); if (email) setSent(true); };

  return (
    <>
      {/* §1 HERO */}
      <section className="ins-hero" id="insights">
        <div className="ins-hero-inner pg-wrap">
          <div className="ins-hero-text">
            <span className="eyebrow">Thinking Out Loud</span>
            <h1 className="ins-h1">
              Sharing<br />
              observations while<br />
              <em className="ins-em">building.</em>
            </h1>
            <p className="ins-sub">
              This section represents ongoing thoughts, learnings, and observations 
              gathered during the development of the ResoneraAI initiative. We document 
              how ideas evolve in real-time.
            </p>
          </div>
          <div className="ins-hero-aside">
            <div className="stage-card">
              <div className="stage-dot-row">
                <span className="stage-dot" />
                <span className="stage-status">Building in progress</span>
              </div>
              <p className="stage-text">
                The initiative is in an early stage, exploring how AI systems 
                can be structured effectively for long-term value.
              </p>
              <div className="stage-stats">
                <div className="stage-stat"><span className="stage-val">Phase</span><span className="stage-label">Discovery & Design</span></div>
                <div className="stage-stat"><span className="stage-val">Stage</span><span className="stage-label">Early Development</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* §2 TAKES (OUR THINKING) */}
      <section className="takes-section">
        <div className="pg-wrap">
          <div className="takes-head">
            <span className="eyebrow">Core Philosophy</span>
            <h2 className="h2">Three principles guiding<br /><span className="rose">our system development.</span></h2>
          </div>
          <div className="takes-list">
            {takes.map(t => (
              <div key={t.n} className="take-row">
                <span className="take-n">{t.n}</span>
                <div className="take-divider" aria-hidden="true" />
                <div className="take-body">
                  <span className="take-tag">{t.tag}</span>
                  <h3 className="take-title">{t.title}</h3>
                  <p className="take-text">{t.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §3 RESOURCES (ONGOING FOCUS AREAS) */}
      <section className="res-section">
        <div className="pg-wrap">
          <div className="res-head">
            <div>
              <span className="eyebrow">Ongoing Focus</span>
              <h2 className="h2">Research areas we're<br /><span className="rose">currently exploring.</span></h2>
            </div>
            <p className="res-head-desc">
              These materials and frameworks support our understanding of AI systems. 
              They are intended to evolve alongside the platform as we find new ways to improve clarity.
            </p>
          </div>
          <div className="res-grid">
            {focusAreas.map(r => (
              <div key={r.title} className={`res-card res-card--${r.color}`}>
                <span className="res-type">{r.type}</span>
                <h3 className="res-title">{r.title}</h3>
                <p className="res-desc">{r.desc}</p>
                <button className="res-action">
                  {r.action}
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §4 PULL STATEMENT */}
      <section className="statement-band">
        <div className="pg-wrap sb-inner">
          <p className="sb-text">"The focus remains on identifying patterns in successful AI implementations while avoiding the rush toward unvalidated complexity."</p>
          <div className="sb-source">
            <span className="sb-name">ResoneraAI Initiative</span>
            <span className="sb-role">Documentation & Learnings</span>
          </div>
        </div>
        <span className="sb-deco" aria-hidden="true">◈</span>
      </section>

      {/* §5 FAQ */}
      <section className="faq-section">
        <div className="pg-wrap faq-inner">
          <div className="faq-left">
            <span className="eyebrow">Context</span>
            <h2 className="h2">Frequently asked<br /><span className="rose">about the initiative.</span></h2>
            <p className="faq-left-desc">Clarifying our goals and our methodical approach to building ResoneraAI.</p>
          </div>
          <div className="faq-right">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? "faq-item--open" : ""}`}>
                <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                  <span>{f.q}</span>
                  <span className="faq-chevron" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </button>
                <div className="faq-a-wrap"><p className="faq-a">{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* §6 NEWSLETTER (STAYING UPDATED) */}
      <section className="nl-section">
        <div className="pg-wrap nl-outer">
          {sent ? (
            <div className="nl-success">
              <h2 className="nl-success-title">You're on the list.</h2>
              <p className="nl-success-body">Updates are shared periodically as new learnings emerge. No noise, just meaningful insights.</p>
              <button className="nl-reset" onClick={() => { setSent(false); setEmail(""); }}>Reset</button>
            </div>
          ) : (
            <>
              <div className="nl-left">
                <span className="eyebrow">Staying Updated</span>
                <h2 className="h2">Occasional dispatches.<br /><span className="rose">Meaningful insights.</span></h2>
                <p className="nl-desc">The intention is to provide documented learnings as they evolve. We prioritize depth over frequency.</p>
                <div className="nl-promise">
                  {["System design patterns","Data readiness research","Workflow clarity frameworks"].map(p => (
                    <div key={p} className="nl-promise-item">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="#e8294c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
              <form className="nl-form" onSubmit={handleSubscribe}>
                <label className="nl-label">Email address</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="name@organization.com" className="nl-input" />
                <button type="submit" className="nl-submit">
                  Join the list
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Remaining Styles stay exactly as in your original code */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        :root {
          --r5:#e8294c; --r6:#c41f3e; --r50:#fff5f7; --r100:#ffe4ea; --r200:#ffc1cc;
          --cr:#fdf9fa; --tp:#1a1014; --ts:#6b5059; --tm:#9d8089;
          --bs:rgba(232,41,76,0.09); --bm:rgba(232,41,76,0.18);
        }
        .rose { color: var(--r5); }
        .eyebrow { display:block; font-family:'DM Sans',system-ui,sans-serif; font-size:.68rem; font-weight:600; letter-spacing:.11em; text-transform:uppercase; color:var(--r5); margin-bottom:14px; }
        .h2 { font-family:'DM Serif Display',Georgia,serif; font-size:clamp(1.9rem,3vw,2.7rem); font-weight:400; line-height:1.18; color:var(--tp); letter-spacing:-.025em; margin:0 0 20px; }
        .pg-wrap { max-width:1120px; margin:0 auto; width:100%; }

        /* §1 HERO */
        .ins-hero { background:var(--cr); padding:120px 60px 80px; border-bottom:1px solid var(--bs); }
        .ins-hero-inner { display:grid; grid-template-columns:1fr 380px; gap:60px; align-items:start; }
        .ins-h1 { font-family:'DM Serif Display',Georgia,serif; font-size:clamp(2.8rem,5.5vw,5rem); font-weight:400; line-height:1.06; letter-spacing:-.035em; color:var(--tp); margin:0 0 24px; }
        .ins-em { color:var(--r5); font-style:italic; }
        .ins-sub { font-family:'DM Sans',system-ui,sans-serif; font-size:1.05rem; color:var(--ts); line-height:1.82; margin:0; max-width:500px; }
        .stage-card { background:#fff; border:1px solid var(--bs); border-radius:16px; padding:32px 28px; margin-top:8px; }
        .stage-dot-row { display:flex; align-items:center; gap:8px; margin-bottom:16px; }
        .stage-dot { width:8px; height:8px; border-radius:50%; background:#22c55e; animation:sd 2s ease-in-out infinite; flex-shrink:0; }
        @keyframes sd { 0%,100%{opacity:1} 50%{opacity:.35} }
        .stage-status { font-family:'DM Sans',system-ui,sans-serif; font-size:.75rem; font-weight:600; color:var(--tp); letter-spacing:.04em; }
        .stage-text { font-family:'DM Sans',system-ui,sans-serif; font-size:.9rem; color:var(--ts); line-height:1.75; margin:0 0 24px; }
        .stage-stats { display:grid; grid-template-columns:1fr 1fr; gap:0; border-top:1px solid var(--bs); padding-top:20px; }
        .stage-stat:first-child { border-right:1px solid var(--bs); padding-right:20px; }
        .stage-stat:last-child  { padding-left:20px; }
        .stage-val { display:block; font-family:'DM Serif Display',Georgia,serif; font-size:1.5rem; font-weight:400; color:var(--r5); line-height:1; letter-spacing:-.03em; margin-bottom:4px; }
        .stage-label { font-family:'DM Sans',system-ui,sans-serif; font-size:.72rem; font-weight:500; color:var(--tm); }

        /* §2 TAKES */
        .takes-section { background:#fff; padding:120px 60px; border-bottom:1px solid var(--bs); }
        .takes-head { margin-bottom:72px; }
        .takes-list { display:flex; flex-direction:column; border-top:1px solid var(--bs); }
        .take-row { display:grid; grid-template-columns:64px 1px 1fr; gap:48px; align-items:start; padding:52px 0; border-bottom:1px solid var(--bs); transition:padding .18s ease; }
        .take-row:hover { padding-left:16px; padding-right:16px; margin:0 -16px; background:var(--r50); }
        .take-n { font-family:'DM Serif Display',Georgia,serif; font-size:3rem; font-weight:400; color:var(--r200); line-height:1; letter-spacing:-.03em; padding-top:4px; transition:color .2s ease; }
        .take-row:hover .take-n { color:var(--r5); }
        .take-divider { width:1px; align-self:stretch; background:var(--bs); }
        .take-tag { display:inline-block; font-family:'DM Sans',system-ui,sans-serif; font-size:.62rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--r5); background:var(--r100); border:1px solid var(--r200); padding:3px 10px; border-radius:20px; margin-bottom:14px; }
        .take-title { font-family:'DM Serif Display',Georgia,serif; font-size:clamp(1.3rem,2vw,1.7rem); font-weight:400; color:var(--tp); line-height:1.25; margin-bottom:16px; letter-spacing:-.02em; }
        .take-text { font-family:'DM Sans',system-ui,sans-serif; font-size:1rem; color:var(--ts); line-height:1.85; margin:0; max-width:680px; }

        /* §3 RESOURCES */
        .res-section { background:var(--cr); padding:120px 60px; border-bottom:1px solid var(--bs); }
        .res-head { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:end; margin-bottom:60px; }
        .res-head-desc { font-family:'DM Sans',system-ui,sans-serif; font-size:1rem; color:var(--ts); line-height:1.82; margin:0; }
        .res-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .res-card { background:#fff; border:1px solid var(--bs); border-radius:16px; padding:40px 32px; display:flex; flex-direction:column; transition:box-shadow .2s ease, transform .2s ease; }
        .res-card:hover { box-shadow:0 6px 28px rgba(232,41,76,.07); transform:translateY(-2px); }
        .res-type { display:inline-block; font-family:'DM Sans',system-ui,sans-serif; font-size:.62rem; font-weight:700; letter-spacing:.1em; text-transform:uppercase; margin-bottom:16px; padding:3px 10px; border-radius:20px; }
        .res-card--rose .res-type  { color:var(--r5);  background:var(--r100);  border:1px solid var(--r200); }
        .res-card--blue .res-type  { color:#1d6fbd; background:#e8f0fb; border:1px solid #b8d0f4; }
        .res-card--green .res-type { color:#1a7a4e; background:#e4f5ec; border:1px solid #b0dfc5; }
        .res-title { font-family:'DM Serif Display',Georgia,serif; font-size:1.25rem; font-weight:400; color:var(--tp); margin-bottom:12px; letter-spacing:-.01em; line-height:1.3; }
        .res-desc { font-family:'DM Sans',system-ui,sans-serif; font-size:.9rem; color:var(--ts); line-height:1.8; margin-bottom:28px; flex:1; }
        .res-action { display:inline-flex; align-items:center; gap:8px; font-family:'DM Sans',system-ui,sans-serif; font-size:.88rem; font-weight:600; color:var(--r5); background:none; border:none; cursor:pointer; padding:0; margin-top:auto; transition:gap .18s ease; }
        .res-action:hover { gap:12px; }

        /* §4 STATEMENT */
        .statement-band { background:var(--r5); padding:100px 60px; position:relative; overflow:hidden; }
        .sb-inner { position:relative; z-index:1; max-width:800px; }
        .sb-text { font-family:'DM Serif Display',Georgia,serif; font-size:clamp(1.5rem,2.6vw,2.2rem); font-weight:400; font-style:italic; color:#fff; line-height:1.5; margin-bottom:32px; letter-spacing:-.01em; }
        .sb-text em { font-style:normal; opacity:.85; }
        .sb-source { display:flex; flex-direction:column; gap:4px; }
        .sb-name { font-family:'DM Sans',system-ui,sans-serif; font-size:.9rem; font-weight:600; color:rgba(255,255,255,.9); }
        .sb-role { font-family:'DM Sans',system-ui,sans-serif; font-size:.75rem; color:rgba(255,255,255,.55); }
        .sb-deco { position:absolute; right:-30px; bottom:-60px; font-size:clamp(180px,22vw,320px); color:transparent; -webkit-text-stroke:1.5px rgba(255,255,255,.08); line-height:1; pointer-events:none; user-select:none; }

        /* §5 FAQ */
        .faq-section { background:#fff; padding:120px 60px; border-top:1px solid var(--bs); border-bottom:1px solid var(--bs); }
        .faq-inner { display:grid; grid-template-columns:360px 1fr; gap:80px; align-items:start; }
        .faq-left-desc { font-family:'DM Sans',system-ui,sans-serif; font-size:.95rem; color:var(--ts); line-height:1.8; margin-bottom:0; }
        .faq-right { display:flex; flex-direction:column; border-top:1px solid var(--bs); }
        .faq-item { border-bottom:1px solid var(--bs); overflow:hidden; }
        .faq-q { display:flex; align-items:center; justify-content:space-between; gap:16px; width:100%; background:none; border:none; cursor:pointer; padding:24px 0; text-align:left; font-family:'DM Sans',system-ui,sans-serif; font-size:.97rem; font-weight:600; color:var(--tp); transition:color .16s ease; }
        .faq-q:hover { color:var(--r5); }
        .faq-chevron { flex-shrink:0; color:var(--tm); transition:transform .25s ease; }
        .faq-item--open .faq-chevron { transform:rotate(180deg); }
        .faq-a-wrap { max-height:0; overflow:hidden; transition:max-height .3s ease; }
        .faq-item--open .faq-a-wrap { max-height:200px; }
        .faq-a { font-family:'DM Sans',system-ui,sans-serif; font-size:.93rem; color:var(--ts); line-height:1.8; padding-bottom:24px; margin:0; }

        /* §6 NEWSLETTER */
        .nl-section { background:var(--r50); padding:100px 60px; border-top:1px solid var(--bs); border-bottom:1px solid var(--bs); }
        .nl-outer { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start; }
        .nl-desc { font-family:'DM Sans',system-ui,sans-serif; font-size:1rem; color:var(--ts); line-height:1.82; margin-bottom:28px; }
        .nl-promise { display:flex; flex-direction:column; gap:10px; }
        .nl-promise-item { display:flex; align-items:center; gap:10px; font-family:'DM Sans',system-ui,sans-serif; font-size:.9rem; color:var(--ts); }
        .nl-form { display:flex; flex-direction:column; gap:14px; }
        .nl-label { font-family:'DM Sans',system-ui,sans-serif; font-size:.7rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:var(--tm); }
        .nl-input { padding:13px 16px; background:#fff; border:1.5px solid var(--bs); border-radius:10px; font-family:'DM Sans',system-ui,sans-serif; font-size:.95rem; color:var(--tp); outline:none; width:100%; transition:border-color .18s ease, box-shadow .18s ease; -webkit-appearance:none; }
        .nl-input::placeholder { color:var(--tm); }
        .nl-input:focus { border-color:var(--r5); background:#fff; box-shadow:0 0 0 3px rgba(232,41,76,.07); }
        .nl-submit { display:inline-flex; align-items:center; gap:10px; padding:13px 28px; background:var(--r5); color:#fff; font-family:'DM Sans',system-ui,sans-serif; font-size:.95rem; font-weight:600; border:none; border-radius:10px; cursor:pointer; box-shadow:0 2px 12px rgba(232,41,76,.2); transition:background .16s ease, transform .14s ease, box-shadow .16s ease; align-self:flex-start; }
        .nl-submit:hover { background:var(--r6); transform:translateY(-1px); box-shadow:0 4px 20px rgba(232,41,76,.26); }
        .nl-submit svg { transition:transform .18s ease; }
        .nl-submit:hover svg { transform:translateX(3px); }
        .nl-fine { font-family:'DM Sans',system-ui,sans-serif; font-size:.75rem; color:var(--tm); margin:0; }
        .nl-success { grid-column:1/-1; max-width:500px; margin:0 auto; text-align:center; padding:40px 20px; display:flex; flex-direction:column; align-items:center; gap:16px; }
        .nl-check { width:56px; height:56px; background:var(--r50); border-radius:50%; display:flex; align-items:center; justify-content:center; }
        .nl-success-title { font-family:'DM Serif Display',Georgia,serif; font-size:2.2rem; font-weight:400; color:var(--tp); letter-spacing:-.02em; margin:0; }
        .nl-success-body { font-family:'DM Sans',system-ui,sans-serif; font-size:.97rem; color:var(--ts); line-height:1.8; max-width:400px; }
        .nl-reset { font-family:'DM Sans',system-ui,sans-serif; font-size:.85rem; font-weight:500; color:var(--ts); background:none; border:1px solid var(--bs); border-radius:8px; padding:9px 20px; cursor:pointer; transition:border-color .16s, color .16s; }
        .nl-reset:hover { border-color:var(--bm); color:var(--tp); }

        /* §7 CTA */
        .ins-cta { background:var(--cr); padding:100px 60px; }
        .ins-cta-inner { display:flex; align-items:center; justify-content:space-between; gap:48px; flex-wrap:wrap; }
        .ins-cta-sub { font-family:'DM Sans',system-ui,sans-serif; font-size:1rem; color:var(--ts); line-height:1.75; margin:0; }

        /* RESPONSIVE */
        @media(max-width:1024px){
          .ins-hero,.takes-section,.res-section,.statement-band,.faq-section,.nl-section,.ins-cta{padding-left:32px;padding-right:32px;}
        }
        @media(max-width:860px){
          .ins-hero{padding:100px 24px 60px;}
          .ins-hero-inner{grid-template-columns:1fr;gap:40px;}
          .ins-h1{font-size:clamp(2.6rem,9vw,4rem);}
          .takes-section,.res-section,.statement-band,.faq-section,.nl-section,.ins-cta{padding-left:24px;padding-right:24px;}
          .takes-section,.res-section,.faq-section{padding-top:80px;padding-bottom:80px;}
          .take-row{grid-template-columns:52px 1px 1fr;gap:28px;padding:40px 0;}
          .take-row:hover{margin:0;padding:40px 0;}
          .res-head{grid-template-columns:1fr;gap:20px;}
          .res-grid{grid-template-columns:1fr 1fr;}
          .faq-inner{grid-template-columns:1fr;gap:48px;}
          .nl-section{padding-top:80px;padding-bottom:80px;}
          .nl-outer{grid-template-columns:1fr;gap:48px;}
          .ins-cta-inner{flex-direction:column;align-items:flex-start;gap:28px;}
        }
        @media(max-width:560px){
          .res-grid{grid-template-columns:1fr;}
          .ins-h1{font-size:clamp(2.2rem,10vw,3.2rem);}
        }
      `}</style>
    </>
  );
}