import { FileBrowserProps } from '../types/component-types';
import { FileTree } from './FileTree';

export function FileBrowser({
  tree,
  activeFilePath,
  onOpenFile,
  isVisible = true,
}: FileBrowserProps) {
  if (!isVisible || !tree) return null;
  return (
    <nav
      aria-label="File browser"
      className="w-56 shrink-0 overflow-y-auto border-r border-border-theme bg-surface py-3"
    >
      <p className="px-3 pb-2 text-xs font-bold uppercase tracking-wide text-text-muted">Files</p>
      <FileTree node={tree} depth={0} activeFilePath={activeFilePath} onOpenFile={onOpenFile} />
    </nav>
  );
}
