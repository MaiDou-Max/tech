import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPostIds, getPostData } from '@/lib/posts';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import ReadingProgress from '@/components/ReadingProgress';
import { IconArrowLeft, IconCalendar, IconClock, IconShare, IconBookmark } from '@tabler/icons-react';
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypePrettyCode from "rehype-pretty-code";

export async function generateStaticParams() {
  return getAllPostIds();
}

export default async function Post({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);

  const options = {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkFrontmatter],
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: {
              dark: 'github-dark',
              light: 'github-light',
            },
            keepBackground: false,
          },
        ] as any,
      ],
    },
  };


  return (
    <div className="min-h-screen bg-[var(--color-background)] relative">
      <ReadingProgress />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation Header */}
        <header className="flex justify-between items-center mb-12 animate-slide-down">
          <Link 
            href="/" 
            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <IconArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium">返回首页</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-200">
              <IconShare size={20} />
            </button>
            <button className="p-2 rounded-xl bg-[var(--color-card-bg)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all duration-200">
              <IconBookmark size={20} />
            </button>
            <ThemeToggle />
          </div>
        </header>

        {/* Article */}
        <main>
          <article className="relative bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
            {/* Decorative gradient header */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-primary)] animate-gradient-shift" />
            
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)] opacity-5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-secondary)] opacity-5 rounded-full blur-3xl" />
            
            <div className="relative p-8 md:p-12">
              {/* Article Header */}
              <header className="mb-10 pb-8 border-b border-[var(--color-border)]">
                {/* Category badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 border border-[var(--color-primary)]/20 text-[var(--color-primary)] text-sm font-semibold mb-6">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse" />
                  {postData.category}
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-[var(--color-text)] mb-6 leading-tight bg-gradient-to-r from-[var(--color-text)] to-[var(--color-text)]/70 bg-clip-text">
                  {postData.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--code-inline-bg)]">
                    <IconCalendar size={18} />
                    <time dateTime={postData.date}>
                      {new Date(postData.date).toLocaleDateString('zh-CN', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </time>
                  </div>
                  
                  <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
                  
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--code-inline-bg)]">
                    <IconClock size={18} />
                    <span>5 分钟阅读</span>
                  </div>
                  
                  <span className="w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white text-xs font-bold">
                      钟
                    </div>
                    <span className="font-medium text-[var(--color-text)]">钟宝</span>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <MDXRemote source={postData.content} options={options as any} />
              </div>
              
              {/* Article Footer */}
              <footer className="mt-12 pt-8 border-t border-[var(--color-border)]">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-[var(--color-text-muted)]">分享到:</span>
                    <div className="flex gap-2">
                      {['Twitter', 'Facebook', 'LinkedIn'].map((platform) => (
                        <button
                          key={platform}
                          className="px-4 py-2 rounded-lg bg-[var(--code-inline-bg)] hover:bg-[var(--color-primary)] hover:text-white text-sm font-medium transition-all duration-200"
                        >
                          {platform}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </article>

          {/* Navigation to other posts */}
          <div className="mt-12 flex justify-center gap-4 animate-fade-in animation-delay-400">
            <Link 
              href="/" 
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-semibold rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <IconArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>浏览更多文章</span>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

