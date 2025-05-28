import React from 'react';

interface OpenGraphMetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
  type?: 'website' | 'article' | 'profile';
  locale?: string;
  alternateLocales?: string[];
  twitterSite?: string;
  twitterCreator?: string;
}

export const OpenGraphMeta: React.FC<OpenGraphMetaProps> = ({
  title,
  description,
  image,
  url,
  siteName,
  type = 'website',
  locale = 'en_US',
  alternateLocales = [],
  twitterSite = '@RhodoniteTS',
  twitterCreator = '@RhodoniteTS'
}) => {
  return (
    <>
      {/* Open Graph メタタグ */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:secure_url" content={image} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:alt" content={title ? `${siteName} - ${title}` : siteName || 'RhodoniteTS'} />
        </>
      )}
      {url && <meta property="og:url" content={url} />}
      {siteName && <meta property="og:site_name" content={siteName} />}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />

      {/* 代替ロケール */}
      {alternateLocales.map((altLocale) => (
        <meta key={altLocale} property="og:locale:alternate" content={altLocale} />
      ))}

      {/* Twitter Card メタタグ（X対応強化版） */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && (
        <>
          <meta name="twitter:image" content={image} />
          <meta name="twitter:image:alt" content={title ? `${siteName} - ${title}` : siteName || 'RhodoniteTS'} />
        </>
      )}

      {/* X(Twitter)のbot用追加メタタグ */}
      <meta name="twitter:dnt" content="on" />
      <meta name="twitter:widgets:csp" content="on" />

      {/* 基本的なメタタグ */}
      {title && <meta name="title" content={title} />}
      {description && <meta name="description" content={description} />}
      <meta name="robots" content="index,follow,max-image-preview:large" />
    </>
  );
};
