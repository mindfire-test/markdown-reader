import { HeadingProps } from '../../types/component-types';
import { SLUG_PATTERNS, HTML_PATTERNS } from '../constants/regex-constants';
// converts heading text into a ID
export function getHeadingId(text: string): string {
  let id = text.toLowerCase();
  id = id.replace(SLUG_PATTERNS.NON_WORD, '');
  id = id.replace(SLUG_PATTERNS.SPACES, '-');
  id = id.trim().replace(SLUG_PATTERNS.TRIM_HYPHENS, '');

  return id;
}

// assigns id to the headings
export function heading({ text, depth }: HeadingProps) {
  const id = getHeadingId(text);
  return `<h${depth} id="${id}">${text}</h${depth}>\n`;
}

//removes inline html
export function stripHtml(html: string): string {
  const strip = html.replace(HTML_PATTERNS.ANY_TAG, '');
  return strip;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function decodeHtml(value: string): string {
  return value
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#039;', "'");
}
