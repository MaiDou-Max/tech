'use client';

import { IconBrandReact, IconBrandTypescript, IconCode, IconRocket } from '@tabler/icons-react';

export default function SkillsGrid() {
  const skills = [
    {
      icon: IconBrandReact,
      title: 'React & Next.js',
      description: '构建现代化的 Web 应用',
    },
    {
      icon: IconBrandTypescript,
      title: 'TypeScript',
      description: '类型安全的开发体验',
    },
    {
      icon: IconCode,
      title: 'UI/UX 设计',
      description: '注重用户体验的界面设计',
    },
    {
      icon: IconRocket,
      title: '性能优化',
      description: '追求极致的加载速度',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
      {skills.map((skill, index) => {
        const Icon = skill.icon;
        return (
          <div
            key={skill.title}
            className="flex items-start gap-4 p-4 rounded-xl bg-[var(--code-inline-bg)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-200 hover:shadow-lg animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Icon size={32} className="text-[var(--color-primary)] flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-1">{skill.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)]">{skill.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
