import { getAllTags } from '@/lib/posts';
import Header from '@/components/header';
import Footer from '@/components/footer';
import TagsHero from '@/components/tags/TagsHero';
import TagCloud from '@/components/tags/TagCloud';

const TAG_COLORS = [
  'from-purple-500 to-pink-500',
  'from-blue-500 to-cyan-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-indigo-500 to-purple-500',
  'from-pink-500 to-rose-500',
  'from-teal-500 to-green-500',
  'from-yellow-500 to-orange-500',
];

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <>
      <TagsHero />

      {/* Tags Cloud with 3D effect */}
      <section className="mb-12">
        <div className="relative max-w-5xl mx-auto">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 rounded-3xl blur-3xl" />

          <div className="volantis-card relative p-8 md:p-12 overflow-hidden">
            {/* Decorative corner gradients */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[var(--color-secondary)]/10 to-transparent rounded-tr-full" />

            {/* Tags */}
            <TagCloud tags={tags} colors={TAG_COLORS} />

            {/* Stats */}
            <div className="relative mt-12 pt-8 border-t border-[var(--color-border)] text-center">
              <p className="text-[var(--color-text-muted)] text-sm">
                共{' '}
                <span className="font-bold text-[var(--color-primary)] text-lg">{tags.length}</span>{' '}
                个标签
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
