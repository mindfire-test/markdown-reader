import { app } from 'electron';
import { saveRecentFile } from './saveRecentFile';

export async function clearRecentFiles(): Promise<void> {
  await saveRecentFile([]);
  app.clearRecentDocuments();
}
