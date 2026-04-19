import { createHighlighter, type Highlighter } from 'shiki';

let highlighter: Promise<Highlighter> | null = null;

// create shiki highligher with theme and languages.
export async function shikiHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['java', 'javascript', 'typescript', 'c'],
    });
  }
  return highlighter;
}
