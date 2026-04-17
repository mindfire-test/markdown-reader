import { WelcomeProps } from "../types/component-types"

// welcome screen 
export function Welcome({onOpen}:WelcomeProps){
    return (
        <div className="welcome">
            <h1>Markdown Reader</h1>
            <p>Open a markdown file</p>
            <button onClick={onOpen}>Open File</button>
            <p className="hint">or press Cmd+O/Ctrl+O</p>
        </div>
    )
}