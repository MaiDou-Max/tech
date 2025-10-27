import { getSortedPostsData } from '@/lib/posts';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Card from '@/components/card';
import FeaturedCard from '@/components/card/FeaturedCard';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';

export default function App() {
  const allPostsData = getSortedPostsData();
  const featuredPost = allPostsData[0];
  const recentPosts = allPostsData.slice(1, 4);
  const otherPosts = allPostsData.slice(4, 10);

  return (
    <main className="relative pt-2">
      <Header />

      {/* Hero Section with animated gradient background */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection totalPosts={allPostsData.length} />

      {/* Featured Post */}
      {featuredPost && (
        <section className="px-6 mb-16 animate-fade-in animation-delay-600">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--color-text)]">精选文章</h2>
          </div>
          <FeaturedCard
            id={featuredPost.id}
            title={featuredPost.title}
            description={featuredPost.description}
            category={featuredPost.category}
            date={featuredPost.date}
          />
        </section>
      )}

      {/* Recent Posts Grid */}
      {recentPosts.length > 0 && (
        <section id="latest" className="px-6 mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full" />
            <h2 className="text-3xl font-bold text-[var(--color-text)]">最新文章</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <div
                key={post.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card
                  id={post.id}
                  title={post.title}
                  description={post.description}
                  category={post.category}
                  date={post.date}
                  variant="grid"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Other Posts List */}
      <section className="px-6 mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-8 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full" />
          <h2 className="text-3xl font-bold text-[var(--color-text)]">更多文章</h2>
        </div>
        <div className="space-y-4">
          {otherPosts.map((post, index) => (
            <div
              key={post.id}
              className="animate-slide-in-left"
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
      </section>

      <Footer />
    </main>
  );
}

