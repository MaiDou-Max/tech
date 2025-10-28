'use client';

import { motion } from 'framer-motion';
import { IconSparkles, IconRocket, IconCode } from '@tabler/icons-react';
import Link from 'next/link';

export default function HeroSectionNew() {
  return (
    <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden py-16 mb-12">
      {/* 动态背景粒子 */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: i % 2 === 0 ? 'var(--color-primary)' : 'var(--color-secondary)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* 主内容 */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* 浮动图标 */}
        <motion.div
          className="flex justify-center gap-6 mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <IconCode size={40} style={{ color: 'var(--color-primary)' }} strokeWidth={1.5} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
          >
            <IconSparkles size={40} style={{ color: 'var(--color-secondary)' }} strokeWidth={1.5} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: 1, ease: "easeInOut" }}
          >
            <IconRocket size={40} style={{ color: 'var(--color-primary-light)' }} strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* 标题 */}
        <motion.h1
          className="text-5xl md:text-7xl font-black mb-6 gradient-text font-dancing"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          嗨，我是 zhongbao.su
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          一名热爱代码的前端开发者，专注于构建优雅的用户体验
          <br />
          在这里分享关于前端开发、技术思考和编程经验
        </motion.p>

        {/* 按钮组 */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="#posts">
            <motion.button
              className="glow-button flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconRocket size={20} />
              <span>浏览文章</span>
            </motion.button>
          </Link>

          <Link href="/about">
            <motion.button
              className="px-6 py-3 rounded-xl border-2 font-semibold transition-all"
              style={{
                borderColor: 'var(--color-primary)',
                color: 'var(--color-primary)',
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              关于我
            </motion.button>
          </Link>
        </motion.div>

        {/* 滚动提示 */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div
            className="w-6 h-10 border-2 rounded-full flex justify-center p-2"
            style={{ borderColor: 'var(--color-primary)' }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--gradient-main)' }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

