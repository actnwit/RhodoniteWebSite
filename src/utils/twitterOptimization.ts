/**
 * X(Twitter)でリンクプレビューが表示されない原因と対策
 */

export interface TwitterOptimizationChecklist {
  hasValidTwitterCard: boolean;
  hasValidTwitterTitle: boolean;
  hasValidTwitterDescription: boolean;
  hasValidTwitterImage: boolean;
  hasValidTwitterSite: boolean;
  hasValidOgImage: boolean;
  hasValidOgTitle: boolean;
  hasValidOgDescription: boolean;
  hasValidOgUrl: boolean;
  imageIsAccessible: boolean;
  imageIsCorrectSize: boolean;
  hasHttps: boolean;
  hasValidContentType: boolean;
  hasImageAlt: boolean;
}

/**
 * X(Twitter)のCard要件をチェック
 */
export async function checkTwitterCompatibility(url: string): Promise<TwitterOptimizationChecklist> {
  const result: TwitterOptimizationChecklist = {
    hasValidTwitterCard: false,
    hasValidTwitterTitle: false,
    hasValidTwitterDescription: false,
    hasValidTwitterImage: false,
    hasValidTwitterSite: false,
    hasValidOgImage: false,
    hasValidOgTitle: false,
    hasValidOgDescription: false,
    hasValidOgUrl: false,
    imageIsAccessible: false,
    imageIsCorrectSize: false,
    hasHttps: url.startsWith('https://'),
    hasValidContentType: false,
    hasImageAlt: false
  };

  try {
    // HTMLを取得してメタタグをチェック
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Twitterbot/1.0'
      }
    });
    const html = await response.text();

    // Twitter Cardメタタグの存在確認
    result.hasValidTwitterCard = html.includes('name="twitter:card"');
    result.hasValidTwitterTitle = html.includes('name="twitter:title"');
    result.hasValidTwitterDescription = html.includes('name="twitter:description"');
    result.hasValidTwitterImage = html.includes('name="twitter:image"');
    result.hasValidTwitterSite = html.includes('name="twitter:site"');
    result.hasImageAlt = html.includes('name="twitter:image:alt"');

    // Open Graphメタタグの存在確認
    result.hasValidOgTitle = html.includes('property="og:title"');
    result.hasValidOgDescription = html.includes('property="og:description"');
    result.hasValidOgUrl = html.includes('property="og:url"');
    result.hasValidOgImage = html.includes('property="og:image"');

    // 画像URLを抽出（Twitter CardまたはOpen Graph）
    const twitterImageMatch = html.match(/name="twitter:image"\s+content="([^"]+)"/);
    const ogImageMatch = html.match(/property="og:image"\s+content="([^"]+)"/);
    const imageUrl = twitterImageMatch?.[1] || ogImageMatch?.[1];

    if (imageUrl) {
      try {
        // 画像のアクセシビリティをチェック
        const imageResponse = await fetch(imageUrl, {
          method: 'HEAD',
          headers: {
            'User-Agent': 'Twitterbot/1.0'
          }
        });
        result.imageIsAccessible = imageResponse.ok;
        result.hasValidContentType = imageResponse.headers.get('content-type')?.startsWith('image/') || false;

        // 画像サイズをチェック（理想的には1200x630）
        const contentLength = imageResponse.headers.get('content-length');
        if (contentLength) {
          const size = parseInt(contentLength);
          // 5KB以上、5MB以下が理想的
          result.imageIsCorrectSize = size > 5000 && size < 5000000;
        }
      } catch (error) {
        console.warn('画像チェックエラー:', error);
      }
    }

  } catch (error) {
    console.error('Twitter互換性チェックエラー:', error);
  }

  return result;
}

/**
 * X(Twitter)でリンクプレビューが表示されない理由を診断
 */
export function diagnoseTwitterIssues(checklist: TwitterOptimizationChecklist): string[] {
  const issues: string[] = [];

  if (!checklist.hasHttps) {
    issues.push('🔒 HTTPSが必要です。X(Twitter)はHTTPSのURLのみプレビューを表示します。');
  }

  if (!checklist.hasValidTwitterCard) {
    issues.push('🃏 twitter:cardメタタグが見つかりません。summary_large_imageが推奨されます。');
  }

  if (!checklist.hasValidTwitterTitle) {
    issues.push('📝 twitter:titleメタタグが見つかりません。');
  }

  if (!checklist.hasValidTwitterDescription) {
    issues.push('📄 twitter:descriptionメタタグが見つかりません。');
  }

  if (!checklist.hasValidTwitterImage) {
    issues.push('🖼️ twitter:imageメタタグが見つかりません。');
  }

  if (!checklist.hasValidTwitterSite) {
    issues.push('🏢 twitter:siteメタタグが見つかりません。@usernameの形式で設定してください。');
  }

  if (!checklist.hasImageAlt) {
    issues.push('🏷️ twitter:image:altメタタグが見つかりません。アクセシビリティのため推奨されます。');
  }

  if (!checklist.hasValidOgTitle) {
    issues.push('📝 og:titleメタタグが見つかりません。');
  }

  if (!checklist.hasValidOgDescription) {
    issues.push('📄 og:descriptionメタタグが見つかりません。');
  }

  if (!checklist.hasValidOgImage) {
    issues.push('🖼️ og:imageメタタグが見つかりません。');
  }

  if (!checklist.hasValidOgUrl) {
    issues.push('🔗 og:urlメタタグが見つかりません。');
  }

  if (!checklist.imageIsAccessible) {
    issues.push('❌ 画像にアクセスできません。画像URLを確認してください。');
  }

  if (!checklist.hasValidContentType) {
    issues.push('🎨 画像のContent-Typeが正しくありません。JPEG、PNG、GIF、WebPが推奨されます。');
  }

  if (!checklist.imageIsCorrectSize) {
    issues.push('📏 画像サイズが最適ではありません。1200x630px、5KB-5MBが推奨されます。');
  }

  if (issues.length === 0) {
    issues.push('✅ 技術的な問題は見つかりませんでした。X(Twitter)のキャッシュまたはポリシー変更が原因の可能性があります。');
  }

  return issues;
}

/**
 * X(Twitter)でのリンクプレビュー表示のベストプラクティス
 */
export const twitterBestPractices = [
  '🔄 X(Twitter)でリンクを削除して再投稿してみてください',
  '⏰ 数分から数時間待ってから再試行してください（Xのクロール間隔）',
  '🔗 URLを直接貼り付けてください（短縮URLは避ける）',
  '🌐 パブリックアカウントで投稿してください（プライベートアカウントでは制限される場合があります）',
  '📱 X(Twitter)アプリとWebブラウザ版の両方で確認してください',
  '🎯 Card Validatorツールでテストしてください（https://cards-dev.twitter.com/validator）',
  '⚠️ 2023年以降、X(Twitter)はリンクプレビューの表示ポリシーを変更しています'
];

/**
 * X(Twitter)のリンクプレビューを強制的に更新する方法
 */
export const forceTwitterRefresh = [
  '1. URLの末尾に ?v=2 などのクエリパラメータを追加',
  '2. X(Twitter)でツイートを削除して再投稿',
  '3. 異なるアカウントで試してみる',
  '4. X(Twitter)アプリを再起動',
  '5. ブラウザ版X(Twitter)で試してみる',
  '6. Card Validatorで手動でクロールを実行'
];

/**
 * X(Twitter)の現在の制限事項
 */
export const twitterLimitations = [
  '📊 2023年以降、X(Twitter)はリンクプレビューの表示を制限しています',
  '💰 X Premium（有料プラン）ユーザーの方がリンクプレビューが表示されやすい可能性があります',
  '🤖 Botアカウントや新規アカウントでは制限される場合があります',
  '🔄 外部リンクよりもX内のコンテンツが優先される傾向があります',
  '⏱️ リンクプレビューの生成に時間がかかる場合があります（数時間〜数日）'
];
