'use client';

import Link from 'next/link';
import { IconFolder, IconChevronRight, IconSparkles } from '@tabler/icons-react';

interface CategoryCardProps {
  category: string;
  gradientClass: string;
  index: number;
}

export default function CategoryCard({ category, gradientClass, index }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category}`}
      className="group relative overflow-hidden bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl p-6 shadow-[0_2px_12px_var(--color-shadow)] hover:shadow-[0_12px_30px_var(--color-shadow)] transition-all duration-500 hover:-translate-y-2 animate-scale-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-10 transition-all duration-500`} />

      {/* Decorative circles */}
      <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${gradientClass} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />
      <div className={`absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br ${gradientClass} opacity-5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 animation-delay-200`} />

      {/* Content */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {/* Icon with animated border */}
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
            <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <IconFolder size={28} className="text-white" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-bold text-[var(--color-text)] mb-1 group-hover:text-[var(--color-primary)] transition-colors duration-200">
              {category}
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] flex items-center gap-1">
              <IconSparkles size={14} />
              <span>查看所有文章</span>
            </p>
          </div>
        </div>

        {/* Arrow with animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-[var(--color-primary)] rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
          <div className="relative w-10 h-10 rounded-full bg-[var(--code-inline-bg)] group-hover:bg-[var(--color-primary)] flex items-center justify-center transition-all duration-300">
            <IconChevronRight
              size={20}
              className="text-[var(--color-text-muted)] group-hover:text-white group-hover:translate-x-1 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Bottom decoration line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientClass} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
    </Link>
  );
}

