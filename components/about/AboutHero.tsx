'use client';

export default function AboutHero() {
  return (
    <section className="mb-12 py-8">
      <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] mb-6 leading-tight animate-slide-up">
        关于我
      </h1>
      <p className="text-xl text-[var(--color-text-muted)] leading-relaxed animate-slide-up animation-delay-200">
        一名热爱代码、追求极致的前端开发者
      </p>
    </section>
  );
}

