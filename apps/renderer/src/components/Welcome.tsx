import { WelcomeProps } from '../types/component-types';

// welcome screen
export function Welcome({onOpen}:WelcomeProps){
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-brand-deep">
        Markdown Reader
      </h1>
      <button
        onClick={onOpen}
        className="px-6 py-3 bg-brand-primary text-white rounded-lg text-base font-medium hover:bg-blue-700 transition"
      >Open File
      </button>
      <p className="text-brand-gray text-sm">
        or press Cmd+O/Ctrl+O
      </p>
    </div>
  )
}
