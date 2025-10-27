import { clsx } from 'clsx';
import { Handlee, Nunito, Sorts_Mill_Goudy, Long_Cang } from 'next/font/google';
import PhysicsDrop from '@/components/ui/PhysicsDrop';
import { ThemeProvider } from 'next-themes';
import Slider from '@/components/slider';
import ScrollToTop from '@/components/ScrollToTop';

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

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={clsx(handwriting.variable, sans.variable, serif.variable, longCang.variable)}
    >
      <body className="bg-[var(--color-background)] transition-colors duration-300">
        <ThemeProvider attribute="data-mode">
          <div className="container grid-cols-[1fr_minmax(var(--width-main-min),var(--width-main-max))_1fr] sticky top-2 grid gap-4 m-auto text-base">
            <Slider />
            {children}
            <aside className="m-2">
              <PhysicsDrop></PhysicsDrop>
            </aside>
          <ScrollToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
