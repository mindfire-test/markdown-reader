import { getMarkdown } from '../config/marked';
import { processAllMath } from './katex';
import { processMermaid } from './mermaid';

// converts markdown text into plain HTML string
export async function renderMarkdown(markdownText: string): Promise<string> {
  if (!markdownText || markdownText.trim() === '') {
    return '';
  }

  const marked = getMarkdown();
  let result = await marked.parse(markdownText);
  result = processAllMath(result);
  result = await processMermaid(result);
  return result;
}
