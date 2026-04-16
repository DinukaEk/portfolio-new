import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { certifications } from '../data/portfolio';

// ── Issuer logo badge ─────────────────────────────────────────────────────────
function IssuerBadge({ issuerKey, issuer }: { issuerKey: string; issuer: string }) {
  const initials = issuer
    .split(' ')
    .filter(w => w.length > 2)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');

  const palette: Record<string, { bg: string; color: string; label: string }> = {
    aws: {
      bg: 'rgba(255,153,0,0.12)',
      color: '#ff9900',
      label: 'AWS',
    },
    kodekloud: {
      bg: 'rgba(0,180,216,0.12)',
      color: '#00b4d8',
      label: 'KK',
    },
    other: {
      bg: 'rgba(200,75,47,0.12)',
      color: 'var(--accent)',
      label: initials || '?',
    },
  };

  const p = palette[issuerKey] ?? palette.other;

  return (
    <div style={{
      width: '48px', height: '48px', borderRadius: '8px',
      background: p.bg,
      border: `1px solid ${p.color}30`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
      color: p.color, letterSpacing: '0.5px', flexShrink: 0,
    }}>
      {p.label}
    </div>
  );
}

// ── Single cert card ──────────────────────────────────────────────────────────
function CertCard({ cert, index }: { cert: (typeof certifications)[0]; index: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' as const });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '48px 1fr auto',
        gap: '16px',
        alignItems: 'start',
        padding: '24px',
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        transition: 'border-color 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Logo badge */}
      <IssuerBadge issuerKey={cert.issuerKey} issuer={cert.issuer} />

      {/* Main content */}
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontSize: '15px',
          fontWeight: 700, letterSpacing: '-0.2px',
          lineHeight: 1.3, marginBottom: '4px',
        }}>
          {cert.title}
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px',
          color: 'var(--accent)', marginBottom: '2px', letterSpacing: '0.3px',
        }}>
          {cert.issuer}
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px',
          color: 'var(--muted)', marginBottom: cert.credentialId ? '6px' : '12px',
        }}>
          Issued {cert.issued}
        </div>

        {cert.credentialId && (
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            color: 'var(--muted)', opacity: 0.6,
            marginBottom: '12px',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            ID: {cert.credentialId}
          </div>
        )}

        {/* Skill tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {cert.skills.map(skill => (
            <span key={skill} style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              padding: '2px 8px',
              border: '1px solid var(--border)',
              color: 'var(--muted)', background: 'var(--bg)',
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Show credential link */}
      {cert.credentialUrl && (
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noreferrer"
          title="Show credential"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '36px', height: '36px', flexShrink: 0,
            border: '1px solid var(--border)',
            color: 'var(--muted)', textDecoration: 'none',
            fontFamily: 'var(--font-mono)', fontSize: '14px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.color = 'var(--accent)';
            e.currentTarget.style.background = 'rgba(200,75,47,0.06)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--muted)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          ↗
        </a>
      )}
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Certifications() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' as const });

  return (
    <section
      id="certifications"
      ref={ref}
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 60px)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <SectionLabel index="004" label="Certifications" />

      {/* Summary stat */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex', alignItems: 'baseline', gap: '12px',
          marginBottom: '48px',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 800, letterSpacing: '-2px', color: 'var(--accent)',
          lineHeight: 1,
        }}>
          {certifications.length}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)',
        }}>
          industry certifications earned
        </span>
      </motion.div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2px',
      }}>
        {certifications.map((cert, i) => (
          <CertCard key={cert.title} cert={cert} index={i} />
        ))}
      </div>

      {/* LinkedIn link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{ marginTop: '32px', textAlign: 'right' }}
      >
        <a
          href="https://www.linkedin.com/in/dinukaekanayake/details/certifications/"
          target="_blank"
          rel="noreferrer"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            letterSpacing: '1px', textTransform: 'uppercase',
            textDecoration: 'none', color: 'var(--muted)',
            borderBottom: '1px solid var(--border)', paddingBottom: '2px',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = 'var(--accent)';
            e.currentTarget.style.borderColor = 'var(--accent)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'var(--muted)';
            e.currentTarget.style.borderColor = 'var(--border)';
          }}
        >
          View all on LinkedIn ↗
        </a>
      </motion.div>
    </section>
  );
}
