import { StatusBarProps } from "../types/component-types";
import { basename } from "../utils/helpers/path-helper";
import { Icons } from "../utils/constants/icon-contants";

export function StatusBar({ filePath, theme, fontSize }: StatusBarProps) {
  const zoomPercent = Math.round((fontSize / 16) * 100);
  const displayName = filePath ? basename(filePath) : 'No file open';

  return (
    <footer className="flex h-8 shrink-0 items-center justify-between border-t border-border-theme bg-surface px-4 text-[11px] text-text-muted backdrop-blur">
      <div className="flex min-w-0 items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-accent"/>
        <span className="truncate  hover:text-text-base" title={filePath}>
          {displayName}
        </span>
      </div>
    
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 rounded-md px-2 py-1">
          {theme === 'github-dark' ||theme === 'dracula' ||theme === 'nord' ? (
            <Icons.Moon size={13} />
          ) : (
            <Icons.Sun size={13} />
          )}

          <span className="capitalize">
            {theme.replace('-', ' ')}
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-md px-2 py-1">
          <Icons.ZoomIn size={13} />
          <span>{zoomPercent}%</span>
        </div>
      </div>
    </footer>
  );
}