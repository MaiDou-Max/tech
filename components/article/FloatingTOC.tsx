'use client';

import { useState } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import ArticleTOC from './ArticleTOC';

export default function FloatingTOC() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating TOC button for mobile/tablet */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 bottom-24 z-50 lg:hidden w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="打开目录"
      >
        <IconMenu2 size={20} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating TOC Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] z-[60] lg:hidden transition-transform duration-300 bg-[var(--color-background)] border-r border-[var(--color-border)] shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
            <h2 className="text-lg font-bold text-[var(--color-text)]">目录</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-[var(--color-border-light)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-all flex items-center justify-center"
              aria-label="关闭"
            >
              <IconX size={20} />
            </button>
          </div>

          {/* TOC Content */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
            <ArticleTOC />
          </div>
        </div>
      </div>
    </>
  );
}
