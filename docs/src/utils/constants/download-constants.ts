import windowsIcon from '@site/static/img/downloads/windows.png';
import macosIcon from '@site/static/img/downloads/macos.png';
import linuxIcon from '@site/static/img/downloads/linux.png';
export const downloads = [
  {
    name: 'Windows',
    format: '.exe installer',
    href: 'https://github.com/mindfiredigital/markdown-reader/releases/latest/download/Markdown-Reader-Setup.exe',
    icon: windowsIcon,
  },
  {
    name: 'macOS',
    format: '.dmg package',
    href: 'https://github.com/mindfiredigital/markdown-reader/releases/latest/download/Markdown-Reader.dmg',
    icon: macosIcon,
  },
  {
    name: 'Linux',
    format: '.AppImage / .deb',
    href: 'https://github.com/mindfiredigital/markdown-reader/releases/latest/download/Markdown-Reader.deb',
    icon: linuxIcon,
  },
];
