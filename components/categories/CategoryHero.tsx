'use client';

import { IconFolder } from '@tabler/icons-react';

export default function CategoryHero() {
  return (
    <section className="relative mb-10 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-[var(--color-primary)] opacity-5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-secondary)] opacity-5 rounded-full blur-3xl" />

      <div className="volantis-card overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 p-8 md:p-12 text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-border-light)] border border-[var(--color-border)] mb-6 animate-slide-down">
            <IconFolder size={16} className="text-[var(--color-primary)]" />
            <span className="text-sm font-medium text-[var(--color-text-muted)]">探索内容</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4 animate-slide-up">
            文章
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
              分类
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
            按主题浏览所有文章，发现你感兴趣的内容
          </p>
        </div>
      </div>
    </section>
  );
}
