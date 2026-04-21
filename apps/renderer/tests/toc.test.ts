import { describe, it, expect } from 'vitest';
import { extractTOC } from '../src/renderer/toc';

describe('extract table of contents', () => {
  //test 1: checks empty array return from no heading
  it('returns empty array for HTML with no headings', () => {
    const html = '<p>My name is Ashminita</p>';
    const toc = extractTOC(html);
    expect(toc).toEqual([]);
  });

  // test 2:- checks single heading extraction
  it('extracts a single H1 headings', () => {
    const html = '<h1 id="intro">Introduction</h1><p>text</p>';
    const toc = extractTOC(html);
    expect(toc).toHaveLength(1);
    expect(toc[0]).toEqual({ id: 'intro', text: 'Introduction', level: 1 });
  });

  //test 3:-headings without id generate a slug from the text
  it('generates a id when heading has no id attribute', () => {
    const html = '<h2>Getting Started</h2>';
    const toc = extractTOC(html);
    expect(toc[0]?.id).toBe('getting-started');
  });
});
