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
import { useSearch } from './hooks/useSearch';
import { SearchBar } from './components/SearchBar';
import { useSettings } from './hooks/useSettings';
import { StatusBar } from './components/StatusBar';
import { FileType } from '@package/shared-types';
import { FileBrowser } from './components/FileBrowser';
import { TabBar } from './components/TabBar';
import { useTabStore } from './hooks/useTabStore';
import { extractTOC } from './renderer/toc';
import { Icons } from './utils/constants/icon-contants';
import { useShortcuts } from './hooks/useShortcuts';
import { useMenuEvents } from './hooks/useMenuEvents';

export default function App() {
  const {  error, isLoading, openFile, toc,recentFiles,loadFile } =useFile();
  const { state, dispatch } = useTabStore();
  const activeTab = state.tabs.find((tab) => tab.id === state.activeTabId) ?? null;
  const { theme, toggleTheme} = useTheme();
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
  const openFileDialog = useCallback(() => {
  void window.api.openFileDialog().then((chosenPath) => {
    if (chosenPath) {
      void loadFileInTab(chosenPath);
    }
  });
}, [loadFileInTab]);

const toggleSidebar = useCallback(() => {
  setSidebarOpen((prev) => !prev);
}, []);

const toggleFileBrowser = useCallback(() => {
  setFileBrowserOpen((prev) => !prev);
}, []);

const toggleFocusMode = useCallback(() => {
  setFocusMode((prev) => !prev);
}, []);

const goToNextTab = useCallback(() => {
  const idx = state.tabs.findIndex((tab) => tab.id === state.activeTabId);
  const next = state.tabs[idx + 1] || state.tabs[0];

  if (next) {
    dispatch({ type: 'SWITCH_TAB', payload: { tabId: next.id } });
  }
}, [state.tabs, state.activeTabId, dispatch]);

const goToPreviousTab = useCallback(() => {
  const idx = state.tabs.findIndex((tab) => tab.id === state.activeTabId);
  const prev = state.tabs[idx - 1] || state.tabs[state.tabs.length - 1];

  if (prev) {
    dispatch({ type: 'SWITCH_TAB', payload: { tabId: prev.id } });
  }
}, [state.tabs, state.activeTabId, dispatch]);

const closeActiveTab = useCallback(() => {
  if (!state.activeTabId) return;

  dispatch({
    type: 'CLOSE_TAB',
    payload: { tabId: state.activeTabId },
  });
}, [state.activeTabId, dispatch]);
  

  useEffect(() => {
    window.api.onOpenFilePath((path) => {
      void loadFileInTab(path);
    });
    return () => {
      window.api.removeOpenFilePathListener();
    };
  }, [loadFileInTab]);

  useMenuEvents({
  onOpenFile: openFileDialog,
  onOpenFolder: openFolder,
  onSearchDocument: openSearch,
  onToggleToc: toggleSidebar,
  onToggleBrowser: toggleFileBrowser,
  onFocusMode: toggleFocusMode,
  onCycleTheme: toggleTheme,
  onZoomIn: increaseFontSize,
  onZoomOut: decreaseFontSize,
  onZoomReset: resetFontSize,
  onNextTab: goToNextTab,
  onPreviousTab: goToPreviousTab,
  onCloseTab: closeActiveTab,
});

useShortcuts({
  onOpenFile: openFileDialog,
  onOpenFolder: openFolder,
  onToggleFocusMode: toggleFocusMode,
  onToggleTheme: toggleTheme,
  onOpenSearch: openSearch,
  onCloseSearch: closeSearch,
  onZoomIn: increaseFontSize,
  onZoomOut: decreaseFontSize,
  onZoomReset: resetFontSize,
  onToggleSidebar: toggleSidebar,
  onToggleFileBrowser: toggleFileBrowser,
});
  const handleFileChange = useCallback(() => {
    if(!activeTab) return;
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = window.setTimeout(async () => {
      const currentScroll = contentRef.current?.scrollTop ?? 0;
      const result =await loadFile(activeTab.filePath);
      if(!result) return;
      dispatch({
      type: 'UPDATE_TAB_STATE',
      payload: {
        tabId: activeTab.id,
        html: result.html,
      },
    });
      requestAnimationFrame(() => {
        if (contentRef.current) {
          contentRef.current.scrollTop = currentScroll;
        }
      });
      setShowToast(true);
    }, 150);
  }, [activeTab,loadFile,dispatch]);
 const scroll = () => {
  if (!activeTab || !contentRef.current) return;

  if (scrollTimer.current) {
    clearTimeout(scrollTimer.current);
  }

  scrollTimer.current = window.setTimeout(() => {
    saveScrollPos(activeTab.filePath, contentRef.current!.scrollTop);

    dispatch({
      type: 'UPDATE_TAB_STATE',
      payload: {
        tabId: activeTab.id,
        scrollTop: contentRef.current?.scrollTop ?? 0,
      },
    });
  }, 100);
};
  useWatcher(activeTab?.filePath ??'', handleFileChange);
  useEffect(() => {
  if (!activeTab || !contentRef.current) return;

  requestAnimationFrame(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop =
        activeTab.scrollTop ?? getScrollPos(activeTab.filePath);
    }
  });
}, [activeTab?.id, activeTab?.html]);

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
          <TabBar
            tabs={state.tabs}
            activeTabId={state.activeTabId}
            onSwitch={(id) => dispatch({ type: 'SWITCH_TAB', payload: { tabId: id } })}
            onClose={(id) => dispatch({ type: 'CLOSE_TAB', payload: { tabId: id } })}
          />
        )}

        {error && <Error message={error} onRetry={openFile} />}

        {!activeTab && !isLoading && (
          <Welcome onOpen={openFileDialog}
            recentFiles={recentFiles}
            onOpenRecent={loadFileInTab}
          />
        )}

        {activeTab && !isLoading && !error && (
          <div className="flex flex-1 overflow-hidden relative">
            {!focusMode && (
              <FileBrowser
                tree={folderTree}
                activeFilePath={activeTab?.filePath ?? ''}
                onOpenFile={loadFileInTab}
                isVisible={fileBrowserOpen}
              />
            )}
            {!sidebarOpen && !focusMode && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="absolute top-4 left-4 z-20 p-2 text-text-muted hover:text-text-base transition-colors"
                aria-label="Open sidebar"
              >
                <Icons.Hamburger size={16} />
              </button>
            )}
            {!focusMode && (
              <Sidebar
                tocItems={extractTOC(activeTab.html)}
                activeId={activeId}
                onSelect={scrollToHeading}
                isVisible={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
            )}
            {!focusMode && (
              <div className="absolute right-5 top-5 z-30 flex items-center gap-1 rounded-xl border border-border-theme bg-surface px-2 py-1 shadow-sm">
                <button
                  onClick={decreaseFontSize}
                  className="rounded-md p-2 text-text-muted transition-colors hover:bg-accent-bg hover:text-text-base"
                  aria-label="Zoom out"
                >
                  <Icons.ZoomOut size={18} />
                </button>

                <button
                  onClick={resetFontSize}
                  className="min-w-12 rounded-md px-2 py-1 text-xs font-medium text-text-muted transition-colors hover:bg-accent-bg hover:text-text-base"
                >
                  {fontSize}px
                </button>

                <button
                  onClick={increaseFontSize}
                  className="rounded-md p-2 text-text-muted transition-colors hover:bg-accent-bg hover:text-text-base"
                  aria-label="Zoom in"
                >
                  <Icons.ZoomIn size={18} />
                </button>

                <div className="mx-1 h-5 w-px bg-border-theme" />

                <button
                  onClick={toggleTheme}
                  className="rounded-md p-2 text-text-muted transition-colors hover:bg-accent-bg hover:text-text-base"
                  aria-label="Toggle theme"
                >
                  {theme === 'github-dark' || theme === 'dracula' || theme === 'nord' ? (
                    <Icons.Sun size={18} />
                  ) : (
                    <Icons.Moon size={18} />
                  )}
                </button>
              </div>
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
          <StatusBar filePath={activeTab?.filePath ?? ''} theme={theme} fontSize={fontSize} />
        )}
      </div>
    </>
  )}
