'use client';

import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';

interface CategoryDetailHeaderProps {
  category: string;
  totalPosts: number;
}

export default function CategoryDetailHeader({ category, totalPosts }: CategoryDetailHeaderProps) {
  return (
    <>
      {/* Navigation */}
      <div className="mb-8 animate-slide-down">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-200 group"
        >
          <IconArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform duration-200"
          />
          <span className="font-medium">所有分类</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="mb-12 py-8">
        <div className="inline-block px-4 py-2 rounded-full bg-[var(--code-inline-bg)] text-[var(--code-inline-color)] text-sm font-medium mb-4 animate-slide-up">
          分类
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-4 leading-tight animate-slide-up animation-delay-200">
          {category}
        </h1>
        <p className="text-lg text-[var(--color-text-muted)] animate-slide-up animation-delay-400">
          共 {totalPosts} 篇文章
        </p>
      </section>
    </>
  );
}
