import React, { useState, useEffect } from 'react';
import TOCComponent from './TOCComponent';
import ContentStyles from './ContentStyles';

interface ContentLayoutProps {
  tocItems: {
    en: Array<{ title: string; href: string }>;
    ja: Array<{ title: string; href: string }>;
  };
  children: React.ReactNode;
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ tocItems, children }) => {
  // 状態管理
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // 画面サイズの変更を監視
  useEffect(() => {
    function checkMobile() {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    }

    // 初期チェック
    checkMobile();

    // リサイズイベントの登録
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // サイドバーボタンのハンドラー
  function handleMenuClick() {
    setIsMenuOpen(prev => !prev);
  }

  // デスクトップ表示
  if (!isMobile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-[280px_1fr] gap-8">
        <aside className="sticky top-8 h-[calc(100vh-4rem)] overflow-y-auto pr-4 border-r border-[var(--border-color)]">
          <TOCComponent tocItems={tocItems} />
        </aside>
        <main className="min-w-0 w-full overflow-x-auto">
          <ContentStyles>{children}</ContentStyles>
        </main>
      </div>
    );
  }

  // モバイル表示
  return (
    <div className="w-full relative">
      {/* メインコンテンツ */}
      <main className="w-full px-4 py-8 overflow-x-hidden">
        <div className="max-w-full mx-auto">
          <ContentStyles>{children}</ContentStyles>
        </div>
      </main>

      {/* メニューボタン */}
      <button
        type="button"
        className="fixed left-4 bottom-4 z-[9999] w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg"
        onClick={handleMenuClick}
        aria-label="メニューを開く"
      >
        <span className="text-2xl">
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </span>
      </button>

      {/* オーバーレイ（メニューが開いているときのみ表示） */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9000]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* サイドバー（メニューが開いているときのみ表示） */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 h-full w-[280px] z-[9500] bg-white overflow-y-auto p-4 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">目次</h2>
            <button
              type="button"
              className="p-2 text-xl"
              onClick={() => setIsMenuOpen(false)}
              aria-label="閉じる"
            >
              ✕
            </button>
          </div>
          <TOCComponent tocItems={tocItems} />
        </div>
      )}
    </div>
  );
};

export default ContentLayout;
