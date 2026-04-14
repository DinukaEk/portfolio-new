import { CSSProperties } from 'react';

interface MarqueeProps {
  items?: string[];
  speed?: number;
  inverted?: boolean;
}

const defaultItems = [
  'React',
  'TypeScript',
  'Three.js',
  'FastAPI',
  'TensorFlow',
  'Next.js',
  'MediaPipe',
  'Node.js',
  'WebGL',
  'Docker',
  'AWS',
  'MongoDB',
];

export default function Marquee({
  items = defaultItems,
  speed = 35,
  inverted = false,
}: MarqueeProps) {
  // Double the items so the loop is seamless
  const doubled = [...items, ...items];

  const trackStyle: CSSProperties = {
    display: 'flex',
    gap: '0',
    animation: `marquee ${speed}s linear infinite${inverted ? ' reverse' : ''}`,
    width: 'max-content',
  };

  return (
    <div
      style={{
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '14px 0',
        background: inverted ? 'var(--fg)' : 'transparent',
        userSelect: 'none',
      }}
    >
      <div style={trackStyle}>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(13px, 1.5vw, 16px)',
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: inverted ? 'var(--bg)' : 'var(--muted)',
              padding: '0 32px',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
            <span
              style={{
                display: 'inline-block',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'var(--accent)',
                marginLeft: '32px',
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
