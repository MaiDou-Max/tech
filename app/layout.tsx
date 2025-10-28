import { clsx } from 'clsx';
import { Handlee, Nunito, Sorts_Mill_Goudy, Long_Cang, Pacifico, Dancing_Script } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import NeoSlider from '@/components/slider/NeoSlider';
import RightSidebar from '@/components/slider/RightSidebar';
import ScrollToTop from '@/components/ScrollToTop';
import MobileMenu from '@/components/MobileMenu';
import FloatingTechStack from '@/components/FloatingTechStack';

import './globals.css';

const longCang = Long_Cang({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-google-long-cang',
  weight: ['400'],
});

const sans = Nunito({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-google-sans',
  weight: ['400'],
});

const serif = Sorts_Mill_Goudy({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-google-serif',
  weight: ['400'],
});

const handwriting = Handlee({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-google-handwriting',
  weight: ['400'],
});

const pacifico = Pacifico({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-google-pacifico',
  weight: ['400'],
});

const dancingScript = Dancing_Script({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-google-dancing',
  weight: ['400', '700'],
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={clsx(
        'font-sans', // 默认字体
        handwriting.variable,
        sans.variable,
        serif.variable,
        longCang.variable,
        pacifico.variable,
        dancingScript.variable
      )}
    >
      <body className="bg-[var(--color-background)] transition-colors duration-300 overflow-x-hidden relative">
        <ThemeProvider attribute="data-mode" defaultTheme="dark">
          {/* 响应式三栏布局 */}
          <div className="flex min-h-screen max-w-[1920px] mx-auto px-3 sm:px-4 lg:px-6 gap-3 lg:gap-4 relative z-10">
            {/* 左侧边栏 - 无滚动条 */}
            <div className="hidden xl:block flex-shrink-0 w-[280px]">
              <div className="sticky top-6">
                <NeoSlider />
              </div>
            </div>

            {/* 中间内容区域 */}
            <main className="flex-1 min-w-0 max-w-[1200px] xl:max-w-none mx-auto w-full">
              {children}
            </main>

            {/* 右侧边栏 - 技术栈展示 */}
            <div className="hidden min-[1440px]:block flex-shrink-0 w-[280px]">
              <div className="sticky top-6">
                <RightSidebar />
              </div>
            </div>
          </div>

          {/* 滚动到顶部按钮 */}
          <ScrollToTop />

          {/* 移动端菜单 */}
          <MobileMenu />

          {/* 浮动技术栈按钮（在没有右侧边栏的情况下显示） */}
          <FloatingTechStack />
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
