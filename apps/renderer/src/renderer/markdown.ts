import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { DEFAULT_THEME, sikhiHighlighter } from './sikhi';

// configure marked with GFM options
marked.setOptions({
  gfm: true,
  breaks: false,
});

// configure marked to use shiki for code blocks
marked.use(
  markedHighlight({
    async: true,
    langPrefix: '',
    async highlight(code: string, lang: string): Promise<string> {
      const highlighter = await sikhiHighlighter();
      const theme = DEFAULT_THEME;
      const language = lang.toLowerCase() || 'text';

      try {
        return highlighter.codeToHtml(code, { lang: language, theme });
      } catch {
        return highlighter.codeToHtml(code, { lang: 'text', theme });
      }
    },
  })
);

// converts markdown text into plain HTML string
export async function renderMarkdown(markdownText: string): Promise<string> {
  if (!markdownText || markdownText.trim() === '') {
    return '';
  }
  const result = await marked.parse(markdownText);
  return result;
}
