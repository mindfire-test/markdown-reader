import { describe, it, expect } from 'vitest';
import { renderMarkdown } from '../src/renderer/markdown';

describe('renderMarkdown', () => {
  //test-1 :- converts heading to h1
  it('converts # heading to <h1> element', async () => {
    const html = await renderMarkdown('# Hello World');
    expect(html).toContain('<h1 id="hello-world">Hello World</h1>');
  });

  //test-2:- converts sub heading to h2
  it('converts ## heading to <h2> and ### to <h3>', async () => {
    const html = await renderMarkdown('## Section\n### Subsection');
    expect(html).toContain('<h2 id="section">Section</h2>');
    expect(html).toContain('<h3 id="subsection">Subsection</h3>');
  });

  //test-3:- converts bold text to strong
  it('converts **text** to <strong> element', async () => {
    const html = await renderMarkdown('This is **bold** text.');
    expect(html).toContain('<strong>bold</strong>');
  });

  // test-4:- render links
  it('converts [text](url) to <a> element with href', async () => {
    const html = await renderMarkdown('[GitHub](https://github.com)');
    expect(html).toContain('href="https://github.com"');
    expect(html).toContain('>GitHub<');
  });

  // test-5:- tests table  supports
  it('converts gfm table syntax to <table> element', async () => {
    const md = '| Name | Age |\n|------|-----|\n| Alice | 30 |';
    const html = await renderMarkdown(md);
    expect(html).toContain('<table>');
    expect(html).toContain('<th>Name</th>');
    expect(html).toContain('<td>Alice</td>');
  });

  // test-6:- empty input should not crash
  it('returns empty stringempty input without throwng', async () => {
    expect(() => renderMarkdown('')).not.toThrow();
    const result = await renderMarkdown('');
    expect(typeof result).toBe('string');
  });
});
