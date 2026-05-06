import React,{ createContext, useReducer, type Dispatch } from 'react';
import { TabState, TabAction } from '../types/component-types';
import { tabReducer } from '../store/tabStore';

export const TabContext = createContext<{
  state: TabState;
  dispatch: Dispatch<TabAction>;
} | null>(null);

export function TabProvider({children}:{children:React.ReactNode}){
    const [state,dispatch]=useReducer(tabReducer,{tabs:[],activeTabId:null});
    return <TabContext.Provider value={{state,dispatch}}>{children}</TabContext.Provider>
}