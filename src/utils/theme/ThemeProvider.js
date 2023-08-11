import React, { createContext, useState } from 'react';
import { strings } from './stringsColors';
export const ThemeContext = createContext();
  // console.log("ThemeContext",ThemeContext)
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [Darkmode, setMode] = useState('light');
  const StringsDark = strings[Darkmode];
  // console.log("localizedStrings",StringsDark)

  const toggleThemeText=()=>{
    if (Darkmode=== 'light'){
      setMode('dark')
      setIsDarkMode(prevMode => !prevMode);
    }
    else{
      setMode('light')
      setIsDarkMode(prevMode => !prevMode);
    } 
  };
  
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    if (Darkmode=== 'light')
    setMode('dark')
    else 
    setMode('light')
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode,Darkmode, toggleTheme,toggleThemeText,StringsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
