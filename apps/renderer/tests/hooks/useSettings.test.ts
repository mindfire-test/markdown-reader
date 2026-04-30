import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSettings } from '../../src/hooks/useSettings';

vi.mock('../../src/hooks/useSettings', async (importOg) => {
  return importOg();
});

describe('useSettings font size', () => {
  it('should initialize with font size 16', () => {
    const { result } = renderHook(() => useSettings());
    expect(result.current.fontSize).toBe(16);
  });

  it('should increase font size by adding 2px', () => {
    const { result } = renderHook(() => useSettings());
    act(() => result.current.increaseFontSize());
    expect(result.current.fontSize).toBe(18);
  });

  it('should decrease font size by subracting 2px', () => {
    const { result } = renderHook(() => useSettings());
    act(() => result.current.decreaseFontSize());
    expect(result.current.fontSize).toBe(14);
  });

  it('should not exceed 24px', () => {
    const { result } = renderHook(() => useSettings());
    act(() => {
      for (let i = 0; i < 10; i++) {
        result.current.increaseFontSize();
      }
    });
    expect(result.current.fontSize).toBe(24);
  });

  it('should return recent font size as 16', () => {
    const { result } = renderHook(() => useSettings());
    act(() => {
      result.current.increaseFontSize();
      result.current.resetFontSize();
    });
    expect(result.current.fontSize).toBe(16);
  });
});
