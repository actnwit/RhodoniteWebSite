/**
 * Slackでリンクプレビューが表示されない原因と対策
 */

export interface SlackOptimizationChecklist {
  hasValidOgImage: boolean;
  hasValidOgTitle: boolean;
  hasValidOgDescription: boolean;
  hasValidOgUrl: boolean;
  imageIsAccessible: boolean;
  imageIsCorrectSize: boolean;
  hasHttps: boolean;
  hasValidContentType: boolean;
}

/**
 * SlackのOpen Graph要件をチェック
 */
export async function checkSlackCompatibility(url: string): Promise<SlackOptimizationChecklist> {
  const result: SlackOptimizationChecklist = {
    hasValidOgImage: false,
    hasValidOgTitle: false,
    hasValidOgDescription: false,
    hasValidOgUrl: false,
    imageIsAccessible: false,
    imageIsCorrectSize: false,
    hasHttps: url.startsWith('https://'),
    hasValidContentType: false
  };

  try {
    // HTMLを取得してメタタグをチェック
    const response = await fetch(url);
    const html = await response.text();

    // Open Graphメタタグの存在確認
    result.hasValidOgTitle = html.includes('property="og:title"');
    result.hasValidOgDescription = html.includes('property="og:description"');
    result.hasValidOgUrl = html.includes('property="og:url"');
    result.hasValidOgImage = html.includes('property="og:image"');

    // 画像URLを抽出
    const imageMatch = html.match(/property="og:image"\s+content="([^"]+)"/);
    if (imageMatch) {
      const imageUrl = imageMatch[1];

      try {
        // 画像のアクセシビリティをチェック
        const imageResponse = await fetch(imageUrl, { method: 'HEAD' });
        result.imageIsAccessible = imageResponse.ok;
        result.hasValidContentType = imageResponse.headers.get('content-type')?.startsWith('image/') || false;

        // 画像サイズをチェック（理想的には1200x630）
        const contentLength = imageResponse.headers.get('content-length');
        if (contentLength) {
          const size = parseInt(contentLength);
          // 10KB以上、10MB以下が理想的
          result.imageIsCorrectSize = size > 10000 && size < 10000000;
        }
      } catch (error) {
        console.warn('画像チェックエラー:', error);
      }
    }

  } catch (error) {
    console.error('Slack互換性チェックエラー:', error);
  }

  return result;
}

/**
 * Slackでリンクプレビューが表示されない理由を診断
 */
export function diagnoseSlackIssues(checklist: SlackOptimizationChecklist): string[] {
  const issues: string[] = [];

  if (!checklist.hasHttps) {
    issues.push('🔒 HTTPSが必要です。SlackはHTTPSのURLのみプレビューを表示します。');
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
    issues.push('❌ Open Graph画像にアクセスできません。画像URLを確認してください。');
  }

  if (!checklist.hasValidContentType) {
    issues.push('🎨 画像のContent-Typeが正しくありません。JPEG、PNG、GIF、WebPが推奨されます。');
  }

  if (!checklist.imageIsCorrectSize) {
    issues.push('📏 画像サイズが最適ではありません。1200x630px、10KB-10MBが推奨されます。');
  }

  if (issues.length === 0) {
    issues.push('✅ 技術的な問題は見つかりませんでした。Slackのキャッシュが原因の可能性があります。');
  }

  return issues;
}

/**
 * Slackでのリンクプレビュー表示のベストプラクティス
 */
export const slackBestPractices = [
  '🔄 Slackでリンクを再投稿してみてください（キャッシュクリア効果）',
  '⏰ 数分待ってから再試行してください（Slackのクロール間隔）',
  '🔗 URLを直接貼り付けてください（短縮URLは避ける）',
  '👥 プライベートチャンネルではなく、パブリックチャンネルで試してください',
  '🤖 Slackbotが有効になっていることを確認してください',
  '🌐 ワークスペースの設定でリンクプレビューが有効になっていることを確認してください'
];

/**
 * Slackのリンクプレビューを強制的に更新する方法
 */
export const forceSlackRefresh = [
  '1. URLの末尾に ?v=1 などのクエリパラメータを追加',
  '2. Slackでリンクを削除して再投稿',
  '3. 別のチャンネルで試してみる',
  '4. Slackアプリを再起動',
  '5. ブラウザ版Slackで試してみる'
];
