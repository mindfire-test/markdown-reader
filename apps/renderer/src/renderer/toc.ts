import { TOCType } from '../types/component-types';
import { getHeadingId, stripHtml } from '../utils/helpers/heading-helper';
import { HTML_PATTERNS } from '../utils/constants/regex-constants';

// extracts table of content from HTML string
export function extractTOC(html: string): TOCType[] {
  const items: TOCType[] = [];
  const idCount = new Map<string, number>();
  let match: RegExpExecArray | null;
  while ((match = HTML_PATTERNS.HEADINGS.exec(html)) !== null) {
    const level = parseInt(match[1] ?? '1', 10) as 1 | 2 | 3;
    const attrs = match[2] ?? '';
    const rawtext = match[3] ?? '';

    const strip = stripHtml(rawtext).trim();
    if (!strip) continue;
    const matchId = HTML_PATTERNS.ID_ATTRIBUTE.exec(attrs);
    const firstid = matchId?.[1] ?? getHeadingId(strip);

    const count = idCount.get(firstid) ?? 0;
    idCount.set(firstid, count + 1);
    const id = count === 0 ? firstid : `${firstid}-${count}`;

    items.push({ id, text: strip, level });
  }
  return items;
}
