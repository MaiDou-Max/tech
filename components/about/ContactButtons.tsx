'use client';

import { IconMail, IconBrandGithub } from '@tabler/icons-react';

export default function ContactButtons() {
  return (
    <div className="flex flex-wrap gap-4">
      <a
        href="mailto:example@example.com"
        className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white font-medium rounded-xl hover:bg-[var(--color-primary-light)] transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <IconMail size={20} />
        <span>发送邮件</span>
      </a>

      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 bg-[var(--color-card-bg)] text-[var(--color-text)] font-medium rounded-xl border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-200 hover:scale-105"
      >
        <IconBrandGithub size={20} />
        <span>GitHub</span>
      </a>
    </div>
  );
}

