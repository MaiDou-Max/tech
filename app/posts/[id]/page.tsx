import { getAllPostIds, getPostData, getSortedPostsData } from '@/lib/posts';
import ArticleHeader from '@/components/article/ArticleHeader';
import ArticleFooter from '@/components/article/ArticleFooter';
import ArticleContent from '@/components/article/ArticleContent';
import CollapsibleTOC from '@/components/article/CollapsibleTOC';
import CollapsibleSidebar from '@/components/article/CollapsibleSidebar';
import FloatingTOC from '@/components/article/FloatingTOC';
import FloatingSidebar from '@/components/article/FloatingSidebar';
import ReadingProgress from '@/components/ReadingProgress';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import rehypePrettyCode from 'rehype-pretty-code';

export async function generateStaticParams() {
  return getAllPostIds();
}

export default async function Post({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);
  const allPosts = getSortedPostsData();
  const currentIndex = allPosts.findIndex(post => post.id === params.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

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
    <div className="min-h-screen bg-[var(--color-background)]">
      <ReadingProgress />

      {/* Single column layout - only center content */}
      <div className="min-h-screen">
        {/* Center Content Area - Main article */}
        <main className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="sticky top-0 z-40 bg-[var(--color-background)]/95 backdrop-blur-sm border-b border-[var(--color-border)]">
            <ArticleHeader title={postData.title} />
          </div>

          {/* Article Content */}
          <div className="px-4 sm:px-6 md:px-8 py-8">
            <ArticleContent postData={postData} options={options} />
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 z-40 bg-[var(--color-background)]/95 backdrop-blur-sm border-t border-[var(--color-border)]">
            <ArticleFooter prevPost={prevPost} nextPost={nextPost} postData={postData} />
          </div>
        </main>
      </div>
    </div>
  );
}

