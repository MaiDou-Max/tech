// Archive hero section displaying title and intro.
import React from 'react';

export default function ArchiveHero() {
  return (
    <div className="px-6 pt-12 pb-10 md:pt-16 md:pb-14">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
          文章归档
        </h1>
        <p className="text-sm md:text-base text-[var(--color-text-muted)] leading-relaxed">
          按年份和月份浏览所有已发布的文章。使用左侧导航或筛选功能快速定位你感兴趣的内容。
        </p>
      </div>
    </div>
  );
}
