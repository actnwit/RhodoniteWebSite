# Open Graph リンクプレビュー設定

このプロジェクトでは、ソーシャルメディアでのリンクプレビューを最適化するためのOpen Graphメタタグと構造化データが実装されています。

## 実装された機能

### 1. Open Graphメタタグ
- `og:title` - ページタイトル
- `og:description` - ページ説明
- `og:image` - プレビュー画像
- `og:url` - 正規URL
- `og:site_name` - サイト名
- `og:type` - コンテンツタイプ（website/article）
- `og:locale` - 言語ロケール
- `og:locale:alternate` - 代替言語

### 2. Twitter Cardメタタグ
- `twitter:card` - カードタイプ（summary_large_image）
- `twitter:title` - タイトル
- `twitter:description` - 説明
- `twitter:image` - 画像

### 3. 構造化データ（JSON-LD）
- WebSite スキーマ
- SoftwareApplication スキーマ
- Article スキーマ（ドキュメントページ用）

### 4. 多言語対応
- 各言語（日本語、英語、トルコ語）に対応したメタデータ
- hreflang属性による言語代替リンク
- 言語固有のOpen Graphロケール

## 使用方法

### 基本的なページ

```astro
---
// pages/example.astro
import Layout from '../layouts/Layout.astro';
---

<Layout 
  title="カスタムページタイトル"
  description="このページの説明文"
  image="/custom-image.jpg"
>
  <h1>ページコンテンツ</h1>
</Layout>
```

### ドキュメントページ

```astro
---
// pages/docs/example.mdx
title: ドキュメントタイトル
description: ドキュメントの説明
---

import DocLayout from '../../components/docs_layouts/DocLayout.astro';

<DocLayout>
  # ドキュメントコンテンツ
</DocLayout>
```

## ファイル構成

```
src/
├── components/
│   ├── OpenGraphMeta.tsx          # Open Graphメタタグコンポーネント
│   ├── StructuredData.tsx         # 構造化データコンポーネント
│   └── docs_layouts/
│       └── DocLayout.astro        # ドキュメント用レイアウト
├── layouts/
│   └── Layout.astro               # メインレイアウト
├── utils/
│   └── openGraph.ts               # Open Graph用ユーティリティ
└── i18n/
    └── ui.ts                      # 多言語リソース
```

## カスタマイズ

### デフォルト画像の変更

`src/utils/openGraph.ts`の`generateOpenGraphData`関数内で設定：

```typescript
const defaultImage = `${baseUrl}/your-custom-image.jpg`;
```

### ソーシャルメディアリンクの追加

`src/layouts/Layout.astro`の構造化データ内で設定：

```astro
<WebsiteStructuredData
  sameAs={[
    'https://github.com/your-repo',
    'https://twitter.com/your-account',
    'https://discord.gg/your-server'
  ]}
/>
```

### 新しい言語の追加

1. `src/i18n/ui.ts`に言語を追加
2. `src/utils/openGraph.ts`の`langToOGLocale`関数にマッピングを追加
3. `src/layouts/Layout.astro`のhreflangリンクを更新

## テスト方法

### Open Graphデバッガー
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 構造化データテスト
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)

## 最適化のポイント

1. **画像サイズ**: 1200x630px推奨（アスペクト比1.91:1）
2. **タイトル長**: 60文字以内推奨
3. **説明文長**: 160文字以内推奨
4. **画像フォーマット**: JPG、PNG、WebP対応
5. **画像サイズ**: 8MB以下推奨

## 注意事項

- Open Graph画像は絶対URLで指定する必要があります
- ソーシャルメディアプラットフォームによってキャッシュ時間が異なります
- 変更後はデバッガーツールでキャッシュをクリアしてテストしてください 
