import { BLOCK_MATH_REGEX, INLINE_MATH_REGEX } from '../utils/constants/regex-constants';

//turns math text into a small inline formula
export async function renderInlineMath(latex: string): Promise<string> {
  const { default: katex } = await import('katex');
  try {
    return katex.renderToString(latex, { displayMode: false, throwOnError: false });
  } catch {
    return `<span class="katex-error">${latex}</span>`;
  }
}

// turns math into a centered block
export async function renderBlockMath(latex: string): Promise<string> {
  const { default: katex } = await import('katex');
  try {
    return katex.renderToString(latex, { displayMode: true, throwOnError: false });
  } catch {
    return `<div class="katex-error">${latex}</div>`;
  }
}

//swaps all $ with actual math symbol
export async function processAllMath(html: string): Promise<string> {
  if (!html.includes('$')) return html;
  let result = html;
  for (const match of result.matchAll(BLOCK_MATH_REGEX)) {
    const [raw, content] = match;
    if (!content) continue;
    const rendered = await renderBlockMath(content.trim());
    result = result.replace(raw, rendered);
  }
  for (const match of result.matchAll(INLINE_MATH_REGEX)) {
    const [raw, content] = match;
    if (!content) continue;
    const rendered = await renderInlineMath(content.trim());
    result = result.replace(raw, rendered);
  }
  return result;
}
