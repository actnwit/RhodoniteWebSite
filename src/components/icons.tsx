import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

const stroke = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

/** Rhodonite gem mark (same geometry as the logo / favicon). */
export const RhodoniteMark: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="76 21 303 445" aria-hidden="true" {...props}>
    <path fill="#e9618f" d="M211 70 80 200v131l131 131 132-131-132-131z" />
    <path fill="#f7bfd2" d="m211 70 132 130v131L211 200z" />
    <path fill="#f7bfd2" d="M321 25h22v32h32v22h-32v33h-22V79h-33V57h33z" />
  </svg>
);

export const GitHubIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

export const DiscordIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69Zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69Z" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = (props) => (
  <svg {...stroke} {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export const ExternalIcon: React.FC<IconProps> = (props) => (
  <svg {...stroke} {...props}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
);

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <svg {...stroke} {...props}><path d="m6 9 6 6 6-6" /></svg>
);

export const GlobeIcon: React.FC<IconProps> = (props) => (
  <svg {...stroke} {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
);

export const CopyIcon: React.FC<IconProps> = (props) => (
  <svg {...stroke} {...props}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a1 1 0 0 1 1-1h10" /></svg>
);

export const CheckIcon: React.FC<IconProps> = (props) => (
  <svg {...stroke} {...props}><path d="m5 12 5 5 9-10" /></svg>
);

export const MenuIcon: React.FC<IconProps> = (props) => (
  <svg {...stroke} {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);

export const CloseIcon: React.FC<IconProps> = (props) => (
  <svg {...stroke} {...props}><path d="M6 6l12 12M18 6 6 18" /></svg>
);

/* ---- Feature icons ---- */

export const LayersIcon: React.FC<IconProps> = (props) => (
  <svg {...stroke} {...props}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></svg>
);

export const MemoryIcon: React.FC<IconProps> = (props) => (
  <svg {...stroke} {...props}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 10v4M11 10v4M15 10v4M7 3v3M12 3v3M17 3v3M7 18v3M12 18v3M17 18v3" /></svg>
);

export const ComponentIcon: React.FC<IconProps> = (props) => (
  <svg {...stroke} {...props}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><path d="M17.5 14v7M14 17.5h7" /></svg>
);

export const SunIcon: React.FC<IconProps> = (props) => (
  <svg {...stroke} {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);

export const AvatarIcon: React.FC<IconProps> = (props) => (
  <svg {...stroke} {...props}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
);

export const PackageIcon: React.FC<IconProps> = (props) => (
  <svg {...stroke} {...props}><path d="m21 8-9-5-9 5v8l9 5 9-5V8Z" /><path d="m3 8 9 5 9-5M12 13v8" /></svg>
);
