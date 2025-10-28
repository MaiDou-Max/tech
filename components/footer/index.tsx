function Footer() {
  return (
    <footer className="mt-16 pt-8 pb-6 border-t border-[var(--color-border)] text-center">
      <div className="flex items-center justify-center gap-2 text-sm text-[var(--color-text-muted)]">
        <span>© {new Date().getFullYear()} 钟宝的博客</span>
        <span>·</span>
        <span className="flex items-center gap-1">用 ❤️ 制作</span>
      </div>
    </footer>
  );
}

export default Footer;
