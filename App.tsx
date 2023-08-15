import React from 'react';
import { ThemeProvider } from './src/theme/ThemeProvider';
import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
  return (
    <ThemeProvider>
      <AppNavigation />
    </ThemeProvider>
  );
};

export default App;
