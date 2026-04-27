import { useEffect, useState } from 'react';
import { useFile } from './hooks/useFile';
import { Welcome } from './components/Welcome';
import { Reader } from './components/Reader';
import { Loading } from './components/Loading';
import { Error } from './components/Error';
import { useTOC } from './hooks/useTOC';
import { Sidebar } from './components/Sidebar';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { html, filePath, error, isLoading, openFile, toc } = useFile();
  const { theme, toggleTheme } = useTheme();
  const {activeId,scrollToHeading}=useTOC(toc);
  const [sidebarOpen,setSidebarOpen]=useState(true);

  //key board shorcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "o") {
        e.preventDefault();
        openFile();
      }

      if (e.key==='[') {
        setSidebarOpen(prev=>!prev)
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 't') {
        e.preventDefault();
        toggleTheme();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openFile,toggleTheme]);

  return (
    <div className="h-screen flex flex-col app-bg">
      {isLoading && <Loading />}
      <div className='flex justify-between items-center px-4 py-2 border-b border-theme'>
        <span className='text-sm font-medium'>Markdown Reader</span>
        <button onClick={toggleTheme} className='flex items-center gap-1.5 px-2.5 py-1 rounded text-sm text-secondary sidebar-bg border border-theme hover:opacity-80'>
          {theme}
        </button>
      </div>

      {error && <Error message={error} onRetry={openFile} />}
      {!filePath && !isLoading && <Welcome onOpen={openFile} />}

      {html && !isLoading && !error && (
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            tocItems={toc}
            activeId={activeId}
            onSelect={scrollToHeading}
            isVisible={sidebarOpen}
          />

          <main className="flex-1 overflow-y-auto px-8 py-6">
            <Reader html={html} />
          </main>
        </div>
      )}
    </div>
  );
}
