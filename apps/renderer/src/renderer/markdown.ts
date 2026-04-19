import { getMarkdown } from '../config/marked';

// converts markdown text into plain HTML string
export async function renderMarkdown(markdownText: string): Promise<string> {
  if (!markdownText || markdownText.trim() === '') {
    return '';
  }

  const marked = getMarkdown();
  const result = await marked.parse(markdownText);
  return result;
}
