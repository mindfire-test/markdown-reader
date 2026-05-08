import { FileBrowserProps } from '../types/component-types';
import { FileTree } from './FileTree';
import { Icons } from '../utils/constants/icon-contants';

export function FileBrowser({
  tree,
  activeFilePath,
  onOpenFile,
  isVisible = true,
}: FileBrowserProps) {
  if (!isVisible || !tree) return null;
  return (
    <aside
      aria-label="File browser"
      className="flex w-72 shrink-0 flex-col border-r border-border-theme bg-surface"
    >
      <div className="flex items-center justify-between border-b border-border-theme px-4 py-3">
        <div className="flex items-center gap-2">
          <Icons.Hamburger size={16} className="text-text-muted" />
          <h2 className="text-sm font-semibold tracking-wide text-text-base">
            Explorer
          </h2>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        <FileTree node={tree} depth={0} activeFilePath={activeFilePath} onOpenFile={onOpenFile}/>
      </div>
    </aside>
  );
}
