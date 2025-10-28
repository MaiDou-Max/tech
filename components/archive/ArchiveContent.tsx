'use client';
import { useCallback, useMemo, useState } from 'react';
import { PostMetadata, getSortedPostsData } from '@/lib/posts';
import ArchiveFilters from '@/components/archive/ArchiveFilters';
import Card from '@/components/card';
import YearMonthNav from '@/components/archive/YearMonthNav';

interface ArchiveContentProps {
  posts: ReturnType<typeof getSortedPostsData>;
  categories: string[];
  tags: string[];
}

export default function ArchiveContent({ posts, categories, tags }: ArchiveContentProps) {
  const [filters, setFilters] = useState({ query: '', category: '全部', tag: '全部' });

  const handleFilterChange = useCallback((next: typeof filters) => {
    setFilters(next);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ query: '', category: '全部', tag: '全部' });
  }, []);

  const filtered = useMemo(() => {
    return posts.filter(p => {
      if (filters.category !== '全部' && p.category !== filters.category) return false;
      if (filters.tag !== '全部' && !p.tags.includes(filters.tag)) return false;
      if (filters.query) {
        const q = filters.query.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q))
          return false;
      }
      return true;
    });
  }, [posts, filters]);

  const groupedFiltered = useMemo(() => {
    const map: Record<string, Record<string, PostMetadata[]>> = {};
    for (const p of filtered) {
      const d = new Date(p.date);
      const year = String(d.getFullYear());
      const month = String(d.getMonth() + 1).padStart(2, '0');
      map[year] ||= {};
      map[year][month] ||= [];
      map[year][month].push(p);
    }
    return map;
  }, [filtered]);
  const years = useMemo(
    () => Object.keys(groupedFiltered).sort((a, b) => Number(b) - Number(a)),
    [groupedFiltered]
  );
  const yearMonthCounts = useMemo(() => {
    const res: Record<string, Record<string, number>> = {};
    for (const y of Object.keys(groupedFiltered)) {
      res[y] = {};
      for (const m of Object.keys(groupedFiltered[y])) {
        res[y][m] = groupedFiltered[y][m].length;
      }
    }
    return res;
  }, [groupedFiltered]);

  const anyActiveFilter = filters.query || filters.category !== '全部' || filters.tag !== '全部';

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <YearMonthNav map={yearMonthCounts} />
      <div className="flex-1 space-y-12">
        <ArchiveFilters categories={categories} tags={tags} onFilterChange={handleFilterChange} />

        <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-[var(--color-text-muted)] bg-[var(--code-inline-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3">
          <span>
            共 <strong className="text-[var(--color-primary)]">{posts.length}</strong> 篇文章
          </span>
          <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
          <span>
            筛选后 <strong className="text-[var(--color-primary)]">{filtered.length}</strong> 篇
          </span>
          {filters.query && (
            <span className="truncate max-w-[12rem]">关键词: &quot;{filters.query}&quot;</span>
          )}
          {filters.category !== '全部' && <span>分类: {filters.category}</span>}
          {filters.tag !== '全部' && <span>标签: {filters.tag}</span>}
          {anyActiveFilter && (
            <button
              type="button"
              onClick={resetFilters}
              className="ml-auto text-[var(--color-primary)] hover:underline"
              aria-label="重置筛选"
            >
              重置
            </button>
          )}
        </div>

        {years.length === 0 && (
          <div className="text-center py-16 border border-dashed border-[var(--color-border)] rounded-2xl">
            <p className="text-[var(--color-text-muted)]">没有匹配的文章，尝试调整筛选条件。</p>
          </div>
        )}

        {years.map(year => {
          const yearTotal = Object.values(groupedFiltered[year] || {}).reduce(
            (a, b) => a + b.length,
            0
          );
          return (
            <section key={year} id={`year-${year}`} className="space-y-8">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                  {year}
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-[var(--code-inline-bg)] text-[var(--code-inline-color)]">
                  {yearTotal} 篇
                </span>
              </h2>
              {Object.keys(groupedFiltered[year] || {})
                .sort((a, b) => Number(b) - Number(a))
                .map(month => (
                  <div key={month} id={`${year}-${month}`} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)]" />
                      <h3 className="text-xl font-semibold">
                        {month} 月{' '}
                        <span className="text-sm text-[var(--color-text-muted)]">
                          ({groupedFiltered[year][month].length})
                        </span>
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {groupedFiltered[year][month].map(post => (
                        <Card
                          key={post.id}
                          id={post.id}
                          title={post.title}
                          description={post.description}
                          category={post.category}
                          date={post.date}
                          variant="grid"
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </section>
          );
        })}
      </div>
    </div>
  );
}
