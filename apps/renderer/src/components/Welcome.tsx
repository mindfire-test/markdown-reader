import { WelcomeProps } from '../types/component-types';

// welcome screen
export function Welcome({onOpen}:WelcomeProps){
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3 text-center">
      <h1 className="text-2xl font-medium">
        Markdown Reader
      </h1>
      <button
        onClick={onOpen}
        className="mt-1 px-5 py-2 rounded-lg text-sm sidebar-bg border border-theme hover:opacity-80"
      >Open File
      </button>
      <p className="text-secondary text-sm">
        or press Cmd+O/Ctrl+O
      </p>
    </div>
  )
}
