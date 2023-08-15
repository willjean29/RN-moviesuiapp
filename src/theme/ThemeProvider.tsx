import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, StatusBar } from 'react-native';
import lightTheme from '@theme/Light';

const defaultMode = Appearance.getColorScheme() || 'light';
type theme = 'light' | 'dark';

interface IThemeContext {
  mode: theme;
  setMode: (mode: theme) => void;
}
const ThemeContext = createContext({} as IThemeContext);

export const useThemeContext = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeState, setThemeState] = useState(defaultMode);
  const setMode = (mode: theme) => {
    setThemeState(mode);
  };
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setThemeState(colorScheme as theme);
    });
    return () => subscription.remove();
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        mode: themeState,
        setMode,
      }}>
      <>
        <StatusBar
          barStyle={themeState === 'light' ? 'dark-content' : 'light-content'}
        />
        {children}
      </>
    </ThemeContext.Provider>
  );
};

export type typeTheme = typeof lightTheme;
