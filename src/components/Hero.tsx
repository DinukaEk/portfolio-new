import { motion } from 'framer-motion';
import { Suspense } from 'react';
import HeroMesh      from './HeroMesh';
import ParticleField from './ParticleField';
import { personalInfo } from '../data/portfolio';

// ── Per-letter stagger animation ──────────────────────────────────────────────
const sentence = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
};
const letterVariant = {
  hidden:  { opacity: 0, y: 80, skewX: 6 },
  visible: { opacity: 1, y: 0,  skewX: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function AnimatedWord({ text, color }: { text: string; color?: string }) {
  return (
    <motion.span
      variants={sentence} initial="hidden" animate="visible"
      aria-label={text}
      style={{ display: 'block', color: color ?? 'inherit', lineHeight: 0.88, overflow: 'hidden' }}
    >
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={letterVariant} style={{ display: 'inline-block' }}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ── Circular profile photo ────────────────────────────────────────────────────
function CirclePhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      className="hero-circle"
    >
      {/* Outer slowly-rotating dashed ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: '-18px',
          borderRadius: '50%',
          border: '1px dashed rgba(200,75,47,0.35)',
        }}
      />

      {/* Inner counter-rotating accent arc */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: '-8px',
          borderRadius: '50%',
          border: '2.5px solid transparent',
          borderTopColor: 'var(--accent)',
          borderRightColor: 'var(--accent)',
        }}
      />

      {/* Solid accent ring behind photo */}
      <div style={{
        position: 'absolute', inset: '-5px',
        borderRadius: '50%',
        background: 'var(--accent)',
        zIndex: 0,
      }} />

      {/* Photo clipped to circle */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', height: '100%',
        borderRadius: '50%',
        overflow: 'hidden',
        background: '#0a0a0a',
      }}>
        <img
          src="/portfolio-new/profile.png"
          alt="Dinuka Ekanayake"
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
            filter: 'contrast(1.05) brightness(0.96)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(200,75,47,0.10) 0%, transparent 55%)',
          borderRadius: '50%',
        }} />
      </div>
    </motion.div>
  );
}

// ── Main hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(80px, 8vw, 120px) clamp(24px, 5vw, 60px) clamp(48px, 6vw, 88px)',
        overflow: 'hidden',
      }}
    >
      <ParticleField />

      <Suspense fallback={null}>
        <HeroMesh />
      </Suspense>

      {/* Grain texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px',
      }} />

      {/* Circle photo */}
      <CirclePhoto />

      {/* ── Top meta row — single flex row on desktop, stacked on mobile ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="hero-top-meta"
      >
        {/* Left: role + location */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px', letterSpacing: '2px',
          color: 'var(--muted)', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: '10px',
          whiteSpace: 'nowrap',
        }}>
          <span style={{ width: '24px', height: '1px', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
          {personalInfo.role} · {personalInfo.location}
        </div>

        {/* Right: availability */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px', letterSpacing: '1px',
          color: 'var(--muted)',
          display: 'flex', alignItems: 'center', gap: '8px',
          whiteSpace: 'nowrap',
        }}>
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: '#4ade80',
            boxShadow: '0 0 0 3px rgba(74,222,128,0.25)',
            animation: 'heroPulse 2s ease-in-out infinite',
            flexShrink: 0,
          }} />
          Available for opportunities
        </div>
      </motion.div>

      {/* ── Name ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1 className="hero-name">
          <AnimatedWord text={personalInfo.firstName} />
          <AnimatedWord text={personalInfo.lastName} color="var(--accent)" />
        </h1>
      </div>

      {/* ── Bottom: tagline + scroll ── */}
      <div style={{
        position: 'relative', zIndex: 4,
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '24px', flexWrap: 'wrap',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '13px',
            lineHeight: 1.8, color: 'var(--muted)', maxWidth: '400px',
          }}>
            {personalInfo.tagline}
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            marginTop: '14px', padding: '6px 14px',
            border: '1px solid rgba(74,222,128,0.3)',
            background: 'rgba(74,222,128,0.06)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px', letterSpacing: '0.5px',
            color: '#4ade80',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#4ade80', display: 'inline-block',
              animation: 'heroPulse 2s ease-in-out infinite',
            }} />
            {personalInfo.status}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            letterSpacing: '2px', color: 'var(--muted)', textTransform: 'uppercase',
          }}
        >
          <span>Scroll</span>
          <div style={{
            width: '1px', height: '56px',
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
            animation: 'scrollLine 2s ease-in-out infinite',
          }} />
        </motion.div>
      </div>

      <style>{`
        /* ── Keyframes ── */
        @keyframes heroPulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(74,222,128,0.25); }
          50%      { box-shadow: 0 0 0 6px rgba(74,222,128,0.08); }
        }
        @keyframes scrollLine {
          0%,100% { transform: scaleY(1); opacity: 1; }
          50%      { transform: scaleY(0.5); opacity: 0.3; }
        }

        /* ── Circle photo — desktop ── */
        .hero-circle {
          position: absolute;
          top: 30%;
          right: clamp(60px, 12vw, 160px);
          transform: translateY(-50%);
          z-index: 3;
          width: clamp(300px, 50vw, 450px);
          height: clamp(300px, 50vw, 450px);
        }

        /* ── Top meta row — desktop: absolute, two corners ── */
        .hero-top-meta {
          position: absolute;
          top: clamp(72px, 9vw, 112px);
          left: clamp(24px, 5vw, 60px);
          right: clamp(24px, 5vw, 60px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          z-index: 4;
        }

        /* ── Hero name — desktop ── */
        .hero-name {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(60px, 11vw, 130px);
          line-height: 0.88;
          letter-spacing: -3px;
          margin-bottom: clamp(24px, 3.5vw, 44px);
          max-width: 55%;
        }

        /* ── Tablet: shrink circle so name breathes ── */
        @media (max-width: 900px) {
          .hero-circle {
            width: clamp(180px, 36vw, 280px);
            height: clamp(180px, 36vw, 280px);
            top: 38%;
            right: clamp(20px, 5vw, 60px);
          }
          .hero-name {
            max-width: 52%;
            font-size: clamp(48px, 9vw, 90px);
          }
        }

        /* ── Mobile ≤640px: stack layout ── */
        @media (max-width: 640px) {
          /* Circle moves to top-centre, small */
          .hero-circle {
            position: relative !important;
            top: auto !important;
            right: auto !important;
            transform: none !important;
            width: 160px !important;
            height: 160px !important;
            margin: 0 auto 24px auto;
            display: block;
          }

          /* Name full width, smaller font */
          .hero-name {
            max-width: 100% !important;
            font-size: clamp(44px, 13vw, 70px) !important;
            letter-spacing: -2px !important;
          }

          /* Top meta: stack vertically instead of side-by-side */
          .hero-top-meta {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
            top: clamp(60px, 8vw, 80px) !important;
          }
        }
      `}</style>
    </section>
  );
}
