import React from 'react';

interface ContentStylesProps {
  children: React.ReactNode;
}

// 本文のラッパー。タイポグラフィは DocLayout.astro 側の .content-wrapper（content.css）で適用する
const ContentStyles: React.FC<ContentStylesProps> = ({ children }) => {
  return <div className="max-w-full">{children}</div>;
};

export default ContentStyles;
