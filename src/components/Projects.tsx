import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { projects } from '../data/portfolio';
import useScrollReveal from '../hooks/useScrollReveal';

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const { ref, inView } = useScrollReveal({ margin: '-60px' });
  const navigate = useNavigate();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        padding: project.featured ? 'clamp(28px, 4vw, 48px)' : '32px',
        border: '1px solid var(--border)',
        background: 'var(--card-bg)',
        overflow: 'hidden',
        gridColumn: project.featured ? '1 / -1' : 'auto',
        transition: 'border-color 0.25s, transform 0.25s',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '1px' }}>
            {project.id}
          </span>
          {project.featured && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent)', padding: '3px 8px', border: '1px solid var(--accent)' }}>
              Featured
            </span>
          )}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>
          {project.year}
        </span>
      </div>

      {/* Category */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '10px' }}>
        {project.category}
      </div>

      {/* Title */}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: project.featured ? 'clamp(22px, 3vw, 32px)' : '20px', fontWeight: 700, letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: '14px' }}>
        {project.title}
      </h3>

      {/* Description */}
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '24px', maxWidth: project.featured ? '680px' : '100%', flex: 1 }}>
        {project.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
        {project.tags.map(tag => (
          <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '3px 10px', border: '1px solid var(--border)', color: 'var(--muted)', background: 'var(--bg)', letterSpacing: '0.3px' }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {/* Case study button */}
        <button
          onClick={() => { window.location.href = `/project/${project.slug}`; }}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '1px',
            padding: '9px 20px', border: '1px solid var(--fg)',
            background: 'var(--fg)', color: 'var(--bg)',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--fg)'; e.currentTarget.style.borderColor = 'var(--fg)'; }}
        >
          Case Study →
        </button>

        {/* GitHub button */}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '1px',
              padding: '9px 20px', border: '1px solid var(--border)',
              color: 'var(--muted)', textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--fg)'; e.currentTarget.style.color = 'var(--fg)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
          >
            GitHub ↗
          </a>
        )}

        {/* Demo button — only shown when demo URL exists */}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '1px',
              padding: '9px 20px', border: '1px solid var(--accent)',
              color: 'var(--accent)', textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)'; }}
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="work"
      style={{
        padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 60px)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <SectionLabel index="002" label="Selected Work" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2px',
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
