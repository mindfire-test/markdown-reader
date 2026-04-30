import path from 'path';
import { IpcMainInvokeEvent } from 'electron';

// production and dev urls
const allowedOrigin = ['file://', 'http://localhost'];

//validate the sender
export function validateSender(event: IpcMainInvokeEvent): boolean {
  const url = event.senderFrame?.url || '';
  return allowedOrigin.some((origin) => url.startsWith(origin));
}

//validate path type
export function validatePath(path: string) {
  return typeof path == 'string' && path.trim().length > 0;
}

//validate file extension
export function validateMarkdownFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return ext === '.md' || ext === '.markdown';
}
