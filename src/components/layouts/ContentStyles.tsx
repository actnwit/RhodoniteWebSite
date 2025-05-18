import React from 'react';

interface ContentStylesProps {
  children: React.ReactNode;
}

// シンプル化したスタイリングラッパー
const ContentStyles: React.FC<ContentStylesProps> = ({ children }) => {
  return (
    <div className="content-wrapper">
      {children}
    </div>
  );
};

export default ContentStyles;
