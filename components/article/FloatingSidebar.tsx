'use client';

import { useState } from 'react';
import { IconInfoCircle, IconX } from '@tabler/icons-react';
import Link from 'next/link';

interface FloatingSidebarProps {
  postData: any;
  allPosts: any[];
}

export default function FloatingSidebar({ postData, allPosts }: FloatingSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Info button for medium screens */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-24 z-50 xl:hidden w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="打开信息"
      >
        <IconInfoCircle size={20} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] xl:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-[60] xl:hidden transition-transform duration-300 bg-[var(--color-background)] border-l border-[var(--color-border)] shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
            <h2 className="text-lg font-bold text-[var(--color-text)]">文章信息</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg hover:bg-[var(--color-border-light)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-all flex items-center justify-center"
              aria-label="关闭"
            >
              <IconX size={20} />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin space-y-4">
            {/* Author Card */}
            <div className="volantis-card p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  钟
                </div>
                <div>
                  <div className="font-bold text-[var(--color-text)]">钟宝</div>
                  <div className="text-xs text-[var(--color-text-muted)]">前端开发者</div>
                </div>
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-3">
                专注于前端技术，分享实用经验
              </p>
              <Link
                href="/about"
                className="block text-center px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-sm font-medium hover:shadow-lg transition-all"
              >
                了解更多
              </Link>
            </div>

            {/* Tags */}
            {postData.tags && postData.tags.length > 0 && (
              <div className="volantis-card p-4">
                <h3 className="text-sm font-bold text-[var(--color-text)] mb-3">文章标签</h3>
                <div className="flex flex-wrap gap-2">
                  {postData.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/tags`}
                      className="px-3 py-1.5 text-xs rounded-lg bg-[var(--color-border-light)] text-[var(--color-text-muted)] hover:bg-[var(--color-primary)] hover:text-white transition-all"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            <div className="volantis-card p-4">
              <h3 className="text-sm font-bold text-[var(--color-text)] mb-3">相关文章</h3>
              <div className="space-y-2">
                {allPosts.slice(0, 3).map(post => (
                  <Link
                    key={post.id}
                    href={`/posts/${post.id}`}
                    className="block p-2 rounded-lg hover:bg-[var(--color-border-light)] transition-all group"
                  >
                    <div className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] line-clamp-2 mb-1">
                      {post.title}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {new Date(post.date).toLocaleDateString('zh-CN', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
