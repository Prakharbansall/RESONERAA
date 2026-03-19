import React, { useEffect, useRef } from "react";
import CTAButton from "../components/CTAButton";

function DNAVisual() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    let W = c.width = c.offsetWidth;
    let H = c.height = c.offsetHeight;
    let t = 0;
    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      for (let i = 0; i < 20; i++) {
        const y = (i / 20) * H;
        const phase = (i / 20) * Math.PI * 4 + t;
        const x1 = cx + Math.sin(phase) * 70;
        const x2 = cx + Math.sin(phase + Math.PI) * 70;
        const alpha = 0.15 + Math.abs(Math.sin(phase)) * 0.5;
        // strand 1
        ctx.beginPath();
        ctx.arc(x1, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,163,${alpha})`;
        ctx.fill();
        // strand 2
        ctx.beginPath();
        ctx.arc(x2, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,180,255,${alpha * 0.7})`;
        ctx.fill();
        // connector
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = `rgba(0,255,163,${alpha * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      // flowing particles
      for (let i = 0; i < 6; i++) {
        const py = ((t * 60 + i * (H / 6)) % H);
        const px = cx + Math.sin((py / H) * Math.PI * 4 + t) * 70;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,255,163,0.8)";
        ctx.shadowColor = "rgba(0,255,163,0.6)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      t += 0.012;
      raf = requestAnimationFrame(draw);
    }
    draw();
    const ro = new ResizeObserver(() => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; });
    ro.observe(c);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return (
    <div style={{ width: "100%", height: "100%", minHeight: 500, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, position: "relative" }}>
      <canvas ref={canvasRef} style={{ width: "100%", flex: 1, minHeight: 400 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
        {[["Mission", "Build AI that resonates with real human needs"],["Vision", "Make world-class AI accessible to every business"],["Approach", "Transparent, ethical, outcome-driven delivery"]].map(([k,v]) => (
          <div key={k} style={{ display: "flex", gap: 16, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: ".68rem", color: "var(--accent)", letterSpacing: ".16em", minWidth: 80 }}>{k}</span>
            <span style={{ fontSize: ".9rem", color: "var(--fg-muted)", lineHeight: 1.6 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const values = [
  { icon: "◈", title: "Integrity First", desc: "Every model we build is transparent, explainable, and aligned with human values. No black boxes." },
  { icon: "⬡", title: "Innovation Always", desc: "We stay at the cutting edge of AI research so our clients always have access to the best tools." },
  { icon: "◎", title: "Client-Centric", desc: "Your success metric is our north star. We don't ship code - we deliver outcomes." },
  { icon: "⬢", title: "Responsible AI", desc: "Ethics and safety are foundational to how we design, build, and deploy every system." },
  { icon: "⊕", title: "Speed to Value", desc: "We believe AI value should be realized in weeks, not years. Our processes are built for velocity." },
  { icon: "◬", title: "Deep Partnership", desc: "We embed ourselves in your team, your domain, and your goals. We succeed when you succeed." },
];

const milestones = [
  { year: "Q1 2024", title: "Company Founded", desc: "RESONERAAI PRIVATE LIMITED incorporated in Mumbai, Maharashtra." },
  { year: "Q2 2024", title: "First Client", desc: "Delivered first NLP automation project for a fintech client in Pune." },
  { year: "Q3 2024", title: "Platform Launch", desc: "Released RESONERA Platform v1.0 with ML and NLP capabilities." },
  { year: "Q4 2024", title: "10+ Deployments", desc: "Crossed 10 successful AI deployments across BFSI, Retail, and Healthcare." },
  { year: "2025", title: "Scaling Up", desc: "Expanding team, partnerships, and platform capabilities across India." },
];

const team = [
  { role: "AI & ML Engineering", icon: "⬡", desc: "Building and optimising models, pipelines, and infrastructure." },
  { role: "Solutions Architecture", icon: "◈", desc: "Designing enterprise-grade systems that integrate cleanly with existing stacks." },
  { role: "Data Science", icon: "◎", desc: "Turning raw data into insight, and insight into action." },
  { role: "Product & Design", icon: "⬢", desc: "Crafting intelligent products that users actually love." },
];

export default function Company({ onNav }) {
  return (
    <>
      {/* TWO-COL HERO */}
      <section className="page-hero" id="company">
        <div>
          <span className="section-eyebrow">WHO WE ARE</span>
          <h1 className="page-hero__title">
            Built in Mumbai.<br/>
            <span className="accent">Thinking Globally.</span>
          </h1>
          <p className="page-hero__sub">
            RESONERAAI PRIVATE LIMITED is an AI startup dedicated to making enterprise-grade 
            artificial intelligence accessible, actionable, and transformative - for every organisation, everywhere.
          </p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap",marginTop:8}}>
            <CTAButton onClick={() => onNav("platform")}>See Our Platform</CTAButton>
            <CTAButton variant="outline" onClick={() => onNav("contact")}>Work With Us</CTAButton>
          </div>
          <div style={{marginTop:40,padding:"20px",border:"1px solid rgba(0,255,163,0.15)",borderRadius:4}}>
            <span style={{fontFamily:"'Space Mono',monospace",fontSize:".62rem",color:"var(--accent)",letterSpacing:".2em",display:"block",marginBottom:8}}>REGISTERED OFFICE</span>
            <span style={{fontSize:".875rem",color:"var(--fg-muted)",lineHeight:1.9,display:"block"}}>
              Room No.2, Kore Sankalp, Siddhi Chawl,<br/>
              Chougle Nag, Borivali East,<br/>
              Mumbai, Maharashtra 400066, India
            </span>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
          <DNAVisual />
        </div>
      </section>

      {/* STORY */}
      <section className="co-story">
        <div className="co-story__text">
          <span className="section-eyebrow">OUR STORY</span>
          <h2 className="section-title">Where Resonance<br/><span className="accent">Meets Reason</span></h2>
          <p className="co-story__body">
            The name RESONERAAI is born from two ideas: <em>resonance</em> - the deep alignment between 
            technology and human needs - and <em>AI</em>. We believe that truly effective artificial 
            intelligence must resonate with the problems it solves and the people it serves.
          </p>
          <p className="co-story__body">
            We were founded by technologists and domain experts who saw a gap: most AI companies were 
            either too academic or too generic. Businesses needed a partner who could bridge the gap 
            between cutting-edge AI research and real-world operational deployment.
          </p>
          <p className="co-story__body">
            Proudly built in Borivali East, Mumbai - we are an Indian AI startup building world-class 
            AI solutions with global ambition. Our work spans fintech, healthcare, retail, logistics, and beyond.
          </p>
        </div>
        <div className="co-story__timeline">
          <span className="section-eyebrow">JOURNEY SO FAR</span>
          {milestones.map((m,i) => (
            <div key={m.year} className="timeline-item">
              <div className="timeline-item__year">{m.year}</div>
              <div className="timeline-item__dot" />
              <div className="timeline-item__body">
                <h3 className="timeline-item__title">{m.title}</h3>
                <p className="timeline-item__desc">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="co-values">
        <div className="co-values__header">     
          <h2 className="section-title">Principles That <span className="accent">Drive Us</span></h2>
          <span className="section-eyebrow">OUR VALUES</span>
        </div>
        <div className="co-values__grid">
          {values.map(v => (
            <div key={v.title} className="val-card">
              <span className="val-card__icon">{v.icon}</span>
              <h3 className="val-card__title">{v.title}</h3>
              <p className="val-card__desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM AREAS */}
      <section className="co-team">
        <div className="co-team__left">
          <span className="section-eyebrow">THE TEAM</span>
          <h2 className="section-title">People Who<br/><span className="accent">Build AI</span></h2>
          <p className="section-sub" style={{maxWidth:380,marginTop:12,marginBottom:32}}>
            Our multidisciplinary team combines deep AI expertise with domain knowledge across industries.
            We're engineers, scientists, strategists, and designers - united by a passion for intelligent systems.
          </p>
          <CTAButton variant="outline" onClick={() => onNav("contact")}>Join the Team</CTAButton>
        </div>
        <div className="co-team__right">
          {team.map(t => (
            <div key={t.role} className="team-card">
              <span className="team-card__icon">{t.icon}</span>
              <div>
                <h3 className="team-card__role">{t.role}</h3>
                <p className="team-card__desc">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"80px",textAlign:"center",borderTop:"1px solid var(--border)"}}>
        <span className="section-eyebrow" style={{justifyContent:"center",display:"flex"}}>READY TO START?</span>
        <h2 className="section-title" style={{marginBottom:16}}>Join Us on the <span className="accent">AI Frontier</span></h2>
        <p className="section-sub" style={{maxWidth:480,margin:"0 auto 40px"}}>We're always looking for bold clients and brilliant partners to build the future of AI together.</p>
        <CTAButton onClick={() => onNav("contact")}>Get in Touch</CTAButton>
      </section>

      <style>{`
        .co-story{display:grid;grid-template-columns:1fr 1fr;gap:100px;padding:100px 80px;align-items:start;}
        .co-story__body{font-size:1rem;color:var(--fg-muted);line-height:1.9;margin-bottom:20px;}
        .co-story__body em{color:var(--accent);font-style:normal;font-weight:600;}
        .co-story__timeline{display:flex;flex-direction:column;gap:0;}
        .timeline-item{display:grid;grid-template-columns:80px 16px 1fr;gap:14px;align-items:start;padding:20px 0;}
        .timeline-item:not(:last-child){border-bottom:1px solid var(--border);}
        .timeline-item__year{font-family:'Space Mono',monospace;font-size:.65rem;font-weight:700;color:var(--accent);letter-spacing:.1em;padding-top:3px;}
        .timeline-item__dot{width:8px;height:8px;border-radius:50%;background:var(--accent);margin-top:4px;flex-shrink:0;box-shadow:0 0 8px rgba(0,255,163,.4);}
        .timeline-item__title{font-family:'Crimson Pro',serif;font-size:1.15rem;font-weight:700;color:var(--fg);margin-bottom:4px;}
        .timeline-item__desc{font-size:.875rem;color:var(--fg-muted);line-height:1.7;}
        .co-values{padding:100px 80px;background:var(--bg-2);}
        .co-values__header{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:end;margin-bottom:60px;}
        .co-values__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;}
        .val-card{padding:44px 32px;border:1px solid var(--border);transition:all .3s;}
        .val-card:hover{border-color:rgba(0,255,163,.22);background:rgba(0,255,163,.025);transform:translateY(-4px);}
        .val-card__icon{font-size:1.9rem;color:var(--accent);display:block;margin-bottom:18px;}
        .val-card__title{font-family:'Crimson Pro',serif;font-size:1.3rem;font-weight:700;color:var(--fg);margin-bottom:10px;}
        .val-card__desc{font-size:.875rem;color:var(--fg-muted);line-height:1.8;}
        .co-team{display:grid;grid-template-columns:1fr 1fr;gap:100px;padding:100px 80px;align-items:start;}
        .co-team__right{display:flex;flex-direction:column;gap:2px;}
        .team-card{display:flex;gap:20px;align-items:flex-start;padding:28px 24px;border:1px solid var(--border);transition:all .3s;}
        .team-card:hover{border-color:rgba(0,255,163,.2);background:rgba(0,255,163,.025);}
        .team-card__icon{font-size:1.5rem;color:var(--accent);flex-shrink:0;}
        .team-card__role{font-family:'Crimson Pro',serif;font-size:1.1rem;font-weight:700;color:var(--fg);margin-bottom:6px;}
        .team-card__desc{font-size:.875rem;color:var(--fg-muted);line-height:1.7;}
        @media(max-width:960px){
          .co-story,.co-values,.co-team{padding-left:28px;padding-right:28px;}
          .co-story,.co-team{grid-template-columns:1fr;gap:50px;}
          .co-values__header,.co-values__grid{grid-template-columns:1fr 1fr;}
        }
        @media(max-width:580px){.co-values__header,.co-values__grid{grid-template-columns:1fr;}}
      `}</style>
    </>
  );
}