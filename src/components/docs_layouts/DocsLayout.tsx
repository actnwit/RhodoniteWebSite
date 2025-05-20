import React from 'react';
import ContentLayout from '../layouts/ContentLayout';

// tocアイテムの型定義
interface TOCItem {
  title: string;
  href?: string;
  items?: Array<{
    title: string;
    href: string;
  }>;
}

// docsセクション用の目次データ
const docsTableOfContents: {
  en: TOCItem[];
  ja: TOCItem[];
  tr: TOCItem[];
} = {
  en: [
    {
      title: 'Getting Started',
      items: [
        { title: 'Overview', href: '/en/docs/' },
        { title: 'Installation', href: '/en/docs/installation' },
        { title: 'Initialization', href: '/en/docs/initialization' },
      ]
    },
    {
      title: 'Core Concepts',
      items: [
        { title: 'Entity and Component', href: '/en/docs/entities_and_components' },
        { title: 'Mesh and Primitive', href: '/en/docs/geometry' },
        { title: 'Frame, Expression, RenderPass', href: '/en/docs/frame_expression_renderpass' },
      ]
    },
    {
      title: 'Advanced Topics',
      items: [
        { title: 'Shader Design', href: '/en/docs/shader_design' },
        { title: 'Memory Model', href: '/en/docs/memory_model' },
        { title: 'Code of Identifiers', href: '/en/docs/ids' },
      ]
    },
    {
      title: 'Contribution',
      items: [
        { title: 'About Contribution', href: '/en/docs/contribution' },
      ]
    }
  ],
  ja: [
    {
      title: '始めに',
      items: [
        { title: 'RhodoniteTSについて', href: '/ja/docs/' },
        { title: 'インストール', href: '/ja/docs/installation' },
        { title: '初期化', href: '/ja/docs/initialization' },
      ]
    },
    {
      title: '基本概念',
      items: [
        { title: 'EntityとComponent', href: '/ja/docs/entities_and_components' },
        { title: 'MeshとPrimitive', href: '/ja/docs/geometry' },
        { title: 'FrameとExpressionとRenderPass', href: '/ja/docs/frame_expression_renderpass' },
      ]
    },
    {
      title: '高度なトピック',
      items: [
        { title: 'シェーダー設計', href: '/ja/docs/shader_design' },
        { title: 'メモリモデル', href: '/ja/docs/memory_model' },
        { title: 'ID規則', href: '/ja/docs/ids' },
      ]
    },
    {
      title: 'コントリビューション',
      items: [
        { title: 'コントリビュートについて', href: '/ja/docs/contribution' },
      ]
    }
  ],
  tr: []
};

interface DocsLayoutProps {
  children: React.ReactNode;
}

const DocsLayout: React.FC<DocsLayoutProps> = ({ children }) => {
  return (
    <ContentLayout tocItems={docsTableOfContents}>
      {children}
    </ContentLayout>
  );
};

export default DocsLayout;
