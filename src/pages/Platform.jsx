import React, { useState, useEffect, useRef } from "react";
import CTAButton from "../components/CTAButton";

function LiveTerminal() {
  const lines = [
    { t: 0, text: "$ resonera init --project fraud-detection", color: "#00ffa3" },
    { t: 600, text: "✓ Project initialized", color: "#4dffbe" },
    { t: 1200, text: "$ resonera data ingest --source postgres://...", color: "#00ffa3" },
    { t: 1800, text: "✓ 847,293 records loaded in 2.1s", color: "#4dffbe" },
    { t: 2400, text: "$ resonera train --model xgboost --target fraud", color: "#00ffa3" },
    { t: 3000, text: "  Training... ████████████████ 100%", color: "rgba(240,240,240,0.6)" },
    { t: 3600, text: "✓ AUC-ROC: 0.974  Precision: 0.91", color: "#4dffbe" },
    { t: 4200, text: "$ resonera deploy --env production", color: "#00ffa3" },
    { t: 4800, text: "✓ Model live at api.resonera.ai/v1/predict", color: "#4dffbe" },
    { t: 5400, text: "✓ Latency: 38ms  Throughput: 2,400 req/s", color: "#4dffbe" },
  ];
  const [visible, setVisible] = useState([]);
  useEffect(() => {
    const timers = lines.map(l => setTimeout(() => setVisible(v => [...v, l]), l.t));
    const loop = setTimeout(() => setVisible([]), lines[lines.length-1].t + 2000);
    return () => { timers.forEach(clearTimeout); clearTimeout(loop); };
  }, []);
  // Re-run
  const [key, setKey] = useState(0);
  useEffect(() => { const t = setTimeout(() => setKey(k => k+1), lines[lines.length-1].t + 3000); return () => clearTimeout(t); }, [key]);

  return (
    <div className="live-terminal" key={key}>
      <div className="lt-bar">
        <span className="lt-dot" style={{background:"#ff5f56"}}/>
        <span className="lt-dot" style={{background:"#ffbd2e"}}/>
        <span className="lt-dot" style={{background:"#27c93f"}}/>
        <span className="lt-title">resonera_cli - production</span>
        <span className="lt-live">● LIVE</span>
      </div>
      <div className="lt-body">
        {visible.map((l,i) => (
          <div key={i} className="lt-line" style={{color:l.color}}>{l.text}</div>
        ))}
        <span className="lt-cursor">▋</span>
      </div>
    </div>
  );
}

const tabs = ["Overview","ML Engine","NLP Suite","Integrations","Security"];
const tabContent = {
  Overview: {
    title: "The RESONERA Platform",
    desc: "Unified AI infrastructure designed for enterprise - modular, scalable, and production-ready from day one. One platform to train, deploy, monitor, and iterate on every AI system your business needs.",
    features: ["Unified model management & versioning","Real-time inference APIs (<50ms latency)","No-code experimentation dashboard","Enterprise-grade security & compliance","Continuous learning & drift detection","Multi-cloud and on-premise deployment","Built-in explainability & audit trails","Role-based access control (RBAC)"],
  },
  "ML Engine": {
    title: "ML Engine",
    desc: "Train, evaluate, and deploy custom machine learning models with our automated pipeline framework. From data ingestion to production serving - all in one place.",
    features: ["AutoML with hyperparameter optimisation","Custom model architectures (PyTorch / TF)","Distributed training across GPU clusters","A/B model testing in production","SHAP-based explainability reporting","One-click model deployment","Data versioning and lineage tracking","Automated retraining triggers"],
  },
  "NLP Suite": {
    title: "NLP Suite",
    desc: "State-of-the-art natural language processing for text, documents, and conversational AI. Fine-tune frontier LLMs on your proprietary data without data leakage.",
    features: ["LLM fine-tuning on private data","Document classification & extraction","Sentiment and intent analysis","Multilingual support (20+ languages)","Conversational AI / chatbot builder","Semantic search & embeddings","Named entity recognition (NER)","RAG (Retrieval Augmented Generation)"],
  },
  Integrations: {
    title: "Integrations",
    desc: "Connect RESONERA to your existing technology stack with 100+ pre-built connectors and a robust REST & GraphQL API.",
    features: ["REST & GraphQL API access","Webhook and event streaming","Salesforce, HubSpot, SAP connectors","AWS, Azure, GCP native integration","PostgreSQL, MongoDB, BigQuery","Custom SDK (Python, Node.js, Java)","Zapier and n8n workflow support","OpenAPI 3.0 spec included"],
  },
  Security: {
    title: "Security & Compliance",
    desc: "Enterprise-grade security baked in at every layer - from data at rest to model outputs. We take your data sovereignty seriously.",
    features: ["AES-256 encryption at rest & in transit","SOC 2 Type II ready architecture","GDPR-compliant data processing","On-premise & private cloud options","End-to-end audit logging","Zero-trust network architecture","Model output redaction controls","Data residency in India available"],
  },
};

const metrics = [
  { val: "< 50ms", label: "API Latency" },
  { val: "99.9%", label: "Uptime SLA" },
  { val: "AES-256", label: "Encryption" },
  { val: "10M+", label: "Daily Inferences" },
];

const pricing = [
  { name: "Starter", price: "Custom", desc: "Perfect for teams exploring AI", features: ["Up to 3 AI models","100K API calls/month","Community support","Standard integrations"] },
  { name: "Growth", price: "Custom", desc: "For scaling AI-first businesses", features: ["Unlimited models","5M API calls/month","Priority support (24h SLA)","All integrations","Dedicated account manager"], featured: true },
  { name: "Enterprise", price: "Custom", desc: "For mission-critical deployments", features: ["Everything in Growth","On-premise deployment","Custom SLA","Dedicated infrastructure","Professional services"] },
];

export default function Platform({ onNav }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const content = tabContent[activeTab];
  return (
    <>
      {/* TWO-COL HERO */}
      <section className="page-hero" id="platform">
        <div>
          <span className="section-eyebrow">OUR PLATFORM</span>
          <h1 className="page-hero__title">
            AI Infrastructure<br/>
            <span className="accent">For the Real World.</span>
          </h1>
          <p className="page-hero__sub">
            The RESONERA Platform gives your team the tools to build, deploy, and manage AI at scale - 
            without the complexity, cost, and risk of building from scratch.
          </p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <CTAButton onClick={() => onNav("contact")}>Request Demo</CTAButton>
            <CTAButton variant="outline" onClick={() => onNav("contact")}>Talk to Sales</CTAButton>
          </div>
        </div>
        <LiveTerminal />
      </section>

      {/* METRICS BAR */}
      <div className="plt-metrics">
        {metrics.map(m => (
          <div key={m.label} className="plt-metric">
            <span className="plt-metric__val">{m.val}</span>
            <span className="plt-metric__label">{m.label}</span>
          </div>
        ))}
      </div>

      {/* TABS */}
      <section className="plt-tabs-section">
        <div className="plt-tabs">
          {tabs.map(t => (
            <button key={t} className={`plt-tab ${activeTab===t?"plt-tab--active":""}`} onClick={() => setActiveTab(t)}>{t}</button>
          ))}
        </div>
        <div className="plt-content">
          <div className="plt-content__text" key={activeTab}>
            <h2 className="section-title" style={{marginBottom:14}}>{content.title}</h2>
            <p className="section-sub" style={{marginBottom:36}}>{content.desc}</p>
            <ul className="plt-features">
              {content.features.map(f => (
                <li key={f} className="plt-feature">
                  <span className="plt-feature__check">◈</span>{f}
                </li>
              ))}
            </ul>
            <div style={{marginTop:40,display:"flex",gap:14}}>
              <CTAButton onClick={() => onNav("contact")}>Get Access</CTAButton>
              <CTAButton variant="outline" onClick={() => onNav("contact")}>Request Demo</CTAButton>
            </div>
          </div>
          <div className="plt-content__visual">
            <div className="plt-arch">
              <div className="plt-arch__title">Platform Architecture</div>
              {[
                {layer:"Data Layer", items:["Raw Data","Feature Store","Vector DB"]},
                {layer:"Model Layer", items:["ML Engine","NLP Suite","CV Models"]},
                {layer:"Serve Layer", items:["REST API","Streaming","Batch"]},
                {layer:"Observe Layer", items:["Monitoring","Drift Detection","Explainability"]},
              ].map((l,i) => (
                <div key={l.layer} className="plt-arch__row">
                  <span className="plt-arch__label">{l.layer}</span>
                  <div className="plt-arch__items">
                    {l.items.map(item => (
                      <div key={item} className="plt-arch__item">{item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEPLOYMENT */}
      <section className="plt-deploy">
        <div className="plt-deploy__header">
          <span className="section-eyebrow">DEPLOYMENT OPTIONS</span>
          <h2 className="section-title">Deploy Anywhere,<br/><span className="accent">Your Way</span></h2>
        </div>
        <div className="plt-deploy__grid">
          {[
            {icon:"☁",title:"Cloud Managed",desc:"Full-managed SaaS on our secure, multi-region cloud. Zero infra ops, instant scale."},
            {icon:"⬡",title:"Private Cloud",desc:"Deploy inside your own AWS, Azure, or GCP account. Full control, no data leaves your environment."},
            {icon:"⬢",title:"On-Premise",desc:"Air-gapped on-premise deployment for banking, defence, and maximum data sovereignty."},
          ].map(d => (
            <div key={d.title} className="deploy-card">
              <span className="deploy-card__icon">{d.icon}</span>
              <h3 className="deploy-card__title">{d.title}</h3>
              <p className="deploy-card__desc">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="plt-pricing">
        <span className="section-eyebrow" style={{textAlign:"center",display:"block",marginBottom:12}}>PRICING</span>
        <h2 className="section-title" style={{textAlign:"center",marginBottom:12}}>Simple, <span className="accent">Transparent Pricing</span></h2>
        <p className="section-sub" style={{textAlign:"center",maxWidth:460,margin:"0 auto 60px"}}>All plans are custom-quoted based on your use case. No hidden fees, no lock-in.</p>
        <div className="pricing-grid">
          {pricing.map(p => (
            <div key={p.name} className={`pricing-card ${p.featured?"pricing-card--featured":""}`}>
              {p.featured && <div className="pricing-card__badge">MOST POPULAR</div>}
              <h3 className="pricing-card__name">{p.name}</h3>
              <div className="pricing-card__price">{p.price}</div>
              <p className="pricing-card__desc">{p.desc}</p>
              <ul className="pricing-card__features">
                {p.features.map(f => <li key={f}><span>◈</span>{f}</li>)}
              </ul>
              <button className="pricing-card__cta" onClick={() => onNav("contact")}>
                {p.featured ? "Get Started →" : "Contact Sales →"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .live-terminal{border:1px solid rgba(0,255,163,.22);border-radius:8px;overflow:hidden;background:#060a0e;height:100%;min-height:380px;display:flex;flex-direction:column;}
        .lt-bar{display:flex;align-items:center;gap:8px;padding:12px 16px;background:rgba(255,255,255,.04);border-bottom:1px solid var(--border);flex-shrink:0;}
        .lt-dot{width:12px;height:12px;border-radius:50%;}
        .lt-title{font-family:'Space Mono',monospace;font-size:.68rem;color:var(--fg-muted);margin-left:8px;flex:1;}
        .lt-live{font-family:'Space Mono',monospace;font-size:.6rem;color:var(--accent);animation:blink 1.5s ease-in-out infinite;}
        .lt-body{padding:24px 20px;font-family:'Space Mono',monospace;font-size:.75rem;line-height:2;flex:1;overflow:hidden;}
        .lt-line{animation:slide-in-up .3s ease forwards;}
        .lt-cursor{color:var(--accent);animation:blink 1s step-start infinite;}
        @keyframes slide-in-up{from{opacity:0;transform:translateY(6px);}to{opacity:1;transform:translateY(0);}}
        .plt-metrics{display:grid;grid-template-columns:repeat(4,1fr);background:var(--bg-2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
        .plt-metric{padding:44px;border-right:1px solid var(--border);}
        .plt-metric:last-child{border-right:none;}
        .plt-metric__val{font-family:'Crimson Pro',serif;font-size:2.6rem;font-weight:700;color:var(--accent);display:block;margin-bottom:6px;}
        .plt-metric__label{font-family:'Space Mono',monospace;font-size:.62rem;letter-spacing:.16em;color:var(--fg-muted);text-transform:uppercase;}
        .plt-tabs-section{padding:80px 80px;}
        .plt-tabs{display:flex;gap:0;border-bottom:1px solid var(--border);margin-bottom:60px;overflow-x:auto;}
        .plt-tab{font-family:'Space Mono',monospace;font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:none;border:none;color:var(--fg-muted);padding:14px 24px;cursor:none;position:relative;transition:color .2s;white-space:nowrap;}
        .plt-tab::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:2px;background:var(--accent);transform:scaleX(0);transition:transform .3s;}
        .plt-tab--active{color:var(--accent);}
        .plt-tab--active::after{transform:scaleX(1);}
        .plt-tab:hover{color:var(--fg);}
        .plt-content{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;}
        .plt-features{list-style:none;padding:0;display:flex;flex-direction:column;gap:0;}
        .plt-feature{display:flex;align-items:center;gap:14px;font-size:.9rem;color:var(--fg-muted);padding:12px 0;border-bottom:1px solid rgba(255,255,255,.04);}
        .plt-feature__check{color:var(--accent);font-size:.75rem;flex-shrink:0;}
        .plt-arch{border:1px solid rgba(0,255,163,.15);border-radius:6px;padding:28px;background:#060a0e;display:flex;flex-direction:column;gap:16px;}
        .plt-arch__title{font-family:'Space Mono',monospace;font-size:.65rem;letter-spacing:.2em;color:var(--accent);margin-bottom:8px;}
        .plt-arch__row{display:flex;align-items:center;gap:16px;}
        .plt-arch__label{font-family:'Space Mono',monospace;font-size:.6rem;color:var(--fg-muted);width:100px;flex-shrink:0;}
        .plt-arch__items{display:flex;gap:8px;flex-wrap:wrap;}
        .plt-arch__item{font-family:'Space Mono',monospace;font-size:.62rem;color:var(--bg);background:rgba(0,255,163,.7);padding:4px 10px;border-radius:2px;}
        .plt-deploy{padding:80px 80px;background:var(--bg-2);}
        .plt-deploy__header{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:end;margin-bottom:60px;}
        .plt-deploy__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
        .deploy-card{padding:44px 36px;border:1px solid var(--border);border-radius:6px;text-align:center;transition:all .3s;}
        .deploy-card:hover{border-color:rgba(0,255,163,.25);transform:translateY(-6px);box-shadow:0 20px 40px rgba(0,0,0,.3);}
        .deploy-card__icon{font-size:2.5rem;color:var(--accent);display:block;margin-bottom:20px;}
        .deploy-card__title{font-family:'Crimson Pro',serif;font-size:1.4rem;font-weight:700;color:var(--fg);margin-bottom:12px;}
        .deploy-card__desc{font-size:.9rem;color:var(--fg-muted);line-height:1.8;}
        .plt-pricing{padding:80px 80px 100px;}
        .pricing-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
        .pricing-card{padding:44px 36px;border:1px solid var(--border);border-radius:6px;position:relative;transition:all .3s;display:flex;flex-direction:column;}
        .pricing-card--featured{border-color:rgba(0,255,163,.35);background:rgba(0,255,163,.025);}
        .pricing-card__badge{position:absolute;top:-1px;left:50%;transform:translateX(-50%);font-family:'Space Mono',monospace;font-size:.58rem;font-weight:700;letter-spacing:.15em;color:var(--bg);background:var(--accent);padding:5px 14px;border-radius:0 0 4px 4px;}
        .pricing-card__name{font-family:'Space Mono',monospace;font-size:.8rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);margin-bottom:12px;}
        .pricing-card__price{font-family:'Crimson Pro',serif;font-size:2.8rem;font-weight:700;color:var(--fg);margin-bottom:8px;}
        .pricing-card__desc{font-size:.875rem;color:var(--fg-muted);margin-bottom:28px;}
        .pricing-card__features{list-style:none;padding:0;display:flex;flex-direction:column;gap:10px;flex:1;margin-bottom:32px;}
        .pricing-card__features li{display:flex;align-items:center;gap:10px;font-size:.875rem;color:var(--fg-muted);}
        .pricing-card__features li span{color:var(--accent);font-size:.7rem;}
        .pricing-card__cta{font-family:'Space Mono',monospace;font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:none;border:1.5px solid rgba(255,255,255,.12);color:var(--fg);padding:12px 20px;border-radius:3px;cursor:none;transition:all .2s;}
        .pricing-card--featured .pricing-card__cta{background:var(--accent);color:var(--bg);border-color:var(--accent);}
        .pricing-card__cta:hover{border-color:var(--accent);color:var(--accent);}
        .pricing-card--featured .pricing-card__cta:hover{background:var(--accent-bright);}
        @media(max-width:960px){
          .plt-tabs-section,.plt-deploy,.plt-pricing{padding-left:28px;padding-right:28px;}
          .plt-metrics{grid-template-columns:repeat(2,1fr);}
          .plt-metric{border-bottom:1px solid var(--border);}
          .plt-content,.plt-deploy__header{grid-template-columns:1fr;}
          .plt-deploy__grid,.pricing-grid{grid-template-columns:1fr;}
        }
      `}</style>
    </>
  );
}