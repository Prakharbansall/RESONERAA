import React, { useState } from "react";

const LAST_UPDATED = "March 202";
const COMPANY      = "ResoneraAI Private Limited";
const EMAIL        = "hello@resoneraai.com";
const ADDRESS      = "Room No.2, Kore Sankalp, Siddhi Chawl, Chougle Nag, Borivali East, Mumbai, Maharashtra 400066, India";
const CIN          = "U72900MH2024PTC000000"; // placeholder

const privacy = [
  {
    title: "Who We Are",
    body: `${COMPANY} ("ResoneraAI", "we", "us", or "our") is an artificial intelligence software and services company incorporated in India. Our registered office is at ${ADDRESS}. This Privacy Policy explains how we collect, use, store, and protect information when you visit our website or engage our services.`,
  },
  {
    title: "Information We Collect",
    body: `We collect information you provide directly - such as your name, email address, phone number, company name, and message content when you contact us through our website. We also collect limited technical data automatically, including your IP address, browser type, and pages visited, solely to maintain the security and performance of our website. We do not use third-party advertising trackers or sell your data to any third party.`,
  },
  {
    title: "How We Use Your Information",
    body: `We use your information to respond to your enquiries, provide and improve our services, send you communications you have opted into (such as our newsletter), and comply with legal obligations. We will never use your data for purposes beyond those described here without your explicit consent.`,
  },
  {
    title: "Data Storage and Security",
    body: `Your data is stored on secure servers located in India and/or within the European Economic Area, depending on the service provider used. We implement industry-standard security measures including encryption in transit (TLS) and access controls. While no system is completely secure, we take all reasonable precautions to protect your personal information.`,
  },
  {
    title: "Data Retention",
    body: `We retain your personal data only as long as necessary to fulfil the purpose for which it was collected, or as required by applicable law. Contact enquiries are retained for up to 24 months. Newsletter subscriber data is retained until you unsubscribe. You may request deletion of your data at any time by writing to us at ${EMAIL}.`,
  },
  {
    title: "Your Rights",
    body: `You have the right to access, correct, or request deletion of your personal data. You also have the right to withdraw consent for marketing communications at any time. To exercise any of these rights, please contact us at ${EMAIL}. We will respond within 30 days. If you are an EU/UK resident, you may also lodge a complaint with your local data protection authority.`,
  },
  {
    title: "Cookies",
    body: `Our website uses only essential cookies necessary for the website to function. We do not use analytics cookies, advertising cookies, or any tracking technologies without your explicit consent. You can disable cookies in your browser settings at any time, though this may affect certain website functionality.`,
  },
  {
    title: "Third-Party Services",
    body: `We may use trusted third-party services to operate our website and deliver our services (for example, email delivery providers). These third parties are contractually bound to process your data only on our instructions and in compliance with applicable data protection laws. We do not share your data with third parties for their own marketing purposes.`,
  },
  {
    title: "Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. When we do, we will revise the "Last Updated" date at the top of this page. Material changes will be communicated to newsletter subscribers by email. Your continued use of our website after changes are posted constitutes your acceptance of the updated policy.`,
  },
];

const terms = [
  {
    title: "Acceptance of Terms",
    body: `By accessing or using the ResoneraAI website (resoneraai.com) or engaging our services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you may not use our website or services. These terms apply to all visitors, clients, and others who access the website.`,
  },
  {
    title: "Our Services",
    body: `${COMPANY} provides artificial intelligence software development, machine learning consultancy, NLP solutions, data strategy, and related professional services. The specific scope, deliverables, timeline, and commercial terms of any engagement are governed by a separate written agreement (Statement of Work or Master Services Agreement) executed between ResoneraAI and the client.`,
  },
  {
    title: "Intellectual Property",
    body: `All content on this website - including text, graphics, logos, and code - is the property of ${COMPANY} or its content suppliers and is protected under applicable Indian and international intellectual property laws. You may not reproduce, distribute, or create derivative works from any website content without our express written permission. Client deliverables and IP ownership are governed by the applicable client agreement.`,
  },
  {
    title: "Confidentiality",
    body: `Any information you share with us during a sales conversation, discovery call, or project engagement will be treated as confidential. We will not disclose your business information, data, or project details to any third party without your consent, except as required by law. Formal confidentiality obligations for client engagements are set out in the relevant client agreement, and we are willing to execute an NDA prior to any substantive discussion.`,
  },
  {
    title: "Disclaimer of Warranties",
    body: `The website and its content are provided "as is" without warranties of any kind, express or implied. While we strive to keep information accurate and up to date, we make no representations about the completeness, accuracy, or suitability of the content for any particular purpose. AI systems involve inherent uncertainty, and outcomes from our services will be governed by the specific terms of your client agreement.`,
  },
  {
    title: "Limitation of Liability",
    body: `To the maximum extent permitted by applicable law, ${COMPANY} shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or our services. Our total liability under any client engagement shall be limited to the fees paid by the client for the specific service giving rise to the claim, as further detailed in the applicable client agreement.`,
  },
  {
    title: "Prohibited Use",
    body: `You agree not to use this website or our services to engage in any unlawful activity, transmit harmful or malicious content, attempt to gain unauthorised access to our systems, infringe the intellectual property rights of any party, or use our AI services to build systems that discriminate unlawfully or cause harm. We reserve the right to refuse service to anyone who violates these terms.`,
  },
  {
    title: "Links to Third-Party Sites",
    body: `Our website may contain links to third-party websites for informational purposes. We have no control over those websites and are not responsible for their content, privacy practices, or terms. The inclusion of a link does not imply our endorsement of the linked site.`,
  },
  {
    title: "Governing Law and Jurisdiction",
    body: `These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India. For client-specific disputes, the dispute resolution mechanism set out in the client agreement shall apply.`,
  },
  {
    title: "Contact Us",
    body: `If you have any questions about these Terms of Service or our Privacy Policy, please contact us at ${EMAIL}. Our registered address is ${ADDRESS}. CIN: ${CIN}.`,
  },
];

const tabs = ["Privacy Policy", "Terms of Service"];

export default function Legal() {
  const [active, setActive] = useState(0);
  const sections = active === 0 ? privacy : terms;

  return (
    <>
      {/* ══ HERO ══════════════════════════════════════════ */}
      <section className="legal-hero">
        <div className="pg-wrap legal-hero-inner">
          <div className="legal-hero-left">
            <span className="eyebrow">Legal</span>
            <h1 className="legal-h1">
              Plain language.<br />
              <em className="legal-em">Real commitments.</em>
            </h1>
            <p className="legal-sub">
              We've written these policies to be read, not buried.
              If something isn't clear, email us - we'll explain it in plain English.
            </p>
          </div>
          <div className="legal-hero-right">
            <div className="legal-meta-card">
              <div className="lm-row">
                <span className="lm-label">Company</span>
                <span className="lm-val">{COMPANY}</span>
              </div>

              <div className="lm-row">
                <span className="lm-label">Jurisdiction</span>
                <span className="lm-val">India</span>
              </div>
              <div className="lm-row lm-row--last">
                <span className="lm-label">Questions?</span>
                <a href={`mailto:${EMAIL}`} className="lm-link">{EMAIL}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TAB BAR ═══════════════════════════════════════ */}
      <div className="tab-bar">
        <div className="pg-wrap tab-bar-inner">
          <div className="tab-pills">
            {tabs.map((t, i) => (
              <button
                key={t}
                className={`tab-pill ${active === i ? "tab-pill--active" : ""}`}
                onClick={() => setActive(i)}
              >
                {t}
              </button>
            ))}
          </div>
          
        </div>
      </div>

      {/* ══ CONTENT ═══════════════════════════════════════ */}
      <section className="legal-body">
        <div className="pg-wrap legal-layout">

          {/* Sticky sidebar nav */}
          <nav className="legal-nav" aria-label="Section navigation">
            <p className="legal-nav-heading">
              {tabs[active]}
            </p>
            <ul className="legal-nav-list">
              {sections.map((s, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    className="legal-nav-link"
                  >
                    <span className="legal-nav-n">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Main content */}
          <div className="legal-content">
            <div className="legal-intro-band">
              <p className="legal-intro-text">
                {active === 0
                  ? `This Privacy Policy was updated and applies to all visitors and clients of ${COMPANY}.`
                  : `These Terms of Service were last updated in  and govern your use of the ResoneraAI website and services.`
                }
              </p>
            </div>

            {sections.map((s, i) => (
              <div key={i} id={`section-${i}`} className="legal-section">
                <div className="legal-section-header">
                  <span className="legal-section-n">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="legal-section-title">{s.title}</h2>
                </div>
                <p className="legal-section-body">{s.body}</p>
              </div>
            ))}

            {/* Contact footer */}
            <div className="legal-contact-card">
              <div className="lcc-inner">
                <div>
                  <p className="lcc-title">Got a question about this policy?</p>
                  <p className="lcc-body">
                    We're a small team and we read every email. Write to us at{" "}
                    <a href={`mailto:${EMAIL}`} className="lcc-email">{EMAIL}</a>{" "}
                    and we'll respond personally within 2 business days.
                  </p>
                </div>
                <a href={`mailto:${EMAIL}`} className="lcc-btn">
                  Email Us
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor"
                      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
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

        .eyebrow {
          display: block;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .68rem; font-weight: 600;
          letter-spacing: .11em; text-transform: uppercase;
          color: var(--r5); margin-bottom: 14px;
        }

        .pg-wrap { max-width: 1120px; margin: 0 auto; width: 100%; }

        /* ── HERO ──────────────────────────────────────── */
        .legal-hero {
          background: var(--cr);
          padding: 120px 60px 80px;
          border-bottom: 1px solid var(--bs);
        }

        .legal-hero-inner {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 60px; align-items: center;
        }

        .legal-h1 {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(2.6rem, 5vw, 4.5rem);
          font-weight: 400; line-height: 1.06;
          letter-spacing: -.035em; color: var(--tp);
          margin: 0 0 24px;
        }

        .legal-em { color: var(--r5); font-style: italic; }

        .legal-sub {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: 1.02rem; color: var(--ts);
          line-height: 1.82; margin: 0; max-width: 460px;
        }

        /* Meta card */
        .legal-meta-card {
          background: #fff;
          border: 1px solid var(--bs);
          border-radius: 14px;
          overflow: hidden;
        }

        .lm-row {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 12px; align-items: start;
          padding: 16px 22px;
          border-bottom: 1px solid var(--bs);
        }

        .lm-row--last { border-bottom: none; }

        .lm-label {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .68rem; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase;
          color: var(--tm);
        }

        .lm-val {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .88rem; color: var(--tp); line-height: 1.5;
        }

        .lm-link {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .88rem; color: var(--r5);
          text-decoration: none;
          transition: opacity .16s;
        }

        .lm-link:hover { opacity: .75; }

        /* ── TAB BAR ───────────────────────────────────── */
        .tab-bar {
          background: #fff;
          border-bottom: 1px solid var(--bs);
          position: sticky; top: 68px; z-index: 100;
        }

        .tab-bar-inner {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 14px 0; gap: 16px;
          flex-wrap: wrap;
        }

        .tab-pills { display: flex; gap: 6px; }

        .tab-pill {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .88rem; font-weight: 500; color: var(--ts);
          background: none; border: 1px solid var(--bs);
          border-radius: 20px; padding: 7px 20px;
          cursor: pointer;
          transition: all .16s ease;
        }

        .tab-pill:hover { color: var(--tp); border-color: var(--bm); }

        .tab-pill--active {
          color: var(--r5); background: var(--r100);
          border-color: var(--r200); font-weight: 600;
        }

        .tab-updated {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .75rem; color: var(--tm);
        }

        /* ── BODY ──────────────────────────────────────── */
        .legal-body {
          background: #fff;
          padding: 80px 60px 120px;
        }

        .legal-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 80px; align-items: start;
        }

        /* Sticky sidebar */
        .legal-nav {
          position: sticky; top: calc(68px + 57px + 40px);
          max-height: calc(100vh - 200px);
          overflow-y: auto;
          scrollbar-width: none;
        }

        .legal-nav::-webkit-scrollbar { display: none; }

        .legal-nav-heading {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .68rem; font-weight: 700;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--tm); margin: 0 0 16px;
        }

        .legal-nav-list {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 2px;
        }

        .legal-nav-link {
          display: flex; align-items: baseline; gap: 8px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .82rem; color: var(--ts);
          text-decoration: none; padding: 6px 8px;
          border-radius: 7px;
          transition: color .15s ease, background .15s ease;
        }

        .legal-nav-link:hover {
          color: var(--r5); background: var(--r50);
        }

        .legal-nav-n {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: .75rem; color: var(--r200);
          flex-shrink: 0; line-height: 1;
          transition: color .15s ease;
        }

        .legal-nav-link:hover .legal-nav-n { color: var(--r5); }

        /* Intro band */
        .legal-intro-band {
          background: var(--r50);
          border: 1px solid var(--bs);
          border-radius: 12px;
          padding: 20px 24px;
          margin-bottom: 56px;
        }

        .legal-intro-text {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .9rem; color: var(--ts);
          line-height: 1.75; margin: 0;
        }

        /* Sections */
        .legal-section {
          padding: 48px 0;
          border-bottom: 1px solid var(--bs);
          scroll-margin-top: 180px;
        }

        .legal-section:last-of-type { border-bottom: none; }

        .legal-section-header {
          display: flex; align-items: baseline;
          gap: 16px; margin-bottom: 18px;
        }

        .legal-section-n {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.6rem; font-weight: 400;
          color: var(--r200); line-height: 1;
          letter-spacing: -.02em; flex-shrink: 0;
        }

        .legal-section-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.35rem; font-weight: 400;
          color: var(--tp); letter-spacing: -.015em;
          line-height: 1.2; margin: 0;
        }

        .legal-section-body {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .97rem; color: var(--ts);
          line-height: 1.9; margin: 0;
          max-width: 700px;
        }

        /* Contact card */
        .legal-contact-card {
          background: var(--r50);
          border: 1px solid var(--bs);
          border-radius: 16px;
          padding: 36px 36px;
          margin-top: 56px;
        }

        .lcc-inner {
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 32px; flex-wrap: wrap;
        }

        .lcc-title {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 1.2rem; font-weight: 400;
          color: var(--tp); margin: 0 0 8px;
          letter-spacing: -.01em;
        }

        .lcc-body {
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .9rem; color: var(--ts);
          line-height: 1.75; margin: 0; max-width: 520px;
        }

        .lcc-email {
          color: var(--r5); text-decoration: none;
          font-weight: 500;
          transition: opacity .16s;
        }

        .lcc-email:hover { opacity: .75; }

        .lcc-btn {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'DM Sans', system-ui, sans-serif;
          font-size: .9rem; font-weight: 600; color: #fff;
          background: var(--r5); text-decoration: none;
          border-radius: 10px; padding: 11px 22px;
          white-space: nowrap; flex-shrink: 0;
          box-shadow: 0 2px 12px rgba(232,41,76,.2);
          transition: background .16s ease, transform .14s ease;
        }

        .lcc-btn:hover { background: var(--r6); transform: translateY(-1px); }
        .lcc-btn svg { transition: transform .18s ease; }
        .lcc-btn:hover svg { transform: translateX(3px); }

        /* ── RESPONSIVE ────────────────────────────────── */
        @media (max-width: 1024px) {
          .legal-hero, .legal-body { padding-left: 32px; padding-right: 32px; }
          .tab-bar-inner { padding-left: 32px; padding-right: 32px; }
        }

        @media (max-width: 860px) {
          .legal-hero { padding: 100px 24px 60px; }
          .legal-hero-inner { grid-template-columns: 1fr; gap: 36px; }
          .legal-h1 { font-size: clamp(2.4rem, 8vw, 3.5rem); }

          .tab-bar-inner { padding-left: 24px; padding-right: 24px; }

          .legal-body { padding: 48px 24px 80px; }
          .legal-layout { grid-template-columns: 1fr; gap: 0; }

          .legal-nav {
            position: static; max-height: none;
            display: flex; flex-wrap: wrap; gap: 6px;
            margin-bottom: 40px; padding-bottom: 32px;
            border-bottom: 1px solid var(--bs);
          }

          .legal-nav-heading { display: none; }
          .legal-nav-list { flex-direction: row; flex-wrap: wrap; gap: 6px; }

          .legal-nav-link {
            font-size: .75rem; padding: 5px 10px;
            border: 1px solid var(--bs);
            border-radius: 20px;
          }

          .legal-nav-n { display: none; }

          .lcc-inner { flex-direction: column; align-items: flex-start; }
        }

        @media (max-width: 480px) {
          .legal-h1 { font-size: clamp(2rem, 9vw, 2.8rem); }
          .tab-pills { flex-wrap: wrap; }
        }
      `}</style>
    </>
  );
}