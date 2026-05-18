import type { Configuration } from 'electron-builder';

const config: Configuration = {
  appId: 'com.markdown.reader',
  productName: 'Markdown Reader',
  directories: {
    output: 'release',
    buildResources: 'assets',
  },
  files: [
    'out/**/*',
    'package.json',
    '!**/coverage/**',
    '!**/tests/**',
    '!**/*.test.*',
    '!**/*.spec.*',
    '!**/*.map',
    '!**/node_modules/.vite/**',
  ],
  extraResources: [
    {
      from: 'assets',
      to: 'assets',
    },
  ],
  asar: true,
  fileAssociations: [
    {
      ext: 'md',
      name: 'Markdown File',
      description: 'Markdown document',
      icon: 'assets/icon',
      rank: 'Owner',
    },
    {
      ext: 'markdown',
      name: 'Markdown File',
      description: 'Markdown document',
      icon: 'assets/icon',
      rank: 'Owner',
    },
  ],
  publish: [{ provider: 'github' }],
  mac: {
    category: 'public.app-category.productivity',
    icon: 'assets/icon.icns',
    target: ['dmg'],
    type: 'distribution',
    artifactName: 'Markdown-Reader.${ext}',
  },
  win: {
    icon: 'assets/icon.ico',
    target: [{ target: 'nsis', arch: ['x64'] }],
    artifactName: 'Markdown-Reader-Setup.${ext}',
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'Markdown Reader',
  },
  linux: {
    icon: 'assets/icons',
    target: ['AppImage', 'deb'],
    category: 'Utility',
    mimeTypes: ['text/markdown'],
    maintainer: 'Mindfire Digital <ashminita12@gmail.com>',
    artifactName: 'Markdown-Reader.${ext}',
  },
};

export default config;
