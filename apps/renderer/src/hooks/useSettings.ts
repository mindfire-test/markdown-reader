import { useCallback, useEffect, useState } from 'react';
import { FONT_SISE, ReadingWidth, WIDTH_MAP } from '../types/component-types';

export function useSettings() {
  const [fontSize, setFontSize] = useState(FONT_SISE.DEFAULT);
  const [readingWidth, setReadingWidth] = useState<ReadingWidth>('default');

  useEffect(() => {
    document.documentElement.style.setProperty('--content-font-size', `${fontSize}px`);
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--reading-width',
      WIDTH_MAP[readingWidth] ?? '768px'
    );
  }, [readingWidth]);

  const increaseFontSize = useCallback(() => {
    setFontSize((prev) => Math.min(FONT_SISE.MAX, prev + FONT_SISE.INCREMENT));
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSize((prev) => Math.max(FONT_SISE.MIN, prev - FONT_SISE.INCREMENT));
  }, []);

  const resetFontSize = useCallback(() => {
    setFontSize(FONT_SISE.DEFAULT);
  }, []);
  return {
    fontSize,
    readingWidth,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    setReadingWidth,
  };
}
