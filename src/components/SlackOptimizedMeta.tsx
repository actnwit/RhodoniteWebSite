import React from 'react';

interface SlackOptimizedMetaProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

export const SlackOptimizedMeta: React.FC<SlackOptimizedMetaProps> = ({
  title,
  description,
  image,
  url
}) => {
  return (
    <>
      {/* Slack用の追加メタタグ */}
      <meta name="slack-app-id" content="A0F7XDUAZ" />

      {/* より確実なOpen Graphメタタグ */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Slackが好む追加のメタタグ */}
      <meta name="description" content={description} />
      <meta name="author" content="RhodoniteTS Team" />
      <meta name="robots" content="index,follow" />

      {/* Twitter Card（Slackでも参照される） */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* 追加のソーシャルメディア対応 */}
      <meta property="article:author" content="RhodoniteTS Team" />
      <meta property="article:publisher" content="https://librn.com" />
    </>
  );
};
