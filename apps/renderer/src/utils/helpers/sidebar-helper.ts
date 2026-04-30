import { TOCType } from '../../types/component-types';

// sets item level wise
export function getItemClasses(item: TOCType, activeId: string): string {
  let baseStyle = 'block w-full text-left px-4 py-1 text-sm transition';
  if (item.level === 1) {
    baseStyle += ' pl-4 font-semibold';
  }
  if (item.level === 2) {
    baseStyle += ' pl-8';
  }
  if (item.level === 3) {
    baseStyle += ' pl-12 text-xs';
  }
  if (item.id === activeId) {
    baseStyle += ' toc-item';
  } else {
    baseStyle += ' toc-item';
  }
  return baseStyle;
}
