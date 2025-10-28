'use client';

import { IconBrandGithub, IconMail, IconRss, IconHeart } from '@tabler/icons-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 mb-6 animate-fade-in">
      <div className="volantis-card mx-2 md:mx-0">
        <div className="p-8">
          {/* Top section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6 pb-6 border-b border-[var(--color-border)]">
            {/* Logo & Description */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">宝</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-[var(--color-text)]">zhongbao.su的博客</span>
                  <span className="text-xs text-[var(--color-text-muted)]">分享技术，记录成长</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[var(--color-border-light)] hover:bg-[var(--color-primary)] text-[var(--color-text-muted)] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="GitHub"
              >
                <IconBrandGithub size={20} />
              </a>
              <a
                href="mailto:your@email.com"
                className="w-10 h-10 rounded-xl bg-[var(--color-border-light)] hover:bg-[var(--color-primary)] text-[var(--color-text-muted)] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Email"
              >
                <IconMail size={20} />
              </a>
              <a
                href="/api/posts"
                className="w-10 h-10 rounded-xl bg-[var(--color-border-light)] hover:bg-[var(--color-primary)] text-[var(--color-text-muted)] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="RSS"
              >
                <IconRss size={20} />
              </a>
            </div>
          </div>

          {/* Bottom section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
              <span>© {currentYear} zhongbao.su的博客</span>
              <span className="hidden md:inline">·</span>
              <span className="flex items-center gap-1">
                用 <IconHeart size={14} className="text-red-500 animate-pulse-glow" /> 制作
              </span>
            </div>

            <div className="flex items-center gap-4 text-[var(--color-text-muted)]">
              <a href="/" className="hover:text-[var(--color-primary)] transition-colors">
                首页
              </a>
              <a href="/about" className="hover:text-[var(--color-primary)] transition-colors">
                关于
              </a>
              <a href="/archive" className="hover:text-[var(--color-primary)] transition-colors">
                归档
              </a>
            </div>
          </div>

          {/* Optional: Stats or badge */}
          <div className="mt-6 pt-6 border-t border-[var(--color-border)] flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-border-light)] text-xs text-[var(--color-text-muted)]">
              <div className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
              <span>网站运行正常</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
