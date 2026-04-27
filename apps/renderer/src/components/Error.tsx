import { ErrorProps } from "../types/component-types"

//error message display function
export function Error({message,onRetry}:ErrorProps){
  return (
    <div className="m-6 p-5 rounded-lg error-bg error-text border error-border">
      <p className="mb-3 font-medium">Error: {message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-error-strong text-white rounded-md text-sm"
      >
        Try another file
      </button>
    </div>
  )
}