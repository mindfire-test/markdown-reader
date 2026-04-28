export const HTML_PATTERNS = {
  ANY_TAG: /<[^>]+>/g,

  HEADINGS: /<h([1-3])([^>]*)>(.*?)<\/h\1>/gi,

  ID_ATTRIBUTE: /id="([^"]+)"/,

  SEARCH_MARKS: /<mark class="search-match">|<\/mark>/g,
};

export const SLUG_PATTERNS = {
  NON_WORD: /[^\w\s-]/g,
  SPACES: /[\s_]+/g,
  TRIM_HYPHENS: /^-+|-+$/g,
};

export const createSearchRegex = (query: string): RegExp => {
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(${escaped})(?![^<]*>)`, 'gi');
};
