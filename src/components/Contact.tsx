import { useRef, useState, FormEvent } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolio';


const EMAILJS_SERVICE_ID  = 'service_egxxkoj';
const EMAILJS_TEMPLATE_ID = 'template_ha5z44v';
const EMAILJS_PUBLIC_KEY  = 'DUGQ6OYXQe77lkPsH';

type Status = 'idle' | 'sending' | 'success' | 'error';

interface FormState {
  name:    string;
  email:   string;
  subject: string;
  message: string;
}

const EMPTY: FormState = { name: '', email: '', subject: '', message: '' };

// ── Minimal field component ───────────────────────────────────────────────────
function Field({
  label, value, onChange, type = 'text', multiline = false, required = true,
}: {
  label: string; value: string;
  onChange: (v: string) => void;
  type?: string; multiline?: boolean; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  const baseStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused ? 'var(--fg)' : 'var(--border)'}`,
    outline: 'none',
    fontFamily: 'var(--font-mono)',
    fontSize: '13px',
    color: 'var(--fg)',
    padding: '28px 0 10px',
    transition: 'border-color 0.2s',
    resize: 'none' as const,
    cursor: 'text',
  };

  return (
    <div style={{ position: 'relative', marginBottom: '28px' }}>
      {/* Floating label */}
      <label
        style={{
          position: 'absolute',
          top: focused || hasValue ? '4px' : '20px',
          left: 0,
          fontFamily: 'var(--font-mono)',
          fontSize: focused || hasValue ? '10px' : '13px',
          letterSpacing: focused || hasValue ? '1.5px' : '0px',
          textTransform: focused || hasValue ? 'uppercase' : 'none',
          color: focused ? 'var(--accent)' : 'var(--muted)',
          transition: 'all 0.2s ease',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {label}{required && <span style={{ color: 'var(--accent)' }}> *</span>}
      </label>

      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          required={required}
          style={baseStyle}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          style={baseStyle}
        />
      )}

      {/* Focus accent line */}
      <motion.div
        animate={{ scaleX: focused ? 1 : 0, originX: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '1px', background: 'var(--accent)',
          transformOrigin: 'left',
        }}
      />
    </div>
  );
}

// ── Main contact section ──────────────────────────────────────────────────────
export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm]     = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError]   = useState('');

  const set = (key: keyof FormState) => (v: string) =>
    setForm(f => ({ ...f, [key]: v }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError('');

    try {
      // Dynamically import emailjs only when needed (keeps bundle lean)
      const emailjs = (await import('@emailjs/browser')).default;

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
          to_email:   personalInfo.email,
        },
        EMAILJS_PUBLIC_KEY,
      );

      setStatus('success');
      setForm(EMPTY);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setError('Something went wrong. Please email me directly.');
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 60px)',
        background: 'var(--fg)',
        color: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ghost watermark */}
      <div
        style={{
          position: 'absolute', bottom: '-20px', right: '-10px',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(80px, 15vw, 180px)',
          fontWeight: 800, letterSpacing: '-8px',
          opacity: 0.04, pointerEvents: 'none',
          lineHeight: 1, userSelect: 'none',
        }}
      >
        CONTACT
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative' }}
      >
        {/* Section label */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}>
          005 — Contact
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(28px, 5vw, 56px)', letterSpacing: '-2px',
            lineHeight: 1.05, maxWidth: '600px', marginBottom: '16px',
          }}
        >
          Let's build something{' '}
          <span style={{ color: 'var(--accent)' }}>remarkable.</span>
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.7, opacity: 0.6, marginBottom: '56px', maxWidth: '620px' }}>
          Open to full-time roles, freelance projects, and interesting collaborations. Fill in the form or reach out directly.
        </p>

        {/* Two-column layout: form + direct links */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start',
          }}
        >
          {/* ── Form ── */}
          <form onSubmit={handleSubmit} noValidate>
            {/* Override input colours for dark section */}
            <style>{`
              #contact input, #contact textarea {
                color: var(--bg) !important;
                caret-color: var(--accent);
              }
              #contact input::placeholder, #contact textarea::placeholder { color: transparent; }
              #contact input:-webkit-autofill { -webkit-text-fill-color: var(--bg); }
            `}</style>

            <Field label="Your Name"    value={form.name}    onChange={set('name')}    />
            <Field label="Email Address" value={form.email}   onChange={set('email')}   type="email" />
            <Field label="Subject"      value={form.subject}  onChange={set('subject')}  />
            <Field label="Message"      value={form.message}  onChange={set('message')}  multiline />

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%', padding: '16px 24px',
                border: '1px solid var(--bg)',
                background: status === 'success' ? '#4ade80' : 'transparent',
                color: 'var(--bg)',
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                letterSpacing: '1.5px', textTransform: 'uppercase',
                cursor: status === 'sending' ? 'wait' : 'pointer',
                transition: 'all 0.25s',
                marginTop: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              }}
              onMouseEnter={e => {
                if (status !== 'success') {
                  e.currentTarget.style.background = 'var(--bg)';
                  e.currentTarget.style.color = 'var(--fg)';
                }
              }}
              onMouseLeave={e => {
                if (status !== 'success') {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--bg)';
                }
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === 'idle' && (
                  <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    Send Message →
                  </motion.span>
                )}
                {status === 'sending' && (
                  <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>◌</span>
                    Sending…
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  </motion.span>
                )}
                {status === 'success' && (
                  <motion.span key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ color: 'var(--fg)' }}
                  >
                    ✓ Message sent!
                  </motion.span>
                )}
                {status === 'error' && (
                  <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Try again →
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Error message */}
            {status === 'error' && error && (
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#f87171', marginTop: '12px', opacity: 0.9 }}>
                {error}
              </p>
            )}

            {/* Reset after success */}
            {status === 'success' && (
              <button
                type="button"
                onClick={() => setStatus('idle')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '12px', padding: 0 }}
              >
                Send another →
              </button>
            )}
          </form>

          {/* ── Direct links ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(237,233,227,0.4)', marginBottom: '8px' }}>
              Or reach out directly
            </div>

            <a
              href={`mailto:${personalInfo.email}`}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: '24px', padding: '18px 24px',
                border: '1px solid rgba(237,233,227,0.2)',
                textDecoration: 'none', color: 'var(--bg)',
                fontFamily: 'var(--font-mono)', fontSize: '12px',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(237,233,227,0.2)'; }}
            >
              <span>{personalInfo.email}</span>
              <span>↗</span>
            </a>

            {[
              { label: 'GitHub',    href: personalInfo.github },
              { label: 'LinkedIn',  href: personalInfo.linkedin },
            ].map(l => (
              <a
                key={l.label} href={l.href} target="_blank" rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 24px', border: '1px solid rgba(237,233,227,0.2)',
                  textDecoration: 'none', color: 'var(--bg)',
                  fontFamily: 'var(--font-mono)', fontSize: '12px',
                  transition: 'all 0.2s', letterSpacing: '0.5px',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(237,233,227,0.5)'; e.currentTarget.style.background = 'rgba(237,233,227,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(237,233,227,0.2)'; e.currentTarget.style.background = 'transparent'; }}
              >
                <span>{l.label}</span>
                <span>↗</span>
              </a>
            ))}

            {/* Response time note */}
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', opacity: 0.35, lineHeight: 1.7, marginTop: '8px' }}>
              I typically respond within 24 hours.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
