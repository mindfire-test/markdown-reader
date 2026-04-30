import React,{createContext,useState,useEffect,useCallback} from "react";
import { ThemeContextType,Theme } from "../types/component-types";
import { APPTHEMES } from "../utils/constants/theme-constants";

export const ThemeContext=createContext<ThemeContextType|undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('github-light');

  useEffect(()=>{
    const saved=localStorage.getItem('app-theme');
    if(saved && APPTHEMES.includes(saved as Theme)){
        setTheme(saved as Theme);
    }
  },[])

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
  }, []);

  const toggleTheme = () => {
    const currentIdx=APPTHEMES.indexOf(theme);
    const nextTheme=APPTHEMES[(currentIdx + 1) % APPTHEMES.length] as Theme;
    setThemeState(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}