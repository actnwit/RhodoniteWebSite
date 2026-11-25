import React from 'react';
import { useTranslations, type Lang } from '../../i18n/utils';
import { AvatarIcon, ComponentIcon, LayersIcon, MemoryIcon, PackageIcon, SunIcon } from '../icons';
import { SectionHeading } from './SectionHeading';

interface FeatureGridProps {
  lang: Lang;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ lang }) => {
  const t = useTranslations(lang);

  const features = [
    { Icon: LayersIcon, title: t('features.backends.title'), description: t('features.backends.description') },
    { Icon: MemoryIcon, title: t('features.memory.title'), description: t('features.memory.description') },
    { Icon: ComponentIcon, title: t('features.component.title'), description: t('features.component.description') },
    { Icon: SunIcon, title: t('features.pbr.title'), description: t('features.pbr.description') },
    { Icon: AvatarIcon, title: t('features.vrm.title'), description: t('features.vrm.description') },
    { Icon: PackageIcon, title: t('features.treeshake.title'), description: t('features.treeshake.description') },
  ];

  const more = [
    t('features.more.shader_nodes'),
    t('features.more.raymarching'),
    t('features.more.physics'),
    t('features.more.clustered'),
    t('features.more.compression'),
    t('features.more.effekseer'),
    t('features.more.webxr'),
  ];

  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading
        eyebrow={t('features.eyebrow')}
        title={t('features.title')}
        description={t('features.description')}
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ Icon, title, description }) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-ink-800 to-ink-850 p-6 transition-colors duration-300 hover:border-rhodo-500/40"
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-rhodo-500/0 blur-3xl transition-colors duration-500 group-hover:bg-rhodo-500/15"
              aria-hidden="true"
            />
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-rhodo-500/25 bg-rhodo-500/10 text-rhodo-300">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-fg">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">{t('features.more.label')}</p>
        <ul className="flex max-w-4xl flex-wrap justify-center gap-2">
          {more.map((item) => (
            <li
              key={item}
              className="rounded-full border border-line bg-white/[0.02] px-3.5 py-1.5 text-sm text-body"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
