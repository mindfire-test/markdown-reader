import { SidebarProps } from '../types/component-types';
import { Icons } from '../utils/constants/icon-contants';
import { getItemClasses } from '../utils/helpers/sidebar-helper';
import { useCollapsibleToc } from '../hooks/useCollapsibleToc';

//sidebar component
export function Sidebar({tocItems,activeId,onSelect,isVisible=true, onClose }: SidebarProps & { onClose: () => void }) {
  const { visibleItems, toggleItem, hasChildren, isCollapsed } = useCollapsibleToc(tocItems);
  if(!isVisible||tocItems.length===0){
    return null;
  }
  return (
    <nav className="w-64 border-r border-border-theme bg-surface overflow-y-auto py-6 shrink-0" aria-label="Table of contents">
      <div className="flex items-center justify-between px-4 pb-3">
        <h2 className="text-sm font-semibold tracking-wide text-text-base">
            Contents
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close table of contents"
          className="p-1 text-text-muted hover:text-text-base transition-colors"
        >
          <Icons.X size={18} />
        </button>
      </div>
      <ul>
        {visibleItems.map((item) => {
          const expandable = hasChildren(item.id);
          const collapsed = isCollapsed(item.id);

          return (
            <li key={item.id}>
              <div className="flex items-center w-full">
                  {expandable && (
                    <button
                    type="button"
                    aria-expanded={!collapsed}
                    aria-label={`${collapsed ? 'Expand' : 'Collapse'} ${item.text}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleItem(item.id);
                      }}
                      className="inline-flex p-1 text-text-muted hover:text-text-base transition-colors shrink-0"
                    >
                      {collapsed ? (
                        <Icons.ChevronRight size={20} />
                      ) : (
                        <Icons.ChevronDown size={20} />
                      )}
                    </button>
                  )}
                <button type="button" onClick={()=>onSelect(item.id)} className={`${getItemClasses(item, activeId)} text-left w-full`} aria-current={item.id===activeId?"location":undefined}>
                  <span>{item.text}</span>
              </button>
              </div>
            </li>
          )})}
      </ul>
    </nav>
  )
}