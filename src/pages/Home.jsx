import React, { useEffect, useRef, useState } from "react";
import CTAButton from "../components/CTAButton";

/* ── Animated network orb for hero right side ── */
function AIOrb() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    let W = c.width = c.offsetWidth;
    let H = c.height = c.offsetHeight;
    const N = 40;
    const nodes = Array.from({ length: N }, (_, i) => {
      const angle = (i / N) * Math.PI * 2;
      const r = 80 + Math.random() * 120;
      return {
        x: W / 2 + Math.cos(angle) * r,
        y: H / 2 + Math.sin(angle) * r,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 1,
      };
    });
    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      // glow center
      const g = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, 160);
      g.addColorStop(0, "rgba(0,255,163,0.08)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(W/2, H/2, 160, 0, Math.PI * 2); ctx.fill();

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        const dx = n.x - W/2, dy = n.y - H/2;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if (dist > 200) { n.vx *= -1; n.vy *= -1; }
        if (dist < 40) { n.vx += dx * 0.002; n.vy += dy * 0.002; }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI*2);
        ctx.fillStyle = `rgba(0,255,163,${0.6 - dist/400})`;
        ctx.fill();
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i+1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx*dx+dy*dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,255,163,${0.12*(1-d/90)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      // central icon
      ctx.font = "bold 36px serif";
      ctx.fillStyle = "rgba(0,255,163,0.9)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("◈", W/2, H/2);
      raf = requestAnimationFrame(draw);
    }
    draw();
    const ro = new ResizeObserver(() => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; });
    ro.observe(c);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", minHeight: 420 }} />;
}

/* ── Marquee trust strip ── */
function Marquee() {
  const items = ["Machine Learning","NLP Solutions","Computer Vision","AI Automation","Data Strategy","LLM Integration","Predictive Analytics","AI Consulting"];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...items,...items].map((s,i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot">◈</span>{s}
          </span>
        ))}
      </div>
      <style>{`
        .marquee-wrap{overflow:hidden;border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:18px 0;background:var(--bg-2);}
        .marquee-track{display:flex;gap:0;width:max-content;animation:marquee-scroll 28s linear infinite;}
        @keyframes marquee-scroll{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        .marquee-item{display:flex;align-items:center;gap:10px;padding:0 48px;font-family:'Space Mono',monospace;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--fg-muted);white-space:nowrap;}
        .marquee-dot{color:var(--accent);font-size:.65rem;}
      `}</style>
    </div>
  );
}


const services = [
  { icon: "⬡", title: "Machine Learning", desc: "Custom ML pipelines, predictive models, and AutoML solutions tailored to your data and business goals.", tag: "CORE" },
  { icon: "◎", title: "NLP & Language AI", desc: "Fine-tuned large language models, document intelligence, semantic search, and conversational AI systems.", tag: "POPULAR" },
  { icon: "⬢", title: "AI Integration", desc: "Seamlessly embed AI capabilities into your existing software stack, CRMs, ERPs, and cloud platforms.", tag: "CORE" },
  { icon: "◈", title: "Data Strategy", desc: "End-to-end data architecture, governance frameworks, and analytics infrastructure for AI-readiness.", tag: "STRATEGY" },
  { icon: "⊕", title: "Computer Vision", desc: "Visual inspection, object detection, OCR, and video analytics for industrial and enterprise use cases.", tag: "ADVANCED" },
  { icon: "◬", title: "AI Consulting", desc: "Strategic AI roadmaps, vendor evaluation, PoC design, and responsible AI adoption frameworks.", tag: "STRATEGY" },
];

const process = [
  { num: "01", title: "Discovery", desc: "We dive deep into your business processes, data landscape, and goals to identify the highest-impact AI opportunities." },
  { num: "02", title: "Design", desc: "Our architects design a tailored solution blueprint - from data pipelines to model architecture and integration points." },
  { num: "03", title: "Build", desc: "Rapid development cycles with continuous feedback loops. We ship working AI prototypes within weeks, not months." },
  { num: "04", title: "Deploy", desc: "Production-grade deployment with monitoring, drift detection, and SLAs that ensure your AI keeps performing." },
];

const testimonials = [
  { quote: "RESONERAAI transformed our document processing pipeline. What took 3 days now takes 2 hours.", name: "Priya Nair", role: "CTO, Fintech Startup, Pune" },
  { quote: "Their NLP solution increased our support ticket resolution speed by 6x. Absolutely game-changing.", name: "Rahul Menon", role: "Head of Operations, D2C Brand, Mumbai" },
  { quote: "The team truly understands both AI and business. They didn't just build a model - they solved our problem.", name: "Ankit Shah", role: "CEO, Logistics Platform, Ahmedabad" },
];

const industries = [
  { icon: "🏦", name: "BFSI", desc: "Risk scoring, fraud detection, document KYC automation" },
  { icon: "🏥", name: "Healthcare", desc: "Clinical NLP, diagnostic assistance, patient analytics" },
  { icon: "🛒", name: "Retail & D2C", desc: "Personalisation engines, demand forecasting, chatbots" },
  { icon: "🏭", name: "Manufacturing", desc: "Visual quality inspection, predictive maintenance" },
  { icon: "⚖️", name: "Legal & Compliance", desc: "Contract intelligence, regulatory monitoring" },
  { icon: "📦", name: "Logistics", desc: "Route optimisation, fleet intelligence, ETA prediction" },
];

export default function Home({ onNav }) {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero__left">
          <div className="hero__eyebrow"><span className="hero__dot"/> AI-NATIVE SOFTWARE &amp; SERVICES · MUMBAI, INDIA</div>
          <h1 className="hero__headline">
            Intelligence<br/>
            <em className="hero__headline-em">Re-engineered.</em>
          </h1>
          <p className="hero__sub">
            RESONERAAI builds transformative AI software and services that help businesses
            think faster, operate smarter, and grow without limits - from Mumbai to the world.
          </p>
          <div className="hero__actions">
            <CTAButton onClick={() => onNav("platform")}>Explore Platform</CTAButton>
            <CTAButton variant="outline" onClick={() => onNav("contact")}>Talk to Us</CTAButton>
          </div>
          <div className="hero__trust">
            <span className="hero__trust-label">Trusted by teams across</span>
            {["BFSI","Healthcare","Retail","Logistics","Legal"].map(i => (
              <span key={i} className="hero__trust-tag">{i}</span>
            ))}
          </div>
        </div>
        <div className="hero__right">
          <div className="hero__orb-wrap">
            <AIOrb />
            <div className="hero__ring hero__ring--1" />
            <div className="hero__ring hero__ring--2" />
          </div>
          <div className="hero__floating-cards">
            <div className="hero__fcard hero__fcard--1">
              <span className="hero__fcard-label">Model Accuracy</span>
              <span className="hero__fcard-val">97.4%</span>
              <span className="hero__fcard-bar"><span style={{width:"97%"}} /></span>
            </div>
            <div className="hero__fcard hero__fcard--2">
              <span className="hero__fcard-label">Latency</span>
              <span className="hero__fcard-val">42ms</span>
              <span className="hero__fcard-sub">↓ real-time inference</span>
            </div>
            <div className="hero__fcard hero__fcard--3">
              <span className="hero__fcard-label">● LIVE</span>
              <span className="hero__fcard-sub">AI pipeline running</span>
            </div>
          </div>
        </div>
        <div className="hero__bg-orb hero__bg-orb--1" />
        <div className="hero__bg-orb hero__bg-orb--2" />
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />



      {/* ── SERVICES ── */}
      <section className="services-section">
        <div className="services-header">
          <div className="services-header__left">
            <span className="section-eyebrow">WHAT WE DO</span>
            <h2 className="section-title">AI Solutions<br/><span className="accent">Built to Scale</span></h2>
          </div>
          <p className="services-header__right section-sub">
            From strategy and architecture to production deployment and ongoing optimisation - 
            we deliver end-to-end AI capabilities that create measurable business value.
          </p>
        </div>
        <div className="services-grid">
          {services.map((s,i) => (
            <div key={s.title} className="svc-card" style={{animationDelay:`${i*0.08}s`}}>
              <div className="svc-card__top">
                <span className="svc-card__icon">{s.icon}</span>
                <span className="svc-card__tag">{s.tag}</span>
              </div>
              <h3 className="svc-card__title">{s.title}</h3>
              <p className="svc-card__desc">{s.desc}</p>
              <div className="svc-card__line" />
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="process-section">
        <div className="process-left">
          <span className="section-eyebrow">HOW WE WORK</span>
          <h2 className="section-title">From Idea to<br/><span className="accent">Production AI</span></h2>
          <p className="section-sub" style={{maxWidth:380,marginTop:16}}>
            Our battle-tested delivery methodology takes your AI from concept to live system - 
            on time, on budget, and with measurable ROI.
          </p>
          <div style={{marginTop:40}}>
            <CTAButton onClick={() => onNav("contact")}>Start Your AI Journey</CTAButton>
          </div>
        </div>
        <div className="process-right">
          {process.map((p,i) => (
            <div key={p.num} className="process-step">
              <div className="process-step__num">{p.num}</div>
              <div className="process-step__body">
                <h3 className="process-step__title">{p.title}</h3>
                <p className="process-step__desc">{p.desc}</p>
              </div>
              {i < process.length - 1 && <div className="process-step__connector" />}
            </div>
          ))}
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="industries-section">
        <div className="industries-header">
          <span className="section-eyebrow">INDUSTRIES WE SERVE</span>
          <h2 className="section-title">AI for Every<br/><span className="accent">Vertical</span></h2>
        </div>
        <div className="industries-grid">
          {industries.map(ind => (
            <div key={ind.name} className="ind-card">
              <span className="ind-card__icon">{ind.icon}</span>
              <h3 className="ind-card__name">{ind.name}</h3>
              <p className="ind-card__desc">{ind.desc}</p>
            </div>
          ))}
        </div>
      </section>



      {/* ── CTA BAND ── */}
      <section className="cta-band">
        <div className="cta-band__inner">
          <div>
            <h2 className="cta-band__title">Ready to transform your business with AI?</h2>
            <p className="cta-band__sub">Let's build something extraordinary together.</p>
          </div>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <CTAButton onClick={() => onNav("contact")}>Start a Conversation</CTAButton>
            <CTAButton variant="outline" onClick={() => onNav("platform")}>See Platform</CTAButton>
          </div>
        </div>
        <div className="cta-band__glow" />
      </section>

      <style>{`
        /* HERO */
        .hero{position:relative;min-height:100vh;display:grid;grid-template-columns:1fr 1fr;gap:0;align-items:center;padding:0 80px;overflow:hidden;}
        .hero__bg-orb{position:absolute;border-radius:50%;pointer-events:none;filter:blur(90px);}
        .hero__bg-orb--1{width:700px;height:700px;background:radial-gradient(circle,rgba(0,255,163,.07),transparent 70%);top:-200px;right:-200px;animation:orb-float 9s ease-in-out infinite;}
        .hero__bg-orb--2{width:500px;height:500px;background:radial-gradient(circle,rgba(0,100,255,.05),transparent 70%);bottom:-100px;left:-100px;animation:orb-float 13s ease-in-out infinite reverse;}
        .hero__left{position:relative;z-index:2;padding-top:100px;padding-right:40px;}
        .hero__right{position:relative;z-index:2;padding-top:100px;display:flex;flex-direction:column;align-items:center;justify-content:center;}
        .hero__eyebrow{display:flex;align-items:center;gap:10px;font-family:'Space Mono',monospace;font-size:.68rem;letter-spacing:.2em;color:var(--accent);margin-bottom:28px;}
        .hero__dot{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 10px var(--accent);animation:blink 2s ease-in-out infinite;flex-shrink:0;}
        .hero__headline{font-family:'Crimson Pro',serif;font-size:clamp(3.5rem,6.5vw,7rem);font-weight:700;line-height:1.0;color:var(--fg);margin-bottom:26px;letter-spacing:-.02em;}
        .hero__headline-em{color:var(--accent);font-style:italic;}
        .hero__sub{font-size:1.08rem;color:var(--fg-muted);line-height:1.8;max-width:520px;margin-bottom:40px;}
        .hero__actions{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:40px;}
        .hero__trust{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
        .hero__trust-label{font-family:'Space Mono',monospace;font-size:.65rem;color:rgba(255,255,255,.28);letter-spacing:.1em;}
        .hero__trust-tag{font-family:'Space Mono',monospace;font-size:.6rem;font-weight:700;letter-spacing:.12em;color:var(--fg-muted);border:1px solid rgba(255,255,255,.1);padding:4px 10px;border-radius:2px;}
        .hero__orb-wrap{position:relative;width:100%;aspect-ratio:1;max-width:460px;}
        .hero__ring{position:absolute;border-radius:50%;border:1px solid rgba(0,255,163,.12);top:50%;left:50%;transform:translate(-50%,-50%);}
        .hero__ring--1{width:480px;height:480px;animation:spin-slow 30s linear infinite;}
        .hero__ring--2{width:360px;height:360px;animation:spin-rev 20s linear infinite;border-style:dashed;}
        .hero__floating-cards{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:16px;width:100%;max-width:460px;}
        .hero__fcard{background:rgba(255,255,255,.04);border:1px solid rgba(0,255,163,.15);border-radius:6px;padding:14px 18px;flex:1;min-width:120px;backdrop-filter:blur(10px);}
        .hero__fcard--1{flex:2;}
        .hero__fcard-label{font-family:'Space Mono',monospace;font-size:.6rem;color:var(--fg-muted);letter-spacing:.12em;display:block;margin-bottom:6px;}
        .hero__fcard-val{font-family:'Crimson Pro',serif;font-size:1.8rem;font-weight:700;color:var(--accent);display:block;margin-bottom:6px;}
        .hero__fcard-bar{display:block;height:3px;background:rgba(255,255,255,.08);border-radius:2px;}
        .hero__fcard-bar span{display:block;height:100%;background:var(--accent);border-radius:2px;}
        .hero__fcard-sub{font-family:'Space Mono',monospace;font-size:.6rem;color:var(--fg-muted);}

        /* STATS */
        .stats-section{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
        .stat-item{padding:52px 40px;border-right:1px solid var(--border);transition:background .3s;}
        .stat-item:last-child{border-right:none;}
        .stat-item:hover{background:rgba(0,255,163,.025);}
        .stat-val{font-family:'Crimson Pro',serif;font-size:3.8rem;font-weight:700;color:var(--accent);line-height:1;margin-bottom:8px;}
        .stat-label{font-family:'Space Mono',monospace;font-size:.65rem;letter-spacing:.16em;color:var(--fg-muted);text-transform:uppercase;}

        /* SERVICES */
        .services-section{padding:120px 80px;}
        .services-header{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:end;margin-bottom:72px;}
        .services-header__right{max-width:480px;}
        .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;}
        .svc-card{padding:44px 36px;border:1px solid var(--border);position:relative;transition:all .3s ease;overflow:hidden;}
        .svc-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,255,163,.04) 0%,transparent 60%);opacity:0;transition:opacity .3s;}
        .svc-card:hover{border-color:rgba(0,255,163,.25);transform:translateY(-5px);box-shadow:0 20px 40px rgba(0,0,0,.3);}
        .svc-card:hover::before{opacity:1;}
        .svc-card__top{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
        .svc-card__icon{font-size:2rem;color:var(--accent);}
        .svc-card__tag{font-family:'Space Mono',monospace;font-size:.55rem;font-weight:700;letter-spacing:.14em;color:var(--bg);background:var(--accent);padding:3px 8px;border-radius:2px;}
        .svc-card__title{font-family:'Crimson Pro',serif;font-size:1.45rem;font-weight:700;color:var(--fg);margin-bottom:14px;}
        .svc-card__desc{font-size:.9rem;color:var(--fg-muted);line-height:1.8;}
        .svc-card__line{position:absolute;bottom:0;left:0;height:2px;width:0;background:var(--accent);transition:width .4s ease;}
        .svc-card:hover .svc-card__line{width:100%;}

        /* PROCESS */
        .process-section{display:grid;grid-template-columns:1fr 1fr;gap:100px;padding:100px 80px;background:var(--bg-2);align-items:start;}
        .process-step{position:relative;display:grid;grid-template-columns:60px 1fr;gap:20px;margin-bottom:0;}
        .process-step__num{font-family:'Crimson Pro',serif;font-size:3rem;font-weight:700;color:rgba(0,255,163,.2);line-height:1;padding-top:2px;}
        .process-step__title{font-family:'Crimson Pro',serif;font-size:1.4rem;font-weight:700;color:var(--fg);margin-bottom:8px;}
        .process-step__desc{font-size:.9rem;color:var(--fg-muted);line-height:1.8;}
        .process-step__connector{grid-column:1;height:40px;width:1px;background:linear-gradient(rgba(0,255,163,.3),transparent);margin:8px auto;}
        .process-right{display:flex;flex-direction:column;gap:0;}

        /* INDUSTRIES */
        .industries-section{padding:100px 80px;}
        .industries-header{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:end;margin-bottom:64px;}
        .industries-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;}
        .ind-card{padding:40px 32px;border:1px solid var(--border);transition:all .3s;position:relative;overflow:hidden;}
        .ind-card::after{content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:var(--accent);transition:width .35s;}
        .ind-card:hover{border-color:rgba(0,255,163,.2);background:rgba(0,255,163,.025);}
        .ind-card:hover::after{width:100%;}
        .ind-card__icon{font-size:2rem;display:block;margin-bottom:16px;}
        .ind-card__name{font-family:'Space Mono',monospace;font-size:.75rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--fg);margin-bottom:10px;}
        .ind-card__desc{font-size:.875rem;color:var(--fg-muted);line-height:1.75;}

        /* TESTIMONIALS */
        .testimonials-section{padding:100px 80px;background:var(--bg-2);}
        .testimonials-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
        .testi-card{padding:44px 36px;border:1px solid var(--border);border-radius:4px;position:relative;transition:all .3s;}
        .testi-card:hover{border-color:rgba(0,255,163,.2);transform:translateY(-4px);}
        .testi-card__quote-mark{font-family:'Crimson Pro',serif;font-size:6rem;line-height:.8;color:rgba(0,255,163,.12);margin-bottom:8px;display:block;}
        .testi-card__text{font-family:'Crimson Pro',serif;font-size:1.15rem;color:var(--fg);line-height:1.7;margin-bottom:28px;font-style:italic;}
        .testi-card__author{display:flex;flex-direction:column;gap:4px;}
        .testi-card__name{font-family:'Space Mono',monospace;font-size:.75rem;font-weight:700;color:var(--accent);letter-spacing:.1em;}
        .testi-card__role{font-family:'Space Mono',monospace;font-size:.62rem;color:var(--fg-muted);}

        /* CTA BAND */
        .cta-band{margin:0 80px 120px;border:1px solid rgba(0,255,163,.15);border-radius:6px;padding:80px 60px;position:relative;overflow:hidden;}
        .cta-band__inner{display:flex;align-items:center;justify-content:space-between;gap:40px;position:relative;z-index:2;flex-wrap:wrap;}
        .cta-band__title{font-family:'Crimson Pro',serif;font-size:clamp(1.5rem,3vw,2.5rem);font-weight:700;color:var(--fg);margin-bottom:8px;}
        .cta-band__sub{font-size:1rem;color:var(--fg-muted);}
        .cta-band__glow{position:absolute;inset:0;background:radial-gradient(ellipse at 65% 50%,rgba(0,255,163,.06) 0%,transparent 70%);}

        @media(max-width:960px){
          .hero{grid-template-columns:1fr;padding:0 28px;min-height:auto;}
          .hero__left{padding-top:130px;padding-right:0;}
          .hero__right{padding-top:0;padding-bottom:60px;}
          .stats-section{grid-template-columns:repeat(2,1fr);}
          .stat-item{border-bottom:1px solid var(--border);}
          .services-section,.process-section,.industries-section,.testimonials-section{padding-left:28px;padding-right:28px;}
          .services-header{grid-template-columns:1fr;}
          .process-section{grid-template-columns:1fr;gap:50px;}
          .industries-header{grid-template-columns:1fr;}
          .services-grid,.industries-grid,.testimonials-grid{grid-template-columns:1fr 1fr;}
          .cta-band{margin:0 28px 80px;}
        }
        @media(max-width:600px){
          .services-grid,.industries-grid,.testimonials-grid{grid-template-columns:1fr;}
          .stats-section{grid-template-columns:1fr 1fr;}
        }
      `}</style>
    </>
  );
}