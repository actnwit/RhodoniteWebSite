import React from 'react';
import { getDocsLang, useTranslations, type Lang } from '../../i18n/utils';
import { ArrowRightIcon, CheckIcon } from '../icons';
import { SectionHeading, WindowDots } from './SectionHeading';

interface QuickStartProps {
  lang: Lang;
  fileName: string;
  /** Highlighted code block rendered by Astro's <Code>. */
  children: React.ReactNode;
}

export const QuickStart: React.FC<QuickStartProps> = ({ lang, fileName, children }) => {
  const t = useTranslations(lang);
  const docsLang = getDocsLang(lang);
  const points = [t('code.point1'), t('code.point2'), t('code.point3')];

  return (
    <section className="relative overflow-hidden border-y border-line bg-ink-950/60">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 sm:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <SectionHeading
            align="left"
            eyebrow={t('code.eyebrow')}
            title={t('code.title')}
            description={t('code.description')}
          />
          <ul className="mt-8 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-body">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rhodo-500/15 text-rhodo-300">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <a
            href={`/${docsLang}/tutorials/`}
            className="group mt-10 inline-flex items-center gap-2 font-medium text-rhodo-300 transition-colors hover:text-rhodo-200"
          >
            {t('code.cta')}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="relative min-w-0">
          <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-rhodo-500/10 blur-3xl" aria-hidden="true" />
          <div className="overflow-hidden rounded-2xl border border-line-strong bg-ink-850 shadow-2xl shadow-black/50">
            <div className="flex items-center gap-3 border-b border-line bg-white/[0.02] px-4 py-3">
              <WindowDots />
              <span className="ml-1 rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-xs text-body">{fileName}</span>
            </div>
            <div className="code-window">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
