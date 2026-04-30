import { useEffect, useState, useRef, useCallback } from 'react';
import { useFile } from './hooks/useFile';
import { Welcome } from './components/Welcome';
import { Reader } from './components/Reader';
import { Loading } from './components/Loading';
import { Error } from './components/Error';
import { useToc } from './hooks/useTOC';
import { Sidebar } from './components/Sidebar';
import { useWatcher } from './hooks/useWatcher';
import { saveScrollPos, getScrollPos } from './renderer/scroll';
import { Toast } from './components/Toast';
import { useTheme } from './hooks/useTheme';
import { BuiltThemeType } from './types/component-types';
import { useSearch } from './hooks/useSearch';
import { SearchBar } from './components/SearchBar';
import { useSettings } from './hooks/useSettings';
import { StatusBar } from './components/StatusBar';




export default function App() {
const { html, filePath, error, isLoading, openFile, toc, reloadFile,recentFiles,loadFile } = useFile();  
const { theme, toggleTheme,setTheme } = useTheme();
  const {activeId,scrollToHeading}=useToc(toc);
  const [sidebarOpen,setSidebarOpen]=useState(true);
  const [showToast, setShowToast]=useState(false);
  const {query,matchCount,currentMatch,isSearchOpen,openSearch,closeSearch,setQuery,goToNextMatch,goToPrevMatch,getHiglightedHtml}=useSearch(html);
  const {increaseFontSize,decreaseFontSize,resetFontSize,fontSize}=useSettings();

  const contentRef=useRef<HTMLDivElement>(null);

  const debounceTimer=useRef<number | undefined>(undefined);
  const scrollTimer=useRef<number | undefined>(undefined);

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

      if((e.metaKey || e.ctrlKey) && e.key==='f'){
        e.preventDefault();
        openSearch();
      }

      if((e.metaKey||e.ctrlKey) && e.key==='='){
        e.preventDefault();
        increaseFontSize()
      }

      if((e.metaKey||e.ctrlKey) && (e.key==='-'||e.key==='+')){
        e.preventDefault();
        decreaseFontSize();
      }

      if((e.metaKey||e.ctrlKey) && e.key==='0'){
        e.preventDefault();
        resetFontSize();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openFile,toggleTheme]);
  const handleFileChange = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = window.setTimeout(async () => {
      const currentScroll = contentRef.current?.scrollTop ?? 0;
      await reloadFile();
      requestAnimationFrame(() => {
        if (contentRef.current) {
          contentRef.current.scrollTop = currentScroll;
        }
      });
      setShowToast(true);
    }, 150);
  }, [reloadFile]);
  const scroll = () => {
    if (!filePath || !contentRef.current) return;
    if (scrollTimer.current) {
      clearTimeout(scrollTimer.current);
    }
    scrollTimer.current = window.setTimeout(() => {
      saveScrollPos(filePath, contentRef.current!.scrollTop);
    }, 100);
  };
  useWatcher(filePath, handleFileChange);
  useEffect(() => {
    if (!filePath || !html) return;
    requestAnimationFrame(() => {
      if (contentRef.current) {
        contentRef.current.scrollTop = getScrollPos(filePath);
      }
    });
  }, [html, filePath]);
  

  return (
    <>
    <div className="h-screen flex flex-col bg-bg text-text-base">
      {isLoading && <Loading />}
      {isSearchOpen && (
        <SearchBar
          query={query}
          matchCount={matchCount}
          currentMatch={currentMatch}
          onQueryChange={setQuery}
          onNext={goToNextMatch}
          onPrev={goToPrevMatch}
          onClose={closeSearch}
        />
      )}
      <header className='flex justify-between items-center px-4 py-2 border-b border-border-theme shrink-0'>
        <span className='text-sm font-medium'>Markdown Reader</span>
        <select value={theme} onChange={(e) => setTheme(e.target.value as BuiltThemeType)} className="px-2 py-1 text-sm bg-surface border border-border-theme rounded text-text-base focus:outline-none">
          <option value="github-light">Light</option>
          <option value="github-dark">Dark</option>
          <option value="notion">Notion</option>
          <option value="nord">Nord</option>
          <option value="minimal">Minimal</option>
          <option value="dracula">Dracula</option>
        </select>
      </header>

      {error && <Error message={error} onRetry={openFile} />}

      {!filePath && !isLoading && (
        <Welcome onOpen={openFile} recentFiles={recentFiles} onOpenRecent={loadFile} />
      )}

      {html && !isLoading && !error && (
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            tocItems={toc}
            activeId={activeId}
            onSelect={scrollToHeading}
            isVisible={sidebarOpen}
          />
          <main
            ref={contentRef}
            className="flex-1 overflow-y-auto"
            onScroll={scroll}
          >
            <Reader html={html} getHiglightedHtml={getHiglightedHtml} />
          </main>
        </div>
      )}

      <Toast message="File updated" show={showToast} onDone={() => setShowToast(false)} />
      <StatusBar filePath={filePath} theme={theme} fontSize={fontSize}/>
    </div>
    </>
  )}