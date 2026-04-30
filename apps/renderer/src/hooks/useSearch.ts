import { useCallback, useState } from 'react';
import { UseSearchProps } from '../types/component-types';
import { findMatches, highlightMatches } from '../utils/helpers/search-helper';
import { HTML_PATTERNS } from '../utils/constants/regex-constants';

export function useSearch(rawHtml: string): UseSearchProps {
  const [currentMatch, setCurrentMatch] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQueryState] = useState('');

  const plainText = rawHtml.replace(HTML_PATTERNS.ANY_TAG, ' ');
  const matches = query ? findMatches(plainText, query) : [];

  const setQuery = useCallback((q: string) => {
    setQueryState(q);
    setCurrentMatch(1);
  }, []);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => {
    setIsSearchOpen(false);
    setQueryState('');
    setCurrentMatch(1);
  }, []);

  const goToNextMatch = useCallback(() => {
    if (matches.length === 0) return;
    setCurrentMatch((prev) => (prev >= matches.length ? 1 : prev + 1));
  }, [matches.length]);

  const goToPrevMatch = useCallback(() => {
    if (matches.length === 0) return;
    setCurrentMatch((prev) => (prev <= 1 ? matches.length : prev - 1));
  }, [matches.length]);

  const getHiglightedHtml = useCallback(
    (html: string) => {
      if (!query) {
        return html;
      }
      const res = highlightMatches(html, query);
      return res;
    },
    [query]
  );

  return {
    query,
    matchCount: matches.length,
    currentMatch,
    isSearchOpen,
    openSearch,
    closeSearch,
    setQuery,
    goToNextMatch,
    goToPrevMatch,
    getHiglightedHtml,
  };
}
