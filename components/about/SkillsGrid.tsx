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
        const isBlue = index % 2 === 0;
        return (
          <div
            key={skill.title}
            className="volantis-card flex items-start gap-4 p-5 group"
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{
                background: isBlue
                  ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))'
                  : 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-light))',
              }}
            >
              <Icon size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                {skill.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {skill.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
