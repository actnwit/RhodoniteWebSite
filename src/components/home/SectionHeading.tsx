import React from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, description, align = 'center' }) => (
  <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
    <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-rhodo-400">{eyebrow}</p>
    <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-[-0.02em] text-fg sm:text-4xl">
      {title}
    </h2>
    {description && <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
  </div>
);

/** Three window-control dots used on framed panels. */
export const WindowDots: React.FC = () => (
  <span className="flex gap-1.5" aria-hidden="true">
    <span className="h-2.5 w-2.5 rounded-full bg-ink-500" />
    <span className="h-2.5 w-2.5 rounded-full bg-ink-500" />
    <span className="h-2.5 w-2.5 rounded-full bg-ink-500" />
  </span>
);
