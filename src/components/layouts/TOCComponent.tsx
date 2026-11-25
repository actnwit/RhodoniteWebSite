import React, { useEffect, useState } from 'react';
import { getLangFromUrl, useTranslations } from '../../i18n/utils';
import { ChevronDownIcon } from '../icons';

// 二階層式のTOCアイテム型定義
interface TOCItem {
  title: string;
  href?: string;
  items?: Array<{
    title: string;
    href: string;
  }>;
}

interface TOCProps {
  tocItems: {
    en: TOCItem[];
    ja: TOCItem[];
    tr: TOCItem[];
  };
}

/** 末尾スラッシュの有無を吸収して比較する */
const normalizePath = (path: string) => (path.endsWith('/') ? path : `${path}/`);

const TOCComponent: React.FC<TOCProps> = ({ tocItems }) => {
  const lang = getLangFromUrl(new URL(window.location.href));
  const t = useTranslations(lang);
  const items = tocItems[lang];
  const [currentPath, setCurrentPath] = useState('');
  // カテゴリ数が少ないため、初期状態ではすべて展開しておく
  const [collapsed, setCollapsed] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    setCurrentPath(normalizePath(window.location.pathname));
  }, []);

  const toggleCategory = (index: number) => {
    setCollapsed((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <nav aria-label={t('toc.title')}>
      <p className="mb-6 font-mono text-xs font-medium uppercase tracking-[0.16em] text-subtle">{t('toc.title')}</p>

      <ul className="m-0 list-none space-y-6 p-0">
        {items?.map((category, categoryIndex) => {
          const isOpen = !collapsed[categoryIndex];
          return (
            <li key={categoryIndex}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-2 rounded-md py-1 text-left text-sm font-semibold text-fg transition-colors hover:text-rhodo-200"
                onClick={() => toggleCategory(categoryIndex)}
                aria-expanded={isOpen}
                aria-controls={`toc-category-${categoryIndex}`}
              >
                <span>{category.title}</span>
                <ChevronDownIcon
                  className={`h-4 w-4 shrink-0 text-subtle transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`}
                  aria-label={isOpen ? t('toc.collapse') : t('toc.expand')}
                />
              </button>

              {isOpen && category.items && (
                <ul
                  id={`toc-category-${categoryIndex}`}
                  className="m-0 mt-2 list-none space-y-0.5 border-l border-line p-0"
                >
                  {category.items.map((item, itemIndex) => {
                    const isActive = currentPath === normalizePath(item.href);
                    return (
                      <li key={itemIndex}>
                        <a
                          href={item.href}
                          aria-current={isActive ? 'page' : undefined}
                          className={`-ml-px block border-l py-1.5 pl-4 pr-2 text-sm leading-snug no-underline transition-colors duration-150 ${
                            isActive
                              ? 'border-rhodo-400 font-medium text-rhodo-300'
                              : 'border-transparent text-muted hover:border-line-strong hover:text-fg'
                          }`}
                        >
                          {item.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TOCComponent;
