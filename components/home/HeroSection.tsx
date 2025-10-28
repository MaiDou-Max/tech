'use client';

import { IconSparkles, IconArrowRight, IconCode } from '@tabler/icons-react';

export default function HeroSection() {
  return (
    <section className="relative mb-12 overflow-hidden">
      {/* Background decorations - subtle */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-primary)] opacity-5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-secondary)] opacity-5 rounded-full blur-3xl" />

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

        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-border-light)] border border-[var(--color-border)] mb-6 animate-slide-down">
              <IconSparkles size={16} className="text-[var(--color-primary)]" />
              <span className="text-sm font-medium text-[var(--color-text-muted)]">
                欢迎来到我的技术博客
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-6 leading-tight animate-slide-up">
              嗨，我是{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                  zhongbao.su
                </span>
                <div className="absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 blur-sm -z-10" />
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl leading-relaxed mb-8 animate-slide-up animation-delay-200">
              一名热爱代码的前端开发者，专注于构建优雅的用户体验。
              <br className="hidden md:block" />
              在这里，我分享关于前端开发、技术思考和编程经验。
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-slide-up animation-delay-400">
              <a
                href="#posts"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-xl hover:bg-[var(--color-primary-dark)] hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <span>浏览文章</span>
                <IconArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="/about"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-card-bg)] border-2 border-[var(--color-border)] text-[var(--color-text)] font-semibold rounded-xl hover:border-[var(--color-primary)] hover:shadow-lg transition-all duration-300"
              >
                <IconCode size={18} />
                <span>关于我</span>
              </a>
            </div>

            {/* Tech stack badges */}
            <div className="mt-10 pt-8 border-t border-[var(--color-border)] animate-fade-in animation-delay-600">
              <p className="text-sm text-[var(--color-text-muted)] mb-4">专注技术栈</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'].map((tech, idx) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-[var(--color-border-light)] text-[var(--color-text-muted)] text-sm font-medium hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition-all duration-300 cursor-default"
                    style={{ animationDelay: `${(idx + 1) * 100}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
