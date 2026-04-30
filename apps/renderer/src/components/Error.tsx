import { ErrorProps } from "../types/component-types"

//error message display function
export function Error({message,onRetry}:ErrorProps){
  return (
   <div className="m-6 p-4 rounded-lg bg-error-bg text-error border border-error-border">
      <p className="mb-3 font-medium text-sm">Error: {message}</p>
      <button
        onClick={onRetry}
        className="px-3 py-1.5 text-sm rounded bg-error-border text-white hover:opacity-90 transition-opacity"
      >
        Try another file
      </button>
    </div>
  )
}