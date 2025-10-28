'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IconSparkles, IconCode, IconRocket, IconTrendingUp } from '@tabler/icons-react';
import type { PostMetadata } from '@/lib/posts';

export default function NeoSlider() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostMetadata[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data.slice(0, 4)));

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: IconCode, label: '文章', value: posts.length, color: 'var(--color-primary)' },
    { icon: IconSparkles, label: '分类', value: 12, color: 'var(--color-secondary)' },
    { icon: IconRocket, label: '标签', value: 24, color: 'var(--color-primary-light)' },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      {/* 个人卡片 */}
      <div className="volantis-card p-5 text-center">
        {/* 头像 */}
        <motion.div
          className="relative w-16 h-16 mx-auto mb-3"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="absolute inset-0 rounded-full opacity-60 blur-md"
            style={{ background: 'var(--gradient-main)' }}
          />
          <img
            src="https://github.com/shadcn.png"
            alt="Avatar"
            className="relative w-full h-full rounded-full object-cover border-4"
            style={{ borderColor: 'var(--color-border)' }}
          />
          <motion.div
            className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-3"
            style={{
              background: 'var(--color-success)',
              borderColor: 'var(--color-card-bg)'
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* 动态文字 */}
        <h3 className="text-base font-bold gradient-text mb-1 font-pacifico">
          Frontend Developer
        </h3>

        <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>
          探索代码之美 🚀
        </p>

        {/* 统计 */}
        <div className="grid grid-cols-3 gap-2">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center p-2 rounded-lg"
                style={{
                  background: 'var(--color-border)',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{
                  y: -2,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <Icon
                  size={16}
                  className="mx-auto mb-1"
                  style={{ color: stat.color }}
                />
                <div className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 实时时钟 */}
      <div className="volantis-card p-3">
        <div className="text-center">
          <div className="text-xl font-bold gradient-text mb-0.5">
            {currentTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {currentTime.toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>

      {/* 最新文章 */}
      <div className="volantis-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <IconTrendingUp size={16} style={{ color: 'var(--color-secondary)' }} />
          <h3 className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>热门文章</h3>
        </div>

        <div className="space-y-1.5">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.06 }}
              className="group cursor-pointer p-2 rounded-lg transition-all"
              style={{
                border: '1px solid transparent',
              }}
              onClick={() => router.push(`/posts/${post.id}`)}
              whileHover={{
                x: 4,
                backgroundColor: 'var(--color-border)',
                borderColor: 'var(--color-border-hover)',
              }}
            >
              <div className="flex items-start gap-2">
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-xs"
                  style={{ background: 'var(--gradient-main)' }}
                >
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className="text-xs font-medium line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors leading-snug"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {post.title}
                  </h4>
                  <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
                    {new Date(post.date).toLocaleDateString('zh-CN', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}

