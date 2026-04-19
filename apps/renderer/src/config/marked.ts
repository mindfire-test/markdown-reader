import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { shikiHighlighter } from '../renderer/shiki';
import { THEMES } from '@package/shared-constants';

let instance: Marked | null = null;

export function getMarkdown(): Marked {
  if (instance) return instance;
  instance = new Marked();

  // configure marked with GFM options
  instance.setOptions({
    gfm: true,
    breaks: false,
  });

  //configure marked to use Shikhi for code blocks
  instance.use(
    markedHighlight({
      async: true,
      async highlight(code: string, lang: string): Promise<string> {
        const highlighter = await shikiHighlighter();
        const theme = THEMES.GITHUB_DARK;
        const language = lang || 'text';
        try {
          return highlighter.codeToHtml(code, { lang: language, theme });
        } catch {
          return highlighter.codeToHtml(code, { lang: 'text', theme });
        }
      },
    })
  );
  return instance;
}
