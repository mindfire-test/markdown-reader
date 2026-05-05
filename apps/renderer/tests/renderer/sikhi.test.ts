import { describe, it, expect, vi } from 'vitest';
import { shikiHighlighter } from '../../src/renderer/shiki';

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
    const instance = await shikiHighlighter();
    expect(instance).toBeDefined();
  });

  it('should be a singleton', async () => {
    const first = await shikiHighlighter();
    const second = await shikiHighlighter();

    expect(first).toBe(second);
  });
});
