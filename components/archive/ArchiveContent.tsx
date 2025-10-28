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

        <div className="volantis-card px-4 py-3 text-xs md:text-sm text-[var(--color-text-muted)] animate-fade-in animation-delay-200">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1">
              共{' '}
              <strong className="text-[var(--color-primary)] font-bold mx-1">{posts.length}</strong>{' '}
              篇文章
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
            <span className="flex items-center gap-1">
              筛选后{' '}
              <strong className="text-[var(--color-primary)] font-bold mx-1">
                {filtered.length}
              </strong>{' '}
              篇
            </span>
            {filters.query && (
              <>
                <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                <span className="truncate max-w-[12rem]">关键词: &quot;{filters.query}&quot;</span>
              </>
            )}
            {filters.category !== '全部' && (
              <>
                <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                <span className="px-2 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs">
                  {filters.category}
                </span>
              </>
            )}
            {filters.tag !== '全部' && (
              <>
                <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                <span className="px-2 py-1 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs">
                  {filters.tag}
                </span>
              </>
            )}
            {anyActiveFilter && (
              <button
                type="button"
                onClick={resetFilters}
                className="ml-auto px-3 py-1 rounded-lg text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition-colors duration-300 font-medium"
                aria-label="重置筛选"
              >
                重置
              </button>
            )}
          </div>
        </div>

        {years.length === 0 && (
          <div className="volantis-card text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-lg text-[var(--color-text-muted)] mb-2">没有匹配的文章</p>
            <p className="text-sm text-[var(--color-text-lighter)]">尝试调整筛选条件</p>
          </div>
        )}

        {years.map((year, yearIdx) => {
          const yearTotal = Object.values(groupedFiltered[year] || {}).reduce(
            (a, b) => a + b.length,
            0
          );
          return (
            <section
              key={year}
              id={`year-${year}`}
              className="space-y-8 animate-fade-in"
              style={{ animationDelay: `${yearIdx * 100}ms` }}
            >
              {/* Year header with Volantis style */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">{year.slice(2)}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-[var(--color-card-bg)] border-2 border-[var(--color-primary)] flex items-center justify-center text-xs font-bold text-[var(--color-primary)]">
                    {yearTotal}
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)]">
                    {year}
                  </h2>
                  <p className="text-sm text-[var(--color-text-muted)]">共 {yearTotal} 篇文章</p>
                </div>
              </div>

              {Object.keys(groupedFiltered[year] || {})
                .sort((a, b) => Number(b) - Number(a))
                .map((month, monthIdx) => (
                  <div
                    key={month}
                    id={`${year}-${month}`}
                    className="space-y-4 animate-slide-in-left"
                    style={{ animationDelay: `${yearIdx * 100 + monthIdx * 50}ms` }}
                  >
                    {/* Month header with timeline style */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)]" />
                        <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
                          {month} 月
                        </h3>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-[var(--color-border-light)] text-xs font-medium text-[var(--color-text-muted)]">
                        {groupedFiltered[year][month].length} 篇
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
                    </div>

                    {/* Posts grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {groupedFiltered[year][month].map((post, postIdx) => (
                        <div
                          key={post.id}
                          className="animate-scale-in"
                          style={{
                            animationDelay: `${yearIdx * 100 + monthIdx * 50 + postIdx * 30}ms`,
                          }}
                        >
                          <Card
                            id={post.id}
                            title={post.title}
                            description={post.description}
                            category={post.category}
                            date={post.date}
                            tags={post.tags}
                            variant="grid"
                          />
                        </div>
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
