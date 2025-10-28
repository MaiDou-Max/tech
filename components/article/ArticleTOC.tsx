'use client';

import { useEffect, useState } from 'react';
import { IconList } from '@tabler/icons-react';

export default function ArticleTOC() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3, h4'))
      .filter((el): el is HTMLElement => el instanceof HTMLElement)
      .map(el => ({
        id: el.id || el.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
        text: el.textContent || '',
        level: Number(el.tagName[1]),
      }));

    // Add IDs to headings if they don't have one
    elements.forEach((heading, index) => {
      const element = document.querySelectorAll('h2, h3, h4')[index];
      if (element && !element.id) {
        element.id = heading.id;
      }
    });

    setHeadings(elements);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66% 0px' }
    );

    elements.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="volantis-card p-4">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--color-border)]">
        <IconList size={18} className="text-[var(--color-primary)]" />
        <h2 className="text-sm font-bold text-[var(--color-text)]">目录</h2>
      </div>

      <ul className="space-y-2 text-sm">
        {headings.map(heading => (
          <li key={heading.id} style={{ paddingLeft: `${(heading.level - 2) * 12}px` }}>
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={`text-left w-full px-3 py-1.5 rounded-lg transition-all duration-200 ${
                activeId === heading.id
                  ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-border-light)]'
              }`}
            >
              <span className="line-clamp-2">{heading.text}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
