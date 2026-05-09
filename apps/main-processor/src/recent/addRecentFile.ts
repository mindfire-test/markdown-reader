import { app } from 'electron';
import { getRecentFiles } from './getRecentFile';
import { addToRecentList } from './addToRecentList';
import { saveRecentFile } from './saveRecentFile';

export async function addRecentFile(filePath: string): Promise<void> {
  const existing = await getRecentFiles();
  const updated = addToRecentList(existing, filePath);
  await saveRecentFile(updated);
  app.addRecentDocument(filePath);
}
