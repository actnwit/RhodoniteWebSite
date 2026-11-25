import React from 'react';
import { getDocsLang, useTranslations, type Lang } from '../i18n/utils';
import { DISCORD_URL, EDITOR_URL, GITHUB_URL } from '../consts';
import { DiscordIcon, GitHubIcon, RhodoniteMark } from './icons';

interface FooterProps {
  lang: Lang;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = useTranslations(lang);
  const docsLang = getDocsLang(lang);

  const columns = [
    {
      title: t('footer.learn'),
      links: [
        { href: `/${docsLang}/docs/`, label: t('nav.docs') },
        { href: `/${docsLang}/tutorials/`, label: t('nav.tutorials') },
        { href: `/${lang}/api`, label: t('nav.api') },
      ],
    },
    {
      title: t('footer.community'),
      links: [
        { href: GITHUB_URL, label: t('nav.github'), external: true },
        { href: DISCORD_URL, label: t('nav.discord'), external: true },
        { href: EDITOR_URL, label: t('footer.editor'), external: true },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-line bg-ink-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rhodo-500/50 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <a href={`/${lang}/`} className="inline-flex items-center gap-2.5">
            <RhodoniteMark className="h-7 w-auto" />
            <span className="font-display text-lg font-semibold tracking-tight text-fg">Rhodonite</span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-muted">{t('footer.tagline')}</p>
          <div className="mt-6 flex gap-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener"
              aria-label={t('nav.github')}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <GitHubIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener"
              aria-label={t('nav.discord')}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <DiscordIcon className="h-[17px] w-[17px]" />
            </a>
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-subtle">{column.title}</h3>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...('external' in link && link.external ? { target: '_blank', rel: 'noopener' } : {})}
                    className="text-sm text-body transition-colors hover:text-rhodo-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} actnwit. {t('footer.license')}</p>
          <p className="font-mono">WebGL2 · WebGPU · TypeScript</p>
        </div>
      </div>
    </footer>
  );
};
