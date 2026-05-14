import { useCallback, useMemo, useState } from 'react';
import { TOCType } from '../types/component-types';

export function useCollapsibleToc(tocItems: TOCType[]) {
  const [collapsedItems, setCollapsedItems] = useState<Record<string, boolean>>({});

  const toggleItem = useCallback((id: string) => {
    setCollapsedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const visibleItems = useMemo(() => {
    return tocItems.filter((item, index) => {
      let currentLevel = item.level;

      for (let i = index - 1; i >= 0; i--) {
        const previous = tocItems[i];
        if (!previous) {
          continue;
        }

        if (previous.level < currentLevel) {
          if (collapsedItems[previous.id]) {
            return false;
          }
          currentLevel = previous.level;
        }
      }

      return true;
    });
  }, [tocItems, collapsedItems]);

  const hasChildren = useCallback(
    (id: string) => {
      const index = tocItems.findIndex((item) => item.id === id);
      if (index === -1) return false;

      const currentItem = tocItems[index];
      const nextItem = tocItems[index + 1];
      if (!currentItem || !nextItem) {
        return false;
      }

      return nextItem.level > currentItem.level;
    },
    [tocItems]
  );

  const isCollapsed = useCallback((id: string) => Boolean(collapsedItems[id]), [collapsedItems]);

  return {
    visibleItems,
    toggleItem,
    hasChildren,
    isCollapsed,
  };
}
