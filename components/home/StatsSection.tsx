'use client';

import { IconArticle, IconEye, IconHeart, IconClock } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

interface StatsSectionProps {
  totalPosts: number;
}

export default function StatsSection({ totalPosts }: StatsSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { icon: IconArticle, label: '文章总数', value: totalPosts, suffix: '篇' },
    { icon: IconEye, label: '总阅读量', value: 12500, suffix: '+' },
    { icon: IconHeart, label: '获得点赞', value: 3200, suffix: '+' },
    { icon: IconClock, label: '持续更新', value: 365, suffix: '天' },
  ];

  return (
    <section className="px-6 mb-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-primary)] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} className="text-white" />
                  </div>

                  <div className="text-3xl font-bold text-[var(--color-text)] mb-1">
                    {mounted ? (
                      <span className="tabular-nums">
                        {stat.value}
                        <span className="text-[var(--color-primary)]">{stat.suffix}</span>
                      </span>
                    ) : (
                      <span>--</span>
                    )}
                  </div>

                  <div className="text-sm text-[var(--color-text-muted)]">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

