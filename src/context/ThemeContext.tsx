import React, { createContext, useContext, useEffect, useState } from 'react';
import { WaterRippleOverlay } from '../components/WaterRippleOverlay';

export type Theme = 'light' | 'dark';

export interface ThemeToggleOrigin {
  clientX?: number;
  clientY?: number;
}

export interface WaterRippleData {
  id: number;
  x: number;
  y: number;
  targetTheme: Theme;
  duration: number;
  endRadius: number;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (origin?: ThemeToggleOrigin | React.MouseEvent | MouseEvent) => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme') as Theme | null;
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    }
    return 'dark';
  });

  const [ripple, setRipple] = useState<WaterRippleData | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    setThemeState(newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  const toggleTheme = (origin?: ThemeToggleOrigin | React.MouseEvent | MouseEvent) => {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';

    // Calculate click coordinates or fallback to the theme toggle button position
    let x = typeof window !== 'undefined' ? window.innerWidth - 60 : 100;
    let y = 35;

    if (origin && 'clientX' in origin && typeof origin.clientX === 'number' && origin.clientX > 0) {
      x = origin.clientX;
      y = origin.clientY ?? 35;
    } else if (typeof document !== 'undefined') {
      const btn = document.getElementById('theme-toggle-btn');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      applyTheme(nextTheme);
      return;
    }

    // Calculate max radius to reach the furthest viewport corner
    const endRadius = Math.hypot(
      Math.max(x, typeof window !== 'undefined' ? window.innerWidth - x : 1000),
      Math.max(y, typeof window !== 'undefined' ? window.innerHeight - y : 1000)
    );

    // Calibrated duration (950ms): serene, fluid, and calm while guaranteeing steady 60/120 FPS
    const DURATION = 950;

    // Trigger visual canvas water ripple
    setRipple({
      id: Date.now(),
      x,
      y,
      targetTheme: nextTheme,
      duration: DURATION,
      endRadius,
    });

    // Modern View Transitions API with circular clip-path (water ripple wave)
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.documentElement.classList.add('theme-transitioning');

      // @ts-ignore
      const transition = document.startViewTransition(() => {
        applyTheme(nextTheme);
      });

      transition.ready
        .then(() => {
          const anim = document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: DURATION,
              easing: 'cubic-bezier(0.2, 0.8, 0.25, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          );

          anim.onfinish = () => {
            document.documentElement.classList.remove('theme-transitioning');
          };
        })
        .catch(() => {
          applyTheme(nextTheme);
          document.documentElement.classList.remove('theme-transitioning');
        });

      if (transition.finished) {
        transition.finished.finally(() => {
          document.documentElement.classList.remove('theme-transitioning');
        });
      }
    } else {
      // Fallback for browsers without View Transitions:
      // Allow canvas liquid wave to expand before updating theme state
      setTimeout(() => {
        applyTheme(nextTheme);
      }, Math.round(DURATION * 0.4));
    }
  };

  const setTheme = (newTheme: Theme) => {
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
      {ripple && (
        <WaterRippleOverlay
          ripple={ripple}
          onComplete={() => setRipple(null)}
        />
      )}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

