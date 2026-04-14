import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { experience } from '../data/portfolio';
import useScrollReveal from '../hooks/useScrollReveal';

function ExperienceEntry({
  entry,
  index,
}: {
  entry: (typeof experience)[0];
  index: number;
}) {
  const { ref, inView } = useScrollReveal({ margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'clamp(140px, 20vw, 220px) 1fr',
        gap: 'clamp(20px, 4vw, 56px)',
        padding: '36px 0',
        borderTop: '1px solid var(--border)',
        alignItems: 'start',
      }}
    >
      {/* Left meta */}
      <div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--muted)',
            letterSpacing: '0.5px',
            marginBottom: '8px',
            lineHeight: 1.6,
          }}
        >
          {entry.period}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--accent)',
            fontWeight: 500,
            letterSpacing: '0.3px',
          }}
        >
          {entry.company}
        </div>
        <div
          style={{
            marginTop: '12px',
            display: 'inline-block',
            padding: '3px 10px',
            border: '1px solid var(--border)',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          {entry.type}
        </div>
      </div>

      {/* Right content */}
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            fontWeight: 700,
            letterSpacing: '-0.5px',
            marginBottom: '14px',
          }}
        >
          {entry.role}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            lineHeight: 1.85,
            color: 'var(--muted)',
            marginBottom: entry.stack.length ? '20px' : 0,
          }}
        >
          {entry.description}
        </p>
        {entry.stack.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {entry.stack.map(s => (
              <span
                key={s}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  padding: '3px 10px',
                  border: '1px solid var(--border)',
                  color: 'var(--muted)',
                  background: 'var(--bg)',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 60px)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <SectionLabel index="003" label="Experience & Education" />

      <div>
        {experience.map((entry, i) => (
          <ExperienceEntry key={entry.role} entry={entry} index={i} />
        ))}
      </div>

      {/* Volunteer callout */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          marginTop: '56px',
          padding: 'clamp(24px, 4vw, 40px)',
          border: '1px solid var(--border)',
          background: 'var(--card-bg)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--accent)', marginBottom: '12px',
            }}
          >
            Leadership & Volunteering
          </div>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '18px', fontWeight: 700,
              letterSpacing: '-0.5px',
            }}
          >
            IEEE Computer Society
          </h4>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', marginTop: '8px', lineHeight: 1.7 }}>
            Vice Chairman — Student Branch Chapter of SLTC, 2021–2022
          </p>
        </div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--accent)', marginBottom: '12px',
            }}
          >
            Recognition
          </div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, letterSpacing: '-0.5px' }}>
            IEEE Boost 2021
          </h4>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', marginTop: '8px', lineHeight: 1.7 }}>
            Best Student Branch Chapter — IEEE Sri Lanka Section
          </p>
        </div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--accent)', marginBottom: '12px',
            }}
          >
            Creative Work
          </div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, letterSpacing: '-0.5px' }}>
            Photographer & Designer
          </h4>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', marginTop: '8px', lineHeight: 1.7 }}>
            Covered 120+ events as photographer, graphic designer — SLTC Media Unit
          </p>
        </div>
      </motion.div>
    </section>
  );
}
