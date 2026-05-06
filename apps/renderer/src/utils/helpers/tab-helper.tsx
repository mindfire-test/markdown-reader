 import { Tab } from "../../types/component-types";
import { FILE_PATH } from "../constants/regex-constants";

export function createTab(filePath: string, html = ''): Tab {
  return {
    id: crypto.randomUUID(),
    filePath,
    fileName: filePath.split(FILE_PATH).pop() ?? 'Untitled',
    html,
    scrollTop: 0,
    fontSize: 16,
  };
}