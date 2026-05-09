import { describe, it, expect } from 'vitest';
import { renderInlineMath, renderBlockMath, processAllMath } from '../../src/renderer/katex';

describe('katex rendering test', () => {
  it('should render inline math return HTML with katex class', async () => {
    const html = await renderInlineMath('E=mc^2');
    expect(html).toContain('katex');
  });

  it('render block math returns a non-empty string', async () => {
    const html = await renderBlockMath('\\frac{a}{b}');
    expect(typeof html).toBe('string');
    expect(html.length).toBeGreaterThan(0);
  });

  it('render inline math does not throw for invalid latex', async () => {
    await expect(renderInlineMath('\\badcmd')).resolves.not.toThrow();
  });

  it('process All math converts $ $ and keeps surrounding text', async () => {
    const out = await processAllMath('Energy: $E=mc^2$ confirmed');
    expect(out).toContain('katex');
    expect(out).toContain('confirmed');
  });

  it('process all math return unchanged string with no math markers', async () => {
    const plain = 'No math here';
    const result = await processAllMath(plain);
    expect(result).toBe(plain);
  });
});
