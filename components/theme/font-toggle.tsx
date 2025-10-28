'use client';

import { useState, useEffect } from 'react';
import { IconTypography, IconCheck } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

type FontType = 'sans' | 'serif' | 'handwriting' | 'pacifico' | 'dancing';

interface FontOption {
  id: FontType;
  name: string;
  displayName: string;
  className: string;
  preview: string;
}

const fontOptions: FontOption[] = [
  {
    id: 'sans',
    name: 'Sans Serif',
    displayName: '无衬线体',
    className: 'font-sans',
    preview: 'Aa',
  },
  {
    id: 'serif',
    name: 'Serif',
    displayName: '衬线体',
    className: 'font-serif',
    preview: 'Aa',
  },
  {
    id: 'handwriting',
    name: 'Handwriting',
    displayName: '手写体',
    className: 'font-handwriting',
    preview: 'Aa',
  },
  {
    id: 'pacifico',
    name: 'Pacifico',
    displayName: '艺术体',
    className: 'font-pacifico',
    preview: 'Aa',
  },
  {
    id: 'dancing',
    name: 'Dancing Script',
    displayName: '优雅体',
    className: 'font-dancing',
    preview: 'Aa',
  },
];

export function FontToggle() {
  const [currentFont, setCurrentFont] = useState<FontType>('sans');
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 从 localStorage 读取保存的字体设置
    const savedFont = localStorage.getItem('font-preference') as FontType;
    if (savedFont) {
      setCurrentFont(savedFont);
      applyFont(savedFont);
    }
  }, []);

  const applyFont = (fontId: FontType) => {
    const fontOption = fontOptions.find(f => f.id === fontId);
    if (fontOption) {
      // 移除所有字体类
      document.documentElement.classList.remove(
        'font-sans',
        'font-serif',
        'font-handwriting',
        'font-pacifico',
        'font-dancing'
      );
      // 添加新字体类
      document.documentElement.classList.add(fontOption.className);
    }
  };

  const handleFontChange = (fontId: FontType) => {
    setCurrentFont(fontId);
    applyFont(fontId);
    localStorage.setItem('font-preference', fontId);
    setIsOpen(false);
  };

  if (!mounted) {
    return <div className="w-10 h-10 rounded-lg bg-[var(--code-inline-bg)]" />;
  }

  const currentFontOption = fontOptions.find(f => f.id === currentFont);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-lg bg-[var(--code-inline-bg)] hover:bg-[var(--color-primary)]/20 transition-all duration-300 flex items-center justify-center group border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:scale-110"
        aria-label="切换字体"
        title={`当前字体: ${currentFontOption?.displayName}`}
      >
        <IconTypography
          size={20}
          className="text-[var(--color-primary)] group-hover:rotate-12 transition-transform duration-300"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* 遮罩层 */}
            <div
              className="fixed inset-0 z-[60] bg-black/10 backdrop-blur-[2px]"
              onClick={() => setIsOpen(false)}
            />

            {/* 字体选择面板 - 使用绝对定位 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 z-[70] w-56 volantis-card p-3 space-y-1"
              style={{
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2), 0 0 0 1px var(--color-border-hover)',
              }}
            >
              {/* 标题 */}
              <div className="px-2 py-1 mb-2">
                <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                  选择字体
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  当前: {currentFontOption?.displayName}
                </p>
              </div>

              {/* 字体选项 */}
              {fontOptions.map((font) => (
                <motion.button
                  key={font.id}
                  onClick={() => handleFontChange(font.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    currentFont === font.id
                      ? 'bg-[var(--color-primary)]/10 border border-[var(--color-primary)]'
                      : 'hover:bg-[var(--color-border)] border border-transparent'
                  }`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    {/* 预览文字 */}
                    <div
                      className={`text-2xl font-bold ${font.className}`}
                      style={{
                        color: currentFont === font.id
                          ? 'var(--color-primary)'
                          : 'var(--color-text-muted)',
                      }}
                    >
                      {font.preview}
                    </div>

                    {/* 字体名称 */}
                    <div className="text-left">
                      <div
                        className="text-sm font-medium"
                        style={{
                          color: currentFont === font.id
                            ? 'var(--color-primary)'
                            : 'var(--color-text)',
                        }}
                      >
                        {font.displayName}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {font.name}
                      </div>
                    </div>
                  </div>

                  {/* 选中标记 */}
                  {currentFont === font.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      <IconCheck size={18} style={{ color: 'var(--color-primary)' }} />
                    </motion.div>
                  )}
                </motion.button>
              ))}

              {/* 提示 */}
              <div className="px-2 py-2 mt-2 border-t border-[var(--color-border)]">
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  字体设置会保存在本地
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

