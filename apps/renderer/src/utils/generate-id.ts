import { HeadingProps } from '../types/component-types';

// converts heading text into a ID
export function getHeadingId(text: string): string {
  let id = text.toLowerCase();
  id = id.replace(/[^\w\s-]/g, '');
  id = id.replace(/[\s_]+/g, '-');
  id = id.trim().replace(/^-+|-+$/g, '');

  return id;
}

// assigns id to the headings
export function heading({ text, depth }: HeadingProps) {
  const id = getHeadingId(text);
  return `<h${depth} id="${id}">${text}</h${depth}>\n`;
}

//removes inline html
export function stripHtml(html: string): string {
  const strip = html.replace(/<[^>]+>/g, '');
  return strip;
}
