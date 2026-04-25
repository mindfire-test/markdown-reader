import { TOCType } from '../types/component-types';

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
    baseStyle += ' pl-12 text-gray-500 text-xs';
  }
  if (item.id === activeId) {
    baseStyle += ' text-blue-700 bg-blue-50 border-1-2 border-blue-700 font-semibold';
  } else {
    baseStyle += ' text-gray-700 hover:bg-gray-200';
  }
  return baseStyle;
}
