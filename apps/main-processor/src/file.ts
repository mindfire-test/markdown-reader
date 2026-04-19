import { readFile as fsReadFile } from 'node:fs/promises';

export async function readFile(filePath: string): Promise<string> {
  try {
    const content = await fsReadFile(filePath, 'utf-8');
    return content;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Could not read file: ${filePath}`, error);
    }
    return 'Unknown error';
  }
}
