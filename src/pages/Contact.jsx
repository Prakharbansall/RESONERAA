import React, { useState } from "react";

/* ── Data ───────────────────────────────────────────────────── */
const reasons = [
  "General Enquiry", 
  "AI Consulting", 
  "Platform Development", 
  "Partnership", 
  "Careers", 
  "Press / Media"
];

const steps = [
  { n: "01", title: "Submit",   desc: "Share your message or enquiry through the contact form." },
  { n: "02", title: "Review",   desc: "Each message is reviewed carefully to understand the context." },
  { n: "03", title: "Response", desc: "A response is provided within one working day." },
  { n: "04", title: "Discussion", desc: "If required, a follow-up discussion can be scheduled." },
];

const contactDetails = [
  { label: "Email",  value: "hello@resoneraaipvtltd.in", href: "mailto:hello@resoneraaipvtltd.in" },
  { label: "Hours",  value: "Mon – Fri, 9 AM – 7 PM IST", href: null },
  { label: "Office", value: "Borivali East, Mumbai 400066", href: null },
];

const principles = [
  "No automated or generic replies",
  "Clear and structured communication",
  "Respect for privacy and confidentiality",
  "Focus on meaningful discussions"
];

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

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "",
    reason: "General Enquiry", message: "",
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message cannot be empty";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSent(true);
  };

  return (
    <div className="ct-root">
      {/* ══ LEFT: BRAND & INFO ══════════════════════════ */}
      <aside className="ct-left">
        <div className="ct-left-inner">
          <section>
            <span className="ct-eyebrow">Get in Touch</span>
            <h1 className="ct-headline">
              Let’s start a <br />meaningful <br /><em className="ct-headline-em">conversation.</em>
            </h1>
            <p className="ct-intro">
              Whether you are exploring artificial intelligence for the first time or 
              looking to better understand structured systems, reach out to learn more about the 
              <strong> ResoneraAI</strong> initiative.
            </p>
          </section>

          <div className="ct-details">
            <span className="ct-section-label">Contact Information</span>
            {contactDetails.map((d) => (
              <div key={d.label} className="ct-detail-row">
                <span className="ct-detail-label">{d.label}</span>
                {d.href 
                  ? <a href={d.href} className="ct-detail-val ct-link">{d.value}</a>
                  : <span className="ct-detail-val">{d.value}</span>
                }
              </div>
            ))}
          </div>

          <div className="ct-process">
            <span className="ct-section-label">What Happens Next</span>
            <div className="ct-steps">
              {steps.map((s) => (
                <div key={s.n} className="ct-step">
                  <span className="ct-step-n">{s.n}-</span>
                  <div className="ct-step-content">
                    <strong>{s.title}</strong>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ══ RIGHT: FORM ═════════════════════════════════ */}
      <main className="ct-right">
        {sent ? (
          <div className="ct-success-card">
            <h2>Message Sent</h2>
            <p>Thank you, {form.name}. We'll be in touch within one working day.</p>
            <button onClick={() => setSent(false)} className="ct-again">Send another</button>
          </div>
        ) : (
          <form className="ct-form" onSubmit={handleSubmit}>
            <div className="ct-form-header">
              <h2 className="ct-form-title">Contact Form</h2>
              <p>Every interaction is an opportunity to refine the platform.</p>
            </div>

            <div className="ct-form-grid">
              <Field label="Full Name *" error={errors.name}>
                <input type="text" name="name" onChange={onChange} className="ct-input" placeholder="Enter name" />
              </Field>
              <Field label="Email Address *" error={errors.email}>
                <input type="email" name="email" onChange={onChange} className="ct-input" placeholder="email@example.com" />
              </Field>
              <Field label="Company / Organisation">
                <input type="text" name="company" onChange={onChange} className="ct-input" />
              </Field>
              <Field label="Phone Number">
                <input type="tel" name="phone" onChange={onChange} className="ct-input" />
              </Field>
              <Field label="Reason for Contact" full>
                <select name="reason" onChange={onChange} className="ct-input">
                  {reasons.map(r => <option key={r}>{r}</option>)}
                </select>
              </Field>
              <Field label="Message *" error={errors.message} full>
                <textarea name="message" rows={5} onChange={onChange} className="ct-input ct-textarea" placeholder="How can we help?" />
              </Field>
            </div>

            <button type="submit" className="ct-submit">Start a Conversation</button>

            <div className="ct-principles">
              <span className="ct-section-label">Communication Principles</span>
              <ul>
                {principles.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>

            <div className="ct-notice">
              <strong>Data Notice:</strong> Information shared is used only for communication purposes. 
              No data is shared with third parties.
            </div>
          </form>
        )}
      </main>

      <style>{`
        .ct-root {
          display: grid;
          grid-template-columns: 460px 1fr;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          --r5: #e8294c;
          --soft: #fff5f7;
        }
        .ct-left { background: var(--soft); padding: 80px 50px; border-right: 1px solid rgba(232,41,76,0.1); }
        .ct-right { padding: 80px 60px; background: #fff; }
        
        .ct-eyebrow { font-size: 0.7rem; font-weight: 700; color: var(--r5); text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 1rem; }
        .ct-headline { font-family: 'DM Serif Display', serif; font-size: 3.2rem; line-height: 1.1; margin: 0 0 1.5rem; color: #1a1014; }
        .ct-headline-em { color: var(--r5); font-style: italic; }
        .ct-intro { color: #6b5059; line-height: 1.7; font-size: 1.05rem; }

        .ct-section-label { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: #9d8089; letter-spacing: 0.12em; display: block; margin: 2rem 0 1rem; }
        
        .ct-detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(232,41,76,0.08); font-size: 0.9rem; }
        .ct-detail-label { color: var(--r5); font-weight: 600; }
        .ct-link { text-decoration: none; color: inherit; transition: color 0.2s; }
        .ct-link:hover { color: var(--r5); }

        .ct-steps { display: flex; flex-direction: column; gap: 1.5rem; }
        .ct-step { display: flex; gap: 12px; }
        .ct-step-n { color: var(--r5); font-weight: 700; font-family: 'DM Serif Display'; }
        .ct-step-content strong { display: block; font-size: 0.95rem; margin-bottom: 4px; }
        .ct-step-content p { font-size: 0.85rem; color: #6b5059; margin: 0; }

        .ct-form { max-width: 600px; }
        .ct-form-title { font-family: 'DM Serif Display'; font-size: 2rem; margin-bottom: 0.5rem; }
        .ct-form-header p { color: #9d8089; font-size: 0.9rem; margin-bottom: 2.5rem; }

        .ct-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 20px; }
        .cf-field { display: flex; flex-direction: column; margin-bottom: 1.5rem; }
        .cf-field--full { grid-column: 1 / -1; }
        .cf-label { font-size: 0.75rem; font-weight: 600; margin-bottom: 8px; color: #1a1014; }
        .ct-input { padding: 12px 16px; border: 1px solid #ffe4ea; background: var(--soft); border-radius: 8px; font-family: inherit; outline: none; transition: 0.2s; }
        .ct-input:focus { border-color: var(--r5); background: #fff; box-shadow: 0 0 0 4px rgba(232,41,76,0.05); }
        
        .ct-submit { background: var(--r5); color: #fff; border: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: 0.2s; margin-top: 1rem; }
        .ct-submit:hover { opacity: 0.9; transform: translateY(-1px); }

        .ct-principles ul { padding: 0; list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .ct-principles li { font-size: 0.85rem; color: #6b5059; display: flex; align-items: center; gap: 8px; }
        .ct-principles li::before { content: "•"; color: var(--r5); font-weight: bold; }

        .ct-notice { margin-top: 2rem; font-size: 0.75rem; color: #9d8089; border-top: 1px solid #eee; padding-top: 1.5rem; }

        @media (max-width: 900px) {
          .ct-root { grid-template-columns: 1fr; }
          .ct-left { border-right: none; border-bottom: 1px solid #eee; }
        }
      `}</style>
    </div>
  );
}