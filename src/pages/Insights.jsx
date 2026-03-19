import React, { useState } from "react";
import CTAButton from "../components/CTAButton";

const categories = ["All","AI Trends","Case Studies","Technical","Industry","Research"];

const articles = [
  { cat:"AI Trends", date:"March 2025", title:"The Rise of Agentic AI: What Enterprises Need to Know", excerpt:"Agentic AI systems are moving from research labs to production. We break down what this means for your business strategy and competitive positioning in 2025.", readTime:"6 min", featured:true },
  { cat:"Case Studies", date:"February 2025", title:"How NLP Cut Document Processing Time by 80%", excerpt:"A deep dive into how a leading BFSI firm leveraged our NLP Suite to automate loan document verification at scale - from 3 days to 2 hours.", readTime:"8 min" },
  { cat:"Technical", date:"February 2025", title:"Fine-Tuning LLMs on Proprietary Data: A Practical Guide", excerpt:"Step-by-step walkthrough of adapting large language models to domain-specific datasets without hallucination or data leakage.", readTime:"12 min" },
  { cat:"Industry", date:"January 2025", title:"AI Adoption in Indian SMEs: Barriers and Breakthroughs", excerpt:"Our survey of 200+ Indian SMEs reveals the real obstacles to AI adoption and how forward-thinking companies are overcoming them.", readTime:"5 min" },
  { cat:"AI Trends", date:"January 2025", title:"Multimodal AI: Beyond Text to Vision, Audio, and Code", excerpt:"The next frontier of AI isn't just smarter language models - it's systems that see, hear, read, and reason simultaneously.", readTime:"7 min" },
  { cat:"Technical", date:"December 2024", title:"Vector Databases Explained: RAG Architecture in Production", excerpt:"Retrieval Augmented Generation is revolutionising how we make LLMs work with private enterprise data.", readTime:"10 min" },
  { cat:"Research", date:"December 2024", title:"Responsible AI in Practice: Beyond the Ethics Statement", excerpt:"Moving from AI ethics principles to operational guardrails - how leading organisations are building accountability into their AI pipelines.", readTime:"9 min" },
  { cat:"Case Studies", date:"November 2024", title:"Predictive Maintenance for a Textile Manufacturer", excerpt:"How we built a sensor data pipeline and anomaly detection model that reduced machine downtime by 62% for a Mumbai-based manufacturer.", readTime:"7 min" },
];

function FeaturedVisual({ article }) {
  return (
    <div className="featured-visual">
      <div className="featured-visual__bg">
        <div className="featured-visual__lines">
          {Array.from({length:8}).map((_,i) => (
            <div key={i} className="featured-visual__line" style={{animationDelay:`${i*0.3}s`,top:`${10+i*11}%`}} />
          ))}
        </div>
        <div className="featured-visual__content">
          <span className="featured-visual__cat">{article.cat}</span>
          <h3 className="featured-visual__title">{article.title}</h3>
          <div className="featured-visual__meta">
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime} read</span>
          </div>
          <div className="featured-visual__tag">FEATURED</div>
        </div>
      </div>
    </div>
  );
}

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [subEmail, setSubEmail] = useState("");

  const filtered = activeCategory === "All" ? articles : articles.filter(a => a.cat === activeCategory);
  const featured = filtered.find(a => a.featured) || filtered[0];
  const rest = filtered.filter(a => a !== featured);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subEmail) setSubscribed(true);
  };

  return (
    <>
      {/* TWO-COL HERO */}
      <section className="page-hero" id="insights">
        <div>
          <span className="section-eyebrow">INSIGHTS</span>
          <h1 className="page-hero__title">
            Intelligence,<br/>
            <span className="accent">Shared.</span>
          </h1>
          <p className="page-hero__sub">
            Perspectives, research, and case studies from the forefront of applied artificial intelligence - 
            written by practitioners, for practitioners.
          </p>
          
        </div>
        {featured && <FeaturedVisual article={featured} />}
      </section>

      {/* FILTER */}
      <div className="ins-filter">
        {categories.map(c => (
          <button key={c} className={`ins-cat ${activeCategory===c?"ins-cat--active":""}`} onClick={() => setActiveCategory(c)}>{c}</button>
        ))}
      </div>

      {/* FEATURED ARTICLE */}
      {featured && (
        <section className="ins-featured">
          <div className="ins-featured__left">
            <span className="ins-featured__badge">{featured.cat}</span>
            <p className="ins-featured__meta">{featured.date} · {featured.readTime} read</p>
            <h2 className="ins-featured__title">{featured.title}</h2>
            <p className="ins-featured__excerpt">{featured.excerpt}</p>
            <CTAButton variant="outline">Read Article</CTAButton>
          </div>
          <div className="ins-featured__right">
            <div className="ins-featured__visual">
              <div className="ins-featured__visual-inner">
                <span style={{fontSize:"5rem",color:"var(--accent)",opacity:.2,fontFamily:"'Crimson Pro',serif",lineHeight:.8}}>"</span>
                <p style={{fontFamily:"'Crimson Pro',serif",fontSize:"1.15rem",color:"var(--fg)",lineHeight:1.6,fontStyle:"italic",position:"relative",zIndex:2}}>
                  "{featured.excerpt.slice(0,100)}..."
                </p>
                <div style={{display:"flex",gap:8,marginTop:16,flexWrap:"wrap"}}>
                  {featured.cat.split(" ").map(t => (
                    <span key={t} style={{fontFamily:"'Space Mono',monospace",fontSize:".6rem",color:"var(--accent)",border:"1px solid rgba(0,255,163,.3)",padding:"3px 10px",borderRadius:2}}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ARTICLE GRID */}
      <section className="ins-grid-section">
        <div className="ins-grid">
          {rest.map(a => (
            <article key={a.title} className="ins-card">
              <div className="ins-card__top">
                <span className="ins-card__cat">{a.cat}</span>
                <span className="ins-card__time">{a.readTime}</span>
              </div>
              <p className="ins-card__date">{a.date}</p>
              <h3 className="ins-card__title">{a.title}</h3>
              <p className="ins-card__excerpt">{a.excerpt}</p>
              <button className="ins-card__link">Read More →</button>
            </article>
          ))}
        </div>
      </section>

      {/* AI TOPICS */}
      <section className="ins-topics">
        <div className="ins-topics__header">
          <span className="section-eyebrow">EXPLORE TOPICS</span>
          <h2 className="section-title">What We Write <span className="accent">About</span></h2>
        </div>
        <div className="ins-topics__grid">
          {[
            {icon:"⬡",topic:"Large Language Models",count:"12 articles"},
            {icon:"◎",topic:"MLOps & Deployment",count:"8 articles"},
            {icon:"⬢",topic:"AI in Indian Industry",count:"6 articles"},
            {icon:"◈",topic:"Responsible AI",count:"5 articles"},
            {icon:"⊕",topic:"Computer Vision",count:"4 articles"},
            {icon:"◬",topic:"AI Strategy",count:"9 articles"},
          ].map(t => (
            <div key={t.topic} className="topic-card">
              <span className="topic-card__icon">{t.icon}</span>
              <div>
                <h3 className="topic-card__name">{t.topic}</h3>
                <span className="topic-card__count">{t.count}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER - with working subscribe UI */}
      <section className="ins-newsletter">
        <div className="ins-newsletter__inner">
          {subscribed ? (
            <div className="nl-success">
              <span className="nl-success__icon">◈</span>
              <h2 className="nl-success__title">You're in!</h2>
              <p className="nl-success__body">
                Welcome to the RESONERAAI Insights community. Expect your first dispatch soon - 
                packed with AI trends, case studies, and technical deep-dives.
              </p>
              <div className="nl-success__tags">
                {["AI Trends","Case Studies","Technical","Research"].map(t => (
                  <span key={t} className="nl-success__tag">✓ {t}</span>
                ))}
              </div>
              <button className="nl-success__reset" onClick={() => { setSubscribed(false); setSubEmail(""); }}>
                Subscribe another email
              </button>
            </div>
          ) : (
            <>
              <div className="ins-newsletter__left">
                <span className="section-eyebrow">STAY SHARP</span>
                <h2 className="section-title">Get AI Insights<br/><span className="accent">in Your Inbox</span></h2>
                <p className="section-sub" style={{maxWidth:400,marginTop:12}}>
                  Monthly dispatches on AI trends, case studies, and technical deep-dives - 
                  written by our team of practitioners. No spam, ever.
                </p>
                <div className="nl-benefits">
                  {["Curated AI trend analysis","Real-world case studies","Technical how-to guides","Early access to research"].map(b => (
                    <div key={b} className="nl-benefit"><span>◈</span>{b}</div>
                  ))}
                </div>
              </div>
              <div className="ins-newsletter__right">
                <form className="nl-form" onSubmit={handleSubscribe}>
                  <label className="nl-label">Your email address</label>
                  <input
                    type="email"
                    required
                    value={subEmail}
                    onChange={e => setSubEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="nl-input"
                  />
                  <label className="nl-label" style={{marginTop:16}}>What topics interest you?</label>
                  <div className="nl-checkboxes">
                    {["AI Trends","Technical","Case Studies","Research"].map(t => (
                      <label key={t} className="nl-checkbox">
                        <input type="checkbox" defaultChecked />{t}
                      </label>
                    ))}
                  </div>
                  <button type="submit" className="nl-submit">
                    Subscribe to Insights →
                  </button>
                  <p className="nl-fine">No spam. Unsubscribe any time. We respect your inbox.</p>
                </form>
              </div>
            </>
          )}
        </div>
      </section>

      <style>{`
        .ins-hero-stats{display:flex;gap:36px;margin-top:40px;flex-wrap:wrap;}
        .ins-hero-stat__val{font-family:'Crimson Pro',serif;font-size:2.4rem;font-weight:700;color:var(--accent);display:block;line-height:1;}
        .ins-hero-stat__label{font-family:'Space Mono',monospace;font-size:.62rem;letter-spacing:.14em;color:var(--fg-muted);display:block;margin-top:4px;}
        .featured-visual{width:100%;height:100%;min-height:400px;border:1px solid rgba(0,255,163,.15);border-radius:6px;overflow:hidden;position:relative;background:#060a0e;}
        .featured-visual__bg{position:relative;height:100%;min-height:400px;display:flex;align-items:flex-end;}
        .featured-visual__lines{position:absolute;inset:0;}
        .featured-visual__line{position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(0,255,163,.12),transparent);animation:line-scan 4s ease-in-out infinite;}
        @keyframes line-scan{0%,100%{opacity:.3;transform:scaleX(.3);}50%{opacity:1;transform:scaleX(1);}}
        .featured-visual__content{position:relative;z-index:2;padding:36px;width:100%;background:linear-gradient(to top,rgba(6,10,14,.95),transparent);}
        .featured-visual__cat{font-family:'Space Mono',monospace;font-size:.62rem;letter-spacing:.18em;color:var(--accent);text-transform:uppercase;display:block;margin-bottom:10px;}
        .featured-visual__title{font-family:'Crimson Pro',serif;font-size:1.5rem;font-weight:700;color:var(--fg);line-height:1.3;margin-bottom:10px;}
        .featured-visual__meta{font-family:'Space Mono',monospace;font-size:.62rem;color:var(--fg-muted);display:flex;gap:8px;margin-bottom:14px;}
        .featured-visual__tag{display:inline-block;font-family:'Space Mono',monospace;font-size:.58rem;font-weight:700;letter-spacing:.16em;color:var(--bg);background:var(--accent);padding:3px 10px;border-radius:2px;}
        .ins-filter{display:flex;gap:8px;padding:40px 80px 0;flex-wrap:wrap;border-top:1px solid var(--border);}
        .ins-cat{font-family:'Space Mono',monospace;font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:none;border:1px solid rgba(255,255,255,.1);color:var(--fg-muted);padding:8px 18px;border-radius:2px;cursor:none;transition:all .2s;}
        .ins-cat:hover{color:var(--fg);border-color:rgba(255,255,255,.25);}
        .ins-cat--active{border-color:var(--accent);color:var(--accent);background:rgba(0,255,163,.06);}
        .ins-featured{display:grid;grid-template-columns:1fr 1fr;gap:60px;margin:60px 80px 0;padding:60px;border:1px solid rgba(0,255,163,.15);border-radius:6px;background:linear-gradient(135deg,rgba(0,255,163,.03) 0%,transparent 60%);}
        .ins-featured__badge{display:inline-block;font-family:'Space Mono',monospace;font-size:.62rem;letter-spacing:.18em;color:var(--bg);background:var(--accent);padding:4px 12px;border-radius:2px;margin-bottom:14px;text-transform:uppercase;}
        .ins-featured__meta{font-family:'Space Mono',monospace;font-size:.68rem;color:var(--fg-muted);letter-spacing:.1em;margin-bottom:20px;}
        .ins-featured__title{font-family:'Crimson Pro',serif;font-size:clamp(1.6rem,2.5vw,2.4rem);font-weight:700;color:var(--fg);line-height:1.15;margin-bottom:18px;}
        .ins-featured__excerpt{font-size:1rem;color:var(--fg-muted);line-height:1.8;margin-bottom:28px;}
        .ins-featured__visual-inner{border:1px solid rgba(0,255,163,.15);border-radius:4px;padding:36px;height:100%;display:flex;flex-direction:column;justify-content:center;gap:16px;background:rgba(0,255,163,.02);}
        .ins-grid-section{padding:60px 80px 80px;}
        .ins-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
        .ins-card{padding:36px 30px;border:1px solid var(--border);border-radius:4px;display:flex;flex-direction:column;transition:all .3s;}
        .ins-card:hover{border-color:rgba(0,255,163,.2);transform:translateY(-4px);}
        .ins-card__top{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;}
        .ins-card__cat{font-family:'Space Mono',monospace;font-size:.62rem;letter-spacing:.18em;color:var(--accent);text-transform:uppercase;}
        .ins-card__time{font-family:'Space Mono',monospace;font-size:.62rem;color:var(--fg-muted);}
        .ins-card__date{font-family:'Space Mono',monospace;font-size:.62rem;color:rgba(255,255,255,.22);margin-bottom:12px;}
        .ins-card__title{font-family:'Crimson Pro',serif;font-size:1.25rem;font-weight:700;color:var(--fg);line-height:1.3;margin-bottom:10px;}
        .ins-card__excerpt{font-size:.875rem;color:var(--fg-muted);line-height:1.75;flex:1;margin-bottom:20px;}
        .ins-card__link{font-family:'Space Mono',monospace;font-size:.68rem;font-weight:700;letter-spacing:.1em;color:var(--accent);background:none;border:none;cursor:none;text-align:left;padding:0;text-transform:uppercase;transition:letter-spacing .2s;}
        .ins-card__link:hover{letter-spacing:.18em;}
        .ins-topics{padding:80px 80px;background:var(--bg-2);}
        .ins-topics__header{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:end;margin-bottom:52px;}
        .ins-topics__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;}
        .topic-card{display:flex;align-items:center;gap:16px;padding:28px 24px;border:1px solid var(--border);transition:all .3s;}
        .topic-card:hover{border-color:rgba(0,255,163,.2);background:rgba(0,255,163,.025);}
        .topic-card__icon{font-size:1.8rem;color:var(--accent);flex-shrink:0;}
        .topic-card__name{font-family:'Crimson Pro',serif;font-size:1.1rem;font-weight:700;color:var(--fg);margin-bottom:4px;}
        .topic-card__count{font-family:'Space Mono',monospace;font-size:.62rem;color:var(--fg-muted);}
        .ins-newsletter{padding:100px 80px;border-top:1px solid var(--border);}
        .ins-newsletter__inner{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;}
        .nl-benefits{display:flex;flex-direction:column;gap:10px;margin-top:28px;}
        .nl-benefit{display:flex;align-items:center;gap:12px;font-size:.9rem;color:var(--fg-muted);}
        .nl-benefit span{color:var(--accent);font-size:.7rem;}
        .nl-form{display:flex;flex-direction:column;gap:8px;}
        .nl-label{font-family:'Space Mono',monospace;font-size:.65rem;letter-spacing:.16em;color:var(--fg-muted);text-transform:uppercase;}
        .nl-input{padding:14px 16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:3px;color:var(--fg);font-family:'Space Mono',monospace;font-size:.82rem;outline:none;transition:border-color .2s;}
        .nl-input::placeholder{color:rgba(255,255,255,.2);}
        .nl-input:focus{border-color:rgba(0,255,163,.4);}
        .nl-checkboxes{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:8px;}
        .nl-checkbox{display:flex;align-items:center;gap:6px;font-family:'Space Mono',monospace;font-size:.65rem;color:var(--fg-muted);cursor:none;}
        .nl-checkbox input{accent-color:var(--accent);cursor:none;}
        .nl-submit{padding:14px 24px;background:var(--accent);color:var(--bg);font-family:'Space Mono',monospace;font-size:.8rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;border-radius:3px;cursor:none;transition:all .3s;margin-top:8px;}
        .nl-submit:hover{background:var(--accent-bright);box-shadow:0 0 28px rgba(0,255,163,.3);}
        .nl-fine{font-family:'Space Mono',monospace;font-size:.6rem;color:rgba(255,255,255,.22);margin-top:4px;}
        /* SUCCESS STATE */
        .nl-success{grid-column:1/-1;text-align:center;padding:60px 40px;display:flex;flex-direction:column;align-items:center;gap:20px;}
        .nl-success__icon{font-size:4rem;color:var(--accent);animation:pulse-glow 2s ease-in-out infinite;}
        .nl-success__title{font-family:'Crimson Pro',serif;font-size:3rem;font-weight:700;color:var(--fg);}
        .nl-success__body{font-size:1rem;color:var(--fg-muted);line-height:1.8;max-width:500px;}
        .nl-success__tags{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;}
        .nl-success__tag{font-family:'Space Mono',monospace;font-size:.65rem;font-weight:700;color:var(--accent);border:1px solid rgba(0,255,163,.3);padding:6px 14px;border-radius:2px;}
        .nl-success__reset{font-family:'Space Mono',monospace;font-size:.7rem;font-weight:700;letter-spacing:.1em;background:none;border:1px solid rgba(255,255,255,.12);color:var(--fg-muted);padding:10px 20px;border-radius:3px;cursor:none;transition:all .2s;}
        .nl-success__reset:hover{border-color:var(--accent);color:var(--accent);}
        @media(max-width:960px){
          .ins-filter,.ins-featured,.ins-grid-section,.ins-topics,.ins-newsletter{padding-left:28px;padding-right:28px;}
          .ins-featured{margin:40px 28px 0;grid-template-columns:1fr;}
          .ins-grid,.ins-topics__grid{grid-template-columns:1fr 1fr;}
          .ins-newsletter__inner,.ins-topics__header{grid-template-columns:1fr;}
        }
        @media(max-width:580px){.ins-grid,.ins-topics__grid{grid-template-columns:1fr;}}
      `}</style>
    </>
  );
}   