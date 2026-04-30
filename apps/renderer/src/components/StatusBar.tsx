import { StatusBarProps } from "../types/component-types";
import { basename } from "../utils/path-helper";

export function StatusBar({ filePath, theme, fontSize }: StatusBarProps) {
  const zoomPercent = Math.round((fontSize / 16) * 100);
  const displayName = filePath ? basename(filePath) : '_';

  return (
     <footer className="flex items-center justify-between h-7 px-4 bg-surface border-t border-border-theme text-[11px] font-medium text-text-muted shrink-0 select-none">
      <div className="flex items-center gap-4 truncate">
        <span className="truncate max-w-50 hover:text-text-base cursor-default" title={filePath}>
          {displayName}
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="uppercase tracking-wider opacity-80">{theme}</span>
        <span className="min-w-11.25 text-right">{zoomPercent}%</span>
      </div>
    </footer>
  );
}