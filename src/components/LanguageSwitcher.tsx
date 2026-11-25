import { useEffect, useRef, useState } from 'react';
import { languages } from '../i18n/ui';
import { useTranslations, type Lang } from '../i18n/utils';
import { CheckIcon, ChevronDownIcon, GlobeIcon } from './icons';

interface LanguageSwitcherProps {
  lang: Lang;
  pathname: string;
}

export const LanguageSwitcher = ({ lang, pathname }: LanguageSwitcherProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations(lang);

  // 言語プレフィックスを除いたパス（言語切替後も同じページを維持する）
  const restPath = pathname.split('/').slice(2).join('/');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
        aria-label={t('nav.language')}
        onClick={() => setIsMenuOpen((open) => !open)}
        className="flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
      >
        <GlobeIcon className="h-[18px] w-[18px]" />
        <span className="uppercase sm:hidden">{lang}</span>
        <span className="hidden sm:inline">{languages[lang]}</span>
        <ChevronDownIcon
          className={`h-3.5 w-3.5 transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`absolute right-0 top-full z-50 mt-2 min-w-[10rem] origin-top-right rounded-xl border border-line-strong bg-ink-800/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl transition-all duration-150 ease-out ${
          isMenuOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        {(Object.entries(languages) as [Lang, string][]).map(([code, label]) => {
          const isCurrent = code === lang;
          return (
            <a
              key={code}
              href={`/${code}/${restPath}`}
              hrefLang={code}
              lang={code}
              aria-current={isCurrent ? 'true' : undefined}
              className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isCurrent ? 'bg-rhodo-500/10 font-medium text-rhodo-300' : 'text-body hover:bg-white/[0.05] hover:text-fg'
              }`}
            >
              {label}
              {isCurrent && <CheckIcon className="h-4 w-4" />}
            </a>
          );
        })}
      </div>
    </div>
  );
};
