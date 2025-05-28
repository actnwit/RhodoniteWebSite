import React from 'react';

interface TwitterOptimizedMetaProps {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName: string;
  creator?: string;
  site?: string;
}

export const TwitterOptimizedMeta: React.FC<TwitterOptimizedMetaProps> = ({
  title,
  description,
  image,
  url,
  siteName,
  creator = '@RhodoniteTS',
  site = '@RhodoniteTS'
}) => {
  return (
    <>
      {/* Twitter Card メタタグ（X対応） */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={site} />
      <meta name="twitter:creator" content={creator} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${siteName} - ${title}`} />

      {/* X(Twitter)が参照するOpen Graphメタタグ */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content={`${siteName} - ${title}`} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />

      {/* 追加のメタタグ（X対応） */}
      <meta name="description" content={description} />
      <meta name="author" content="RhodoniteTS Team" />
      <meta name="robots" content="index,follow,max-image-preview:large" />

      {/* X(Twitter)のbot用 */}
      <meta name="twitter:dnt" content="on" />
      <meta name="twitter:widgets:csp" content="on" />
    </>
  );
};
