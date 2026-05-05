import { vi, describe, it, expect } from 'vitest';
import { renderMermaid } from '../../src/renderer/mermaid';

vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    parse: vi.fn().mockImplementation((code) => {
      if (code.includes('invalid')) throw new Error('Syntax Error');
      return Promise.resolve();
    }),
    render: vi.fn().mockResolvedValue({ svg: '<svg>Mocked Diagram</svg>' }),
  },
}));
describe('mermaid test', () => {
  it('renders a flowchart and returns SVG markup', async () => {
    const result = await renderMermaid('graph LR\n A --> B');
    expect(result).toContain('<svg');
  });

  it('always returns a string', async () => {
    const result = await renderMermaid('graph TD\n X --> Y');
    expect(typeof result).toBe('string');
  });
  it('returns empty string for emty input', async () => {
    return expect(await renderMermaid('')).toBe('');
  });

  it('should return a fallback string for invalid syntax w/o throwing error', async () => {
    const result = await renderMermaid('this is not a valid mermaid');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should render a sequence diagram', async () => {
    const result = await renderMermaid('sequenceDiagram\n Ashminita->>Ritu: Hi');
    expect(result).toContain('<svg');
  });
});
