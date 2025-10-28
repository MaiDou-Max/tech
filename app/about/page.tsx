import Header from '@/components/header';
import Footer from '@/components/footer';
import AboutHero from '@/components/about/AboutHero';
import SkillsGrid from '@/components/about/SkillsGrid';
import ContactButtons from '@/components/about/ContactButtons';

export default function About() {
  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto mb-12">
        <AboutHero />

        {/* Content Card with Volantis style */}
        <article className="volantis-card p-8 md:p-12 animate-fade-in animation-delay-400">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[var(--color-text-muted)] leading-relaxed mb-8">
              你好！我是<strong className="text-[var(--color-text)]">zhongbao.su</strong>
              ，一名专注于前端开发和用户体验设计的工程师。 我热爱创造美观、高效且易用的 Web
              应用程序。
            </p>

            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6 mt-12 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full" />
              技术栈
            </h2>

            <SkillsGrid />

            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6 mt-12 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full" />
              联系方式
            </h2>

            <ContactButtons />
          </div>
        </article>
      </div>

      <Footer />
    </>
  );
}
