import { useEffect, useState } from 'react';
import { useFile } from './hooks/useFile';
import { useTheme } from './hooks/useTheme';
import { Welcome } from './components/Welcome';
import { Reader } from './components/Reader';
import { Loading } from './components/Loading';
import { Error } from './components/Error';
import { useTOC } from './hooks/useTOC';
import { Sidebar } from './components/Sidebar';



export default function App() {
  const { html, filePath, error, isLoading, openFile, toc } = useFile();
  const { themeSource, toggleTheme, resetToSystem } = useTheme();
  const {activeId,scrollToHeading}=useTOC(toc);
  const [sidebarOpen,setSidebarOpen]=useState(true);

  //key board shorcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "o") {
        e.preventDefault();
        openFile();
      }

      if(e.key==='['){
        setSidebarOpen(prev=>!prev)
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openFile]);

  return (
    <div className="h-screen flex flex-col">
      {isLoading && <Loading/>}
      <p>Theme: {themeSource}</p>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={resetToSystem}>Reset</button>


      {error && <Error message={error} onRetry={openFile}/>}
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
