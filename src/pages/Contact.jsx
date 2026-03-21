import React, { useState } from "react";

/* ── Data ───────────────────────────────────────────────────── */
const reasons = ["General Enquiry", "AI Consulting", "Platform Demo", "Partnership", "Careers", "Press / Media"];
const budgets = ["Prefer not to say", "Under ₹5 Lakh", "₹5–20 Lakh", "₹20–50 Lakh", "₹50 Lakh+", "Enterprise (Custom)"];

const steps = [
  { n: "01", title: "Submit",     desc: "Fill the form - takes under 2 minutes." },
  { n: "02", title: "We Review",  desc: "A real team member reads your message same day." },
  { n: "03", title: "We Respond", desc: "Personalised reply within one business day." },
  { n: "04", title: "We Meet",    desc: "A discovery call to map your AI opportunity." },
];

const contactDetails = [
  { label: "Email",  value: "hello@resoneraai.com",          href: "mailto:hello@resoneraai.com" },
  { label: "Phone",  value: "+91 98000 00000",               href: "tel:+919800000000" },
  { label: "Hours",  value: "Mon – Fri, 9 AM – 7 PM IST",    href: null },
  { label: "Office", value: "Borivali East, Mumbai 400066",  href: null },
];

const trustBadges = ["No spam, ever", "Real humans reply", "NDA available", "Free first call"];

/* ── Field component ────────────────────────────────────────── */
function Field({ label, error, children, full }) {
  return (
    <div className={`cf-field${full ? " cf-field--full" : ""}${error ? " cf-field--error" : ""}`}>
      <label className="cf-label">{label}</label>
      {children}
      {error && <span className="cf-error">{error}</span>}
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "",
    reason: "General Enquiry", budget: "Prefer not to say", message: "",
  });
  const [errors, setErrors]   = useState({});
  const [sent, setSent]       = useState(false);
  const [focused, setFocused] = useState(null);

  const fns = (name) => ({
    onFocus: () => setFocused(name),
    onBlur:  () => setFocused(null),
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Full name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "A valid email is required";
    if (!form.message.trim()) e.message = "Please describe your project";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setForm({ name:"",email:"",company:"",phone:"",reason:"General Enquiry",budget:"Prefer not to say",message:"" });
    setErrors({});
  };

  return (
    <>
      <div className="ct-root" id="contact">

        {/* ══ LEFT PANEL ══════════════════════════════════ */}
        <aside className="ct-left">
          <div className="ct-left-inner">

            <div>
              <span className="ct-eyebrow">Get in Touch</span>
              <h1 className="ct-headline">
                Let's build<br />
                something<br />
                <em className="ct-headline-em">remarkable.</em>
              </h1>
              <p className="ct-intro">
                Whether you have a clear AI brief or just a hunch there's a better way -
                we'd love to hear from you. Every great project starts with a conversation.
              </p>
            </div>

            {/* Contact details */}
            <div className="ct-details">
              {contactDetails.map((d) => (
                <div key={d.label} className="ct-detail-row">
                  <span className="ct-detail-label">{d.label}</span>
                  {d.href
                    ? <a href={d.href} className="ct-detail-val ct-detail-link">{d.value}</a>
                    : <span className="ct-detail-val">{d.value}</span>
                  }
                </div>
              ))}
            </div>

            {/* Process */}
            <div className="ct-process">
              <span className="ct-process-heading">What Happens Next</span>
              <div className="ct-steps">
                {steps.map((s, i) => (
                  <div key={s.n} className="ct-step">
                    <div className="ct-step-track">
                      <div className="ct-step-num">{s.n}</div>
                      {i < steps.length - 1 && <div className="ct-step-line" />}
                    </div>
                    <div className="ct-step-body">
                      <span className="ct-step-title">{s.title}</span>
                      <span className="ct-step-desc">{s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="ct-trust">
              {trustBadges.map((t) => (
                <span key={t} className="ct-badge">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M5 1l1.18 2.39L9 3.82 6.9 5.86l.46 2.69L5 7.24 2.64 8.55 3.1 5.86 1 3.82l2.82-.43z"
                      fill="currentColor" opacity=".7"/>
                  </svg>
                  {t}
                </span>
              ))}
            </div>

          </div>
        </aside>

        {/* ══ RIGHT - FORM ════════════════════════════════ */}
        <main className="ct-right">
          {sent ? (
            /* ── Success state ── */
            <div className="ct-success">
              <div className="ct-success-icon-wrap">
                <div className="ct-success-ring" />
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="ct-success-check">
                  <circle cx="18" cy="18" r="17" stroke="#e8294c" strokeWidth="1.5"/>
                  <path d="M11 18l5 5 9-9" stroke="#e8294c" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="ct-success-title">Message sent!</h2>
              <p className="ct-success-body">
                Thanks, <strong>{form.name}</strong>. We'll reply to{" "}
                <strong>{form.email}</strong> within one business day.
              </p>
              <div className="ct-success-summary">
                <div className="ct-summary-row"><span>Topic</span><strong>{form.reason}</strong></div>
                {form.company && <div className="ct-summary-row"><span>Company</span><strong>{form.company}</strong></div>}
                {form.budget  && <div className="ct-summary-row"><span>Budget</span><strong>{form.budget}</strong></div>}
                <div className="ct-summary-row"><span>Expected reply</span><strong>Next business day</strong></div>
              </div>
              <button className="ct-again-btn" onClick={reset}>
                Send another message
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <form className="ct-form" onSubmit={handleSubmit} noValidate>
              <div className="ct-form-header">
                <h2 className="ct-form-title">Start a Conversation</h2>
                <p className="ct-form-sub">Fields marked * are required.</p>
              </div>

              <div className="ct-form-grid">
                <Field label="Full Name *" error={errors.name}>
                  <input type="text" name="name" value={form.name}
                    className={`ct-input${focused==="name"?" ct-input--focused":""}${errors.name?" ct-input--error":""}`}
                    onChange={onChange} {...fns("name")} placeholder="Raj Sharma" />
                </Field>

                <Field label="Email Address *" error={errors.email}>
                  <input type="email" name="email" value={form.email}
                    className={`ct-input${focused==="email"?" ct-input--focused":""}${errors.email?" ct-input--error":""}`}
                    onChange={onChange} {...fns("email")} placeholder="raj@company.com" />
                </Field>

                <Field label="Company / Organisation">
                  <input type="text" name="company" value={form.company}
                    className={`ct-input${focused==="company"?" ct-input--focused":""}`}
                    onChange={onChange} {...fns("company")} placeholder="Acme Pvt. Ltd." />
                </Field>

                <Field label="Phone Number">
                  <input type="tel" name="phone" value={form.phone}
                    className={`ct-input${focused==="phone"?" ct-input--focused":""}`}
                    onChange={onChange} {...fns("phone")} placeholder="+91 98XXX XXXXX" />
                </Field>

                <Field label="Reason for Contact">
                  <div className="ct-select-wrap">
                    <select name="reason" value={form.reason}
                      className={`ct-input ct-select${focused==="reason"?" ct-input--focused":""}`}
                      onChange={onChange} {...fns("reason")}>
                      {reasons.map((r) => <option key={r}>{r}</option>)}
                    </select>
                    <svg className="ct-select-caret" width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </Field>

                <Field label="Estimated Budget">
                  <div className="ct-select-wrap">
                    <select name="budget" value={form.budget}
                      className={`ct-input ct-select${focused==="budget"?" ct-input--focused":""}`}
                      onChange={onChange} {...fns("budget")}>
                      {budgets.map((b) => <option key={b}>{b}</option>)}
                    </select>
                    <svg className="ct-select-caret" width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </Field>

                <Field label="Tell Us About Your Project *" error={errors.message} full>
                  <textarea name="message" value={form.message} rows={6}
                    className={`ct-input ct-textarea${focused==="message"?" ct-input--focused":""}${errors.message?" ct-input--error":""}`}
                    onChange={onChange} {...fns("message")}
                    placeholder="What problem are you trying to solve? What data do you have? What does success look like for you?" />
                </Field>
              </div>

              <div className="ct-form-footer">
                <button type="submit" className="ct-submit">
                  <span>Send Message</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ct-submit-arrow">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <p className="ct-privacy">
                  Your data is safe with us. We never share your information with third parties.
                </p>
              </div>
            </form>
          )}
        </main>
      </div>

      {/* ── Bottom strip ──────────────────────────────────── */}
      <div className="ct-bottom">
        <div className="ct-bottom-inner">
          <span className="ct-bottom-co">ResoneraAI Private Limited</span>
          <span className="ct-bottom-addr">
            Room No.2, Kore Sankalp, Siddhi Chawl, Chougle Nag, Borivali East, Mumbai, Maharashtra 400066, India
          </span>
          <a href="mailto:hello@resoneraai.com" className="ct-bottom-email">hello@resoneraai.com</a>
        </div>
      </div>

      <style>{`
        /* ── Tokens ─────────────────────────────────────── */
        .ct-root {
          --rose-500:      #e8294c;
          --rose-600:      #c41f3e;
          --rose-50:       #fff5f7;
          --rose-100:      #ffe4ea;
          --rose-200:      #ffc1cc;
          --text-primary:  #1a1014;
          --text-secondary:#6b5059;
          --text-muted:    #9d8089;
          --border-soft:   rgba(232,41,76,0.1);
          --border-med:    rgba(232,41,76,0.18);

          font-family:     'DM Sans', system-ui, sans-serif;
          display:         grid;
          grid-template-columns: 440px 1fr;
          min-height:      100vh;
          padding-top:     68px; /* navbar height */
        }

        /* ── Left panel ─────────────────────────────────── */
        .ct-left {
          background:   var(--rose-50);
          border-right: 1px solid var(--border-soft);
        }

        .ct-left-inner {
          position:       sticky;
          top:            68px;
          max-height:     calc(100vh - 68px);
          overflow-y:     auto;
          padding:        60px 44px;
          display:        flex;
          flex-direction: column;
          gap:            40px;
          scrollbar-width: none;
        }
        .ct-left-inner::-webkit-scrollbar { display: none; }

        .ct-eyebrow {
          display:        block;
          font-size:      0.68rem;
          font-weight:    600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color:          var(--rose-500);
          margin-bottom:  14px;
        }

        .ct-headline {
          font-family:    'DM Serif Display', Georgia, serif;
          font-size:      clamp(2.6rem, 3.5vw, 3.4rem);
          font-weight:    400;
          line-height:    1.08;
          letter-spacing: -0.03em;
          color:          var(--text-primary);
          margin:         0 0 18px;
        }

        .ct-headline-em {
          color:      var(--rose-500);
          font-style: italic;
        }

        .ct-intro {
          font-size:   0.97rem;
          color:       var(--text-secondary);
          line-height: 1.85;
          margin:      0;
        }

        /* Contact details card */
        .ct-details {
          background:    #fff;
          border:        1px solid var(--border-soft);
          border-radius: 12px;
          overflow:      hidden;
        }

        .ct-detail-row {
          display:     grid;
          grid-template-columns: 60px 1fr;
          gap:         12px;
          align-items: center;
          padding:     14px 20px;
          border-bottom: 1px solid var(--border-soft);
          transition:  background 0.16s ease;
        }
        .ct-detail-row:last-child { border-bottom: none; }
        .ct-detail-row:hover      { background: var(--rose-50); }

        .ct-detail-label {
          font-size:      0.65rem;
          font-weight:    600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color:          var(--rose-500);
        }

        .ct-detail-val {
          font-size:   0.875rem;
          color:       var(--text-secondary);
          line-height: 1.5;
        }

        .ct-detail-link {
          text-decoration: none;
          color:           var(--text-secondary);
          transition:      color 0.16s ease;
        }
        .ct-detail-link:hover { color: var(--rose-500); }

        /* Process steps */
        .ct-process-heading {
          display:        block;
          font-size:      0.68rem;
          font-weight:    600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color:          var(--text-muted);
          margin-bottom:  20px;
        }

        .ct-steps { display: flex; flex-direction: column; }

        .ct-step {
          display:     grid;
          grid-template-columns: 32px 1fr;
          gap:         14px;
          align-items: start;
        }

        .ct-step-track {
          display:        flex;
          flex-direction: column;
          align-items:    center;
        }

        .ct-step-num {
          width:         28px;
          height:        28px;
          border-radius: 50%;
          border:        1.5px solid var(--border-med);
          display:       flex;
          align-items:   center;
          justify-content: center;
          font-size:     0.62rem;
          font-weight:   700;
          color:         var(--rose-500);
          background:    #fff;
          flex-shrink:   0;
        }

        .ct-step-line {
          width:      1px;
          flex:       1;
          min-height: 28px;
          background: var(--border-soft);
          margin:     4px 0;
        }

        .ct-step-body {
          display:        flex;
          flex-direction: column;
          padding-bottom: 20px;
        }

        .ct-step-title {
          font-size:     0.9rem;
          font-weight:   600;
          color:         var(--text-primary);
          margin-bottom: 3px;
        }

        .ct-step-desc {
          font-size:   0.85rem;
          color:       var(--text-secondary);
          line-height: 1.65;
        }

        /* Trust badges */
        .ct-trust { display: flex; flex-wrap: wrap; gap: 8px; }

        .ct-badge {
          display:       inline-flex;
          align-items:   center;
          gap:           6px;
          font-size:     0.75rem;
          font-weight:   500;
          color:         var(--text-secondary);
          border:        1px solid var(--border-soft);
          border-radius: 20px;
          padding:       5px 12px;
          background:    #fff;
          transition:    border-color 0.16s ease, color 0.16s ease;
        }
        .ct-badge svg { color: var(--rose-500); flex-shrink: 0; }
        .ct-badge:hover { border-color: var(--border-med); color: var(--text-primary); }

        /* ── Right / Form ───────────────────────────────── */
        .ct-right {
          padding:         60px 64px;
          display:         flex;
          align-items:     flex-start;
          background:      #fff;
        }

        .ct-form { width: 100%; max-width: 660px; }

        .ct-form-header { margin-bottom: 40px; }

        .ct-form-title {
          font-family:    'DM Serif Display', Georgia, serif;
          font-size:      2rem;
          font-weight:    400;
          color:          var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom:  6px;
        }

        .ct-form-sub {
          font-size: 0.85rem;
          color:     var(--text-muted);
        }

        /* Form grid - 2 cols, some fields span full */
        .ct-form-grid {
          display:               grid;
          grid-template-columns: 1fr 1fr;
          gap:                   0 20px;
        }

        .cf-field {
          display:        flex;
          flex-direction: column;
          gap:            7px;
          margin-bottom:  22px;
        }

        .cf-field--full { grid-column: 1 / -1; }

        .cf-label {
          font-size:      0.72rem;
          font-weight:    600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color:          var(--text-muted);
          transition:     color 0.16s ease;
        }

        .cf-field--error .cf-label { color: #c0392b; }

        .cf-error {
          font-size: 0.78rem;
          color:     #c0392b;
        }

        /* Inputs */
        .ct-input {
          padding:       13px 16px;
          background:    var(--rose-50);
          border:        1.5px solid var(--border-soft);
          border-radius: 10px;
          font-family:   'DM Sans', system-ui, sans-serif;
          font-size:     0.93rem;
          color:         var(--text-primary);
          outline:       none;
          width:         100%;
          transition:    border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
          -webkit-appearance: none;
        }

        .ct-input::placeholder { color: var(--text-muted); }

        .ct-input--focused {
          border-color: var(--rose-500);
          background:   #fff;
          box-shadow:   0 0 0 3px rgba(232,41,76,0.08);
        }

        .ct-input--error {
          border-color: #e74c3c;
          background:   #fff8f8;
        }

        /* Select wrapper */
        .ct-select-wrap {
          position: relative;
          width:    100%;
        }

        .ct-select {
          cursor:       pointer;
          appearance:   none;
          padding-right: 40px;
          width:        100%;
        }

        .ct-select-caret {
          position:       absolute;
          right:          14px;
          top:            50%;
          transform:      translateY(-50%);
          color:          var(--text-muted);
          pointer-events: none;
        }

        .ct-textarea {
          resize:     vertical;
          min-height: 148px;
          line-height: 1.7;
        }

        /* Submit row */
        .ct-form-footer {
          display:     flex;
          align-items: center;
          gap:         24px;
          flex-wrap:   wrap;
          margin-top:  8px;
        }

        .ct-submit {
          display:       inline-flex;
          align-items:   center;
          gap:           10px;
          padding:       14px 32px;
          background:    var(--rose-500);
          color:         #fff;
          font-family:   'DM Sans', system-ui, sans-serif;
          font-size:     0.95rem;
          font-weight:   600;
          border:        none;
          border-radius: 10px;
          cursor:        pointer;
          box-shadow:    0 1px 3px rgba(232,41,76,0.2), 0 4px 14px rgba(232,41,76,0.16);
          transition:    background 0.16s ease, box-shadow 0.16s ease, transform 0.14s ease;
        }

        .ct-submit-arrow { transition: transform 0.2s ease; }

        .ct-submit:hover {
          background:  var(--rose-600);
          box-shadow:  0 2px 6px rgba(232,41,76,0.24), 0 8px 24px rgba(232,41,76,0.2);
          transform:   translateY(-1px);
        }
        .ct-submit:hover .ct-submit-arrow { transform: translateX(3px); }

        .ct-submit:active {
          transform:  translateY(0);
          box-shadow: 0 1px 3px rgba(232,41,76,0.2);
        }

        .ct-submit:focus-visible {
          outline:        2px solid var(--rose-500);
          outline-offset: 3px;
        }

        .ct-privacy {
          font-size:   0.78rem;
          color:       var(--text-muted);
          line-height: 1.65;
          max-width:   280px;
        }

        /* ── Success state ──────────────────────────────── */
        .ct-success {
          width:          100%;
          display:        flex;
          flex-direction: column;
          align-items:    center;
          text-align:     center;
          gap:            24px;
          padding:        60px 20px;
          min-height:     60vh;
          justify-content: center;
        }

        .ct-success-icon-wrap {
          position: relative;
          width:    72px;
          height:   72px;
          display:  flex;
          align-items:    center;
          justify-content: center;
        }

        .ct-success-ring {
          position:      absolute;
          inset:         -10px;
          border-radius: 50%;
          border:        1.5px solid var(--border-med);
          animation:     ct-spin 8s linear infinite;
        }

        @keyframes ct-spin { to { transform: rotate(360deg); } }

        .ct-success-check { position: relative; z-index: 1; }

        .ct-success-title {
          font-family:    'DM Serif Display', Georgia, serif;
          font-size:      2.4rem;
          font-weight:    400;
          color:          var(--text-primary);
          letter-spacing: -0.02em;
          margin:         0;
        }

        .ct-success-body {
          font-size:   1rem;
          color:       var(--text-secondary);
          line-height: 1.85;
          max-width:   440px;
        }
        .ct-success-body strong { color: var(--text-primary); }

        .ct-success-summary {
          background:    var(--rose-50);
          border:        1px solid var(--border-soft);
          border-radius: 12px;
          overflow:      hidden;
          width:         100%;
          max-width:     420px;
        }

        .ct-summary-row {
          display:         flex;
          justify-content: space-between;
          align-items:     center;
          padding:         12px 20px;
          border-bottom:   1px solid var(--border-soft);
          font-size:       0.875rem;
        }
        .ct-summary-row:last-child  { border-bottom: none; }
        .ct-summary-row span        { color: var(--text-muted); font-size: 0.78rem; }
        .ct-summary-row strong      { color: var(--text-primary); font-weight: 600; }

        .ct-again-btn {
          display:       inline-flex;
          align-items:   center;
          gap:           8px;
          font-family:   'DM Sans', system-ui, sans-serif;
          font-size:     0.9rem;
          font-weight:   600;
          color:         var(--rose-500);
          background:    none;
          border:        1.5px solid var(--border-med);
          border-radius: 10px;
          padding:       11px 22px;
          cursor:        pointer;
          transition:    border-color 0.16s ease, background 0.16s ease;
        }
        .ct-again-btn:hover {
          border-color: var(--rose-500);
          background:   var(--rose-50);
        }

        /* ── Bottom strip ───────────────────────────────── */
        .ct-bottom {
          background:  var(--rose-50);
          border-top:  1px solid var(--border-soft);
          padding:     22px 32px;
        }

        .ct-bottom-inner {
          max-width:   1120px;
          margin:      0 auto;
          display:     flex;
          align-items: center;
          gap:         28px;
          flex-wrap:   wrap;
        }

        .ct-bottom-co {
          font-size:      0.72rem;
          font-weight:    700;
          letter-spacing: 0.04em;
          color:          var(--rose-500);
        }

        .ct-bottom-addr {
          font-size: 0.75rem;
          color:     var(--text-muted);
          flex:      1;
        }

        .ct-bottom-email {
          font-size:       0.78rem;
          color:           var(--text-secondary);
          text-decoration: none;
          transition:      color 0.16s ease;
        }
        .ct-bottom-email:hover { color: var(--rose-500); }

        /* ── Responsive ─────────────────────────────────── */
        @media (max-width: 1080px) {
          .ct-root { grid-template-columns: 380px 1fr; }
          .ct-left-inner { padding: 52px 32px; }
          .ct-right { padding: 52px 44px; }
        }

        @media (max-width: 820px) {
          .ct-root { grid-template-columns: 1fr; padding-top: 68px; }
          .ct-left { border-right: none; border-bottom: 1px solid var(--border-soft); }
          .ct-left-inner { position: static; max-height: none; padding: 48px 24px; }
          .ct-right { padding: 48px 24px; }
          .ct-form-grid { grid-template-columns: 1fr; }
          .ct-form-footer { flex-direction: column; align-items: flex-start; }
        }

        @media (max-width: 480px) {
          .ct-headline { font-size: 2.4rem; }
          .ct-bottom-inner { flex-direction: column; align-items: flex-start; gap: 8px; }
        }
      `}</style>
    </>
  );
}