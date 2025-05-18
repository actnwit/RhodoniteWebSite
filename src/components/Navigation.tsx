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

  return (
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
            <a href={getUrl('/')} className="text-gray-600 hover:text-indigo-600 text-base font-medium transition-colors">
              {t('nav.home')}
            </a>
            <a href={getUrl('/docs')} className="text-gray-600 hover:text-indigo-600 text-base font-medium transition-colors">
              {t('nav.docs')}
            </a>
            <a href={getUrl('/tutorials/display_geometries')} className="text-gray-600 hover:text-indigo-600 text-base font-medium transition-colors">
              {t('nav.tutorials')}
            </a>
            <a href={getUrl('/api')} className="text-gray-600 hover:text-indigo-600 text-base font-medium transition-colors">
              {t('nav.api')}
            </a>
            <a
              href="https://github.com/actnwit/RhodoniteTS"
              className="text-gray-600 hover:text-indigo-600 text-base font-medium transition-colors flex items-center gap-1"
              target="_blank"
              rel="noopener"
            >
              {t('nav.github')}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* モバイル用メニュー（トグル表示） */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <a href={getUrl('/')} className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            {t('nav.home')}
          </a>
          <a href={getUrl('/docs')} className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            {t('nav.docs')}
          </a>
          <a href={getUrl('/tutorials/display_geometries')} className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            {t('nav.tutorials')}
          </a>
          <a href={getUrl('/api')} className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            {t('nav.api')}
          </a>
          <a
            href="https://github.com/actnwit/RhodoniteTS"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 flex items-center gap-1"
            target="_blank"
            rel="noopener"
          >
            {t('nav.github')}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};
