import React from 'react';
import { useTranslations, type Lang } from '../../i18n/utils';
import { EDITOR_URL } from '../../consts';
import { ExternalIcon } from '../icons';
import { WindowDots } from './SectionHeading';

interface EditorCtaProps {
  lang: Lang;
  image: { src: string; width: number; height: number };
}

export const EditorCta: React.FC<EditorCtaProps> = ({ lang, image }) => {
  const t = useTranslations(lang);
  const editorHost = new URL(EDITOR_URL).host;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8">
      <div className="relative isolate overflow-hidden rounded-3xl border border-line-strong bg-ink-800">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-rhodo-500/20 blur-[100px]" />
          <div className="absolute inset-0 bg-grid opacity-60 [mask-image:linear-gradient(to_right,black,transparent_60%)]" />
        </div>

        <div className="grid items-center gap-12 p-7 sm:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:p-14">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-rhodo-400">{t('editor.eyebrow')}</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-fg sm:text-4xl">
              {t('editor.title')}
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted">{t('editor.description')}</p>
            <a
              href={EDITOR_URL}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-rhodo-500 px-6 font-semibold text-white shadow-[0_10px_40px_-10px_rgba(233,97,143,0.8)] transition-all hover:-translate-y-px hover:bg-rhodo-400"
            >
              {t('editor.launch')}
              <ExternalIcon className="h-4 w-4" />
            </a>
          </div>

          <a
            href={EDITOR_URL}
            target="_blank"
            rel="noopener"
            tabIndex={-1}
            aria-hidden="true"
            className="group block min-w-0 overflow-hidden rounded-xl border border-line-strong bg-ink-900 shadow-2xl shadow-black/60"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
              <WindowDots />
              <span className="mx-auto flex max-w-[60%] items-center truncate rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-muted">
                {editorHost}
              </span>
              <span className="w-[42px]" />
            </div>
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              alt=""
              loading="lazy"
              decoding="async"
              className="block w-full transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />
          </a>
        </div>
      </div>
    </section>
  );
};
