import { SidebarProps } from "../types/component-types";
import { getItemClasses } from "../utils/item-classes";

//sidebar component
export function Sidebar({tocItems,activeId,onSelect,isVisible=true}:SidebarProps){
    if(!isVisible||tocItems.length===0){
        return null;
    }
    return (
        <nav className="w-64 min-w-50 max-w-[320px] border-r border-theme overflow-y-auto py-6 text-secondary" aria-label="Table of contents">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 px-4 pb-3">Contents</p>
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