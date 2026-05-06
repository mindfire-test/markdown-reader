import { useContext } from 'react';
import { TabContext } from '../context/TabProvider';

export function useTabStore() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('usetab store must be used inside tab provider');
  }
  return context;
}
