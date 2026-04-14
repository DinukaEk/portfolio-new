import { useRef } from 'react';
import { useInView, Variants } from 'framer-motion';

// Framer Motion's useInView accepts margin as a template literal type
// matching CSS shorthand — we cast to satisfy strict TS without widening
type MarginValue = `${number}px` | `${number}%`;
type MarginType  = MarginValue
  | `${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue}`
  | `${MarginValue} ${MarginValue} ${MarginValue} ${MarginValue}`;

interface UseScrollRevealOptions {
  once?:  boolean;
  margin?: MarginType;
  delay?: number;
}

export const fadeUpVariants = (delay = 0): Variants => ({
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] },
  },
});

export const fadeInVariants = (delay = 0): Variants => ({
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  },
});

export const staggerContainerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export default function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { once = true, margin = '-80px' as MarginType } = options;
  const ref    = useRef(null);
  const inView = useInView(ref, { once, margin });
  return { ref, inView };
}
