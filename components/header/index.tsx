'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { IconSparkles, IconFolder, IconTag, IconArchive } from '@tabler/icons-react';

const tabs = [
  {
    label: '近期文章',
    value: '/',
    icon: IconSparkles,
  },
  {
    label: '分类',
    value: '/categories',
    icon: IconFolder,
  },
  {
    label: '标签',
    value: '/tags',
    icon: IconTag,
  },
  {
    label: '归档',
    value: '/archive',
    icon: IconArchive,
  },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-md bg-[var(--color-card-bg)]/80 border-b border-[var(--color-border)] px-6 py-4 mb-6 rounded-2xl shadow-sm">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.value}
                href={tab.value}
                className="group flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--code-inline-bg)] transition-all duration-200 font-medium"
              >
                <Icon
                  size={18}
                  className="group-hover:scale-110 transition-transform duration-200"
                />
                <span className="hidden md:inline">{tab.label}</span>
              </Link>
            );
          })}
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
}
