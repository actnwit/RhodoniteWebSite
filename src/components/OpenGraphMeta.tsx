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
}

export const OpenGraphMeta: React.FC<OpenGraphMetaProps> = ({
  title,
  description,
  image,
  url,
  siteName,
  type = 'website',
  locale = 'en_US',
  alternateLocales = []
}) => {
  return (
    <>
      {/* Open Graph メタタグ */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      {siteName && <meta property="og:site_name" content={siteName} />}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={locale} />

      {/* 代替ロケール */}
      {alternateLocales.map((altLocale) => (
        <meta key={altLocale} property="og:locale:alternate" content={altLocale} />
      ))}

      {/* Twitter Card メタタグ */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}

      {/* 基本的なメタタグ */}
      {title && <meta name="title" content={title} />}
      {description && <meta name="description" content={description} />}
    </>
  );
};
