import { getSortedPostsData, getAllCategories, getAllTags } from '@/lib/posts';
import ArchiveHero from '@/components/archive/ArchiveHero';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/ScrollToTop';
import ArchiveContent from '@/components/archive/ArchiveContent';

export default function ArchivePage() {
  const posts = getSortedPostsData();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <main className="relative pt-2">
      <Header />
      <ArchiveHero />
      <section className="px-6 mb-20">
        {/* Layout handled inside ArchiveContent (includes YearMonthNav) */}
        <ArchiveContent posts={posts} categories={categories} tags={tags} />
      </section>
      <ScrollToTop />
      <Footer />
    </main>
  );
}
