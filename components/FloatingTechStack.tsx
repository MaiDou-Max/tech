'use client';

import { useState } from 'react';
import { IconCode, IconX } from '@tabler/icons-react';
import PhysicsDrop from '@/components/ui/PhysicsDrop';

export default function FloatingTechStack() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Tech Stack button for screens without right sidebar */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-24 z-50 min-[1440px]:hidden w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 group"
        aria-label="技术栈展示"
      >
        <IconCode size={24} className="group-hover:rotate-12 transition-transform" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[70] min-[1440px]:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating Tech Stack Panel */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] min-[1440px]:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="w-[340px] max-w-[90vw] max-h-[90vh] bg-[var(--color-background)] rounded-2xl shadow-2xl border border-[var(--color-border)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-card-bg)]">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full" />
              <h2 className="text-lg font-bold text-[var(--color-text)]">技术栈演示</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-[var(--color-border-light)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-all flex items-center justify-center"
              aria-label="关闭"
            >
              <IconX size={20} />
            </button>
          </div>

          {/* PhysicsDrop Content */}
          <div className="h-[680px] overflow-y-auto scrollbar-thin">
            <div className="p-4">
              <PhysicsDrop />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

