'use client';

import Link from 'next/link';
import { IconTag } from '@tabler/icons-react';

interface TagCloudProps {
  tags: string[];
  colors: string[];
}

const TAG_SIZES = ['text-base', 'text-lg', 'text-sm', 'text-xl', 'text-base', 'text-lg'];

export default function TagCloud({ tags, colors }: TagCloudProps) {
  return (
    <div className="relative flex flex-wrap justify-center gap-3 md:gap-4">
      {tags.map((tag, index) => {
        const gradientClass = colors[index % colors.length];
        const sizeClass = TAG_SIZES[index % TAG_SIZES.length];

        return (
          <Link
            href={`/tags/${tag}`}
            key={tag}
            className={`group relative inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-br from-[var(--code-inline-bg)] to-[var(--color-card-bg)] border-2 border-[var(--color-border)] hover:border-transparent text-[var(--color-text)] font-semibold transition-all duration-300 hover:scale-110 hover:shadow-2xl overflow-hidden animate-scale-in ${sizeClass}`}
            style={{
              animationDelay: `${index * 0.05}s`,
            }}
          >
            {/* Gradient overlay on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${gradientClass} opacity-0 group-hover:opacity-100 transition-all duration-300`}
            />

            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            {/* Icon */}
            <div
              className={`relative w-6 h-6 rounded-lg bg-gradient-to-br ${gradientClass} flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}
            >
              <IconTag size={14} className="text-white" />
            </div>

            {/* Text */}
            <span className="relative group-hover:text-white transition-colors duration-300 z-10">
              {tag}
            </span>

            {/* Particle effect on hover */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white opacity-0 group-hover:opacity-100 group-hover:animate-ping"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
