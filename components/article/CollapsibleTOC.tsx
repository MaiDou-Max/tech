'use client';

import { useState } from 'react';
import { IconLayoutSidebarLeftCollapse } from '@tabler/icons-react';
import ArticleTOC from './ArticleTOC';

export default function CollapsibleTOC() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="w-full p-3 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200 flex flex-col items-center gap-2"
        aria-label="展开目录"
      >
        <IconLayoutSidebarLeftCollapse size={20} className="rotate-180" />
        <span className="text-xs font-medium">目录</span>
      </button>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-[var(--color-text)]">目录</h2>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1.5 rounded-lg hover:bg-[var(--color-border-light)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-all"
          aria-label="收起"
        >
          <IconLayoutSidebarLeftCollapse size={16} />
        </button>
      </div>
      <ArticleTOC />
    </div>
  );
}
