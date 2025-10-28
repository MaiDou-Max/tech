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
    {
      icon: IconArticle,
      label: '文章总数',
      value: totalPosts,
      suffix: '篇',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: IconEye,
      label: '总阅读量',
      value: 12500,
      suffix: '+',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: IconHeart,
      label: '获得点赞',
      value: 3200,
      suffix: '+',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: IconClock,
      label: '持续更新',
      value: 365,
      suffix: '天',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 overflow-hidden">
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group relative text-center animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-2">
                <div className="relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity`}
                  />
                  <div
                    className={`relative w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Value */}
              <div className="text-xl font-bold text-[var(--color-text)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                {mounted ? (
                  <span className="tabular-nums">
                    {stat.value}
                    <span className="text-xs text-[var(--color-text-muted)]">{stat.suffix}</span>
                  </span>
                ) : (
                  <span>--</span>
                )}
              </div>

              {/* Label */}
              <div className="text-xs text-[var(--color-text-muted)]">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
