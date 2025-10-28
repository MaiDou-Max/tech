import React from 'react';
import Link from 'next/link';

interface CardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  tags?: string[];
  variant?: 'list' | 'grid';
}

// 不同的图案样式
const patterns = [
  // 波浪图案
  <svg key="wave" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="wave" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <path
          d="M0 50 Q 25 25, 50 50 T 100 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#wave)" />
  </svg>,
  // 圆点图案
  <svg key="dots" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>,
  // 网格图案
  <svg key="grid" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
        <path
          d="M 30 0 L 0 0 0 30"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>,
];

function Card(props: CardProps) {
  const { title, description, id, category, date, variant = 'list' } = props;
  const patternIndex = parseInt(id.slice(0, 2), 36) % patterns.length;

  if (variant === 'grid') {
    return (
      <article className="group relative overflow-hidden bg-white cursor-pointer rounded-3xl shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
        <Link href={`/posts/${id}`} className="flex flex-col h-full">
          {/* Image placeholder with pattern */}
          <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10">
            {/* Pattern overlay */}
            <div className="text-[var(--color-primary)]">{patterns[patternIndex]}</div>

            {/* Animated gradient mesh */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 via-transparent to-[var(--color-secondary)]/20 animate-gradient-shift" />

            {/* Decorative shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-[var(--color-primary)]/10 blur-3xl group-hover:scale-150 transition-transform duration-700" />

            {/* Category badge */}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
              <span className="text-xs font-semibold text-[var(--code-inline-color)]">
                {category}
              </span>
            </div>

            {/* Hover icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl text-2xl">
                →
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-3 leading-tight group-hover:text-[var(--color-primary)] transition-colors duration-300 line-clamp-2">
              {title}
            </h3>

            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4 line-clamp-2 flex-grow">
              {description}
            </p>

            <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)] pt-4">
              <div className="flex items-center gap-1.5">
                📅
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                </time>
              </div>
              <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
              <div className="flex items-center gap-1.5">
                ⏱️
                <span>5 min</span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // List variant (default)
  return (
    <article className="card-3d group relative overflow-hidden bg-white cursor-pointer rounded-3xl mx-0 my-6 shadow-md hover:shadow-lg transition-all duration-300">
      {/* Gradient accent on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)]/0 via-[var(--color-primary)]/5 to-[var(--color-secondary)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <Link href={`/posts/${id}`} className="block md:flex gap-6 p-6 md:p-8 relative z-10">
        {/* Image preview for list view */}
        <div className="relative w-full md:w-48 aspect-[16/10] md:aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 mb-4 md:mb-0 flex-shrink-0">
          {/* Pattern */}
          <div className="text-[var(--color-primary)]">{patterns[patternIndex]}</div>

          {/* Animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 via-transparent to-[var(--color-secondary)]/20 animate-gradient-shift" />

          {/* Center decoration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[var(--color-card-bg)]/60 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-2xl">
              →
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-200 leading-tight">
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mb-4">
            <div className="flex items-center gap-1.5">
              📅
              <time dateTime={date}>
                {new Date(date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
            <span className="px-3 py-1 rounded-full bg-[var(--code-inline-bg)] text-[var(--code-inline-color)] text-xs font-medium">
              {category}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
            <div className="flex items-center gap-1.5">
              ⏱️
              <span>5 分钟阅读</span>
            </div>
          </div>

          <p className="text-base md:text-lg text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default Card;
