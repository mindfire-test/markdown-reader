import { SidebarProps } from "../types/component-types";
import { getItemClasses } from "../utils/helpers/sidebar-helper";

//sidebar component
export function Sidebar({tocItems,activeId,onSelect,isVisible=true}:SidebarProps){
    if(!isVisible||tocItems.length===0){
        return null;
    }
    return (
<nav className="w-64 min-w-50 max-w-xs border-r border-border-theme bg-surface overflow-y-auto py-6 shrink-0"
      aria-label="Table of contents"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-text-muted px-4 pb-3">
        Contents
      </p>
            <ul>
                {tocItems.map((item)=>(
                    <li key={item.id}>
                        <button onClick={()=>onSelect(item.id)} className={getItemClasses(item,activeId)} aria-current={item.id===activeId?"true":undefined}>
                            {item.text}
                        </button>

                    </li>
                ))}
            </ul>
        </nav>
    )
}