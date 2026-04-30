import { WelcomeProps } from '../types/component-types';

// welcome screen
export function Welcome({onOpen,recentFiles,onOpenRecent}:WelcomeProps){
  return (
   <div className="flex flex-col items-center justify-center flex-1 gap-3 text-center px-6">
      <h1 className="text-2xl font-semibold text-text-base">Markdown Reader</h1>
      <button
        onClick={onOpen}
        className="mt-2 px-5 py-2 rounded-lg text-sm bg-surface border border-border-theme text-text-base hover:bg-accent-bg hover:border-accent transition-colors"
      >
        Open File
      </button>

      <p className="text-xs text-text-muted">or press Cmd+O / Ctrl+O</p>

      {recentFiles.length > 0 && (
        <div className="mt-6 w-full max-w-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2 text-left">
            Recent Files
          </p>
          <ul className="flex flex-col gap-1">
            {recentFiles.slice(0, 5).map((file) => (
              <li key={file.path}>
                <button
                  onClick={() => onOpenRecent?.(file.path)}
                  className="w-full text-left px-3 py-2 rounded-lg border border-border-theme bg-surface hover:bg-accent-bg hover:border-accent transition-colors group"
                >
                  <span className="block text-sm text-text-base font-medium group-hover:text-accent transition-colors">
                    {file.name}
                  </span>
                  <span className="block text-xs text-text-muted truncate">{file.path}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
