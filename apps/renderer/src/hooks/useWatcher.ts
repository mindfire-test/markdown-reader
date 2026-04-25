import { useEffect } from 'react';

export function useWatcher(filePath: string, onFileChanged: (path: string) => void) {
  useEffect(() => {
    if (!filePath) return;
    window.api.watchFile(filePath);
    const handler = (path: string) => {
      onFileChanged(path);
    };
    window.api.onFileChanged(handler);
    return () => {
      window.api.unWatchFile(filePath);
      window.api.removeFileChangedListener();
    };
  }, [filePath, onFileChanged]);
}
