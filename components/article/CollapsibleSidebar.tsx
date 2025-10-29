'use client';

import { useState } from 'react';
import { IconLayoutSidebarRightCollapse } from '@tabler/icons-react';
import Link from 'next/link';

interface CollapsibleSidebarProps {
  postData: any;
  allPosts: any[];
}

export default function CollapsibleSidebar({ postData, allPosts }: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="w-full p-3 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 flex flex-col items-center gap-2"
        aria-label="展开侧边栏"
      >
        <IconLayoutSidebarRightCollapse size={20} className="rotate-180" />
        <span className="text-xs font-medium">信息</span>
      </button>
    );
  }

  return (
    <div className="animate-fade-in space-y-4">
      {/* Author Card */}
      <div className="volantis-card p-4 hover:shadow-lg transition-shadow duration-300">
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
          className="block text-center px-4 py-2 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-sm font-medium hover:shadow-lg transition-all duration-200"
        >
          了解更多
        </Link>
      </div>

      {/* Tags */}
      {postData.tags && postData.tags.length > 0 && (
        <div className="volantis-card p-4 hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-sm font-bold text-[var(--color-text)] mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full" />
            文章标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {postData.tags.map((tag: string) => (
              <Link
                key={tag}
                href={`/tags`}
                className="px-3 py-1.5 text-xs rounded-lg bg-[var(--color-border-light)] text-[var(--color-text-muted)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Posts */}
      <div className="volantis-card p-4 hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-sm font-bold text-[var(--color-text)] mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full" />
          相关文章
        </h3>
        <div className="space-y-2">
          {allPosts.slice(0, 3).map((post, index) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block p-2 rounded-lg hover:bg-[var(--color-border-light)] transition-all duration-200 group"
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

      {/* Collapse Button */}
      <button
        onClick={() => setIsCollapsed(true)}
        className="w-full p-2 rounded-lg hover:bg-[var(--color-border-light)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-all text-sm flex items-center justify-center gap-2"
        aria-label="收起"
      >
        <IconLayoutSidebarRightCollapse size={16} />
        <span>收起</span>
      </button>
    </div>
  );
}
