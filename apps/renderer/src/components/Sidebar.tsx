import { SidebarProps } from "../types/component-types";
import { Icons } from "../utils/constants/icon-contants";
import { getItemClasses } from "../utils/helpers/sidebar-helper";

//sidebar component
export function Sidebar({tocItems,activeId,onSelect,isVisible=true, onClose }: SidebarProps & { onClose: () => void }) {
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
                    onClick={onClose}
                    className="p-1 text-text-muted hover:text-text-base transition-colors"
                >
                    <Icons.X size={18} />
                </button>
            </div>
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