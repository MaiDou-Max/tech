'use client';

import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { IconCalendar, IconClock, IconArrowRight } from '@tabler/icons-react';
import { useState } from 'react';

interface CardProps {
  id: string;
  title: string;
  description?: string;
  category: string;
  date: string;
  tags?: string[];
  index?: number;
  cover?: string;
}

// ReactBits-style animation variants
const cardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      mass: 0.8,
    },
  },
  hover: {
    scale: 1.03,
    y: -8,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

const contentVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const childVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
    },
  },
};

export default function NeoCard({
  id,
  title,
  description,
  category,
  date,
  tags,
  cover,
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 200,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      className="group h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
      }}
    >
      <Link href={`/posts/${id}`} className="block h-full">
        <motion.div
          className="neo-card p-6 h-full cursor-pointer relative overflow-hidden"
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
          }}
        >
          {/* Gradient glow on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(30, 136, 229, 0.15), transparent 70%)',
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
          />

          <motion.div
            className="relative z-10 flex flex-col h-full"
            variants={contentVariants}
            initial="initial"
            animate="animate"
          >
            {/* Cover Image */}
            {cover && (
              <motion.div
                variants={childVariants}
                className="relative w-full h-48 mb-4 rounded-xl overflow-hidden"
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                }}
              >
                <Image
                  src={cover}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            )}

            {/* Category badge */}
            <motion.div variants={childVariants} className="flex items-center justify-between mb-4">
              <motion.span
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold"
                style={{
                  background: 'var(--gradient-soft)',
                  border: '1px solid var(--color-border-hover)',
                  color: 'var(--color-primary)',
                }}
                whileHover={{
                  scale: 1.08,
                  borderColor: 'var(--color-primary)',
                  boxShadow: '0 4px 12px rgba(30, 136, 229, 0.2)',
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 20,
                  },
                }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
                  animate={{
                    scale: isHovered ? [1, 1.4, 1] : 1,
                    rotate: isHovered ? [0, 180, 360] : 0,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                />
                {category}
              </motion.span>
            </motion.div>

            {/* Title */}
            <motion.h3
              variants={childVariants}
              className="text-xl font-bold mb-3 leading-snug line-clamp-2 text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300"
            >
              {title}
            </motion.h3>

            {/* Description */}
            {description && (
              <motion.p
                variants={childVariants}
                className="text-[var(--color-text-muted)] text-sm mb-4 line-clamp-2 leading-relaxed flex-1"
              >
                {description}
              </motion.p>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <motion.div variants={childVariants} className="flex flex-wrap gap-2 mb-4">
                {tags.slice(0, 3).map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg"
                    style={{
                      background: 'var(--color-border)',
                      color: 'var(--color-text-secondary)',
                    }}
                    whileHover={{
                      scale: 1.15,
                      backgroundColor: 'var(--color-border-hover)',
                      color: 'var(--color-primary)',
                      transition: {
                        type: 'spring',
                        stiffness: 400,
                        damping: 20,
                      },
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.3 + i * 0.05,
                      type: 'spring',
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    #{tag}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* Footer */}
            <motion.div
              variants={childVariants}
              className="flex items-center justify-between pt-4 mt-auto border-t border-[var(--color-border)]"
            >
              <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                <motion.span
                  className="flex items-center gap-1.5"
                  whileHover={{
                    scale: 1.08,
                    color: 'var(--color-primary)',
                    transition: { type: 'spring', stiffness: 400 },
                  }}
                >
                  <IconCalendar size={14} className="text-[var(--color-primary)]" />
                  {new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                </motion.span>
                <motion.span
                  className="flex items-center gap-1.5"
                  whileHover={{
                    scale: 1.08,
                    color: 'var(--color-secondary)',
                    transition: { type: 'spring', stiffness: 400 },
                  }}
                >
                  <IconClock size={14} className="text-[var(--color-secondary)]" />5 分钟
                </motion.span>
              </div>

              {/* Read more with arrow animation */}
              <motion.div
                className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)]"
                animate={{
                  x: isHovered ? 4 : 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <span>阅读</span>
                <motion.div
                  animate={{
                    x: isHovered ? [0, 6, 0] : 0,
                  }}
                  transition={{
                    duration: 1,
                    repeat: isHovered ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                >
                  <IconArrowRight size={16} strokeWidth={2.5} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Link>
    </motion.article>
  );
}
