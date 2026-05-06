import type { TabBarProps } from '../types/component-types';

export function TabBar({ tabs, activeTabId, onSwitch, onClose }: TabBarProps) {
  if (tabs.length === 0) return null;

  return (
    <div
      role="tablist"
      className="flex h-9 shrink-0 items-end overflow-x-auto border-b border-border-theme bg-surface select-none"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;

        return (
          <div key={tab.id} className="flex max-w-45 shrink-0 items-center">
            <button
              role="tab"
              aria-current={isActive ? 'true' : undefined}
              aria-label={tab.fileName}
              onClick={() => onSwitch(tab.id)}
              className={[
                'flex h-9 items-center gap-1 truncate border-t-2 px-3 text-xs font-medium transition-colors',
                isActive
                  ? 'border-accent bg-bg text-text-base'
                  : 'border-transparent text-text-muted hover:bg-accent-bg hover:text-text-base',
              ].join(' ')}
            >
              <span className="truncate">{tab.fileName}</span>
            </button>

            <button
              type="button"
              aria-label="close tab"
              onClick={(event) => {
                event.stopPropagation();
                onClose(tab.id);
              }}
              className="mr-1 ml-0.5 rounded px-1 text-xs text-text-muted hover:bg-accent-bg hover:text-text-base"
            >
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}
