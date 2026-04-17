import { ReaderProps } from "../types/component-types"

export function Reader({html}:ReaderProps){
    return(
        <div className="content" dangerouslySetInnerHTML={{__html : html}}/>
    )
}