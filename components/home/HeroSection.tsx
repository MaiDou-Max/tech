'use client';

import { IconSparkles, IconTrendingUp } from '@tabler/icons-react';

export default function HeroSection() {
  return (
    <section className="relative mb-16 px-6 py-12 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[var(--color-primary)] opacity-10 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-[var(--color-secondary)] opacity-10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-[var(--color-primary)] opacity-10 rounded-full blur-3xl animate-blob animation-delay-4000" />

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 animate-fade-in max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--code-inline-bg)] border border-[var(--color-border)] mb-6 animate-slide-down backdrop-blur-sm">
          <IconSparkles size={16} className="text-[var(--color-primary)]" />
          <span className="text-sm font-medium text-[var(--color-text)]">欢迎来到我的技术博客</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-[var(--color-text)] mb-6 leading-tight animate-slide-up">
          嗨，我是{' '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent animate-gradient">
              钟宝
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-20 blur-sm" />
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-[var(--color-text-muted)] max-w-3xl leading-relaxed mb-8 animate-slide-up animation-delay-200">
          一名热爱代码的前端开发者，专注于构建优雅的用户体验。在这里，我分享关于前端开发、技术思考和编程经验。
        </p>

        <div className="flex flex-wrap gap-4 animate-slide-up animation-delay-400">
          <a
            href="#latest"
            className="group px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              浏览文章
              <IconTrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a
            href="/about"
            className="group px-8 py-4 bg-[var(--color-card-bg)] border-2 border-[var(--color-border)] text-[var(--color-text)] font-semibold rounded-xl hover:border-[var(--color-primary)] hover:shadow-lg transition-all duration-300"
          >
            关于我
          </a>
        </div>
      </div>
    </section>
  );
}

