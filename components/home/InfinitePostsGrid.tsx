'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import NeoCard from '@/components/card/NeoCard';
import { PostMetadata } from '@/lib/posts';

interface InfinitePostsGridProps {
  initialPosts: PostMetadata[];
}

// ReactBits-style animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

const loaderVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.7,
    y: -30,
    transition: {
      duration: 0.25,
    },
  },
};

export default function InfinitePostsGrid({ initialPosts }: InfinitePostsGridProps) {
  const [displayedPosts, setDisplayedPosts] = useState<PostMetadata[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loadedCountRef = useRef(0);
  const POSTS_PER_PAGE = 9;

  // Intersection Observer for infinite scroll
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Initial load
  useEffect(() => {
    const initialLoad = initialPosts.slice(0, POSTS_PER_PAGE);
    setDisplayedPosts(initialLoad);
    loadedCountRef.current = initialLoad.length;
    setHasMore(initialLoad.length < initialPosts.length);
  }, [initialPosts]);

  const loadMorePosts = useCallback(async () => {
    setIsLoading(true);

    // Smooth loading delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const nextPosts = initialPosts.slice(
      loadedCountRef.current,
      loadedCountRef.current + POSTS_PER_PAGE
    );

    if (nextPosts.length > 0) {
      setDisplayedPosts(prev => [...prev, ...nextPosts]);
      loadedCountRef.current += nextPosts.length;
      setHasMore(loadedCountRef.current < initialPosts.length);
    } else {
      setHasMore(false);
    }

    setIsLoading(false);
  }, [initialPosts]);

  // Load more when in view
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMorePosts();
    }
  }, [inView, hasMore, isLoading, loadMorePosts]);

  return (
    <section className="relative mb-20 px-4 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Posts grid with ReactBits-style stagger animation */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {displayedPosts.map((post, index) => (
              <motion.div key={post.id} variants={itemVariants} layout>
                <NeoCard
                  id={post.id}
                  title={post.title}
                  description={post.description}
                  category={post.category}
                  date={post.date}
                  tags={post.tags}
                  index={index}
                  cover={post.cover}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Loading indicator with ReactBits-style animation */}
        {hasMore && (
          <div ref={loadMoreRef} className="flex justify-center items-center py-20">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  variants={loaderVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col items-center gap-6"
                >
                  {/* Spinning gradient ring */}
                  <div className="relative w-20 h-20">
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background:
                          'conic-gradient(from 0deg, var(--color-primary), var(--color-secondary), var(--color-primary))',
                        filter: 'blur(8px)',
                      }}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                    <div
                      className="absolute inset-3 rounded-full"
                      style={{ background: 'var(--color-background)' }}
                    />

                    {/* Pulsing center dot */}
                    <motion.div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-3 h-3 rounded-full"
                        style={{
                          background:
                            'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                        }}
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Loading text with animated dots */}
                  <motion.div className="text-center">
                    <motion.p
                      className="text-sm font-semibold text-[var(--color-text-secondary)] mb-2"
                      animate={{
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      加载中
                    </motion.p>
                    <div className="flex gap-1.5 justify-center">
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: 'var(--color-primary)',
                          }}
                          animate={{
                            y: [-3, -12, -3],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* End message with ReactBits-style entrance */}
        {!hasMore && displayedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 20,
            }}
            className="text-center py-20"
          >
            <motion.div
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[var(--color-card-bg)] border-2 border-[var(--color-border)] backdrop-blur-xl shadow-lg"
              whileHover={{
                scale: 1.05,
                borderColor: 'var(--color-primary)',
                boxShadow: '0 20px 40px rgba(30, 136, 229, 0.2)',
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                },
              }}
            >
              <motion.span
                className="text-3xl"
                animate={{
                  rotate: [0, 15, -15, 15, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: 'easeInOut',
                }}
              >
                ✨
              </motion.span>
              <span className="text-base font-semibold text-[var(--color-text-secondary)]">
                已经到底啦
              </span>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
