'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { IconArrowLeft, IconShare2, IconBookmark, IconHeart, IconCheck } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

interface ArticleHeaderProps {
  title: string;
}

export default function ArticleHeader({ title }: ArticleHeaderProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    showToastMessage(isLiked ? '已取消点赞' : '感谢点赞！');
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    showToastMessage(isBookmarked ? '已取消收藏' : '已收藏文章');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
        showToastMessage('分享成功');
      } catch (err) {
        console.log('分享取消');
      }
    } else {
      // 复制链接
      navigator.clipboard.writeText(window.location.href);
      showToastMessage('链接已复制');
    }
  };

  return (
    <>
      <header className="relative backdrop-blur-md bg-gradient-to-r from-[var(--color-card-bg)]/95 via-[var(--color-primary)]/5 to-[var(--color-card-bg)]/95">
        {/* 底部渐变边框 */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-60" />

        {/* 装饰性背景光晕 */}
        <div className="absolute top-0 left-1/4 w-32 h-full bg-gradient-to-r from-[var(--color-primary)]/10 to-transparent blur-2xl opacity-30" />
        <div className="absolute top-0 right-1/4 w-32 h-full bg-gradient-to-l from-[var(--color-secondary)]/10 to-transparent blur-2xl opacity-30" />

        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back button with tooltip */}
            <Link
              href="/"
              className="group relative flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-[var(--color-border-light)] transition-all duration-200 hover:scale-105"
            >
              <IconArrowLeft
                size={20}
                className="text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] group-hover:-translate-x-1 transition-all duration-200"
              />
              <span className="font-medium text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] hidden sm:inline">
                返回
              </span>
              {/* Tooltip */}
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--color-text)] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                返回首页
              </span>
            </Link>

            {/* Center: Title with gradient */}
            <div className="hidden md:block flex-1 px-6">
              <h1 className="text-sm font-semibold bg-gradient-to-r from-[var(--color-text)] to-[var(--color-text-muted)] bg-clip-text text-transparent truncate text-center">
                {title}
              </h1>
            </div>

            {/* Right: Actions with animations */}
            <div className="flex items-center gap-2">
              {/* Like button with counter */}
              <button
                onClick={handleLike}
                className={`relative group flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isLiked
                    ? 'bg-red-500/10 text-red-500 scale-110'
                    : 'hover:bg-[var(--color-border-light)] text-[var(--color-text-muted)] hover:scale-105'
                }`}
                aria-label="点赞"
              >
                <IconHeart
                  size={20}
                  fill={isLiked ? 'currentColor' : 'none'}
                  className={`transition-all duration-300 ${isLiked ? 'animate-bounce-in' : ''}`}
                />
                <span className="text-xs font-medium hidden sm:inline">{likeCount}</span>
                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--color-text)] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {isLiked ? '取消点赞' : '点赞文章'}
                </span>
              </button>

              {/* Bookmark button */}
              <button
                onClick={handleBookmark}
                className={`relative group p-2 rounded-xl transition-all duration-300 ${
                  isBookmarked
                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] scale-110'
                    : 'hover:bg-[var(--color-border-light)] text-[var(--color-text-muted)] hover:scale-105'
                }`}
                aria-label="收藏"
              >
                <IconBookmark
                  size={20}
                  fill={isBookmarked ? 'currentColor' : 'none'}
                  className={`transition-all duration-300 ${isBookmarked ? 'animate-bounce-in' : ''}`}
                />
                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--color-text)] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {isBookmarked ? '取消收藏' : '收藏文章'}
                </span>
              </button>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="relative group p-2 rounded-xl hover:bg-[var(--color-border-light)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-all duration-200 hover:scale-105 hover:rotate-12"
                aria-label="分享"
              >
                <IconShare2 size={20} />
                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--color-text)] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  分享文章
                </span>
              </button>

              {/* Theme toggle */}
              <div className="ml-2 pl-2 border-l border-[var(--color-border)]">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-slide-down">
          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-text)] text-white rounded-lg shadow-lg">
            <IconCheck size={18} />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}
