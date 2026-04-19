import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import type { HighlighterCore } from 'shiki';

export const DEFAULT_THEME = 'github-dark';
let highlighter: HighlighterCore | null = null;

export function resetHilighter() {
  highlighter = null;
}

// make shiki highlighter
export async function shikiHighlighter(): Promise<HighlighterCore> {
  if (highlighter) {
    return highlighter;
  }

  highlighter = await createHighlighterCore({
    themes: [import('shiki/themes/github-dark.mjs'), import('shiki/themes/github-light.mjs')],
    langs: [
      import('shiki/langs/javascript.mjs'),
      import('shiki/langs/python.mjs'),
      import('shiki/langs/markdown.mjs'),
    ],
    engine: createJavaScriptRegexEngine(),
  });

  return highlighter;
}
