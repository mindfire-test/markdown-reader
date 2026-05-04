import katex from 'katex';
import { BLOCK_MATH_REGEX, INLINE_MATH_REGEX } from '../utils/constants/regex-constants';

//turns math text into a small inline formula
export function renderInlineMath(latex: string): string {
  try {
    return katex.renderToString(latex, { displayMode: false, throwOnError: false });
  } catch {
    return `<span class="katex-error">${latex}</span>`;
  }
}

// turns math into a centered block
export function renderBlockMath(latex: string): string {
  try {
    return katex.renderToString(latex, { displayMode: true, throwOnError: false });
  } catch {
    return `<div class="katex-error">${latex}</div>`;
  }
}

//swaps all $ with actual math symbol
export function processAllMath(html: string): string {
  if (!html.includes('$')) return html;
  let out = html.replace(BLOCK_MATH_REGEX, (_, tex: string) => renderBlockMath(tex.trim()));
  out = out.replace(INLINE_MATH_REGEX, (_, tex: string) => renderInlineMath(tex.trim()));
  return out;
}
