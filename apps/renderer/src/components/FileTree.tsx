import { FileTreeProps } from '../types/component-types';
import { Icons } from '../utils/constants/icon-contants';

export function FileTree({node,depth,activeFilePath,onOpenFile}:FileTreeProps) {
  const paddingLeft=depth*14+12;
  if (node.isDir){
    return (
      <div className="mb-1">
        <div
          style={{ paddingLeft }}
          className="flex items-center gap-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-muted"
        >
          <Icons.ChevronRight size={12} />
          <span className="truncate">{node.name}</span>
        </div>

        <div className="space-y-0.5">
          {node.children?.map((child) => (
            <FileTree
              key={child.path}
              node={child}
              depth={depth + 1}
              activeFilePath={activeFilePath}
              onOpenFile={onOpenFile}
            />
          ))}
        </div>
      </div>
    );
  }
  const isActive = node.path === activeFilePath;
  return(
    <button type="button" onClick={() => onOpenFile(node.path)}
      style={{ paddingLeft }}
      className={[
        'group flex w-full items-center gap-2 rounded-r-xl py-2 pr-3 text-left text-sm transition-all',
        isActive
          ? 'bg-accent-bg font-medium text-accent'
          : 'text-text-base hover:bg-accent-bg',
      ].join(' ')}
    >
      <div
        className={[
          'h-2 w-2 rounded-full transition-colors',
          isActive ? 'bg-accent' : 'bg-border-theme',
        ].join(' ')}
      />
      <span className="truncate">{node.name}</span>
    </button>
  )
}