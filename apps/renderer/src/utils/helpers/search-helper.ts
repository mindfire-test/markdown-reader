import { createSearchRegex } from '../constants/regex-constants';

// matches the input in the search with the content
export function findMatches(text: string, query: string): number[] {
  if (!query.trim()) {
    return [];
  }
  const positions: number[] = [];
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  let startIndex = 0;
  while (true) {
    const index = lowerText.indexOf(lowerQuery, startIndex);
    if (index === -1) {
      break;
    }
    positions.push(index);
    startIndex = index + 1;
  }
  return positions;
}

// highlights the matching input
export function highlightMatches(text: string, query: string): string {
  if (!query.trim()) {
    return text;
  }
  const regex = createSearchRegex(query);
  return text.replace(regex, '<mark class="search-match">$1</mark>');
}
