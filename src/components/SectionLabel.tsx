import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SectionLabelProps {
  index: string;
  label: string;
}

export default function SectionLabel({ index, label }: SectionLabelProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '2px',
        color: 'var(--muted)',
        textTransform: 'uppercase',
        marginBottom: '56px',
      }}
    >
      <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{index}</span>
      <span>—</span>
      <span>{label}</span>
      <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
    </motion.div>
  );
}
