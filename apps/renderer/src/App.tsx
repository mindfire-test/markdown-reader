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
import { FileType } from '@package/shared-types';
import { FileBrowser } from './components/FileBrowser';
import { TabBar } from './components/TabBar';
import { useTabStore } from './hooks/useTabStore';
import { extractTOC } from './renderer/toc';

export default function App() {
  const { html, filePath, error, isLoading, openFile, toc, reloadFile,recentFiles,loadFile } = useFile();
  const { state, dispatch } = useTabStore();
  const activeTab = state.tabs.find((tab) => tab.id === state.activeTabId) ?? null;
  const { theme, toggleTheme,setTheme } = useTheme();
  const {activeId,scrollToHeading}=useToc(toc);
  const {increaseFontSize,decreaseFontSize,resetFontSize,fontSize}=useSettings();
  const {query,matchCount,currentMatch,isSearchOpen,openSearch,closeSearch,setQuery,goToNextMatch,goToPrevMatch,getHiglightedHtml} = useSearch(activeTab?.html ?? '');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [folderTree, setFolderTree] = useState<FileType | null>(null);
  const [fileBrowserOpen, setFileBrowserOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const contentRef=useRef<HTMLDivElement>(null);
  const debounceTimer=useRef<number | undefined>(undefined);
  const scrollTimer=useRef<number | undefined>(undefined);

  const openFolder = useCallback(async () => {
    const folderPath = await window.api.openFolderDialog();
    if (!folderPath) return;
    const tree = await window.api.readFolder(folderPath);
    setFolderTree(tree);
    setFileBrowserOpen(true);
  }, []);

  const loadFileInTab = useCallback(
    async (path: string) => {
      const result = await loadFile(path);
      if (!result) return;
      dispatch({
        type: 'OPEN_TAB',
        payload: {
          filePath: result.filePath,
          html: result.html,
        },
      });
    },
    [loadFile, dispatch]
  );
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod=e.metaKey || e.ctrlKey;
      if (mod && e.shiftKey && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        void openFolder();
        return;
      }
      if (mod && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setFocusMode(prev=> !prev);
        return;
      }
      if (mod && e.key.toLowerCase() === 'o') {
        e.preventDefault();
        void window.api.openFileDialog().then((chosenPath) => {
          if (chosenPath) {
            void loadFileInTab(chosenPath);
          }
        });
        return;
      }
      if (mod && e.key.toLowerCase() === 't') {
        e.preventDefault();
        toggleTheme();
        return;
      }

      if (mod && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        openSearch();
        return;
      }

      if (mod && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        increaseFontSize();
        return;
      }

      if (mod && e.key === '-') {
        e.preventDefault();
        decreaseFontSize();
        return;
      }

      if (mod && e.key==='0') {
        e.preventDefault();
        resetFontSize();
        return;
      }
      if (e.key === '[') {
        setSidebarOpen((prev) => !prev);
      }
      if (e.key === '\\') {
        setFileBrowserOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openFolder,openFile,toggleTheme,openSearch,closeSearch,increaseFontSize,decreaseFontSize,resetFontSize,
  ]);
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
      {!focusMode && (
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
      )}
      {!focusMode && (
        <TabBar
          tabs={state.tabs}
          activeTabId={state.activeTabId}
          onSwitch={(id) => dispatch({ type: 'SWITCH_TAB', payload: { tabId: id } })}
          onClose={(id) => dispatch({ type: 'CLOSE_TAB', payload: { tabId: id } })}
        />
      )}

      {error && <Error message={error} onRetry={openFile} />}

      {!filePath && !isLoading && (
        <Welcome onOpen={() => {
            void window.api.openFileDialog().then((chosenPath) => {
              if (chosenPath) {
                void loadFileInTab(chosenPath);
              }
            });
          }}
          recentFiles={recentFiles}
          onOpenRecent={loadFileInTab}
        />
      )}

      {activeTab && !isLoading && !error && (
        <div className="flex flex-1 overflow-hidden">
          {!focusMode && (
            <FileBrowser
              tree={folderTree}
              activeFilePath={activeTab?.filePath ?? ''}
              onOpenFile={loadFile}
              isVisible={fileBrowserOpen}
            />
          )}
          {!focusMode && (
            <Sidebar
              tocItems={extractTOC(activeTab.html)}
              activeId={activeId}
              onSelect={scrollToHeading}
              isVisible={sidebarOpen}
            />
          )}
          <main 
            ref={contentRef} 
            className="flex-1 overflow-y-auto" 
            onScroll={scroll}
            >
            <Reader html={activeTab.html} getHiglightedHtml={getHiglightedHtml} />
          </main>
        </div>
      )}

      <Toast message="File updated" show={showToast} onDone={() => setShowToast(false)} />
      {!focusMode && (
        <StatusBar filePath={activeTab?.filePath ?? ''} theme={theme} fontSize={fontSize}/>
      )}
    </div>
    </>
    )}
