import { useEffect, useRef, useState } from 'react';
import { languages } from '../i18n/ui';
import { getLangFromUrl } from '../i18n/utils';

export const LanguageSwitcher = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('');
  const [currentPath, setCurrentPath] = useState('');
  const [currentLabel, setCurrentLabel] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // クライアントサイドでのみ実行
    const lang = getLangFromUrl(new URL(window.location.href));
    const path = window.location.pathname.split('/').slice(2).join('/');
    setCurrentLang(lang);
    setCurrentPath(path);
    setCurrentLabel(languages[lang]);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        menuRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative p-4 flex justify-end">
      <button
        ref={buttonRef}
        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-base cursor-pointer shadow-sm hover:shadow-md"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {currentLabel}
        <span
          className="text-sm transition-transform duration-200 ease-snappy"
          style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▲
        </span>
      </button>
      <div
        ref={menuRef}
        className={`
          absolute top-full right-4 mt-1
          bg-white/95 backdrop-blur-sm
          border border-gray-200/80 rounded-md p-2
          flex flex-col gap-1 min-w-[120px]
          shadow-lg shadow-gray-200/50
          z-50
          transition-all duration-200 ease-snappy
          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
        `}
      >
        {Object.entries(languages).map(([lang, label]) => (
          <a
            key={lang}
            href={`/${lang}/${currentPath}`}
            className={`
              px-3 py-2 rounded-md
              text-gray-600 hover:text-gray-900
              hover:bg-gray-50/80
              transition-colors duration-200 ease-snappy
              block
              ${currentLang === lang
                ? 'text-indigo-600 font-medium bg-indigo-50/50 hover:bg-indigo-50'
                : ''
              }
            `}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
};