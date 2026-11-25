import React from 'react';

interface DocHeaderProps {
  section: string;
  title: string;
  description?: string;
}

/** Docs / Tutorials の記事ヘッダー（frontmatter の title / description を表示） */
export const DocHeader: React.FC<DocHeaderProps> = ({ section, title, description }) => (
  <header className="mb-10 border-b border-line pb-8">
    <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-rhodo-400">{section}</p>
    <h1 className="mt-3 text-balance font-display text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-fg sm:text-[2.6rem]">
      {title}
    </h1>
    {description && <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">{description}</p>}
  </header>
);
