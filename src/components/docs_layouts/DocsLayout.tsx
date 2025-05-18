import React from 'react';
import ContentLayout from '../layouts/ContentLayout';

// docsセクション用の目次データ
const docsTableOfContents = {
  en: [
    { title: 'Overview', href: '/en/docs/' },
    { title: 'Installation', href: '/en/docs/installation' },
    { title: 'Initialization', href: '/en/docs/initialization' },
    { title: 'Entity and Component', href: '/en/docs/entities_and_components' },
    { title: 'Mesh and Primitive', href: '/en/docs/geometry' },
    { title: 'Frame, Expression, RenderPass', href: '/en/docs/frame_expression_renderpass' },
    { title: 'Shader Design', href: '/en/docs/shader_design' },
    { title: 'Memory Model', href: '/en/docs/memory_model' },
    { title: 'Code of Identifiers', href: '/en/docs/ids' },
    { title: 'About Contribution', href: '/en/docs/contribution' },
  ],
  ja: [
    { title: 'RhodoniteTSについて', href: '/ja/docs/' },
    { title: 'インストール', href: '/ja/docs/installation' },
    { title: '初期化', href: '/ja/docs/initialization' },
    { title: 'EntityとComponent', href: '/ja/docs/entities_and_components' },
    { title: 'MeshとPrimitive', href: '/ja/docs/geometry' },
    { title: 'FrameとExpressionとRenderPass', href: '/ja/docs/frame_expression_renderpass' },
    { title: 'シェーダー設計', href: '/ja/docs/shader_design' },
    { title: 'メモリモデル', href: '/ja/docs/memory_model' },
    { title: 'ID規則', href: '/ja/docs/ids' },
    { title: 'コントリビュートについて', href: '/ja/docs/contribution' },
  ],
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
