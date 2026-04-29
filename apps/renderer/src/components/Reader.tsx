
import { ReaderProps } from "../types/component-types"

export function Reader({html,getHiglightedHtml}:ReaderProps){
  return(
    <div
      className="content-container"
      dangerouslySetInnerHTML={{__html :getHiglightedHtml(html) }}
    />
  )
}