import { getSortedPostsData } from '@/lib/posts';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Card from '@/components/card';
import CategoryDetailHeader from '@/components/categories/CategoryDetailHeader';

export default function CategoryPage({ params }: { params: { category: string } }) {
  const allPostsData = getSortedPostsData();
  const categoryPosts = allPostsData.filter(post => post.category === params.category);

  return (
    <main className="relative pt-2 animate-fade-in">
      <div className="px-6">
        <CategoryDetailHeader category={params.category} totalPosts={categoryPosts.length} />

        {/* Posts */}
        <section className="mb-12">
          {categoryPosts.length > 0 ? (
            <div className="space-y-4">
              {categoryPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Card
                    id={post.id}
                    title={post.title}
                    description={post.description}
                    category={post.category}
                    date={post.date}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl p-12 text-center shadow-lg">
              <p className="text-lg text-[var(--color-text-muted)]">该分类下暂无文章</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
