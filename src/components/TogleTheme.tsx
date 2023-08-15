import { Switch } from 'react-native';
import React from 'react';
import { useThemeContext } from '@theme/ThemeProvider';

export const TogleTheme = () => {
  const { mode, setMode } = useThemeContext();
  return (
    <Switch
      value={mode === 'dark'}
      onValueChange={value => {
        setMode(value ? 'dark' : 'light');
      }}
    />
  );
};
