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

  const childMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    for (let i = 0; i < tocItems.length; i++) {
      const currentItem = tocItems[i];
      const nextItem = tocItems[i + 1];
      if (!currentItem) continue;
      map[currentItem.id] = nextItem ? nextItem.level > currentItem.level : false;
    }
    return map;
  }, [tocItems]);

  const visibleItems = useMemo(() => {
    const visible: TOCType[] = [];
    let activeHiddenLevel: number | null = null;

    for (let i = 0; i < tocItems.length; i++) {
      const item = tocItems[i];
      if (!item) continue;
      if (activeHiddenLevel !== null) {
        if (item.level > activeHiddenLevel) {
          continue;
        } else {
          activeHiddenLevel = null;
        }
      }
      visible.push(item);
      if (collapsedItems[item.id]) {
        activeHiddenLevel = item.level;
      }
    }
    return visible;
  }, [tocItems, collapsedItems]);

  const hasChildren = useCallback(
    (id: string) => {
      return Boolean(childMap[id]);
    },
    [childMap]
  );

  const isCollapsed = useCallback((id: string) => Boolean(collapsedItems[id]), [collapsedItems]);

  return {
    visibleItems,
    toggleItem,
    hasChildren,
    isCollapsed,
  };
}
