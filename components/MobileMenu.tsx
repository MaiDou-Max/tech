'use client';

import { useState } from 'react';
import { IconMenu2, IconX } from '@tabler/icons-react';
import UnifiedSidebar from '@/components/sidebar/UnifiedSidebar';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button - Left side, only visible on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 xl:hidden w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center"
        aria-label="打开菜单"
      >
        <IconMenu2 size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 xl:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[320px] max-w-[90vw] z-50 xl:hidden transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="relative h-full">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:bg-[var(--color-card-hover-bg)] hover:border-[var(--color-border-hover)] transition-all flex items-center justify-center text-[var(--color-text)]"
            aria-label="关闭菜单"
          >
            <IconX size={20} />
          </button>

          {/* Unified Sidebar Content */}
        </div>
      </div>
    </>
  );
}
