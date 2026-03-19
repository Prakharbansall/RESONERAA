import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Company from "./pages/Company";
import Platform from "./pages/Platform";
import Insights from "./pages/Insights";
import Contact from "./pages/Contact";

const pages = { home: Home, company: Company, platform: Platform, insights: Insights, contact: Contact };

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.10;
      ring.current.y += (pos.current.y - ring.current.y) * 0.10;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    const setHover = (on) => () => {
      if (ringRef.current) ringRef.current.classList.toggle("cursor-ring--hover", on);
      if (dotRef.current) dotRef.current.classList.toggle("cursor-dot--hover", on);
    };
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest("a,button,input,select,textarea")) setHover(true)();
      else setHover(false)();
    });

    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const navigate = (page) => { setActivePage(page); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const PageComponent = pages[activePage] || Home;

  return (
    <>
      <CustomCursor />
      <Navbar activePage={activePage} onNav={navigate} />
      <main><PageComponent onNav={navigate} /></main>
      <Footer onNav={navigate} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Space+Mono:wght@400;700&display=swap');
        :root {
          --bg:#05050c; --bg-2:#07080f; --bg-3:#0a0d16;
          --fg:#f0f0f0; --fg-muted:rgba(240,240,240,0.52);
          --accent:#00ffa3; --accent-bright:#4dffbe; --accent-dim:rgba(0,255,163,0.10);
          --border:rgba(255,255,255,0.07);
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;cursor:none;}
        body{background:var(--bg);color:var(--fg);font-family:'Crimson Pro',Georgia,serif;font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden;cursor:none;}
        a,button{cursor:none;}
        main{min-height:100vh;}
        ::selection{background:rgba(0,255,163,0.22);}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:var(--bg);}
        ::-webkit-scrollbar-thumb{background:rgba(0,255,163,0.22);border-radius:2px;}

        /* CURSOR */
        .cursor-dot{position:fixed;top:0;left:0;width:8px;height:8px;background:var(--accent);border-radius:50%;pointer-events:none;z-index:99999;box-shadow:0 0 10px var(--accent),0 0 20px rgba(0,255,163,0.35);transition:width .15s,height .15s,background .15s;}
        .cursor-dot--hover{width:6px;height:6px;background:#fff;}
        .cursor-ring{position:fixed;top:0;left:0;width:40px;height:40px;border:1.5px solid rgba(0,255,163,0.45);border-radius:50%;pointer-events:none;z-index:99998;transition:width .25s,height .25s,border-color .25s,background .25s;}
        .cursor-ring--hover{width:56px;height:56px;border-color:var(--accent);background:rgba(0,255,163,0.05);}

        /* SHARED */
        .section-eyebrow{font-family:'Space Mono',monospace;font-size:.68rem;letter-spacing:.28em;color:var(--accent);text-transform:uppercase;margin-bottom:14px;display:block;}
        .section-title{font-family:'Crimson Pro',serif;font-size:clamp(2rem,4vw,3.1rem);font-weight:700;color:var(--fg);line-height:1.12;margin-bottom:18px;}
        .section-sub{font-size:1rem;color:var(--fg-muted);line-height:1.85;}
        .accent{color:var(--accent);}

        /* PAGE HERO TWO-COL */
        .page-hero{padding:150px 80px 90px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;position:relative;border-bottom:1px solid var(--border);overflow:hidden;min-height:85vh;}
        .page-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 70% 30%,rgba(0,255,163,0.05) 0%,transparent 65%);pointer-events:none;}
        .page-hero__title{font-family:'Crimson Pro',serif;font-size:clamp(2.8rem,5.5vw,5.2rem);font-weight:700;line-height:1.04;color:var(--fg);margin-bottom:24px;letter-spacing:-.02em;}
        .page-hero__sub{font-size:1.05rem;color:var(--fg-muted);line-height:1.85;margin-bottom:36px;}

        /* KEYFRAMES */
        @keyframes pulse-glow{0%,100%{text-shadow:0 0 8px rgba(0,255,163,.4);}50%{text-shadow:0 0 24px rgba(0,255,163,.9);}}
        @keyframes cell-pulse{0%,100%{opacity:.08;}50%{opacity:.55;}}
        @keyframes float-y{0%,100%{transform:translateY(0);}50%{transform:translateY(-18px);}}
        @keyframes spin-slow{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        @keyframes spin-rev{from{transform:rotate(0deg);}to{transform:rotate(-360deg);}}
        @keyframes blink{0%,100%{opacity:1;box-shadow:0 0 10px var(--accent);}50%{opacity:.3;box-shadow:none;}}
        @keyframes orb-float{0%,100%{transform:translateY(0) scale(1);}50%{transform:translateY(-28px) scale(1.04);}}
        @keyframes slide-in-up{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
        @keyframes dash{to{stroke-dashoffset:0;}}

        @media(max-width:960px){.page-hero{grid-template-columns:1fr;padding:130px 28px 70px;gap:50px;min-height:auto;}}
        @media(max-width:600px){.page-hero{padding:110px 20px 60px;}}
      `}</style>
    </>
  );
}