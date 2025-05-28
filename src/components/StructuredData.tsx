import React from 'react';

interface WebsiteStructuredDataProps {
  name: string;
  description: string;
  url: string;
  logo?: string;
  sameAs?: string[];
}

interface ArticleStructuredDataProps {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
  };
  publisher?: {
    name: string;
    logo?: string;
  };
  image?: string;
}

interface SoftwareApplicationStructuredDataProps {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  programmingLanguage: string;
  codeRepository?: string;
  license?: string;
  version?: string;
}

export const WebsiteStructuredData: React.FC<WebsiteStructuredDataProps> = ({
  name,
  description,
  url,
  logo,
  sameAs = []
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "description": description,
    "url": url,
    ...(logo && { "logo": logo }),
    ...(sameAs.length > 0 && { "sameAs": sameAs })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export const ArticleStructuredData: React.FC<ArticleStructuredDataProps> = ({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  author,
  publisher,
  image
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "url": url,
    ...(datePublished && { "datePublished": datePublished }),
    ...(dateModified && { "dateModified": dateModified }),
    ...(author && { "author": { "@type": "Person", "name": author.name, ...(author.url && { "url": author.url }) } }),
    ...(publisher && { "publisher": { "@type": "Organization", "name": publisher.name, ...(publisher.logo && { "logo": publisher.logo }) } }),
    ...(image && { "image": image })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export const SoftwareApplicationStructuredData: React.FC<SoftwareApplicationStructuredDataProps> = ({
  name,
  description,
  url,
  applicationCategory,
  operatingSystem,
  programmingLanguage,
  codeRepository,
  license,
  version
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": applicationCategory,
    "operatingSystem": operatingSystem,
    "programmingLanguage": programmingLanguage,
    ...(codeRepository && { "codeRepository": codeRepository }),
    ...(license && { "license": license }),
    ...(version && { "softwareVersion": version })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
