import { describe, it, expect } from 'vitest';
import { renderInlineMath, renderBlockMath, processAllMath } from '../../src/renderer/katex';

describe('katex rendering test', () => {
  it('should render inline math return HTML with katex class', () => {
    expect(renderInlineMath('E=mc^2')).toContain('katex');
  });

  it('render block math returns a non-empty string', () => {
    const html = renderBlockMath('\\frac{a}{b}');
    expect(typeof html).toBe('string');
    expect(html.length).toBeGreaterThan(0);
  });

  it('render inline math does not throw for invalid latex', () => {
    expect(() => renderInlineMath('\\badcmd')).not.toThrow();
  });
  it('process All math converts $ $ and keeps surrounding text', () => {
    const out = processAllMath('Energy: $E=mc^2$ confirmed');
    expect(out).toContain('katex');
    expect(out).toContain('confirmed');
  });
  it('process all math return unchanged string with no math markers', () => {
    const plain = 'No math here';
    expect(processAllMath(plain)).toBe(plain);
  });
});
