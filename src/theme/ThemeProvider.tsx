import React from 'react';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import useTheme from '../store/theme';
import { themes } from '../config';

function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useTheme();

  return (
    <MuiThemeProvider theme={createMuiTheme(themes[theme])}>
      {children}
    </MuiThemeProvider>
  );
}

export default CustomThemeProvider;
