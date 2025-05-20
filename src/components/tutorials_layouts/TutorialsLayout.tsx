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

// tutorialsセクション用の目次データ
const tutorialsTableOfContents: {
  en: TOCItem[];
  ja: TOCItem[];
  tr: TOCItem[];
} = {
  en: [
    {
      title: 'Basic Tutorials',
      items: [
        { title: 'Displaying Geometries', href: '/en/tutorials/basic/display_geometries' },
        { title: 'Transform and SceneGraph', href: '/en/tutorials/basic/transform_and_scenegraph' },
      ]
    },
    {
      title: 'Advanced Tutorials',
      items: [
        { title: 'Displaying glTF', href: '/en/tutorials/advanced/display_gltf' },
        { title: 'Creating Materials', href: '/en/tutorials/advanced/materials' },
        { title: 'Render Pipeline', href: '/en/tutorials/advanced/render_pipeline' },
      ]
    },
    {
      title: 'Examples',
      items: [
        { title: 'Other Samples', href: '/en/tutorials/others/other_samples' },
      ]
    }
  ],
  ja: [
    {
      title: '基本チュートリアル',
      items: [
        { title: 'ジオメトリの表示', href: '/ja/tutorials/basic/display_geometries' },
        { title: 'TransformとSceneGraph', href: '/ja/tutorials/basic/transform_and_scenegraph' },
      ]
    },
    {
      title: '応用チュートリアル',
      items: [
        { title: 'glTFの表示', href: '/ja/tutorials/advanced/display_gltf' },
        { title: 'Materialの作成', href: '/ja/tutorials/advanced/materials' },
        { title: 'Render Pipeline', href: '/ja/tutorials/advanced/render_pipeline' },
      ]
    },
    {
      title: 'サンプル',
      items: [
        { title: 'その他のサンプル', href: '/ja/tutorials/others/other_samples' },
      ]
    }
  ],
  tr: []
};

interface TutorialsLayoutProps {
  children: React.ReactNode;
}

const TutorialsLayout: React.FC<TutorialsLayoutProps> = ({ children }) => {
  return (
    <ContentLayout tocItems={tutorialsTableOfContents}>
      {children}
    </ContentLayout>
  );
};

export default TutorialsLayout;
