import { describe, it, expect, vi } from 'vitest';
import { sikhiHighlighter } from '../src/renderer/sikhi';

vi.mock('shiki/core', () => ({
  createHighlighterCore: vi.fn().mockResolvedValue({
    codeToHtml: vi.fn(),
  }),
}));

vi.mock('shiki/engine/javascript', () => ({
  createJavaScriptRegexEngine: vi.fn(),
}));

describe('shiki renderer setup', () => {
  it('should initialize and return the highlighter', async () => {
    const instance = await sikhiHighlighter();
    expect(instance).toBeDefined();
  });

  it('should be a singleton', async () => {
    const first = await sikhiHighlighter();
    const second = await sikhiHighlighter();

    expect(first).toBe(second);
  });
});
