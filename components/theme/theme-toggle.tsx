'use client';
import * as React from 'react';
import { useTheme } from 'next-themes';
import { IconSun, IconMoon } from '@tabler/icons-react';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[var(--code-inline-bg)]" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[var(--code-inline-bg)] hover:bg-[var(--color-primary)]/20 transition-all duration-200 flex items-center justify-center group border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <IconMoon
          size={18}
          className="sm:w-5 sm:h-5 text-[var(--color-primary)] group-hover:rotate-12 transition-transform duration-200"
        />
      ) : (
        <IconSun
          size={18}
          className="sm:w-5 sm:h-5 text-[var(--color-primary)] group-hover:rotate-90 transition-transform duration-200"
        />
      )}
    </button>
  );
}
