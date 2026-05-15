import windowsIcon from '@site/static/img/downloads/windows.png';
import macosIcon from '@site/static/img/downloads/macos.png';
import linuxIcon from '@site/static/img/downloads/linux.png';
export const downloads = [
  {
    name: 'Windows',
    format: '.exe installer',
    href: 'https://github.com/mindfiredigital/markdown-reader/releases/latest/download/Markdown-Reader-Setup-1.0.0.exe',
    icon: windowsIcon,
  },
  {
    name: 'macOS',
    format: '.dmg package',
    href: 'https://github.com/mindfiredigital/markdown-reader/releases/latest/download/Markdown-Reader-1.0.0-arm64.dmg',
    icon: macosIcon,
  },
  {
    name: 'Linux',
    format: '.AppImage / .deb',
    href: 'https://github.com/mindfiredigital/markdown-reader/releases/latest/download/markdown-reader_1.0.0_amd64.deb',
    icon: linuxIcon ,
  },
];
