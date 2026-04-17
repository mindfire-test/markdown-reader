// type of file or folder in the file browser
export interface FileType {
  name: string;
  path: string;
  isDir: boolean;
  children?: FileType[];
}
