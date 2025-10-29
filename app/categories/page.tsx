import { getAllCategories } from '@/lib/posts';
import CategoryCard from '@/components/categories/CategoryCard';

export default function Categories() {
  const categories = getAllCategories();

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, index) => {
          return (
            <CategoryCard
              key={category}
              category={category}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
}
