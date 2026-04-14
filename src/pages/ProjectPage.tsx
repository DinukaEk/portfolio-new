import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projects } from '../data/portfolio';

// Scroll-triggered fade — safe for client-side navigation
function FadeUp({ children, delay = 0, style }: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project  = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontFamily: 'var(--font-mono)',
        color: 'var(--muted)', background: 'var(--bg)',
      }}>
        Project not found.{' '}
        <button
          onClick={() => window.location.href = import.meta.env.BASE_URL}
          style={{ marginLeft: 8, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Go home →
        </button>
      </div>
    );
  }

  const currentIndex = projects.findIndex(p => p.slug === slug);
  const prevProject  = currentIndex > 0                   ? projects[currentIndex - 1] : null;
  const nextProject  = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh' }}>

      {/* ── Sticky top nav ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px clamp(24px, 5vw, 60px)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg)',
        backdropFilter: 'blur(12px)',
      }}>
        <button
          onClick={() => window.location.href = import.meta.env.BASE_URL}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            fontFamily: 'var(--font-mono)', fontSize: '12px',
            color: 'var(--muted)', background: 'none', border: 'none',
            cursor: 'pointer', transition: 'color 0.2s', padding: 0,
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
        >
          ← Back to portfolio
        </button>

        <div style={{ display: 'flex', gap: '8px' }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                padding: '7px 16px', border: '1px solid var(--border)',
                color: 'var(--muted)', textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--fg)'; e.currentTarget.style.color = 'var(--fg)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
            >
              GitHub ↗
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                padding: '7px 16px', border: '1px solid var(--accent)',
                color: 'var(--accent)', textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; }}
            >
              Live Demo ↗
            </a>
          )}
        </div>
      </div>

      {/* ── Hero header — no entrance animation, visible immediately ── */}
      <div style={{
        padding: 'clamp(48px, 8vw, 96px) clamp(24px, 5vw, 60px) clamp(40px, 6vw, 64px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '1px' }}>
            {project.id}
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '2px',
            textTransform: 'uppercase', color: 'var(--accent)',
            padding: '3px 10px', border: '1px solid var(--accent)',
          }}>
            {project.category}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>
            {project.year}
          </span>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(32px, 6vw, 72px)',
          letterSpacing: '-2px', lineHeight: 1.0,
          maxWidth: '900px', marginBottom: '32px',
        }}>
          {project.title}
        </h1>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              padding: '5px 12px', border: '1px solid var(--border)',
              color: 'var(--muted)', background: 'var(--card-bg)',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Problem / Solution ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        borderBottom: '1px solid var(--border)',
      }}>
        {[
          { label: 'The Problem',  content: project.problem  },
          { label: 'The Solution', content: project.solution },
        ].map((block, i) => (
          <FadeUp key={block.label} delay={i * 0.08}
            style={{
              padding: 'clamp(32px, 5vw, 56px) clamp(24px, 5vw, 60px)',
              borderRight: i === 0 ? '1px solid var(--border)' : 'none',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              letterSpacing: '2px', textTransform: 'uppercase',
              color: 'var(--accent)', marginBottom: '16px',
            }}>
              {block.label}
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.85, color: 'var(--muted)' }}>
              {block.content}
            </p>
          </FadeUp>
        ))}
      </div>

      {/* ── Architecture ── */}
      <div style={{
        padding: 'clamp(48px, 7vw, 80px) clamp(24px, 5vw, 60px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <FadeUp>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--muted)', marginBottom: '40px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <span style={{ color: 'var(--accent)' }}>—</span>
            Technical Architecture
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>
        </FadeUp>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {project.architecture.map((step, i) => (
            <FadeUp key={step.step} delay={i * 0.06}
              style={{
                display: 'grid', gridTemplateColumns: '56px 1fr',
                gap: '24px', padding: '24px 0',
                borderTop: '1px solid var(--border)',
                alignItems: 'start',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                color: 'var(--accent)', letterSpacing: '1px', paddingTop: '2px',
              }}>
                {step.step}
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '17px',
                  fontWeight: 700, letterSpacing: '-0.3px', marginBottom: '8px',
                }}>
                  {step.title}
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.85, color: 'var(--muted)' }}>
                  {step.detail}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ── Outcome ── */}
      <FadeUp style={{
        padding: 'clamp(48px, 7vw, 80px) clamp(24px, 5vw, 60px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start',
      }}>
        <div style={{ flex: '0 0 auto' }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '10px',
            letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: '8px',
          }}>
            Outcome
          </div>
        </div>
        <p style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(18px, 2.5vw, 24px)',
          fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1.4,
          maxWidth: '720px', flex: 1,
        }}>
          {project.outcome}
        </p>
      </FadeUp>

      {/* ── Prev / Next navigation ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: prevProject && nextProject ? '1fr 1fr' : '1fr',
        borderBottom: '1px solid var(--border)',
      }}>
        {prevProject && (
          <button
            onClick={() => window.location.href = `${import.meta.env.BASE_URL}project/${prevProject.slug}`}
            style={{
              padding: 'clamp(28px, 4vw, 48px) clamp(24px, 5vw, 60px)',
              borderRight: nextProject ? '1px solid var(--border)' : 'none',
              background: 'none', border: 'none', cursor: 'pointer',
              textAlign: 'left', transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--card-bg)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '1px', marginBottom: '10px' }}>
              ← Previous
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.5px' }}>
              {prevProject.title}
            </div>
          </button>
        )}
        {nextProject && (
          <button
            onClick={() => window.location.href = `${import.meta.env.BASE_URL}project/${nextProject.slug}`}
            style={{
              padding: 'clamp(28px, 4vw, 48px) clamp(24px, 5vw, 60px)',
              background: 'none', border: 'none', cursor: 'pointer',
              textAlign: 'right', transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--card-bg)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--muted)', letterSpacing: '1px', marginBottom: '10px' }}>
              Next →
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.5px' }}>
              {nextProject.title}
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
