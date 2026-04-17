import { ErrorProps } from "../types/component-types"

//error message display function
export function Error({message,onRetry}:ErrorProps){
    return (
        <div className="error">
            <p>Error :{message}</p>
            <button onClick={onRetry}>Try another file</button>
        </div>
    )
}