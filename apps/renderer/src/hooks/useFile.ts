import { useState, useCallback, useEffect } from 'react';
import DOMpurify from 'dompurify';
import { renderMarkdown } from '../renderer/markdown';
import { extractTOC } from '../renderer/toc';
import { TOCType } from '../types/component-types';
import { RecentFile } from '@package/shared-types';

export function useFile() {
  const [html, setHtml] = useState<string>('');
  const [filePath, setFilePath] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [toc, setToc] = useState<TOCType[]>([]);
  const [recentFiles, setRecentFiles] = useState<RecentFile[]>([]);

  useEffect(() => {
    window.api
      .getRecentFiles()
      .then(setRecentFiles)
      .catch(() => {});
  }, []);

  const loadFile = useCallback(async (path: string) => {
    setIsLoading(true);
    setError('');
    setFilePath(path);
    try {
      const rawMarkdown = await window.api.readFile(path);
      const renderHtml = await renderMarkdown(rawMarkdown);
      const safeHtml = DOMpurify.sanitize(renderHtml);
      setHtml(safeHtml);
      const nextToc = extractTOC(safeHtml);
      setToc(nextToc);
      await window.api.addRecentFile(path);
      const updated = await window.api.getRecentFiles();
      setRecentFiles(updated);
      return {
        html: safeHtml,
        toc: nextToc,
        filePath: path,
      };
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
  const reloadFile = useCallback(async () => {
    if (!filePath) return;
    await loadFile(filePath);
  }, [filePath, loadFile]);
  return { html, filePath, openFile, error, isLoading, toc, reloadFile, recentFiles, loadFile };
}
