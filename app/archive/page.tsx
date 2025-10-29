import { getSortedPostsData, getAllCategories, getAllTags } from '@/lib/posts';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ScrollToTop from '@/components/ScrollToTop';
import ArchiveContent from '@/components/archive/ArchiveContent';

export default function ArchivePage() {
  const posts = getSortedPostsData();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <>
      <Header />
      <section className="mb-12">
        <ArchiveContent posts={posts} categories={categories} tags={tags} />
      </section>
      <ScrollToTop />
      <Footer />
    </>
  );
}
