import { getLangFromUrl, useTranslations } from '../i18n/utils';

export interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName: string;
  type: 'website' | 'article' | 'profile';
  locale: string;
  alternateLocales: string[];
}

/**
 * 言語コードをOpen Graph locale形式に変換
 */
export function langToOGLocale(lang: string): string {
  const localeMap: Record<string, string> = {
    'en': 'en_US',
    'ja': 'ja_JP',
    'tr': 'tr_TR'
  };
  return localeMap[lang] || 'en_US';
}

/**
 * 代替ロケールを生成
 */
export function getAlternateLocales(currentLang: string): string[] {
  const allLangs = ['en', 'ja', 'tr'];
  return allLangs
    .filter(lang => lang !== currentLang)
    .map(lang => langToOGLocale(lang));
}

/**
 * ページのOpen Graphデータを生成
 */
export function generateOpenGraphData(
  url: URL,
  customTitle?: string,
  customDescription?: string,
  customImage?: string,
  type: 'website' | 'article' | 'profile' = 'website'
): OpenGraphData {
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  // 基本的なサイト情報
  const baseUrl = `${url.protocol}//${url.host}`;
  const currentUrl = url.toString();

  // デフォルト画像（最適化されたOpen Graph画像を使用）
  const defaultImage = `${baseUrl}/og-image.jpg`;

  return {
    title: customTitle || t('og.title'),
    description: customDescription || t('og.description'),
    image: customImage || defaultImage,
    url: currentUrl,
    siteName: t('og.site_name'),
    type,
    locale: langToOGLocale(lang),
    alternateLocales: getAlternateLocales(lang)
  };
}

/**
 * 記事ページ用のOpen Graphデータを生成
 */
export function generateArticleOpenGraphData(
  url: URL,
  title: string,
  description?: string,
  image?: string
): OpenGraphData {
  return generateOpenGraphData(url, title, description, image, 'article');
}
