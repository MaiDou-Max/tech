'use client';

import { motion } from 'framer-motion';
import PhysicsDrop from '@/components/ui/PhysicsDrop';
import { IconCode } from '@tabler/icons-react';

export default function RightSidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {/* 技术栈卡片 */}
      <div className="volantis-card overflow-hidden">
        {/* 标题区域 */}
        <div className="px-4 py-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <IconCode size={18} style={{ color: 'var(--color-primary)' }} />
            <h3 className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>
              技术栈演示
            </h3>
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
            点击刷新按钮重置动画
          </p>
        </div>

        {/* PhysicsDrop 容器 */}
        <div className="p-0">
          <PhysicsDrop />
        </div>
      </div>
    </motion.aside>
  );
}
