import React, { useState, useEffect } from 'react';
import { getDocsLang, useTranslations, type Lang } from '../i18n/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import { DISCORD_URL, GITHUB_URL } from '../consts';
import { CloseIcon, DiscordIcon, ExternalIcon, GitHubIcon, MenuIcon, RhodoniteMark } from './icons';

interface NavigationProps {
  lang: Lang;
  /** Current pathname (from Astro.url) so that SSR and client render the same active state. */
  pathname: string;
}

type NavSection = 'home' | 'docs' | 'tutorials' | 'api';

function getActiveSection(pathname: string): NavSection | null {
  const rest = '/' + pathname.split('/').slice(2).join('/');
  if (rest === '/' || rest === '') return 'home';
  if (rest.startsWith('/docs')) return 'docs';
  if (rest.startsWith('/tutorials')) return 'tutorials';
  if (rest.startsWith('/api')) return 'api';
  return null;
}

export const Navigation: React.FC<NavigationProps> = ({ lang, pathname }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations(lang);
  const docsLang = getDocsLang(lang);
  const active = getActiveSection(pathname);

  // メニューが開いている間はスクロールを止める
  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isMenuOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const navItems: { id: NavSection; href: string; label: string }[] = [
    { id: 'home', href: `/${lang}/`, label: t('nav.home') },
    { id: 'docs', href: `/${docsLang}/docs/`, label: t('nav.docs') },
    { id: 'tutorials', href: `/${docsLang}/tutorials/`, label: t('nav.tutorials') },
    { id: 'api', href: `/${lang}/api`, label: t('nav.api') },
  ];

  const externalItems = [
    { href: GITHUB_URL, label: t('nav.github'), Icon: GitHubIcon },
    { href: DISCORD_URL, label: t('nav.discord'), Icon: DiscordIcon },
  ];

  return (
    <div data-site-header className="sticky top-0 z-50">
      <header className="border-b border-line bg-ink-900/70 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href={`/${lang}/`} className="group flex items-center gap-2.5 rounded-md" aria-label="RhodoniteTS">
            <RhodoniteMark className="h-7 w-auto transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-105" />
            <span className="font-display text-[1.0625rem] font-semibold tracking-tight text-fg">
              Rhodonite
            </span>
            <span className="rounded-md border border-line-strong px-1.5 py-px font-mono text-[10px] font-medium text-muted">
              TS
            </span>
          </a>

          {/* Desktop */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-fg' : 'text-muted hover:bg-white/[0.04] hover:text-fg'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-[13px] h-px bg-gradient-to-r from-transparent via-rhodo-400 to-transparent" />
                  )}
                </a>
              );
            })}

            <span className="mx-2 h-5 w-px bg-line-strong" aria-hidden="true" />

            <LanguageSwitcher lang={lang} pathname={pathname} />

            {externalItems.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener"
                aria-label={label}
                title={label}
                className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </nav>

          {/* Mobile */}
          <div className="flex items-center gap-1 md:hidden">
            <LanguageSwitcher lang={lang} pathname={pathname} />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-lg text-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="sr-only">{t('nav.toggleMenu')}</span>
              {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full z-40 border-b border-line bg-ink-900/95 backdrop-blur-xl transition-all duration-200 ease-out md:hidden ${
          isMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4" aria-label="Mobile">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                  isActive ? 'bg-rhodo-500/10 text-rhodo-300' : 'text-body hover:bg-white/[0.04] hover:text-fg'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="my-2 h-px bg-line" />
          {externalItems.map(({ href, label, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-body transition-colors hover:bg-white/[0.04] hover:text-fg"
            >
              <Icon className="h-5 w-5" />
              {label}
              <ExternalIcon className="ml-auto h-4 w-4 text-subtle" />
            </a>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-x-0 bottom-0 top-16 -z-10 bg-black/60 transition-opacity duration-200 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
    </div>
  );
};
