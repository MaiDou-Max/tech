'use client';

import { useState, useEffect } from 'react';
import { IconTypography, IconCheck } from '@tabler/icons-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

  const handleFontChange = (fontId: string) => {
    const font = fontId as FontType;
    setCurrentFont(font);
    applyFont(font);
    localStorage.setItem('font-preference', font);
  };

  if (!mounted) {
    return <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[var(--code-inline-bg)]" />;
  }

  const currentFontOption = fontOptions.find(f => f.id === currentFont);

  return (
    <Select value={currentFont} onValueChange={handleFontChange}>
      <SelectTrigger
        className="w-8 h-8 sm:w-10 sm:h-10 p-0 rounded-lg bg-[var(--code-inline-bg)] hover:bg-[var(--color-primary)]/20 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-200 group hover:scale-110 focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
        aria-label={`当前字体: ${currentFontOption?.displayName}`}
      >
        <div className="w-full h-full flex items-center justify-center">
          <IconTypography
            size={18}
            className="sm:w-5 sm:h-5 text-[var(--color-primary)] group-hover:rotate-12 transition-transform duration-200"
          />
        </div>
      </SelectTrigger>
      <SelectContent className="volantis-glass border-[var(--color-border-hover)] shadow-2xl rounded-2xl w-64 p-2">
        <div className="px-2 py-2 mb-2">
          <h3 className="text-sm font-bold text-[var(--color-text)] mb-1">选择字体</h3>
          <p className="text-xs text-[var(--color-text-muted)]">
            当前: {currentFontOption?.displayName}
          </p>
        </div>
        {fontOptions.map(font => (
          <SelectItem
            key={font.id}
            value={font.id}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer my-1 ${
              currentFont === font.id
                ? 'bg-[var(--color-primary)]/10 border border-[var(--color-primary)]'
                : 'hover:bg-[var(--color-border)] border border-transparent'
            } focus:bg-[var(--color-border)]`}
          >
            <div className="flex items-center gap-3 flex-1">
              {/* 预览文字 */}
              <div
                className={`text-2xl font-bold ${font.className}`}
                style={{
                  color:
                    currentFont === font.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                }}
              >
                {font.preview}
              </div>

              {/* 字体名称 */}
              <div className="text-left flex-1">
                <div
                  className="text-sm font-medium"
                  style={{
                    color: currentFont === font.id ? 'var(--color-primary)' : 'var(--color-text)',
                  }}
                >
                  {font.displayName}
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">{font.name}</div>
              </div>

              {/* 选中标记 */}
              {currentFont === font.id && (
                <IconCheck size={18} style={{ color: 'var(--color-primary)' }} />
              )}
            </div>
          </SelectItem>
        ))}
        <div className="px-2 py-2 mt-2 border-t border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-text-muted)]">字体设置会保存在本地</p>
        </div>
      </SelectContent>
    </Select>
  );
}
