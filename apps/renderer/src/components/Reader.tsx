
import { ReaderProps } from "../types/component-types"

export function Reader({html,getHiglightedHtml}:ReaderProps){
  return(
    <div
      className="content-container prose dark:prose-invert"
      dangerouslySetInnerHTML={{__html :getHiglightedHtml(html) }}
    />
  )
}