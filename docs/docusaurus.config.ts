import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Markdown Reader',
  tagline: 'PDF-reader comfort for Markdown files.',
  favicon: 'img/logo.png',
  url: 'https://mindfiredigital.github.io',
  baseUrl: '/markdown-reader/',
  organizationName: 'mindfiredigital',
  projectName: 'markdown-reader',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
          sidebarCollapsed: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {
        name: 'description',
        content:
          'Markdown Reader is a native desktop app for opening, reading, searching, and exporting Markdown files on Windows, macOS, and Linux.',
      },
      {
        name: 'keywords',
        content:
          'Markdown Reader, desktop markdown viewer, markdown app, Electron, TypeScript, GFM, Mermaid, KaTeX, offline markdown reader',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Markdown Reader' },
      {
        name: 'twitter:description',
        content:
          'A dedicated native reader for Markdown files — fast, offline, and built for docs.',
      },
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Markdown Reader',
      logo: {
        alt: 'mindfireLogo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/mindfiredigital/markdown-reader',
          className: 'header--github-link',
          'aria-label': 'GitHub repository',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'error-next-line',
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
