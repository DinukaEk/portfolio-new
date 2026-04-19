import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionLabel from './SectionLabel';
import { personalInfo, skillLevels, stats } from '../data/portfolio';

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const } },
});

// ─────────────────────────────────────────────────────────────────────────────
// Terminal data
// ─────────────────────────────────────────────────────────────────────────────
const LINES: { type: 'cmd' | 'output'; text: string }[] = [
  { type: 'cmd',    text: 'whoami' },
  { type: 'output', text: 'dinuka_ekanayake' },
  { type: 'cmd',    text: 'cat role.txt' },
  { type: 'output', text: 'Full-Stack Software Engineer' },
  { type: 'cmd',    text: 'cat location.txt' },
  { type: 'output', text: 'Kandy, Sri Lanka' },
  { type: 'cmd',    text: 'cat status.txt' },
  { type: 'output', text: '> Open to new opportunities' },
  { type: 'cmd',    text: 'ls skills/' },
  { type: 'output', text: 'python/  TypeScript/  JavaScript/  React/  PHP/\nTailwindCSS/  Next.js/  three.js/  Node.js/  Laravel/\nFastAPI/  RestAPI/  MySQL/  MongoDB/  Firebase/\nDevOps/  AWS/  Azure/  Docker/  Git/' },
  { type: 'cmd',    text: 'cat passion.txt' },
  { type: 'output', text: 'Building things that people actually use.' },
  { type: 'cmd',    text: './start_collaboration.sh' },
  { type: 'output', text: 'Initialising...\nReady. Lets build something.' },
];

const CHAR_MS     = 55;   // ms per character typed
const CMD_PAUSE   = 500;  // ms pause after typing before showing output
const OUT_PAUSE   = 350;  // ms pause after output before next command
const LOOP_PAUSE  = 3000; // ms pause before restarting

interface DisplayLine { type: 'cmd' | 'output'; text: string }

// ─────────────────────────────────────────────────────────────────────────────
// Terminal card
// ─────────────────────────────────────────────────────────────────────────────
function TerminalCard({ inView }: { inView: boolean }) {
  const [displayed, setDisplayed] = useState<DisplayLine[]>([]);
  const [cursor,    setCursor]    = useState('');       // partial cmd being typed
  const bottomRef                 = useRef<HTMLDivElement>(null);
  const bodyRef                   = useRef<HTMLDivElement>(null);
  // A single incrementing token — whenever it changes, the old loop stops
  const tokenRef  = useRef(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clear all pending timers
  function clearAll() {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }

  // Promise-based sleep that registers its timer and checks the token
  function sleep(ms: number, token: number): Promise<void> {
    return new Promise(resolve => {
      const id = setTimeout(() => {
        // Only resolve if this loop's token is still current
        if (tokenRef.current === token) resolve();
      }, ms);
      timersRef.current.push(id);
    });
  }

  // Scroll only the terminal body — never the page
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [displayed, cursor]);

  // Start / restart the loop whenever inView becomes true
  useEffect(() => {
    if (!inView) return;

    // Invalidate any running loop
    tokenRef.current += 1;
    const token = tokenRef.current;
    clearAll();

    setDisplayed([]);
    setCursor('');

    async function run() {
      while (tokenRef.current === token) {
        setDisplayed([]);
        setCursor('');

        for (const line of LINES) {
          if (tokenRef.current !== token) return;

          if (line.type === 'cmd') {
            // Type character by character
            for (let i = 0; i <= line.text.length; i++) {
              if (tokenRef.current !== token) return;
              setCursor(line.text.slice(0, i));
              await sleep(CHAR_MS, token);
            }
            await sleep(CMD_PAUSE, token);
            if (tokenRef.current !== token) return;
            setDisplayed(prev => [...prev, { type: 'cmd', text: line.text }]);
            setCursor('');
            await sleep(60, token);
          } else {
            if (tokenRef.current !== token) return;
            setDisplayed(prev => [...prev, { type: 'output', text: line.text }]);
            await sleep(OUT_PAUSE, token);
          }
        }

        await sleep(LOOP_PAUSE, token);
      }
    }

    run();

    return () => {
      tokenRef.current += 1;
      clearAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'relative', alignSelf: 'start' }}
    >
      {/* Accent glow */}
      <div style={{
        position: 'absolute', inset: 0, top: '10px', left: '10px',
        background: 'var(--accent)', opacity: 0.10,
        filter: 'blur(28px)', borderRadius: '6px',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Window chrome */}
      <div style={{
        position: 'relative', zIndex: 1,
        background: '#0d0d0d',
        border: '1px solid rgba(200,75,47,0.28)',
        borderRadius: '8px',
        overflow: 'hidden',
        width: 'clamp(300px, 36vw, 440px)',
        boxShadow: '0 0 0 1px rgba(200,75,47,0.06), 0 28px 56px rgba(0,0,0,0.35)',
      }}>

        {/* Title bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '11px 16px',
          background: '#181818',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          {['#ff5f57','#febc2e','#28c840'].map((c,i) => (
            <div key={i} style={{ width: '11px', height: '11px', borderRadius: '50%', background: c }} />
          ))}
          <span style={{
            flex: 1, textAlign: 'center', marginRight: '29px',
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            color: 'rgba(255,255,255,0.28)', letterSpacing: '0.5px',
          }}>
            dinuka@portfolio ~ zsh
          </span>
        </div>

        {/* Body */}
        <div ref={bodyRef} style={{
          padding: '16px 20px 20px',
          minHeight: '300px',
          maxHeight: '360px',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          fontFamily: 'var(--font-mono)',
          fontSize: '12.5px',
          lineHeight: 1.8,
        }}>
          {displayed.map((line, i) => (
            line.type === 'cmd' ? (
              <div key={i} style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: '#c84b2f', flexShrink: 0 }}>❯</span>
                <span style={{ color: '#e8e3db' }}>{line.text}</span>
              </div>
            ) : (
              <div key={i} style={{
                color: 'rgba(232,227,219,0.5)',
                paddingLeft: '18px',
                whiteSpace: 'pre',
                marginBottom: '2px',
              }}>
                {line.text}
              </div>
            )
          ))}

          {/* Active typing row — always shown */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ color: '#c84b2f', flexShrink: 0 }}>❯</span>
            <span style={{ color: '#e8e3db' }}>{cursor}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'steps(1)' }}
              style={{
                display: 'inline-block',
                width: '7px', height: '14px',
                background: '#c84b2f',
                verticalAlign: 'text-bottom',
                marginLeft: '1px',
              }}
            />
          </div>

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Scanlines */}
      <div style={{
        position: 'absolute', left: 0, right: 0,
        top: '34px', bottom: 0,
        borderRadius: '0 0 8px 8px',
        background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.025) 2px,rgba(0,0,0,0.025) 4px)',
        pointerEvents: 'none', zIndex: 2,
      }} />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Skill bar
// ─────────────────────────────────────────────────────────────────────────────
function SkillBar({ name, level, delay, inView }: {
  name: string; level: number; delay: number; inView: boolean;
}) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '15px',
          fontWeight: 700, letterSpacing: '0.3px',
        }}>
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.4, duration: 0.4 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}
        >
          {level}%
        </motion.span>
      </div>

      {/* Track */}
      <div style={{ height: '4px', background: 'var(--border)', position: 'relative', overflow: 'hidden', borderRadius: '2px' }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 2.1, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, var(--accent), color-mix(in srgb, var(--accent) 70%, #ff9966))',
            transformOrigin: 'left center',
            width: `${level}%`,
            borderRadius: '2px',
          }}
        />
        {/* Shimmer */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={inView ? { x: '400%' } : { x: '-100%' }}
          transition={{ duration: 2.1, delay: delay + 0.1, ease: 'easeInOut' }}
          style={{
            position: 'absolute', top: 0, bottom: 0, width: '35%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Sub-tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
        {skillLevels.find(s => s.category === name)?.items.map(item => (
          <span key={item} style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            padding: '3px 10px',
            border: '1px solid var(--border)',
            color: 'var(--muted)', background: 'var(--bg)',
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// About section
// ─────────────────────────────────────────────────────────────────────────────
export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={ref}
      style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 60px)', borderTop: '1px solid var(--border)' }}
    >
      <SectionLabel index="001" label="About" />

      {/* ── Top: bio + terminal ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'start',
        marginBottom: 'clamp(64px, 9vw, 100px)',
      }}>
        {/* Bio + stats + links */}
        <div>
          <motion.h2
            variants={fadeUp(0)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 800, lineHeight: 1.1,
              letterSpacing: '-0.5px', marginBottom: '24px',
            }}
          >
            Crafting digital<br />experiences that<br />
            <span style={{ color: 'var(--accent)' }}>matter.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp(0.1)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.9, color: 'var(--muted)', maxWidth: '600px' }}
          >
            I’m a Full-Stack Software Engineer with industry experience in building and maintaining production-grade ERP systems. I focus on developing scalable, user-centric applications and solving real-world problems through clean and efficient code.
            <br /><br />
            I’ve also worked on advanced personal projects, including AI-powered applications and interactive 3D web experiences, reflecting my interest in modern and immersive technologies.
            <br /><br />
            Currently, I’m expanding into DevOps and cloud engineering, learning to design and manage systems that are not only functional but also reliable, scalable, and production-ready.
          </motion.p>

          <motion.div
            variants={fadeUp(0.2)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px', marginTop: '44px' }}
          >
            {stats.map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-2px', color: 'var(--accent)', lineHeight: 1 }}>
                  {s.num}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginTop: '6px' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp(0.3)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '36px' }}
          >
            {[
              { label: 'GitHub ↗',   href: personalInfo.github },
              { label: 'LinkedIn ↗', href: personalInfo.linkedin },
              { label: 'Email ↗',    href: `mailto:${personalInfo.email}` },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '1px',
                  textTransform: 'uppercase', textDecoration: 'none', color: 'var(--muted)',
                  borderBottom: '1px solid var(--border)', paddingBottom: '2px',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Terminal */}
        <TerminalCard inView={inView} />
      </div>

      {/* ── Skill bars ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          fontFamily: 'var(--font-mono)', fontSize: '11px',
          letterSpacing: '2px', textTransform: 'uppercase',
          color: 'var(--muted)', marginBottom: '44px',
        }}>
          <span style={{ color: 'var(--accent)' }}>—</span>
          Skill proficiency
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '0 clamp(48px, 7vw, 96px)',
        }}>
          {skillLevels.map((skill, i) => (
            <SkillBar
              key={skill.category}
              name={skill.category}
              level={skill.level}
              delay={0.1 + i * 0.12}
              inView={inView}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
