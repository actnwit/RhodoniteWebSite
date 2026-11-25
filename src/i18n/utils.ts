import { ui, defaultLang, docsLanguages } from './ui';

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

/**
 * Docs / Tutorials only exist for some languages.
 * Returns the language whose Docs / Tutorials pages should be linked from `lang`.
 */
export function getDocsLang(lang: Lang): Lang {
  return (docsLanguages as readonly string[]).includes(lang) ? lang : defaultLang;
}
