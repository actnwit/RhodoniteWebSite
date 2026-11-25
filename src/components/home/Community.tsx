import React from 'react';
import { useTranslations, type Lang } from '../../i18n/utils';
import { DISCORD_URL, GITHUB_URL } from '../../consts';
import { DiscordIcon, GitHubIcon, RhodoniteMark } from '../icons';

interface CommunityProps {
  lang: Lang;
}

export const Community: React.FC<CommunityProps> = ({ lang }) => {
  const t = useTranslations(lang);

  return (
    <section className="relative isolate overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-full h-[480px] w-[min(900px,140vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rhodo-500/20 blur-[120px]" />
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_80%_at_50%_100%,black,transparent)]" />
      </div>
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-28">
        <RhodoniteMark className="h-14 w-auto drop-shadow-[0_8px_30px_rgba(233,97,143,0.45)]" />
        <h2 className="mt-8 text-balance font-display text-3xl font-semibold tracking-[-0.02em] text-fg sm:text-4xl">
          {t('community.title')}
        </h2>
        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted sm:text-lg">{t('community.description')}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-fg px-6 font-semibold text-ink-900 transition-all hover:-translate-y-px hover:bg-white"
          >
            <GitHubIcon className="h-[18px] w-[18px]" />
            {t('hero.github')}
          </a>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-line-strong bg-white/[0.03] px-6 font-medium text-fg transition-colors hover:bg-white/[0.08]"
          >
            <DiscordIcon className="h-[17px] w-[17px]" />
            {t('hero.discord')}
          </a>
        </div>
      </div>
    </section>
  );
};
