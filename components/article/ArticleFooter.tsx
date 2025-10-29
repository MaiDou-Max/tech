'use client';

import Link from 'next/link';
import { IconChevronLeft, IconChevronRight, IconHome, IconArrowUp } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

interface ArticleFooterProps {
  prevPost: { id: string; title: string } | null;
  nextPost: { id: string; title: string } | null;
  postData: any;
}

export default function ArticleFooter({ prevPost, nextPost, postData }: ArticleFooterProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 计算阅读进度
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / scrollHeight) * 100;
      setReadingProgress(Math.min(progress, 100));

      // 滚动超过一定距离显示返回顶部按钮
      setShowScrollTop(currentScrollY > 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <footer className="relative backdrop-blur-md bg-gradient-to-r from-[var(--color-card-bg)]/95 via-[var(--color-secondary)]/5 to-[var(--color-card-bg)]/95">
        {/* Reading progress bar - 渐变进度条 */}
        <div
          className="absolute top-0 left-0 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-primary)] transition-all duration-300 shadow-lg shadow-[var(--color-primary)]/20"
          style={{ width: `${readingProgress}%` }}
        />

        {/* 装饰性背景光晕 */}
        <div className="absolute bottom-0 left-1/4 w-40 h-full bg-gradient-to-r from-[var(--color-secondary)]/10 to-transparent blur-2xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-40 h-full bg-gradient-to-l from-[var(--color-primary)]/10 to-transparent blur-2xl opacity-30" />

        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Previous Post with hover effect */}
            {prevPost ? (
              <Link
                href={`/posts/${prevPost.id}`}
                className="group relative flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[var(--color-border-light)] transition-all duration-200 min-w-0 flex-1 hover:scale-105"
              >
                <IconChevronLeft
                  size={20}
                  className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:-translate-x-1 transition-all duration-200 flex-shrink-0"
                />
                <div className="min-w-0 hidden sm:block">
                  <div className="text-xs text-[var(--color-text-muted)] mb-0.5">上一篇</div>
                  <div className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] truncate">
                    {prevPost.title}
                  </div>
                </div>
                <span className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] sm:hidden">
                  上一篇
                </span>
                {/* Hover preview */}
                <div className="absolute bottom-full left-0 mb-2 p-3 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none max-w-xs z-10">
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">上一篇文章</p>
                  <p className="text-sm font-medium text-[var(--color-text)] line-clamp-2">
                    {prevPost.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {/* Center: Home button with pulse effect */}
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="relative group flex-shrink-0 p-3 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white hover:shadow-xl transition-all duration-300 hover:scale-110"
                aria-label="返回首页"
              >
                <IconHome size={20} className="relative z-10" />
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] animate-ping opacity-20" />
                {/* Tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--color-text)] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  返回首页
                </span>
              </Link>

              {/* Scroll to top button */}
              {showScrollTop && (
                <button
                  onClick={scrollToTop}
                  className="relative group flex-shrink-0 p-3 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300 hover:scale-110 animate-bounce-in"
                  aria-label="返回顶部"
                >
                  <IconArrowUp size={20} />
                  {/* Tooltip */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--color-text)] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    返回顶部
                  </span>
                </button>
              )}
            </div>

            {/* Next Post with hover effect */}
            {nextPost ? (
              <Link
                href={`/posts/${nextPost.id}`}
                className="group relative flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[var(--color-border-light)] transition-all duration-200 min-w-0 flex-1 justify-end hover:scale-105"
              >
                <div className="min-w-0 text-right hidden sm:block">
                  <div className="text-xs text-[var(--color-text-muted)] mb-0.5">下一篇</div>
                  <div className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] truncate">
                    {nextPost.title}
                  </div>
                </div>
                <span className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] sm:hidden">
                  下一篇
                </span>
                <IconChevronRight
                  size={20}
                  className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                />
                {/* Hover preview */}
                <div className="absolute bottom-full right-0 mb-2 p-3 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none max-w-xs z-10">
                  <p className="text-xs text-[var(--color-text-muted)] mb-1">下一篇文章</p>
                  <p className="text-sm font-medium text-[var(--color-text)] line-clamp-2">
                    {nextPost.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </footer>

      {/* Reading progress indicator */}
      <div className="fixed bottom-20 right-4 z-50 hidden lg:flex flex-col items-center gap-2 animate-fade-in">
        <div className="relative w-12 h-12">
          {/* Progress ring */}
          <svg className="w-12 h-12 transform -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="var(--color-border)"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="var(--color-primary)"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - readingProgress / 100)}`}
              className="transition-all duration-300"
            />
          </svg>
          {/* Progress text */}
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[var(--color-text)]">
            {Math.round(readingProgress)}%
          </span>
        </div>
        <span className="text-xs text-[var(--color-text-muted)]">阅读进度</span>
      </div>
    </>
  );
}
