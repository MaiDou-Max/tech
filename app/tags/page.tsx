import { getAllTags } from '@/lib/posts';
import TagCloud from '@/components/tags/TagCloud';

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <>
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
            <TagCloud tags={tags} />

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
