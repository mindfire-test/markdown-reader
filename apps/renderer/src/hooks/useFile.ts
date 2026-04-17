import { useState, useCallback } from 'react';
import DOMpurify from 'dompurify';
import { renderMarkdown } from '../renderer/markdown';

export function useFile() {
  const [html, setHtml] = useState<string>('');
  const [filePath, setFilePath] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const loadFile = useCallback(async (path: string) => {
    setIsLoading(true);
    setError('');
    setFilePath(path);
    try {
      const rawMarkdown = await window.api.readFile(path);
      const renderHtml = await renderMarkdown(rawMarkdown);
      setHtml(DOMpurify.sanitize(renderHtml));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  const openFile = useCallback(async () => {
    const chosenPath = await window.api.openFileDialog();
    if (!chosenPath) return;
    await loadFile(chosenPath);
  }, [loadFile]);
  return { html, filePath, openFile, error, isLoading };
}
