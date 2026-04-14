import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggle: () => {},
});

// ── Apply CSS vars directly to <html> — called synchronously so vars are
//    available on the very first paint, including client-side navigation.
function applyTheme(theme: Theme) {
  const r = document.documentElement;
  if (theme === 'dark') {
    r.style.setProperty('--bg',        '#111010');
    r.style.setProperty('--fg',        '#ede9e3');
    r.style.setProperty('--accent',    '#e06040');
    r.style.setProperty('--accent2',   '#6da4d4');
    r.style.setProperty('--muted',     '#8a857e');
    r.style.setProperty('--card-bg',   '#1c1b1a');
    r.style.setProperty('--border',    'rgba(237,233,227,0.1)');
    r.style.setProperty('--border-sm', 'rgba(237,233,227,0.05)');
  } else {
    r.style.setProperty('--bg',        '#f5f2ee');
    r.style.setProperty('--fg',        '#0e0e0e');
    r.style.setProperty('--accent',    '#c84b2f');
    r.style.setProperty('--accent2',   '#1a3a5c');
    r.style.setProperty('--muted',     '#7a7570');
    r.style.setProperty('--card-bg',   '#ffffff');
    r.style.setProperty('--border',    'rgba(14,14,14,0.1)');
    r.style.setProperty('--border-sm', 'rgba(14,14,14,0.06)');
  }
}

// ── Resolve the initial theme before the first render ────────────────────────
function getInitialTheme(): Theme {
  const saved = localStorage.getItem('theme') as Theme | null;
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const initial = getInitialTheme();
    // Apply synchronously during state initialisation — runs before paint
    applyTheme(initial);
    return initial;
  });

  // Keep localStorage and CSS vars in sync whenever theme changes
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}
