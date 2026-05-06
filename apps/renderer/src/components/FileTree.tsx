import { FileTreeProps } from "../types/component-types";

export function FileTree({node,depth,activeFilePath,onOpenFile}:FileTreeProps){
    const paddingLeft=depth*12+8;
    if(node.isDir){
         return (
      <div>
        <div
          style={{ paddingLeft }}
          className="flex items-center gap-1 py-0.5 text-xs font-semibold uppercase tracking-wide text-text-muted"
        >
          <span>FOLDER</span>
          <span>{node.name}</span>
        </div>

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
    );
    }
    return(
        <button type="button" onClick={()=>onOpenFile(node.path)}>
            <span>FILE</span>
            <span >{node.name}</span>
        </button>
    )
    
}