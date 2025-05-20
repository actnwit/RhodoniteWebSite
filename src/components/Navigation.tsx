import React, { useState } from 'react';
import { useTranslations } from '../i18n/utils';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavigationProps {
  lang: 'en' | 'ja' | 'tr';
}

export const Navigation: React.FC<NavigationProps> = ({ lang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations(lang);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getUrl = (path: string) => {
    return `/${lang}${path}`;
  };

  // ナビゲーション項目を配列として定義
  const navItems = [
    { href: getUrl('/'), label: t('nav.home') },
    { href: getUrl('/docs/'), label: t('nav.docs') },
    { href: getUrl('/tutorials/'), label: t('nav.tutorials') },
    { href: getUrl('/api'), label: t('nav.api') },
    {
      href: 'https://github.com/actnwit/RhodoniteTS',
      label: t('nav.github'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      ),
      external: true
    }
  ];

  return (
    <div className="relative">
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <a href={getUrl('/')} className="text-xl font-bold text-gray-800">
                RhodoniteTS
              </a>
            </div>

            {/* ハンバーガーメニューボタン（モバイル用） */}
            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                aria-expanded="false"
                onClick={toggleMenu}
              >
                <span className="sr-only">{t('nav.toggleMenu')}</span>
                {/* ハンバーガーアイコン */}
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* 閉じるアイコン */}
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* PC用ナビゲーションリンク */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {navItems.map((item, index) => (
                <a
                  key={`desktop-${index}`}
                  href={item.href}
                  className="text-gray-600 hover:text-indigo-600 text-base font-medium transition-colors flex items-center gap-1"
                  {...(item.external ? { target: "_blank", rel: "noopener" } : {})}
                >
                  {item.label}
                  {item.icon}
                </a>
              ))}
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* モバイル用メニュー（スライドイン/アウトアニメーション） */}
      <div
        className={`
          md:hidden fixed top-0 left-0 w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-10
          ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}
          ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
      >
        <div className="pt-20 pb-3 space-y-1">
          {navItems.map((item, index) => (
            <a
              key={`mobile-${index}`}
              href={item.href}
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 flex items-center gap-1"
              {...(item.external ? { target: "_blank", rel: "noopener" } : {})}
            >
              {item.label}
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
