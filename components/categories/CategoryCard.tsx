'use client';

import Link from 'next/link';
import { IconFolder, IconChevronRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  category: string;
  gradientClass: string;
  index: number;
}

export default function CategoryCard({ category, gradientClass, index }: CategoryCardProps) {
  const getGradient = () => {
    if (index % 2 === 0) {
      return 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))';
    }
    return 'linear-gradient(135deg, var(--color-secondary), var(--color-primary))';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/categories/${category}`}
        className="volantis-card group relative overflow-hidden p-6 block transition-all duration-300"
      >
        {/* 装饰性背景 */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          style={{ background: getGradient() }}
        />

        {/* 内容 */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* 图标 */}
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: getGradient(),
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <IconFolder size={24} className="text-white" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                {category}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                查看所有文章
              </p>
            </div>
          </div>

          {/* 箭头 */}
          <motion.div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              background: 'var(--color-border)',
              color: 'var(--color-text-muted)',
            }}
            whileHover={{
              background: getGradient(),
              x: 4,
            }}
            transition={{ duration: 0.2 }}
          >
            <IconChevronRight size={18} className="group-hover:text-white transition-colors" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
