'use client';
import { useMemo, useState } from 'react';
import { IconSearch, IconFilter, IconChevronDown } from '@tabler/icons-react';

interface ArchiveFiltersProps {
  categories: string[];
  tags: string[];
  onFilterChange: (value: { query: string; category: string; tag: string }) => void;
}

export default function ArchiveFilters({ categories, tags, onFilterChange }: ArchiveFiltersProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('全部');
  const [tag, setTag] = useState('全部');
  const [openCategory, setOpenCategory] = useState(false);
  const [openTag, setOpenTag] = useState(false);

  function update(partial: Partial<{ query: string; category: string; tag: string }>) {
    const next = { query, category, tag, ...partial };
    setQuery(next.query);
    setCategory(next.category);
    setTag(next.tag);
    onFilterChange(next);
  }

  const categoryOptions = useMemo(() => ['全部', ...categories], [categories]);
  const tagOptions = useMemo(() => ['全部', ...tags], [tags]);

  return (
    <div className="relative bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-2xl p-5 md:p-6 shadow-xl flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-muted)]">
        <IconFilter size={16} className="text-[var(--color-primary)]" /> 筛选文章
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <IconSearch
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
          />
          <input
            value={query}
            onChange={e => update({ query: e.target.value })}
            placeholder="搜索标题或描述关键词..."
            className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[var(--code-inline-bg)] border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 text-sm"
          />
        </div>
        {/* Category */}
        <div className="relative w-full md:w-48">
          <button
            type="button"
            onClick={() => setOpenCategory(o => !o)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[var(--code-inline-bg)] border border-[var(--color-border)] text-sm hover:border-[var(--color-primary)]/50"
          >
            <span>{category}</span>
            <IconChevronDown
              size={16}
              className={`transition-transform ${openCategory ? 'rotate-180' : ''}`}
            />
          </button>
          {openCategory && (
            <ul className="absolute z-20 mt-2 w-full max-h-56 overflow-y-auto bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl shadow-2xl animate-fade-in">
              {categoryOptions.map(opt => (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => {
                      update({ category: opt });
                      setOpenCategory(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-[var(--code-inline-bg)] ${
                      category === opt
                        ? 'text-[var(--color-primary)] font-medium'
                        : 'text-[var(--color-text-muted)]'
                    }`}
                  >
                    {opt}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Tag */}
        <div className="relative w-full md:w-48">
          <button
            type="button"
            onClick={() => setOpenTag(o => !o)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-[var(--code-inline-bg)] border border-[var(--color-border)] text-sm hover:border-[var(--color-primary)]/50"
          >
            <span>{tag}</span>
            <IconChevronDown
              size={16}
              className={`transition-transform ${openTag ? 'rotate-180' : ''}`}
            />
          </button>
          {openTag && (
            <ul className="absolute z-20 mt-2 w-full max-h-56 overflow-y-auto bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl shadow-2xl animate-fade-in">
              {tagOptions.map(opt => (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => {
                      update({ tag: opt });
                      setOpenTag(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-[var(--code-inline-bg)] ${
                      tag === opt
                        ? 'text-[var(--color-primary)] font-medium'
                        : 'text-[var(--color-text-muted)]'
                    }`}
                  >
                    {opt}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Active summary */}
      <div className="text-xs text-[var(--color-text-muted)]">
        当前: 关键词「{query || '空'}」 / 分类「{category}」 / 标签「{tag}」
      </div>
    </div>
  );
}
