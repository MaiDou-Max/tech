'use client';

import { IconHash } from '@tabler/icons-react';

export default function TagsHero() {
  return (
    <section className="relative mb-16 px-6 py-12 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[var(--color-primary)] opacity-10 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-[var(--color-secondary)] opacity-10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[var(--color-primary)] opacity-5 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="relative z-10 text-center animate-fade-in max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--code-inline-bg)] border border-[var(--color-border)] mb-6">
          <IconHash size={16} className="text-[var(--color-primary)]" />
          <span className="text-sm font-medium text-[var(--color-text)]">标签云</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text)] mb-6 leading-tight">
          文章
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            标签
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
          通过标签快速发现相关内容
        </p>
      </div>
    </section>
  );
}
