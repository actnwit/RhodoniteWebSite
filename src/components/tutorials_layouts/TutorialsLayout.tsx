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
        { title: 'Displaying Geometries', href: '/en/tutorials/display_geometries' },
        { title: 'Transform and SceneGraph', href: '/en/tutorials/transform_and_scenegraph' },
      ]
    },
    {
      title: 'Advanced Tutorials',
      items: [
        { title: 'Displaying glTF', href: '/en/tutorials/display_gltf' },
        { title: 'Creating Materials', href: '/en/tutorials/materials' },
        { title: 'Render Pipeline', href: '/en/tutorials/render_pipeline' },
      ]
    },
    {
      title: 'Examples',
      items: [
        { title: 'Other Samples', href: '/en/tutorials/other_samples' },
      ]
    }
  ],
  ja: [
    {
      title: '基本チュートリアル',
      items: [
        { title: 'ジオメトリの表示', href: '/ja/tutorials/display_geometries' },
        { title: 'TransformとSceneGraph', href: '/ja/tutorials/transform_and_scenegraph' },
      ]
    },
    {
      title: '応用チュートリアル',
      items: [
        { title: 'glTFの表示', href: '/ja/tutorials/display_gltf' },
        { title: 'Materialの作成', href: '/ja/tutorials/materials' },
        { title: 'Render Pipeline', href: '/ja/tutorials/render_pipeline' },
      ]
    },
    {
      title: 'サンプル',
      items: [
        { title: 'その他のサンプル', href: '/ja/tutorials/other_samples' },
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
