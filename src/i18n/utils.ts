import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  console.log('URL pathname:', url.pathname);
  console.log('Extracted lang:', lang);
  console.log('Available langs:', Object.keys(ui));
  if (lang && lang in ui) {
    console.log('Using lang:', lang);
    return lang as keyof typeof ui;
  }
  console.log('Using default lang:', defaultLang);
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
} 