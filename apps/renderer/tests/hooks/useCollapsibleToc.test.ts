import { renderHook, act } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useCollapsibleToc } from '../../src/hooks/useCollapsibleToc';
import { TOCType } from '../../src/types/component-types';

describe('Table of Contents Hook Tests', () => {
  const sampleDocumentItems: TOCType[] = [
    { id: 'chapter-1', text: 'Chapter 1', level: 1 },
    { id: 'section-1.1', text: 'Section 1.1', level: 2 },
    { id: 'subsection-1.1.1', text: 'Sub-section 1.1.1', level: 3 },
    { id: 'chapter-2', text: 'Chapter 2', level: 1 },
  ];

  test('should accurately identify which items have chilren under them', () => {
    const { result } = renderHook(() => useCollapsibleToc(sampleDocumentItems));
    expect(result.current.hasChildren('chapter-1')).toBe(true);
    expect(result.current.hasChildren('section-1.1')).toBe(true);
    expect(result.current.hasChildren('subsection-1.1.1')).toBe(false);
  });

  test('should hide nested sub items when their parent is collapsed', () => {
    const { result } = renderHook(() => useCollapsibleToc(sampleDocumentItems));
    expect(result.current.visibleItems.length).toBe(4);
    act(() => {
      result.current.toggleItem('section-1.1');
    });
    expect(result.current.visibleItems.length).toBe(3);
    const containsSubSection = result.current.visibleItems.some(
      (item) => item.id === 'subsection-1.1.1'
    );
    expect(containsSubSection).toBe(false);
  });

  test('should handle completely empty lists without crashing the app', () => {
    const { result } = renderHook(() => useCollapsibleToc([]));
    expect(result.current.visibleItems.length).toBe(0);
  });

  test('should handle corrupted or missing list items safely', () => {
    const brokenList = [
      { id: 'item-1', text: 'Item 1', level: 1 },
      undefined,
      { id: 'item-2', text: 'Item 2', level: 2 },
    ];

    const { result } = renderHook(() => useCollapsibleToc(brokenList as TOCType[]));
    expect(result.current.visibleItems.length).toBe(2);
  });
});
