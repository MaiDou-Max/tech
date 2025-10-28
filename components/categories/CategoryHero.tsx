'use client';

import { IconFolder } from '@tabler/icons-react';

export default function CategoryHero() {
  return (
    <section className="relative mb-16 px-6 py-12 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-[var(--color-primary)] opacity-10 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-20 right-20 w-56 h-56 bg-[var(--color-secondary)] opacity-10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-10 left-1/3 w-48 h-48 bg-[var(--color-primary)] opacity-10 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="relative z-10 animate-fade-in max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--code-inline-bg)] border border-[var(--color-border)] mb-6">
          <IconFolder size={16} className="text-[var(--color-primary)]" />
          <span className="text-sm font-medium text-[var(--color-text)]">探索内容</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text)] mb-6 leading-tight">
          文章
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            分类
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
          按主题浏览所有文章，发现你感兴趣的内容
        </p>
      </div>
    </section>
  );
}
