import { describe, it, expect } from 'vitest';
import { extractTOC } from '../../src/renderer/toc';

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

  //test 4:- checks duplicate id
  it('generates unique ids for duplicate headings', () => {
    const html = `<h2>Duplicate</h2>
  <h2>Duplicate</h2>`;
    const toc = extractTOC(html);
    expect(toc[0].id).toBe('duplicate');
    expect(toc[1].id).toBe('duplicate-1');
  });

  //test 5:-checks inline formating
  it('handles headings with inline HTML formating', () => {
    const html = `<h2><em>Hello</em> World</h2>`;
    const toc = extractTOC(html);
    expect(toc[0].text).toBe('Hello World');
    expect(toc[0].id).toBe('hello-world');
  });

  //test 6:- checks code spans
  it('handle headings with code spans', () => {
    const html = `<h2>Install <code>npm</code></h2>`;
    const toc = extractTOC(html);
    expect(toc[0].text).toBe('Install npm');
  });
});
