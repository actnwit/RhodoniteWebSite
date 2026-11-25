import React, { useState, useEffect } from 'react';
import TOCComponent from './TOCComponent';
import ContentStyles from './ContentStyles';
import { getLangFromUrl, useTranslations } from '../../i18n/utils';
import { CloseIcon, MenuIcon } from '../icons';

// TOCItemの型定義（TOCComponentと同じ）
interface TOCItem {
  title: string;
  href?: string;
  items?: Array<{
    title: string;
    href: string;
  }>;
}

interface ContentLayoutProps {
  tocItems: {
    en: TOCItem[];
    ja: TOCItem[];
    tr: TOCItem[];
  };
  children: React.ReactNode;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ tocItems, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = getLangFromUrl(new URL(window.location.href));
  const t = useTranslations(lang);

  // ドロワーが開いている間は背面のスクロールを止める
  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isMenuOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    // 注意: ここで stacking context（isolate 等）を作ると、モバイルのドロワーがヘッダーの下に潜るので作らない
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-rhodo-500/[0.07] to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:grid md:grid-cols-[230px_minmax(0,1fr)] md:gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:px-8">
        {/* Desktop sidebar */}
        <aside className="hidden md:block">
          <div className="sticky top-[var(--header-h)] max-h-[calc(100vh-var(--header-h))] overflow-y-auto py-10 pr-2">
            <TOCComponent tocItems={tocItems} />
          </div>
        </aside>

        <main className="min-w-0 pb-28 pt-10 md:pt-12">
          <article className="max-w-3xl">
            <ContentStyles>{children}</ContentStyles>
          </article>
        </main>
      </div>

      {/* Mobile: TOC button */}
      <button
        type="button"
        className="fixed bottom-5 left-5 z-[60] flex h-12 items-center gap-2 rounded-full bg-rhodo-500 pl-4 pr-5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(233,97,143,0.8)] transition-colors hover:bg-rhodo-400 md:hidden"
        onClick={() => setIsMenuOpen((open) => !open)}
        aria-expanded={isMenuOpen}
        aria-controls="toc-drawer"
        aria-label={t('nav.toggleMenu')}
      >
        <MenuIcon className="h-5 w-5" />
        {t('toc.title')}
      </button>

      {/* Mobile: overlay */}
      <div
        className={`fixed inset-0 z-[65] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile: drawer */}
      <div
        id="toc-drawer"
        className={`fixed left-0 top-0 z-[70] h-full w-[300px] max-w-[85vw] overflow-y-auto border-r border-line bg-ink-850 px-5 py-6 shadow-2xl shadow-black/60 transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          type="button"
          className="absolute right-3 top-4 grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
          onClick={() => setIsMenuOpen(false)}
          aria-label={t('toc.collapse')}
        >
          <CloseIcon className="h-5 w-5" />
        </button>
        <TOCComponent tocItems={tocItems} />
      </div>
    </div>
  );
};

export default ContentLayout;
