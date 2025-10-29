import { getSortedPostsData } from '@/lib/posts';
import Header from '@/components/header';
import Footer from '@/components/footer';
import InfinitePostsGrid from '@/components/home/InfinitePostsGrid';

export default function App() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <Header />

      {/* 直接展示所有文章 - 无限滚动 */}
      <InfinitePostsGrid initialPosts={allPostsData} />

      <Footer />
    </>
  );
}
