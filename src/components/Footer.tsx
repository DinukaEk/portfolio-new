import { personalInfo } from '../data/portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: '24px clamp(24px, 5vw, 60px)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '-0.5px',
        }}
      >
        {personalInfo.firstName} {personalInfo.lastName}{' '}
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 400, fontSize: '11px', color: 'var(--muted)' }}>
          © {year}
        </span>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '24px',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--muted)',
          letterSpacing: '0.5px',
        }}
      >
        {[
          { label: 'GitHub',   href: personalInfo.github },
          { label: 'LinkedIn', href: personalInfo.linkedin },
          { label: 'Email',    href: `mailto:${personalInfo.email}` },
        ].map(l => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
