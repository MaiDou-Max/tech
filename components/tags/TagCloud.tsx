'use client';

import Link from 'next/link';
import { IconTag } from '@tabler/icons-react';
import { motion } from 'framer-motion';

interface TagCloudProps {
  tags: string[];
}

const TAG_SIZES = ['text-base', 'text-lg', 'text-sm', 'text-xl', 'text-base', 'text-lg'];

export default function TagCloud({ tags }: TagCloudProps) {
  return (
    <div className="relative flex flex-wrap justify-center gap-3">
      {tags.map((tag, index) => {
        const sizeClass = TAG_SIZES[index % TAG_SIZES.length];
        const isBlue = index % 2 === 0;
        const gradient = isBlue
          ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))'
          : 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))';

        return (
          <motion.div
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
          >
            <Link
              href={`/tags/${tag}`}
              className={`group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${sizeClass}`}
              style={{
                background: 'var(--color-card-bg)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: gradient }}
              />

              {/* Icon */}
              <div
                className="relative w-5 h-5 rounded-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: gradient,
                }}
              >
                <IconTag size={12} className="text-white" />
              </div>

              {/* Text */}
              <span className="relative group-hover:text-white transition-colors duration-300 z-10">
                {tag}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
