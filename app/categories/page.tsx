import { getAllCategories } from '@/lib/posts';
import CategoryHero from '@/components/categories/CategoryHero';
import CategoryCard from '@/components/categories/CategoryCard';

const CATEGORY_COLORS = {
  react: 'from-cyan-500 to-blue-500',
  vue: 'from-emerald-500 to-green-500',
  angular: 'from-red-500 to-pink-500',
  typescript: 'from-blue-600 to-indigo-600',
  css3: 'from-blue-500 to-purple-500',
  html5: 'from-orange-500 to-red-500',
  graphql: 'from-pink-500 to-purple-500',
  nodejs: 'from-green-600 to-emerald-600',
  nextjs: 'from-gray-800 to-gray-900',
  nuxtjs: 'from-teal-500 to-green-500',
  tailwind: 'from-cyan-400 to-blue-500',
  npm: 'from-red-600 to-red-700',
  redux: 'from-purple-600 to-purple-700',
  javascript: 'from-yellow-400 to-yellow-500',
  技术: 'from-[var(--color-primary)] to-[var(--color-secondary)]',
  default: 'from-gray-500 to-gray-600',
} as const;

export default function Categories() {
  const categories = getAllCategories();

  return (
    <main className="relative pt-2">
      <CategoryHero />
      {/* Categories Grid */}
      <section className="px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const key = category.toLowerCase();
            const gradientClass =
              CATEGORY_COLORS[key as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.default;

            return (
              <CategoryCard
                key={category}
                category={category}
                gradientClass={gradientClass}
                index={index}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
