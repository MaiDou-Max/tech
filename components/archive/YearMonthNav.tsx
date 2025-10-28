'use client';
import { useEffect, useRef, useState } from 'react';
import { IconCalendar } from '@tabler/icons-react';

interface YearMonthNavProps {
  map: Record<string, Record<string, number>>; // year -> month -> count
}

export default function YearMonthNav({ map }: YearMonthNavProps) {
  const years = Object.keys(map).sort((a, b) => Number(b) - Number(a));
  const [activeYear, setActiveYear] = useState(years[0]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onScroll() {
      const sections = years.map(y => document.getElementById(`year-${y}`));
      const scrollY = window.scrollY + 120; // offset for header
      for (const sec of sections) {
        if (!sec) continue;
        if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
          setActiveYear(sec.id.replace('year-', ''));
          break;
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [years]);

  return (
    <aside
      ref={containerRef}
      className="hidden lg:block w-60 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-2"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)]">
          <IconCalendar size={16} className="text-[var(--color-primary)]" /> 时间导航
        </div>
        {years.map(year => (
          <div key={year} className="group">
            <a
              href={`#year-${year}`}
              className={`flex items-center justify-between mb-2 font-bold text-lg transition-colors ${
                activeYear === year
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <span>{year}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--code-inline-bg)] text-[var(--code-inline-color)]">
                {Object.values(map[year]).reduce((a, b) => a + b, 0)}
              </span>
            </a>
            <ul className="ml-2 border-l border-[var(--color-border)] pl-3 space-y-1">
              {Object.keys(map[year])
                .sort((a, b) => Number(b) - Number(a))
                .map(month => (
                  <li key={month}>
                    <a
                      href={`#${year}-${month}`}
                      className={`text-xs flex items-center justify-between py-1 transition-colors ${
                        activeYear === year
                          ? 'text-[var(--color-text)]'
                          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                      }`}
                    >
                      <span>{month} 月</span>
                      <span className="text-[var(--color-primary)] font-medium">
                        {map[year][month]}
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
