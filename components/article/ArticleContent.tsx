import { MDXRemote } from 'next-mdx-remote/rsc';
import { IconCalendar, IconClock, IconEye, IconMessage } from '@tabler/icons-react';

interface ArticleContentProps {
  postData: any;
  options: any;
}

export default function ArticleContent({ postData, options }: ArticleContentProps) {
  return (
    <article className="volantis-card p-6 sm:p-8 md:p-10 lg:p-12 animate-scale-in">
      {/* Article Header */}
      <header className="mb-10 pb-8 border-b border-[var(--color-border)]">
        {/* Category badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-sm font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
          {postData.category}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight break-words">
          {postData.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--code-inline-bg)]">
            <IconCalendar size={18} />
            <time dateTime={postData.date}>
              {new Date(postData.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--code-inline-bg)]">
            <IconClock size={18} />
            <span>5 分钟阅读</span>
          </div>

          <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--code-inline-bg)]">
            <IconEye size={18} />
            <span>1.2k 阅读</span>
          </div>

          <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--code-inline-bg)]">
            <IconMessage size={18} />
            <span>12 评论</span>
          </div>
        </div>

        {/* Description */}
        {postData.description && (
          <p className="mt-6 text-lg text-[var(--color-text-muted)] leading-relaxed p-4 bg-[var(--color-border-light)] rounded-xl border-l-4 border-[var(--color-primary)]">
            {postData.description}
          </p>
        )}
      </header>

      {/* Article Content - Full width, better code display */}
      <div className="prose prose-base sm:prose-lg max-w-none mb-10 prose-pre:max-w-full prose-pre:overflow-x-auto prose-code:break-words prose-p:break-words">
        <MDXRemote source={postData.content} options={options} />
      </div>

      {/* Article Footer */}
      <footer className="pt-8 border-t border-[var(--color-border)] space-y-6">
        {/* Share */}
        <div>
          <h3 className="text-sm font-bold text-[var(--color-text)] mb-3">分享文章</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { name: 'Twitter', color: 'from-blue-400 to-blue-600' },
              { name: 'Facebook', color: 'from-blue-600 to-blue-800' },
              { name: 'LinkedIn', color: 'from-blue-700 to-blue-900' },
              { name: '微信', color: 'from-green-500 to-green-700' },
              { name: '微博', color: 'from-orange-500 to-red-600' },
            ].map(platform => (
              <button
                key={platform.name}
                className={`px-4 py-2 rounded-lg bg-gradient-to-r ${platform.color} text-white text-sm font-medium hover:shadow-lg transition-all duration-200 hover:scale-105`}
              >
                {platform.name}
              </button>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="p-4 rounded-xl bg-[var(--color-border-light)] border-l-4 border-[var(--color-primary)]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white font-bold flex-shrink-0">
              ©
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-[var(--color-text)] mb-1">版权声明</div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                本文由 <span className="font-medium text-[var(--color-primary)]">钟宝</span>{' '}
                原创，转载请注明出处。文章采用{' '}
                <a
                  href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-primary)] hover:underline"
                >
                  CC BY-NC-SA 4.0
                </a>{' '}
                许可协议。
              </p>
            </div>
          </div>
        </div>
      </footer>
    </article>
  );
}
