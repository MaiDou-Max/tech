import { getSortedPostsData } from '@/lib/posts';
import Header from '@/components/header';
import Footer from '@/components/footer';
import NeoCard from '@/components/card/NeoCard';
import HeroSectionNew from '@/components/home/HeroSectionNew';

export default function App() {
  const allPostsData = getSortedPostsData();
  const displayPosts = allPostsData.slice(0, 9);

  return (
    <>
      <Header />

      {/* 超炫酷 Hero 区域 */}
      <HeroSectionNew />

      {/* 文章网格 */}
      {displayPosts.length > 0 && (
        <section id="posts" className="relative mb-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* 标题 */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black gradient-text mb-3">最新文章</h2>
              <p className="text-[var(--color-text-muted)] text-base md:text-lg">探索技术的无限可能</p>
            </div>

            {/* 文章网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPosts.map((post, index) => (
                <NeoCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  description={post.description}
                  category={post.category}
                  date={post.date}
                  tags={post.tags}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}

