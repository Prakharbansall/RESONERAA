import React, { useState } from "react";

const reasons = ["General Enquiry", "AI Consulting", "Platform Demo", "Partnership", "Careers", "Press / Media"];
const budgets = ["Prefer not to say", "Under ₹5 Lakh", "₹5–20 Lakh", "₹20–50 Lakh", "₹50 Lakh+", "Enterprise (Custom)"];

const steps = [
  { n: "01", title: "Submit", desc: "Fill the form — takes under 2 minutes." },
  { n: "02", title: "We Review", desc: "A real team member reads your message same day." },
  { n: "03", title: "We Respond", desc: "Personalised reply within one business day." },
  { n: "04", title: "We Meet", desc: "A discovery call to map your AI opportunity." },
];

const contactDetails = [
  { label: "Email", value: "hello@resoneraai.com", href: "mailto:hello@resoneraai.com" },
  { label: "Phone", value: "+91 98000 00000", href: "tel:+919800000000" },
  { label: "Hours", value: "Mon – Fri, 9 AM – 7 PM IST", href: null },
  { label: "Office", value: "Borivali East, Mumbai 400066, MH", href: null },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", reason: "General Enquiry", budget: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Please tell us about your project";
    return e;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSent(true);
  };

  return (
    <>



      {/* ── MAIN SPLIT LAYOUT ── */}
      <div className="ct-split" id="contact">

        {/* ════ LEFT PANEL ════ */}
        <aside className="ct-left">
          <div className="ct-left__sticky">

            <div className="ct-left__top">
              <span className="section-eyebrow">GET IN TOUCH</span>
              <h1 className="ct-headline">
                Let's build<br />
                something<br />
                <em className="ct-headline__em">remarkable.</em>
              </h1>
              <p className="ct-left__intro">
                Whether you have a clear AI brief or just a hunch that there's a better way — 
                we'd love to hear from you. Every great project starts with a conversation.
              </p>
            </div>

            {/* Contact details */}
            <div className="ct-details">
              {contactDetails.map(d => (
                <div key={d.label} className="ct-detail">
                  <span className="ct-detail__label">{d.label}</span>
                  {d.href
                    ? <a href={d.href} className="ct-detail__val ct-detail__val--link">{d.value}</a>
                    : <span className="ct-detail__val">{d.value}</span>
                  }
                </div>
              ))}
            </div>

            {/* Process steps */}
            <div className="ct-process">
              <span className="ct-process__title">WHAT HAPPENS NEXT</span>
              <div className="ct-process__steps">
                {steps.map((s, i) => (
                  <div key={s.n} className="ct-step">
                    <div className="ct-step__left">
                      <div className="ct-step__num">{s.n}</div>
                      {i < steps.length - 1 && <div className="ct-step__line" />}
                    </div>
                    <div className="ct-step__body">
                      <span className="ct-step__title">{s.title}</span>
                      <span className="ct-step__desc">{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="ct-trust">
              {["No spam, ever", "Real humans reply", "NDA available", "Free first call"].map(t => (
                <span key={t} className="ct-trust__badge">◈ {t}</span>
              ))}
            </div>

          </div>
        </aside>

        {/* ════ RIGHT — FORM ════ */}
        <main className="ct-right">
          {sent ? (
            /* ── SUCCESS STATE ── */
            <div className="ct-success">
              <div className="ct-success__ring-wrap">
                <div className="ct-success__ring ct-success__ring--1" />
                <div className="ct-success__ring ct-success__ring--2" />
                <span className="ct-success__icon">◈</span>
              </div>
              <h2 className="ct-success__title">Message sent!</h2>
              <p className="ct-success__body">
                Thanks, <strong>{form.name}</strong>. Your message is with us.
                We'll reply to <strong>{form.email}</strong> within one business day.
              </p>
              <div className="ct-success__summary">
                <div className="ct-success__row"><span>Topic</span><strong>{form.reason}</strong></div>
                {form.company && <div className="ct-success__row"><span>Company</span><strong>{form.company}</strong></div>}
                {form.budget && <div className="ct-success__row"><span>Budget</span><strong>{form.budget}</strong></div>}
                <div className="ct-success__row"><span>Expected reply</span><strong>Next business day</strong></div>
              </div>
              <button className="ct-success__again" onClick={() => { setSent(false); setForm({ name:"",email:"",company:"",phone:"",reason:"General Enquiry",budget:"",message:"" }); }}>
                Send another message →
              </button>
            </div>
          ) : (
            /* ── FORM ── */
            <form className="ct-form" onSubmit={handleSubmit} noValidate>
              <div className="ct-form__header">
                <h2 className="ct-form__title">Start a Conversation</h2>
                <p className="ct-form__sub">Fields marked * are required.</p>
              </div>

              {/* Row 1 */}
              <div className="ct-form__row">
                <div className={`ct-field ${focused==="name"?"ct-field--focused":""} ${errors.name?"ct-field--error":""}`}>
                  <label className="ct-field__label">Full Name *</label>
                  <input
                    type="text" name="name" value={form.name}
                    onChange={onChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="Raj Sharma"
                    className="ct-field__input"
                  />
                  {errors.name && <span className="ct-field__err">↑ {errors.name}</span>}
                </div>
                <div className={`ct-field ${focused==="email"?"ct-field--focused":""} ${errors.email?"ct-field--error":""}`}>
                  <label className="ct-field__label">Email Address *</label>
                  <input
                    type="email" name="email" value={form.email}
                    onChange={onChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="raj@company.com"
                    className="ct-field__input"
                  />
                  {errors.email && <span className="ct-field__err">↑ {errors.email}</span>}
                </div>
              </div>

              {/* Row 2 */}
              <div className="ct-form__row">
                <div className={`ct-field ${focused==="company"?"ct-field--focused":""}`}>
                  <label className="ct-field__label">Company / Organisation</label>
                  <input
                    type="text" name="company" value={form.company}
                    onChange={onChange}
                    onFocus={() => setFocused("company")}
                    onBlur={() => setFocused(null)}
                    placeholder="Acme Pvt. Ltd."
                    className="ct-field__input"
                  />
                </div>
                <div className={`ct-field ${focused==="phone"?"ct-field--focused":""}`}>
                  <label className="ct-field__label">Phone Number</label>
                  <input
                    type="tel" name="phone" value={form.phone}
                    onChange={onChange}
                    onFocus={() => setFocused("phone")}
                    onBlur={() => setFocused(null)}
                    placeholder="+91 98XXX XXXXX"
                    className="ct-field__input"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="ct-form__row">
                <div className={`ct-field ${focused==="reason"?"ct-field--focused":""}`}>
                  <label className="ct-field__label">Reason for Contact</label>
                  <select name="reason" value={form.reason} onChange={onChange}
                    onFocus={() => setFocused("reason")} onBlur={() => setFocused(null)}
                    className="ct-field__input ct-field__select">
                    {reasons.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div className={`ct-field ${focused==="budget"?"ct-field--focused":""}`}>
                  <label className="ct-field__label">Estimated Budget</label>
                  <select name="budget" value={form.budget} onChange={onChange}
                    onFocus={() => setFocused("budget")} onBlur={() => setFocused(null)}
                    className="ct-field__input ct-field__select">
                    {budgets.map(b => <option key={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className={`ct-field ${focused==="message"?"ct-field--focused":""} ${errors.message?"ct-field--error":""}`}>
                <label className="ct-field__label">Tell Us About Your Project *</label>
                <textarea
                  name="message" value={form.message}
                  onChange={onChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  placeholder="What problem are you trying to solve? What data do you have? What does success look like for you?"
                  className="ct-field__input ct-field__textarea"
                  rows={6}
                />
                {errors.message && <span className="ct-field__err">↑ {errors.message}</span>}
              </div>

              {/* Footer row */}
              <div className="ct-form__footer">
                <button type="submit" className="ct-form__submit">
                  <span>Send Message</span>
                  <span className="ct-form__submit-arrow">→</span>
                </button>
                <p className="ct-form__privacy">
                  Your data is safe with us. We never share your information with third parties.
                </p>
              </div>
            </form>
          )}
        </main>
      </div>

      {/* ── BOTTOM STRIP ── */}
      <div className="ct-bottom">
        <div className="ct-bottom__inner">
          <span className="ct-bottom__co">RESONERAAI PRIVATE LIMITED</span>
          <span className="ct-bottom__addr">Room No.2, Kore Sankalp, Siddhi Chawl, Chougle Nag, Borivali East, Mumbai, Maharashtra 400066, India</span>
          <a href="mailto:hello@resoneraai.com" className="ct-bottom__email">hello@resoneraai.com</a>
        </div>
      </div>

      <style>{`
        /* TOP BAR */
        .ct-topbar{background:rgba(0,255,163,.06);border-bottom:1px solid rgba(0,255,163,.12);padding:12px 80px;}
        .ct-topbar__inner{display:flex;align-items:center;gap:16px;flex-wrap:wrap;}
        .ct-topbar__dot{width:6px;height:6px;border-radius:50%;background:var(--accent);box-shadow:0 0 8px var(--accent);animation:blink 2s ease-in-out infinite;flex-shrink:0;}
        .ct-topbar__text{font-family:'Space Mono',monospace;font-size:.62rem;font-weight:700;letter-spacing:.16em;color:var(--accent);}
        .ct-topbar__sep{color:rgba(0,255,163,.3);font-size:.8rem;}

        /* SPLIT */
        .ct-split{display:grid;grid-template-columns:480px 1fr;min-height:100vh;padding-top:80px;}

        /* LEFT */
        .ct-left{background:var(--bg-2);border-right:1px solid var(--border);padding:0;}
        .ct-left__sticky{position:sticky;top:80px;padding:64px 52px;display:flex;flex-direction:column;gap:44px;max-height:calc(100vh - 80px);overflow-y:auto;}
        .ct-left__sticky::-webkit-scrollbar{display:none;}
        .ct-headline{font-family:'Crimson Pro',serif;font-size:clamp(2.8rem,3.5vw,4rem);font-weight:700;line-height:1.0;color:var(--fg);margin-top:14px;margin-bottom:18px;letter-spacing:-.02em;}
        .ct-headline__em{color:var(--accent);font-style:italic;}
        .ct-left__intro{font-size:.95rem;color:var(--fg-muted);line-height:1.85;}

        /* Contact details */
        .ct-details{display:flex;flex-direction:column;gap:0;border:1px solid var(--border);border-radius:4px;overflow:hidden;}
        .ct-detail{display:grid;grid-template-columns:64px 1fr;gap:12px;align-items:center;padding:14px 20px;border-bottom:1px solid var(--border);transition:background .2s;}
        .ct-detail:last-child{border-bottom:none;}
        .ct-detail:hover{background:rgba(0,255,163,.025);}
        .ct-detail__label{font-family:'Space Mono',monospace;font-size:.6rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);}
        .ct-detail__val{font-size:.875rem;color:var(--fg-muted);line-height:1.5;}
        .ct-detail__val--link{text-decoration:none;color:var(--fg-muted);transition:color .2s;}
        .ct-detail__val--link:hover{color:var(--accent);}

        /* Process */
        .ct-process__title{font-family:'Space Mono',monospace;font-size:.62rem;font-weight:700;letter-spacing:.22em;color:rgba(255,255,255,.3);display:block;margin-bottom:20px;}
        .ct-process__steps{display:flex;flex-direction:column;gap:0;}
        .ct-step{display:grid;grid-template-columns:36px 1fr;gap:16px;align-items:start;}
        .ct-step__left{display:flex;flex-direction:column;align-items:center;gap:0;}
        .ct-step__num{font-family:'Space Mono',monospace;font-size:.68rem;font-weight:700;color:var(--accent);opacity:.6;width:28px;height:28px;border:1px solid rgba(0,255,163,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.55rem;}
        .ct-step__line{width:1px;flex:1;min-height:28px;background:linear-gradient(rgba(0,255,163,.2),rgba(0,255,163,.05));margin:4px 0;}
        .ct-step__body{padding-bottom:24px;}
        .ct-step__title{font-family:'Space Mono',monospace;font-size:.72rem;font-weight:700;letter-spacing:.08em;color:var(--fg);display:block;margin-bottom:4px;}
        .ct-step__desc{font-size:.85rem;color:var(--fg-muted);line-height:1.65;display:block;}

        /* Trust */
        .ct-trust{display:flex;flex-wrap:wrap;gap:8px;}
        .ct-trust__badge{font-family:'Space Mono',monospace;font-size:.58rem;font-weight:700;letter-spacing:.1em;color:var(--fg-muted);border:1px solid rgba(255,255,255,.08);padding:6px 12px;border-radius:2px;transition:all .2s;}
        .ct-trust__badge:hover{border-color:rgba(0,255,163,.25);color:var(--accent);}

        /* RIGHT / FORM */
        .ct-right{padding:64px 72px;display:flex;align-items:flex-start;background:var(--bg);}
        .ct-form{width:100%;max-width:680px;}
        .ct-form__header{margin-bottom:44px;}
        .ct-form__title{font-family:'Crimson Pro',serif;font-size:2.2rem;font-weight:700;color:var(--fg);margin-bottom:6px;}
        .ct-form__sub{font-family:'Space Mono',monospace;font-size:.65rem;color:rgba(255,255,255,.25);letter-spacing:.1em;}
        .ct-form__row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:4px;}

        /* Fields */
        .ct-field{display:flex;flex-direction:column;gap:8px;margin-bottom:20px;position:relative;}
        .ct-field__label{font-family:'Space Mono',monospace;font-size:.62rem;letter-spacing:.18em;color:rgba(255,255,255,.35);text-transform:uppercase;transition:color .2s;}
        .ct-field--focused .ct-field__label{color:var(--accent);}
        .ct-field--error .ct-field__label{color:rgba(255,100,100,.8);}
        .ct-field__input{
          padding:15px 18px;
          background:rgba(255,255,255,.03);
          border:1px solid rgba(255,255,255,.08);
          border-radius:4px;
          color:var(--fg);
          font-family:'Space Mono',monospace;
          font-size:.82rem;
          outline:none;
          transition:border-color .25s, background .25s, box-shadow .25s;
          width:100%;
        }
        .ct-field__input::placeholder{color:rgba(255,255,255,.15);}
        .ct-field--focused .ct-field__input{
          border-color:rgba(0,255,163,.45);
          background:rgba(0,255,163,.03);
          box-shadow:0 0 0 3px rgba(0,255,163,.06);
        }
        .ct-field--error .ct-field__input{border-color:rgba(255,80,80,.4);}
        .ct-field__select{
          cursor:none;
          appearance:none;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2300FFA3' fill='none' stroke-width='1.5'/%3E%3C/svg%3E");
          background-repeat:no-repeat;
          background-position:right 16px center;
          padding-right:44px;
        }
        .ct-field__select option{background:#080c10;}
        .ct-field__textarea{resize:vertical;min-height:150px;line-height:1.7;}
        .ct-field__err{font-family:'Space Mono',monospace;font-size:.6rem;color:rgba(255,100,100,.75);letter-spacing:.06em;}

        /* Submit */
        .ct-form__footer{display:flex;align-items:center;gap:28px;flex-wrap:wrap;margin-top:8px;}
        .ct-form__submit{
          display:inline-flex;align-items:center;gap:12px;
          padding:16px 40px;
          background:var(--accent);
          color:var(--bg);
          font-family:'Space Mono',monospace;
          font-size:.82rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
          border:none;border-radius:4px;cursor:none;
          transition:all .3s cubic-bezier(.16,1,.3,1);
          position:relative;overflow:hidden;
        }
        .ct-form__submit::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);transform:translateX(-100%);transition:transform .5s;}
        .ct-form__submit:hover{background:var(--accent-bright);transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,255,163,.3);}
        .ct-form__submit:hover::before{transform:translateX(100%);}
        .ct-form__submit-arrow{transition:transform .3s;}
        .ct-form__submit:hover .ct-form__submit-arrow{transform:translateX(5px);}
        .ct-form__privacy{font-family:'Space Mono',monospace;font-size:.6rem;color:rgba(255,255,255,.18);line-height:1.7;max-width:280px;}

        /* SUCCESS */
        .ct-success{width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:28px;padding:60px 20px;min-height:60vh;}
        .ct-success__ring-wrap{position:relative;width:100px;height:100px;display:flex;align-items:center;justify-content:center;}
        .ct-success__ring{position:absolute;border-radius:50%;border:1px solid rgba(0,255,163,.25);}
        .ct-success__ring--1{inset:0;animation:spin-slow 6s linear infinite;}
        .ct-success__ring--2{inset:-14px;border-style:dashed;animation:spin-rev 10s linear infinite;border-color:rgba(0,255,163,.12);}
        .ct-success__icon{font-size:2.5rem;color:var(--accent);animation:pulse-glow 2s ease-in-out infinite;position:relative;z-index:2;}
        .ct-success__title{font-family:'Crimson Pro',serif;font-size:3rem;font-weight:700;color:var(--fg);}
        .ct-success__body{font-size:1rem;color:var(--fg-muted);line-height:1.85;max-width:460px;}
        .ct-success__body strong{color:var(--fg);}
        .ct-success__summary{display:flex;flex-direction:column;gap:0;border:1px solid rgba(0,255,163,.15);border-radius:4px;overflow:hidden;width:100%;max-width:420px;}
        .ct-success__row{display:flex;justify-content:space-between;align-items:center;padding:12px 20px;border-bottom:1px solid rgba(255,255,255,.05);font-size:.875rem;}
        .ct-success__row:last-child{border-bottom:none;}
        .ct-success__row span{color:var(--fg-muted);font-family:'Space Mono',monospace;font-size:.65rem;letter-spacing:.1em;}
        .ct-success__row strong{color:var(--fg);}
        .ct-success__again{font-family:'Space Mono',monospace;font-size:.72rem;font-weight:700;letter-spacing:.1em;background:none;border:1px solid rgba(0,255,163,.25);color:var(--accent);padding:12px 24px;border-radius:3px;cursor:none;transition:all .2s;}
        .ct-success__again:hover{background:rgba(0,255,163,.06);border-color:var(--accent);}

        /* BOTTOM STRIP */
        .ct-bottom{border-top:1px solid var(--border);background:var(--bg-2);padding:24px 80px;}
        .ct-bottom__inner{display:flex;align-items:center;gap:32px;flex-wrap:wrap;}
        .ct-bottom__co{font-family:'Space Mono',monospace;font-size:.62rem;font-weight:700;letter-spacing:.14em;color:var(--accent);}
        .ct-bottom__addr{font-family:'Space Mono',monospace;font-size:.6rem;color:rgba(255,255,255,.22);letter-spacing:.06em;flex:1;}
        .ct-bottom__email{font-family:'Space Mono',monospace;font-size:.62rem;color:var(--fg-muted);text-decoration:none;transition:color .2s;}
        .ct-bottom__email:hover{color:var(--accent);}

        @media(max-width:1024px){
          .ct-split{grid-template-columns:380px 1fr;}
          .ct-left__sticky{padding:52px 36px;}
          .ct-right{padding:52px 48px;}
        }
        @media(max-width:780px){
          .ct-topbar{padding:12px 24px;}
          .ct-split{grid-template-columns:1fr;padding-top:70px;}
          .ct-left{border-right:none;border-bottom:1px solid var(--border);}
          .ct-left__sticky{position:static;max-height:none;padding:48px 24px;}
          .ct-right{padding:48px 24px;}
          .ct-form__row{grid-template-columns:1fr;}
          .ct-bottom{padding:24px;}
        }
      `}</style>
    </>
  );
}