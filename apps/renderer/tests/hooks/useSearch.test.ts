import { describe, it, expect } from 'vitest';
import { findMatches, highlightMatches } from '../../src/utils/search-utils';

describe('find matches', () => {
  it(' should return empty array for empty query', () => {
    expect(findMatches('new content', '')).toEqual([]);
  });

  it('should return correct index for a single match', () => {
    const matches = findMatches('hello world', 'world');
    expect(matches).toHaveLength(1);
    expect(matches[0]).toBe(6);
  });

  it('should find all occurrences of a word', () => {
    const matches = findMatches('my name is kiki is my name', 'name');
    expect(matches).toHaveLength(2);
    expect(matches[0]).toBe(3);
    expect(matches[1]).toBe(22);
  });

  it('is case sensetative by default', () => {
    const matches = findMatches('Hello WORLD hello', 'hello');
    expect(matches).toHaveLength(2);
  });

  it('should return empty array when no matches found', () => {
    expect(findMatches('hello world', 'xyz')).toEqual([]);
  });
});

describe('highlight matches', () => {
  it('should wrap matching text in <mark class="search-match">tags', () => {
    const res = highlightMatches('hello world', 'world');
    expect(res).toContain('<mark class="search-match">world</mark>');
  });

  it('should return unchanged string when query does not change', () => {
    const res = highlightMatches('hello world', 'xyz');
    expect(res).toBe('hello world');
  });
});
