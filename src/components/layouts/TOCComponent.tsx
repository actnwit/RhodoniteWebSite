import React, { useEffect, useState } from 'react';
import { getLangFromUrl, useTranslations } from '../../i18n/utils';

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

const TOCComponent: React.FC<TOCProps> = ({ tocItems }) => {
  const [currentPath, setCurrentPath] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
  const lang = getLangFromUrl(new URL(window.location.href));
  const t = useTranslations(lang);

  useEffect(() => {
    // クライアントサイドでのみ実行
    setCurrentPath(window.location.pathname);

    // 初期化時に現在のページを含むカテゴリを展開する
    const path = window.location.pathname;
    const initialExpanded: { [key: string]: boolean } = {};

    tocItems[lang].forEach((category, index) => {
      if (category.items?.some(item => item.href === path)) {
        initialExpanded[index] = true;
      }
    });

    setExpandedCategories(initialExpanded);
  }, [lang, tocItems]);

  const items = tocItems[lang];

  const toggleCategory = (index: number) => {
    setExpandedCategories(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <nav className="py-2 md:py-4">
      <h2 className="text-xl font-semibold mb-4 text-[var(--heading-color)]">
        {t('toc.title')}
      </h2>

      <ul className="list-none p-0 m-0 space-y-2">
        {items?.map((category, categoryIndex) => (
          <li key={categoryIndex} className="mb-2">
            <div
              className="flex justify-between items-center p-2 font-medium cursor-pointer text-[var(--heading-color)] hover:bg-[var(--bg-hover)] rounded-md"
              onClick={() => toggleCategory(categoryIndex)}
              role="button"
              aria-expanded={!!expandedCategories[categoryIndex]}
              aria-controls={`category-items-${categoryIndex}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleCategory(categoryIndex);
                }
              }}
            >
              <span className="font-medium">{category.title}</span>
              <span
                className="text-xs transition-transform duration-200"
                style={{ transform: expandedCategories[categoryIndex] ? 'rotate(180deg)' : '' }}
                aria-label={expandedCategories[categoryIndex] ? t('toc.collapse') : t('toc.expand')}
              >
                ▲
              </span>
            </div>

            {expandedCategories[categoryIndex] && category.items && (
              <ul id={`category-items-${categoryIndex}`} className="list-none p-0 ml-4 mt-1 space-y-1">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a
                      href={item.href}
                      className={`block p-2 text-[var(--text-color)] no-underline rounded-md transition-all duration-200
                        ${currentPath === item.href
                          ? 'bg-[var(--bg-active)] text-[var(--text-active)] font-semibold'
                          : 'hover:bg-[var(--bg-hover)] hover:text-[var(--text-hover)]'}`}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TOCComponent;
