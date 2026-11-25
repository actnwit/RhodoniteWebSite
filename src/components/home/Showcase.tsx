import React from 'react';
import { useTranslations, type Lang } from '../../i18n/utils';
import { SectionHeading } from './SectionHeading';

interface ShowcaseImage {
  src: string;
  width: number;
  height: number;
}

interface ShowcaseProps {
  lang: Lang;
  images: {
    pbr: ShowcaseImage;
    vrm: ShowcaseImage;
    shader: ShowcaseImage;
  };
}

export const Showcase: React.FC<ShowcaseProps> = ({ lang, images }) => {
  const t = useTranslations(lang);

  const items = [
    { image: images.pbr, title: t('showcase.pbr.title'), description: t('showcase.pbr.description') },
    { image: images.vrm, title: t('showcase.vrm.title'), description: t('showcase.vrm.description') },
    { image: images.shader, title: t('showcase.shader.title'), description: t('showcase.shader.description') },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <SectionHeading
        eyebrow={t('showcase.eyebrow')}
        title={t('showcase.title')}
        description={t('showcase.description')}
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {items.map(({ image, title, description }) => (
          <figure
            key={title}
            className="group overflow-hidden rounded-2xl border border-line bg-ink-800 transition-colors duration-300 hover:border-rhodo-500/40"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-ink-700">
              <img
                src={image.src}
                width={image.width}
                height={image.height}
                alt={title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-800/70 via-transparent to-transparent" aria-hidden="true" />
            </div>
            <figcaption className="p-5">
              <h3 className="font-display text-base font-semibold tracking-tight text-fg">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
