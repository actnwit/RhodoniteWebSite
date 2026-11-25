import { useEffect, useRef, useState } from 'react';
import { useTranslations, type Lang } from '../../i18n/utils';
import { NPM_INSTALL_COMMAND } from '../../consts';
import { CheckIcon, CopyIcon } from '../icons';

interface CopyCommandProps {
  lang: Lang;
}

export const CopyCommand = ({ lang }: CopyCommandProps) => {
  const t = useTranslations(lang);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(NPM_INSTALL_COMMAND);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API が使えない環境では何もしない（コマンドは選択してコピーできる）
    }
  };

  return (
    <div className="inline-flex max-w-full items-center gap-3 rounded-xl border border-line bg-ink-850/80 py-1.5 pl-4 pr-1.5 font-mono text-sm backdrop-blur">
      <span className="select-none text-rhodo-400" aria-hidden="true">$</span>
      <code className="truncate text-body">{NPM_INSTALL_COMMAND}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={t('hero.copy')}
        title={t('hero.copy')}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
      >
        {copied ? <CheckIcon className="h-4 w-4 text-rhodo-300" /> : <CopyIcon className="h-4 w-4" />}
      </button>
      <span className="sr-only" aria-live="polite">{copied ? t('hero.copied') : ''}</span>
    </div>
  );
};
