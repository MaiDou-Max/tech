import React from 'react';
import Link from 'next/link';
import { IconArrowRight, IconEye, IconCalendar, IconClock } from '@tabler/icons-react';

interface FeaturedCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
}

function FeaturedCard(props: FeaturedCardProps) {
  const { title, description, id, category, date } = props;

  return (
    <article className="group relative overflow-hidden bg-[var(--color-card-bg)] border border-[var(--color-border)] cursor-pointer rounded-3xl shadow-[0_4px_20px_var(--color-shadow)] hover:shadow-[0_12px_40px_var(--color-shadow)] transition-all duration-500 hover:-translate-y-2">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <Link href={`/posts/${id}`} className="block">
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-10">
          {/* Image Section with advanced graphics */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20">
            {/* Layered background effects */}
            <div className="absolute inset-0">
              {/* Animated gradient mesh */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/30 via-[var(--color-secondary)]/30 to-[var(--color-primary)]/30 animate-gradient-shift" />

              {/* Geometric patterns */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="featured-grid"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle
                      cx="20"
                      cy="20"
                      r="1"
                      fill="currentColor"
                      className="text-[var(--color-primary)]"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#featured-grid)" />
              </svg>

              {/* Floating orbs */}
              <div className="absolute top-8 right-8 w-32 h-32 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-20 blur-3xl animate-float" />
              <div className="absolute bottom-8 left-8 w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] opacity-20 blur-3xl animate-float animation-delay-1000" />

              {/* Decorative shapes */}
              <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-[var(--color-primary)]/30 rounded-xl rotate-12 group-hover:rotate-45 transition-transform duration-700" />
              <div className="absolute bottom-1/4 right-1/4 w-20 h-20 border-2 border-[var(--color-secondary)]/30 rounded-full group-hover:scale-125 transition-transform duration-700" />
            </div>

            {/* Center icon with glassmorphism */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative group/icon">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] blur-xl opacity-50 group-hover/icon:opacity-75 transition-opacity" />

                {/* Icon container */}
                <div className="relative w-24 h-24 rounded-full bg-[var(--color-card-bg)]/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-[var(--color-border)]/50">
                  <IconArrowRight
                    size={40}
                    className="text-[var(--color-primary)] group-hover:translate-x-2 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Featured badge */}
            <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-xs font-bold shadow-lg backdrop-blur-sm animate-pulse-glow">
              ⭐ 精选推荐
            </div>

            {/* Reading stats */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-card-bg)]/90 backdrop-blur-sm border border-[var(--color-border)] shadow-lg">
              <IconEye size={14} className="text-[var(--color-primary)]" />
              <span className="text-xs font-semibold text-[var(--color-text)]">1.2k views</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--code-inline-bg)] text-[var(--code-inline-color)] text-xs font-semibold mb-4 w-fit border border-[var(--color-border)]">
              #{category}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4 leading-tight group-hover:text-[var(--color-primary)] transition-colors duration-300">
              {title}
            </h2>

            <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-6 line-clamp-3">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)] mb-6">
              <div className="flex items-center gap-2">
                <IconCalendar size={16} />
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
              <div className="flex items-center gap-2">
                <IconClock size={16} />
                <span>5 分钟阅读</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold group-hover:gap-4 transition-all duration-300">
              <span>阅读全文</span>
              <IconArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default FeaturedCard;
