import Header from '@/components/header';
import Footer from '@/components/footer';
import AboutHero from '@/components/about/AboutHero';
import SkillsGrid from '@/components/about/SkillsGrid';
import ContactButtons from '@/components/about/ContactButtons';

export default function About() {
  return (
    <main className="relative pt-2 animate-fade-in">
      <Header />

      <div className="px-6 max-w-4xl mx-auto">
        <AboutHero />

        {/* Content Card */}
        <article className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl p-8 md:p-12 shadow-lg mb-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-8">
              你好！我是<strong className="text-[var(--color-text)]">钟宝</strong>，一名专注于前端开发和用户体验设计的工程师。
              我热爱创造美观、高效且易用的 Web 应用程序。
            </p>

            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6 mt-12">技术栈</h2>

            <SkillsGrid />

            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6 mt-12">联系方式</h2>

            <ContactButtons />
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}
