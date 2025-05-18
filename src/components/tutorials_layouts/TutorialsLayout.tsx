import React from 'react';
import ContentLayout from '../layouts/ContentLayout';

// tutorialsセクション用の目次データ
const tutorialsTableOfContents = {
  en: [
    { title: 'Displaying Geometries', href: '/en/tutorials/display_geometries' },
    { title: 'Transform and SceneGraph', href: '/en/tutorials/transform_and_scenegraph' },
    { title: 'Displaying glTF', href: '/en/tutorials/display_gltf' },
    { title: 'Creating Materials', href: '/en/tutorials/materials' },
    { title: 'Render Pipeline', href: '/en/tutorials/render_pipeline' },
    { title: 'Other Samples', href: '/en/tutorials/other_samples' },
  ],
  ja: [
    { title: 'ジオメトリの表示', href: '/ja/tutorials/display_geometries' },
    { title: 'TransformとSceneGraph', href: '/ja/tutorials/transform_and_scenegraph' },
    { title: 'glTFの表示', href: '/ja/tutorials/display_gltf' },
    { title: 'Materialの作成', href: '/ja/tutorials/materials' },
    { title: 'Render Pipeline', href: '/ja/tutorials/render_pipeline' },
    { title: 'その他のサンプル', href: '/ja/tutorials/other_samples' },
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
