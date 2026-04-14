import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { currentlyBuilding } from '../data/portfolio';

const typeConfig = {
  building: { label: 'Building',  color: '#c84b2f', bg: 'rgba(200,75,47,0.08)'  },
  learning: { label: 'Learning',  color: '#1a6b4a', bg: 'rgba(26,107,74,0.08)'  },
  reading:  { label: 'Reading',   color: '#1a3a5c', bg: 'rgba(26,58,92,0.08)'   },
} as const;

export default function CurrentlyBuilding() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 60px)',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '16px', marginBottom: '48px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)' }}>
            —
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Currently
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)', width: '40px' }} />
        </div>

        {/* Live pulse indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '1px' }}>
          <span
            style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#4ade80',
              boxShadow: '0 0 0 3px rgba(74,222,128,0.25)',
              animation: 'activityPulse 2s ease-in-out infinite',
              display: 'inline-block',
            }}
          />
          Active
          <style>{`
            @keyframes activityPulse {
              0%,100% { box-shadow: 0 0 0 3px rgba(74,222,128,0.25); }
              50%      { box-shadow: 0 0 0 6px rgba(74,222,128,0.1);  }
            }
          `}</style>
        </div>
      </motion.div>

      {/* Cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2px',
        }}
      >
        {currentlyBuilding.map((item, i) => {
          const cfg = typeConfig[item.type];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: '28px 24px',
                border: '1px solid var(--border)',
                background: 'var(--card-bg)',
                transition: 'border-color 0.2s, transform 0.2s',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = cfg.color;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Type badge */}
              <div
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '3px 10px', marginBottom: '16px',
                  background: cfg.bg,
                  fontFamily: 'var(--font-mono)', fontSize: '9px',
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                  color: cfg.color,
                }}
              >
                <span
                  style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: cfg.color, display: 'inline-block',
                  }}
                />
                {cfg.label}
              </div>

              {/* Title */}
              <div
                style={{
                  fontFamily: 'var(--font-display)', fontSize: '16px',
                  fontWeight: 700, letterSpacing: '-0.3px',
                  lineHeight: 1.3, marginBottom: '10px',
                }}
              >
                {item.title}
              </div>

              {/* Detail */}
              <p
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px',
                  lineHeight: 1.75, color: 'var(--muted)',
                  marginBottom: '16px',
                }}
              >
                {item.detail}
              </p>

              {/* Date */}
              <div
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  color: 'var(--muted)', opacity: 0.6, letterSpacing: '0.5px',
                }}
              >
                {item.date}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Update hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          marginTop: '20px',
          fontFamily: 'var(--font-mono)', fontSize: '10px',
          color: 'var(--muted)', opacity: 0.5,
          letterSpacing: '0.3px',
        }}
      >
        ↳ Updated in <code style={{ fontSize: '10px' }}>src/data/portfolio.ts</code> → currentlyBuilding
      </motion.p>
    </section>
  );
}
