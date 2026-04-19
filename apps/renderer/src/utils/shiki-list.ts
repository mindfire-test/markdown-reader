export const SHIKI_THEME = {
  dark: () => import('shiki/themes/github-dark.mjs'),
  light: () => import('shiki/themes/github-light.mjs'),
} as const;

export const SHIKI_LANG = {
  javascript: () => import('shiki/langs/javascript.mjs'),
  python: () => import('shiki/langs/python.mjs'),
  md: () => import('shiki/langs/markdown.mjs'),
} as const;
