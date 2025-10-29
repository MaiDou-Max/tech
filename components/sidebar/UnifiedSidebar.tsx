'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { IconSparkles, IconTrendingUp } from '@tabler/icons-react';
import { PostMetadata } from '@lib/posts';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface UnifiedSidebarProps {
  className?: string;
  variant?: 'desktop' | 'mobile';
}

export default function UnifiedSidebar({ className = '', variant = 'desktop' }: UnifiedSidebarProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<PostMetadata[]>([]);

  function goHome() {
    router.push('/');
  }

  function goDetail(data: PostMetadata) {
    router.push(`/posts/${data.id}`);
  }

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const data = useMemo(() => {
    return posts.slice(0, 10);
  }, [posts]);

  return (
    <aside className={`h-full rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative volantis-glass ${className}`}>
      {/* Animated background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 via-transparent to-[var(--color-secondary)]/5" />

      <div className="relative h-full flex flex-col p-6 overflow-hidden">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8 animate-slide-down">
          <div className="relative mb-4 group/avatar">
            {/* Rotating border */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] animate-spin-slow opacity-50"
              style={{ animationDuration: '3s' }}
            />

            <Avatar
              className="relative cursor-pointer w-20 h-20 ring-4 ring-[var(--color-card-bg)] hover:scale-110 transition-all duration-300"
              onClick={goHome}
            >
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-bold">
                宝
              </AvatarFallback>
            </Avatar>

            {/* Status indicator */}
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[var(--color-card-bg)] animate-pulse" />
          </div>

          <p className="text-sm text-[var(--color-text-muted)] text-center mb-4">🚀 探索代码之美</p>

          {/* Stats */}
          <div className="flex gap-4 w-full justify-center">
            <div className="text-center">
              <div className="text-xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                {posts.length}
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">文章</div>
            </div>
            <div className="w-px bg-[var(--color-border)]" />
            <div className="text-center">
              <div className="text-xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                12
              </div>
              <div className="text-xs text-[var(--color-text-muted)]">分类</div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mb-6 animate-slide-up animation-delay-200">
          <div className="relative bg-gradient-to-br from-[var(--code-inline-bg)] to-[var(--color-card-bg)] rounded-3xl p-4 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group/welcome border border-[var(--color-border)]">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent rounded-bl-full" />

            <div className="relative flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
                <IconSparkles size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-semibold text-[var(--color-primary)] mb-1">
                  欢迎访问
                </div>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  寒月悲笳，万里西风瀚海沙。喜欢的话欢迎交流～
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="flex-grow overflow-y-auto scrollbar-width-none animate-slide-up animation-delay-400">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconTrendingUp size={18} className="text-[var(--color-primary)]" />
              <h4 className="text-xs font-bold text-[var(--color-text)] uppercase tracking-wider">
                最近更新
              </h4>
            </div>
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
          </div>

          <div className="space-y-1">
            {data.map((post, index) => (
              <div
                className="group/item relative bg-[var(--color-card-bg)] hover:bg-gradient-to-r hover:from-[var(--color-primary)]/5 hover:to-[var(--color-secondary)]/5 cursor-pointer transition-all duration-300 flex items-center gap-3 py-3 px-3 rounded-xl hover:shadow-lg border border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
                key={post.id}
                onClick={() => goDetail(post)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Number badge */}
                <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-[var(--code-inline-bg)] flex items-center justify-center text-[10px] font-bold text-[var(--color-primary)] group-hover/item:scale-110 transition-transform">
                  {index + 1}
                </div>

                {/* Post title */}
                <span className="flex-1 text-sm text-[var(--color-text)] overflow-hidden text-ellipsis whitespace-nowrap group-hover/item:text-[var(--color-primary)] transition-colors font-medium">
                  {post.title}
                </span>

                {/* Arrow indicator */}
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all duration-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-4 pt-4">
          <div className="flex items-center justify-center gap-2 text-xs text-[var(--color-text-muted)]">
            <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
            <span>持续更新中</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

