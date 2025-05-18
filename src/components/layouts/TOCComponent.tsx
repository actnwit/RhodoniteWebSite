import React, { useEffect, useState } from 'react';
import { getLangFromUrl, useTranslations } from '../../i18n/utils';

interface TOCItem {
  title: string;
  href: string;
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
  const lang = getLangFromUrl(new URL(window.location.href));
  const t = useTranslations(lang);

  useEffect(() => {
    // クライアントサイドでのみ実行
    setCurrentPath(window.location.pathname);
  }, []);

  const items = tocItems[lang];

  return (
    <nav className="py-2 md:py-4">
      <h2 className="text-xl font-semibold mb-4 text-[var(--heading-color)]">
        {t('toc.title')}
      </h2>

      <ul className="list-none p-0 m-0 space-y-1">
        {items?.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              className={`block p-2 text-[var(--text-color)] no-underline rounded-md transition-all duration-200
                ${currentPath === item.href
                  ? 'bg-[var(--bg-active)] text-[var(--text-active)] font-medium'
                  : 'hover:bg-[var(--bg-hover)] hover:text-[var(--text-hover)]'}`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TOCComponent;
