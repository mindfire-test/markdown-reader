import { TOCType } from '../types/component-types';
import { getHeadingId } from '../utils/generate-id';
import { headingRegex, mathingid } from '../utils/heading-constants';

// extracts table of content from HTML string
export function extractTOC(html: string): TOCType[] {
  const items: TOCType[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1] ?? '1', 10) as 1 | 2 | 3;
    const attrs = match[2] ?? '';
    const text = (match[3] ?? '').trim();

    const matchId = mathingid.exec(attrs);
    const id = matchId?.[1] ?? getHeadingId(text);
    if (text) {
      items.push({ id, text, level });
    }
  }
  return items;
}
