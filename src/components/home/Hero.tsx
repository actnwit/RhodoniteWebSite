import React from 'react';
import { getDocsLang, useTranslations, type Lang } from '../../i18n/utils';
import { DISCORD_URL, GITHUB_URL } from '../../consts';
import { ArrowRightIcon, DiscordIcon, GitHubIcon } from '../icons';
import { WindowDots } from './SectionHeading';

interface HeroProps {
  lang: Lang;
  videoSrc: string;
  posterSrc: string;
  /** Label shown in the viewport's title bar. */
  videoLabel: string;
  /** Slot for the (hydrated) install command. */
  children?: React.ReactNode;
}

const Corner: React.FC<{ className: string }> = ({ className }) => (
  <span className={`pointer-events-none absolute h-5 w-5 border-rhodo-300/70 ${className}`} aria-hidden="true" />
);

export const Hero: React.FC<HeroProps> = ({ lang, videoSrc, posterSrc, videoLabel, children }) => {
  const t = useTranslations(lang);
  const docsLang = getDocsLang(lang);

  return (
    <section className="relative isolate -mt-16 overflow-hidden pt-16">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-48 left-1/2 h-[560px] w-[min(1000px,140vw)] -translate-x-1/2 rounded-full bg-rhodo-500/20 blur-[120px]" />
        <div className="absolute right-[-8%] top-[38%] h-[380px] w-[480px] rounded-full bg-rhodo-700/25 blur-[120px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink-900" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.03] px-3 py-1 font-mono text-xs text-body">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rhodo-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rhodo-500" />
            </span>
            {t('hero.badge')}
          </span>

          <h1 className="mt-6 text-balance font-display text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.035em] text-fg sm:text-6xl lg:text-[4.1rem]">
            <span className="block">{t('hero.title_lead')}</span>
            <span className="block text-gradient pb-1">{t('hero.title_accent')}</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">{t('hero.description')}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={`/${docsLang}/docs/`}
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-rhodo-500 px-6 font-semibold text-white shadow-[0_10px_40px_-10px_rgba(233,97,143,0.8)] transition-all hover:-translate-y-px hover:bg-rhodo-400"
            >
              {t('hero.get_started')}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-line-strong bg-white/[0.03] px-5 font-medium text-fg transition-colors hover:bg-white/[0.08]"
            >
              <GitHubIcon className="h-[18px] w-[18px]" />
              {t('hero.github')}
            </a>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-line-strong bg-white/[0.03] px-5 font-medium text-fg transition-colors hover:bg-white/[0.08]"
            >
              <DiscordIcon className="h-[17px] w-[17px]" />
              {t('hero.discord')}
            </a>
          </div>

          {children && <div className="mt-8">{children}</div>}
        </div>

        {/* Viewport */}
        <figure className="relative animate-rise [animation-delay:120ms]">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-rhodo-500/25 via-transparent to-rhodo-300/10 blur-2xl" aria-hidden="true" />
          <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink-800 shadow-2xl shadow-black/60">
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <WindowDots />
              <span className="ml-1 truncate font-mono text-xs text-muted">{videoLabel}</span>
            </div>
            <div className="relative">
              {/*
                初期表示ではポスター画像だけを出し、動画は読み込まない（src は data-src に置く）。
                ページの load 後に Welcome.astro のスクリプトが読み込み・再生を始めるので、
                動画のダウンロードがナビゲーションなどの JS と帯域を奪い合わない。
              */}
              <video
                id="hero-video"
                data-src={videoSrc}
                poster={posterSrc}
                width={1280}
                height={720}
                loop
                muted
                playsInline
                preload="none"
                aria-hidden="true"
                className="block aspect-video w-full object-cover"
              />
              <Corner className="left-3 top-3 border-l-2 border-t-2" />
              <Corner className="right-3 top-3 border-r-2 border-t-2" />
              <Corner className="bottom-3 left-3 border-b-2 border-l-2" />
              <Corner className="bottom-3 right-3 border-b-2 border-r-2" />
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
};
