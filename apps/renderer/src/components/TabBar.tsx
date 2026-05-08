import type { TabBarProps } from '../types/component-types';
import { Icons } from '../utils/constants/icon-contants';

export function TabBar({ tabs, activeTabId, onSwitch, onClose }: TabBarProps) {
  if (tabs.length === 0) return null;

  return (
    <div
      role="tablist"
      className="flex h-11 shrink-0 items-center overflow-x-auto border-b border-border-theme bg-surface px-2"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;

        return (
          <div key={tab.id} className={[
              'group mr-1 flex max-w-56 shrink-0 items-center rounded-t-lg border transition-all',
              isActive
                ? 'border-border-theme bg-bg shadow-sm'
                : 'border-transparent hover:bg-accent-bg',
            ].join(' ')}
          >
            <button
              role="tab"
              aria-current={isActive ? 'true' : undefined}
              aria-label={tab.fileName}
              onClick={() => onSwitch(tab.id)}
              className={[
                'flex h-10 items-center truncate px-4 text-sm transition-colors',
                isActive
                  ? 'font-medium text-text-base'
                  : 'text-text-muted group-hover:text-text-base',
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
              className="mr-2 flex h-6 w-6 items-center justify-center rounded-md text-text-muted transition-all hover:bg-accent-bg hover:text-text-base"
            >
              <Icons.X size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
