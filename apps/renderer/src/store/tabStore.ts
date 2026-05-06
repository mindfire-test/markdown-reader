import { TabAction, TabState } from '../types/component-types';
import { createTab } from '../utils/helpers/tab-helper';

export function tabReducer(state: TabState, action: TabAction): TabState {
  switch (action.type) {
    case 'OPEN_TAB': {
      const existingTab = state.tabs.find((tab) => tab.filePath === action.payload.filePath);
      if (existingTab) {
        return { ...state, activeTabId: existingTab.id };
      }
      const newTab = createTab(action.payload.filePath, action.payload.html);
      return {
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
      };
    }
    case 'CLOSE_TAB': {
      const tabIndex = state.tabs.findIndex((tab) => tab.id === action.payload.tabId);
      if (tabIndex === -1) return state;
      const remainingTabs = state.tabs.filter((tab) => tab.id !== action.payload.tabId);
      if (remainingTabs.length === 0) {
        return { tabs: [], activeTabId: null };
      }

      const nextActiveTab = remainingTabs[Math.max(0, tabIndex - 1)] || remainingTabs[0];

      return {
        tabs: remainingTabs,
        activeTabId: nextActiveTab?.id || null,
      };
    }

    case 'SWITCH_TAB':
      return {
        ...state,
        activeTabId: action.payload.tabId,
      };

    case 'UPDATE_TAB_STATE':
      return {
        ...state,
        tabs: state.tabs.map((tab) =>
          tab.id === action.payload.tabId ? { ...tab, ...action.payload } : tab
        ),
      };

    default:
      return state;
  }
}
