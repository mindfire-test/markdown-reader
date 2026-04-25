import { ReaderProps } from "../types/component-types"

export function Reader({html}:ReaderProps){
  return(
    <div
      className="prose prose-slate max-w-3xl mx-auto py-12 px-6"
      dangerouslySetInnerHTML={{__html : html}}
    />
  )
}