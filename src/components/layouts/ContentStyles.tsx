import React from 'react';

interface ContentStylesProps {
  children: React.ReactNode;
}

// 改良したスタイリングラッパー：Tailwindクラスを使用
const ContentStyles: React.FC<ContentStylesProps> = ({ children }) => {
  return (
    <div className="content-wrapper max-w-full overflow-hidden break-words">
      {children}
    </div>
  );
};

export default ContentStyles;
