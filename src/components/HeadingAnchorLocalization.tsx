import React, { useEffect } from 'react';
import { getLangFromUrl, useTranslations } from '../i18n/utils';
import { defaultLang } from '../i18n/ui';

interface HeadingAnchorLocalizationProps {
  children: React.ReactNode;
}

/**
 * 見出しテキストからIDを生成する関数
 * github-sluggerライブラリのロジックをシンプル化したもの
 */
function generateIdFromHeading(text: string): string {
  if (!text) return '';

  // 小文字に変換し、空白などをハイフンに置き換える
  return text
    .toLowerCase()
    .trim()
    // 複数の空白文字を1つのハイフンに置き換え
    .replace(/\s+/g, '-')
    // アルファベット、数字、ハイフン以外の文字を削除
    .replace(/[^a-z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF-]/g, '')
    // ハイフンが連続する場合、1つのハイフンにまとめる
    .replace(/-+/g, '-')
    // 先頭と末尾のハイフンを削除
    .replace(/^-|-$/g, '');
}

/**
 * アンカーリンクの多言語対応を行うコンポーネント
 * ページ読み込み時に実行され、各アンカーリンクのタイトル属性を現在の言語に合わせて設定する
 */
const HeadingAnchorLocalization: React.FC<HeadingAnchorLocalizationProps> = ({ children }) => {
  // windowオブジェクトへのアクセスをuseEffect内に移動し、サーバーサイドレンダリング時のエラーを回避
  useEffect(() => {
    try {
      // クライアントサイドでのみ実行
      const lang = getLangFromUrl(new URL(window.location.href));
      const t = useTranslations(lang);

      // data-i18n-key属性を持つすべての要素を取得
      const elementsWithI18nKeys = document.querySelectorAll('[data-i18n-key]');

      // 各要素に対して翻訳を適用
      elementsWithI18nKeys.forEach((element) => {
        const i18nKey = element.getAttribute('data-i18n-key');
        if (i18nKey) {
          const translatedValue = t(i18nKey as any);
          // 親要素のtitle属性を設定（アンカーリンク自体のタイトル）
          const anchorElement = element.closest('.heading-anchor');
          if (anchorElement) {
            anchorElement.setAttribute('title', translatedValue);
          }
        }
      });

      // アンカーIDを表示するためのデバッグ情報
      const headings = document.querySelectorAll('h2, h3');
      console.debug('=== Available heading IDs ===');
      headings.forEach(heading => {
        const text = heading.textContent || '';
        const actualId = heading.id;
        const generatedId = generateIdFromHeading(text);
        console.debug(`Text: "${text}"`);
        console.debug(`  - Actual ID: "${actualId}"`);
        console.debug(`  - Generated ID: "${generatedId}"`);
      });

      // URLにハッシュフラグメントがある場合、そのセクションにスクロール
      setTimeout(() => {
        if (window.location.hash) {
          // '#'を除去し、URLデコードする
          const hash = decodeURIComponent(window.location.hash.substring(1));
          console.debug(`Searching for hash fragment: "${hash}"`);

          // 直接IDで要素を探す
          let targetElement = document.getElementById(hash);

          if (targetElement) {
            console.debug(`Found element with ID: ${hash}`);
            // スムーズにスクロール
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            console.debug(`No element found with exact ID: ${hash}, trying to match by heading text`);
            // IDが直接見つからない場合、h2やh3のテキスト内容からIDを探す
            const headings = document.querySelectorAll('h2, h3');
            let foundMatch = false;

            // まず完全一致を試みる
            for (const heading of headings) {
              const headingContent = heading.textContent || '';
              const generatedId = generateIdFromHeading(headingContent);

              console.debug(`Comparing generated ID: "${generatedId}" with hash: "${hash}"`);

              if (generatedId === hash) {
                console.debug(`Found exact match for heading: "${headingContent}"`);
                foundMatch = true;
                // IDを設定して、そこにスクロール
                heading.id = generatedId;
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
                break;
              }
            }

            // 完全一致がなければ、部分一致を試みる
            if (!foundMatch) {
              console.debug(`No exact match found, trying partial match`);
              for (const heading of headings) {
                const headingContent = heading.textContent || '';
                const generatedId = generateIdFromHeading(headingContent);

                // ハッシュがIDの一部に含まれているか、またはその逆のケース
                if (generatedId.includes(hash) || hash.includes(generatedId)) {
                  console.debug(`Found partial match for heading: "${headingContent}"`);
                  foundMatch = true;
                  // IDを設定して、そこにスクロール
                  heading.id = generatedId;
                  heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  break;
                }
              }
            }

            if (!foundMatch) {
              console.debug(`No matching heading found for: ${hash}`);
            }
          }
        }
      }, 500); // コンテンツがレンダリングされるのを待つために遅延を設定
    } catch (error) {
      console.error('HeadingAnchorLocalization error:', error);
    }
  }, []); // 依存配列を空にして、マウント時に1回だけ実行

  return <>{children}</>;
};

export default HeadingAnchorLocalization;
