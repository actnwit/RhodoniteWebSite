import React from 'react';
import TOCComponent from './TOCComponent';
import ContentStyles from './ContentStyles';

interface ContentLayoutProps {
  tocItems: {
    en: Array<{ title: string; href: string }>;
    ja: Array<{ title: string; href: string }>;
  };
  children: React.ReactNode;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ tocItems, children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 max-w-7xl mx-auto p-8">
      <aside className="sticky top-8 h-[calc(100vh-4rem)] overflow-y-auto pr-4 border-r border-[var(--border-color)]">
        <nav>
          <TOCComponent tocItems={tocItems} />
        </nav>
      </aside>

      <main className="min-w-0">
        <ContentStyles>
          {children}
        </ContentStyles>
      </main>
    </div>
  );
};

export default ContentLayout;
