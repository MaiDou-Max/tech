'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconCalendar, IconClock, IconArrowRight } from '@tabler/icons-react';

interface CardProps {
  id: string;
  title: string;
  description?: string;
  category: string;
  date: string;
  tags?: string[];
  index?: number;
}

export default function NeoCard({
  id,
  title,
  description,
  category,
  date,
  tags,
  index = 0,
}: CardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      className="group"
    >
      <Link href={`/posts/${id}`}>
        <div className="neo-card p-6 h-full cursor-pointer">
          <div className="relative z-10 flex flex-col h-full">
            {/* 分类标签 */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
                style={{
                  background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(244, 114, 182, 0.15))',
                  border: '1px solid rgba(14, 165, 233, 0.2)',
                  color: 'var(--color-primary)',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]" />
                {category}
              </span>
            </div>

            {/* 标题 */}
            <h3 className="text-xl font-bold mb-3 leading-snug line-clamp-2 text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
              {title}
            </h3>

            {/* 描述 */}
            {description && (
              <p className="text-[var(--color-text-muted)] text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
                {description}
              </p>
            )}

            {/* 标签 */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs rounded-md"
                    style={{
                      background: 'var(--color-border)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* 底部信息 */}
            <div className="flex items-center justify-between pt-4 mt-auto border-t border-[var(--color-border)]">
              <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1">
                  <IconCalendar size={14} className="text-[var(--color-primary)]" />
                  {new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                </span>
                <span className="flex items-center gap-1">
                  <IconClock size={14} className="text-[var(--color-secondary)]" />
                  5 分钟
                </span>
              </div>

              {/* 阅读更多 */}
              <motion.div
                className="flex items-center gap-1 text-xs font-medium text-[var(--color-primary)]"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span>阅读</span>
                <IconArrowRight size={16} />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

