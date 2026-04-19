import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import type { HighlighterCore } from 'shiki';
import { SHIKI_LANG, SHIKI_THEME } from '../utils/shiki-list';

let highlighter: HighlighterCore | null = null;
const themes = Object.values(SHIKI_THEME).map((fn) => fn());
const langs = Object.values(SHIKI_LANG).map((fn) => fn());

export function resetHilighter() {
  highlighter = null;
}

// make shiki highlighter
export async function shikiHighlighter(): Promise<HighlighterCore> {
  if (highlighter) {
    return highlighter;
  }
  highlighter = await createHighlighterCore({
    themes,
    langs,
    engine: createJavaScriptRegexEngine(),
  });

  return highlighter;
}
