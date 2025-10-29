'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { FontToggle } from '@/components/theme/font-toggle';
import { IconHome, IconFolder, IconTag, IconArchive, IconUser } from '@tabler/icons-react';

const tabs = [
  {
    label: '首页',
    value: '/',
    icon: IconHome,
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
  {
    label: '关于',
    value: '/about',
    icon: IconUser,
  },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 mb-6 animate-slide-down backdrop-blur-md">
      <div className="volantis-glass rounded-2xl shadow-lg">
        <nav className="flex items-center justify-between px-2 sm:px-4 md:px-6 py-2 sm:py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-base sm:text-lg">宝</span>
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-sm font-bold text-[var(--color-text)] leading-tight">
                zhongbao.su的博客
              </span>
              <span className="text-xs text-[var(--color-text-muted)] leading-tight">
                Tech Blog
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const active = isActive(tab.value);
              return (
                <Link
                  key={tab.value}
                  href={tab.value}
                  className={`group relative flex items-center justify-center gap-2 px-2 sm:px-3 md:px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                    active
                      ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-border-light)]'
                  }`}
                  title={tab.label}
                >
                  <Icon
                    size={16}
                    className="sm:w-[18px] sm:h-[18px] transition-transform duration-200 group-hover:scale-110"
                  />
                  <span className="hidden lg:inline">{tab.label}</span>
                  {active && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 sm:w-6 h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* Theme & Font Toggle */}
            <div className="ml-1 sm:ml-2 pl-1 sm:pl-2 border-l border-[var(--color-border)] flex items-center gap-1 sm:gap-2">
              <FontToggle />
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
